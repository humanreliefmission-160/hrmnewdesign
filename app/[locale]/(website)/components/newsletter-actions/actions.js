"use server"

import mailchimp from "@mailchimp/mailchimp_marketing";
import crypto from "crypto";

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
