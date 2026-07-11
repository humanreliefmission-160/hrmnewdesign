"use server"

import mailchimp from "@mailchimp/mailchimp_marketing";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

const LIST_ID = "e9938aafc4";

export async function subscribeNewsletter(firstName, lastName, email, tagName = "Website Newsletter Subscriber") {
  if (!email) {
    return { success: false, error: "Email is required" };
  }

  const subscriberHash = crypto.createHash("md5").update(email.toLowerCase()).digest("hex");

  try {
    let memberAdded = false;
    try {
      await mailchimp.lists.addListMember(LIST_ID, {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName || "",
          LNAME: lastName || "",
        },
      });
      memberAdded = true;
    } catch (e) {
      if (e.response && e.response.body && e.response.body.title === "Member Exists") {
        // Proceed to tag them anyway
      } else {
        throw e;
      }
    }

    // Apply the specified tag
    await mailchimp.lists.updateListMemberTags(LIST_ID, subscriberHash, {
      tags: [
        {
          name: tagName,
          status: "active"
        }
      ]
    });

    // --- Supabase Dual-Write ---
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;
      if (supabaseUrl && supabaseKey) {
        const supabase = createClient(supabaseUrl, supabaseKey, {
          auth: { persistSession: false },
        });
        const cleanEmail = email.toLowerCase().trim();
        const consentSource = tagName === "Donation Checkout Subscribe" ? "checkout" : "newsletter_form";

        const { data: existing } = await supabase
          .from('marketing_subscription')
          .select('id')
          .eq('email', cleanEmail)
          .maybeSingle();

        if (existing) {
          await supabase
            .from('marketing_subscription')
            .update({
              first_name: firstName || "",
              last_name: lastName || "",
              status: 'active',
              consent_source: consentSource,
              subscribed_at: new Date().toISOString()
            })
            .eq('id', existing.id);
        } else {
          await supabase
            .from('marketing_subscription')
            .insert({
              email: cleanEmail,
              first_name: firstName || "",
              last_name: lastName || "",
              status: 'active',
              consent_source: consentSource,
              subscribed_at: new Date().toISOString()
            });
        }
      }
    } catch (dbErr) {
      console.error("Supabase marketing subscription error:", dbErr);
      // Don't block success if Supabase write fails
    }

    return { success: true, alreadyExists: !memberAdded };
  } catch (error) {
    console.error("Mailchimp error:", error);
    let errorMessage = "Failed to subscribe. Please try again.";
    if (error.response && error.response.body && error.response.body.title) {
      errorMessage = error.response.body.detail || error.response.body.title;
    }
    return { success: false, error: errorMessage };
  }
}

