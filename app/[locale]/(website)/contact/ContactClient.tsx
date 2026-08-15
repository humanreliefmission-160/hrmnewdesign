"use client";

import { useState } from "react";
import PageHeader from "../components/PageHeader";
import YellowCTA from "../components/YellowCTA";
import { FaLocationArrow, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoTime } from "react-icons/io5";

export default function ContactClient() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    customSubject: "",
    donationReference: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);

    const finalSubject =
      formData.subject === "Other"
        ? formData.customSubject.trim()
        : formData.subject;

    // Client-side validation
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.subject ||
      (formData.subject === "Other" && !formData.customSubject.trim()) ||
      !formData.message.trim()
    ) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          subject: finalSubject,
          donationReference: formData.donationReference,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || "Failed to send message. Please try again.");
      }

      setContactSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        customSubject: "",
        donationReference: "",
        message: "",
      });

      setTimeout(() => {
        const el = document.getElementById("contactSuccess");
        if (el) {
          window.scrollTo({ top: el.offsetTop - 100, behavior: "smooth" });
        }
      }, 100);
    } catch (err: any) {
      setErrorMessage(err.message || "Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="page-contact" className="block min-h-screen">
      <PageHeader
        title="Get In Touch"
        subtitle={<>Have a question, want to volunteer or need to reach our team? We'd love to hear from you.</>}
        breadcrumb="Contact Us"
        display={true}
      />

      <section className="py-10 sm:py-20 px-4 md:px-8 bg-brand-white">
        <div className="max-w-285 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-8 mt-3 sm:mt-12 items-start">
            <div>
              <div className="bg-brand-white p-8 rounded-sm shadow-card border border-brand-lgrey">
                <div className="font-bold text-[1.1rem] mb-6 text-brand-black">
                  Contact Information
                </div>
                <div className="flex gap-4 mb-6 last:mb-0">
                  <div className="w-10 h-10 bg-purple-faint rounded-full flex items-center justify-center text-xl shrink-0">
                    <FaLocationArrow fill='#650199' className='w-4 h-auto' />
                  </div>
                  <div>
                    <div className="text-[0.75rem] font-bold text-purple uppercase tracking-widest mb-1">Address</div>
                    <div className="text-brand-black font-medium leading-relaxed">
                      160 Harehills Lane, Leeds, LS8 5JP
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 mb-6 last:mb-0">
                  <div className="w-10 h-10 bg-purple-faint rounded-full flex items-center justify-center text-xl shrink-0">
                    <FaPhoneAlt fill='#650199' className='w-4 h-auto' />
                  </div>
                  <div>
                    <div className="text-[0.75rem] font-bold text-purple uppercase tracking-widest mb-1">Phone</div>
                    <div className="text-brand-black font-medium leading-relaxed">
                      <a href="tel:+443000300160" className="hover:underline">+44 (0) 300 0300 160</a>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 mb-6 last:mb-0">
                  <div className="w-10 h-10 bg-purple-faint rounded-full flex items-center justify-center text-xl shrink-0">
                    <MdEmail fill='#650199' className='w-4 h-auto' />
                  </div>
                  <div>
                    <div className="text-[0.75rem] font-bold text-purple uppercase tracking-widest mb-1">Email</div>
                    <div className="text-brand-black font-medium leading-relaxed">
                      <a href="mailto:info@humanreliefmission.com" className="hover:underline">info@humanreliefmission.com</a>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 mb-6 last:mb-0">
                  <div className="w-10 h-10 bg-purple-faint rounded-full flex items-center justify-center text-xl shrink-0">
                    <IoTime fill='#650199' className='w-4 h-auto' />
                  </div>
                  <div>
                    <div className="text-[0.75rem] font-bold text-purple uppercase tracking-widest mb-1">Office Hours</div>
                    <div className="text-brand-black font-medium leading-relaxed">Mon–Sat: 10am – 6pm</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-6 bg-purple rounded-sm text-brand-white">
                <div className="font-bold text-base mb-2 font-body">
                  Want to Volunteer?
                </div>
                <p className="text-sm text-brand-white/80 leading-[1.6] mb-4">
                  Join our global network of volunteers and help us deliver aid
                  to those who need it most.<br /><br />
                  Fill out the form on this page and select <span className="font-semibold">"Volunteer Application"</span> in the subject dropdown.
                  You can also reach out to our team directly via email or phone.
                </p>
              </div>
            </div>

            <div className="bg-brand-white p-8 md:p-10 rounded-sm shadow-card border border-brand-lgrey">
              <div className="font-bold text-[1.4rem] mb-2 font-body text-brand-black">
                Send Us a Message
              </div>
              <p className="text-sm text-brand-grey mb-8">
                We aim to respond within 2&ndash;4 business days.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="firstName" className="block text-sm font-bold text-brand-black">First Name *</label>
                    <input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      disabled={submitting}
                      className="w-full px-4 py-3 border border-brand-lgrey rounded-sm focus:border-purple focus:ring-1 focus:ring-purple outline-none transition-all placeholder:text-brand-grey/50 bg-brand-white disabled:opacity-60"
                      type="text"
                      placeholder="John"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="lastName" className="block text-sm font-bold text-brand-black">Last Name *</label>
                    <input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      disabled={submitting}
                      className="w-full px-4 py-3 border border-brand-lgrey rounded-sm focus:border-purple focus:ring-1 focus:ring-purple outline-none transition-all placeholder:text-brand-grey/50 bg-brand-white disabled:opacity-60"
                      type="text"
                      placeholder="Smith"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 mb-4">
                  <label htmlFor="email" className="block text-sm font-bold text-brand-black">Email Address *</label>
                  <input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={submitting}
                    className="w-full px-4 py-3 border border-brand-lgrey rounded-sm focus:border-purple focus:ring-1 focus:ring-purple outline-none transition-all placeholder:text-brand-grey/50 bg-brand-white disabled:opacity-60"
                    type="email"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="flex flex-col gap-1.5 mb-4">
                  <label htmlFor="phone" className="block text-sm font-bold text-brand-black">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={submitting}
                    className="w-full px-4 py-3 border border-brand-lgrey rounded-sm focus:border-purple focus:ring-1 focus:ring-purple outline-none transition-all placeholder:text-brand-grey/50 bg-brand-white disabled:opacity-60"
                    type="tel"
                    placeholder="+44 7700 000000"
                  />
                </div>

                <div className="flex flex-col gap-1.5 mb-4">
                  <label htmlFor="subject" className="block text-sm font-bold text-brand-black">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    disabled={submitting}
                    className="w-full px-4 py-3 border border-brand-lgrey rounded-sm focus:border-purple focus:ring-1 focus:ring-purple outline-none transition-all bg-brand-white disabled:opacity-60"
                  >
                    <option value="">Select a subject...</option>
                    <option value="General Enquiry">General Enquiry</option>
                    <option value="Donation Query">Donation Query</option>
                    <option value="Volunteer Application">Volunteer Application</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Media & Press">Media &amp; Press</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {formData.subject === "Other" && (
                  <div className="flex flex-col gap-1.5 mb-4">
                    <label htmlFor="customSubject" className="block text-sm font-bold text-brand-black">Your Subject *</label>
                    <input
                      id="customSubject"
                      name="customSubject"
                      value={formData.customSubject}
                      onChange={handleChange}
                      required
                      disabled={submitting}
                      className="w-full px-4 py-3 border border-brand-lgrey rounded-sm focus:border-purple focus:ring-1 focus:ring-purple outline-none transition-all placeholder:text-brand-grey/50 bg-brand-white disabled:opacity-60"
                      type="text"
                      placeholder="Please enter your subject..."
                    />
                  </div>
                )}

                {formData.subject === "Donation Query" && (
                  <div className="flex flex-col gap-1.5 mb-4">
                    <label htmlFor="donationReference" className="block text-sm font-bold text-brand-black">
                      Donation Reference Number <span className="font-normal text-brand-grey text-xs">(Optional)</span>
                    </label>
                    <input
                      id="donationReference"
                      name="donationReference"
                      value={formData.donationReference}
                      onChange={handleChange}
                      disabled={submitting}
                      className="w-full px-4 py-3 border border-brand-lgrey rounded-sm focus:border-purple focus:ring-1 focus:ring-purple outline-none transition-all placeholder:text-brand-grey/50 bg-brand-white disabled:opacity-60"
                      type="text"
                      placeholder="e.g. DON-2026-1234"
                    />
                  </div>
                )}

                <div className="flex flex-col gap-1.5 mb-6">
                  <label htmlFor="message" className="block text-sm font-bold text-brand-black">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={submitting}
                    className="w-full px-4 py-3 border border-brand-lgrey rounded-sm focus:border-purple focus:ring-1 focus:ring-purple outline-none transition-all placeholder:text-brand-grey/50 min-h-30 bg-brand-white disabled:opacity-60"
                    placeholder="How can we help you?"
                  />
                </div>

                {errorMessage && (
                  <div className="mb-6 p-4 bg-[#B60000]/25 border border-[#B60000] text-[#B60000] rounded-sm text-sm font-medium">
                    {errorMessage}
                  </div>
                )}

                <YellowCTA
                  text={submitting ? "Sending Message..." : "Send Message →"}
                  onClick={() => handleSubmit()}
                  disabled={submitting}
                  className="w-full justify-center py-3"
                />
              </form>

              <div
                className={`mt-6 p-4 bg-purple-faint border border-purple text-purple rounded-sm text-sm font-medium ${contactSuccess ? "block" : "hidden"}`}
                id="contactSuccess"
              >
                Your message has been received. We will get back to you within 2-4 working days.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
