import { palette } from "../components/public/theme";
import { CONTACT } from "../components/public/content";

const { text, muted, line } = palette;

const SECTIONS = [
  {
    title: "Information We Collect",
    body: "We collect information you provide directly to us, such as your name, email address, phone number, and investment preferences when you create an account, build a Buy Box, or contact us. We also collect usage data — like pages viewed and deals browsed — to improve our matching and recommendations.",
  },
  {
    title: "How We Use Your Information",
    body: "We use your information to operate NexKey Collective: matching you with relevant deals, communicating about your account and inquiries, and improving our platform. We do not sell your personal information to third parties.",
  },
  {
    title: "Sharing Your Information",
    body: "We may share your information with service providers who help us operate the platform (such as hosting and email providers), or when required by law. If you submit a Buy Box, relevant details may be shared with sellers or partners to facilitate a match.",
  },
  {
    title: "Data Security",
    body: "We use reasonable technical and organizational measures to protect your information. No method of transmission or storage is completely secure, so we can't guarantee absolute security.",
  },
  {
    title: "Your Choices",
    body: "You can review, update, or delete your account information at any time by contacting us. You may also opt out of non-essential communications.",
  },
  {
    title: "Contact Us",
    body: `Questions about this policy? Reach us at ${CONTACT.email} or ${CONTACT.phone}.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="public-site min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <h1
          className="text-[32px] sm:text-[40px] leading-tight mb-2"
          style={{ color: text, fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}
        >
          Privacy Policy
        </h1>
        <p className="text-[14px] mb-10" style={{ color: muted }}>
          Last updated: September 22, 2026
        </p>

        <div className="flex flex-col gap-8">
          {SECTIONS.map((section) => (
            <section key={section.title}>
              <h2
                className="text-[18px] font-semibold mb-2"
                style={{ color: text }}
              >
                {section.title}
              </h2>
              <p
                className="text-[15px] leading-relaxed"
                style={{ color: muted, borderColor: line }}
              >
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
