import { palette } from "../components/public/theme";
import { CONTACT } from "../components/public/content";

const { text, muted, line } = palette;

const SECTIONS = [
  {
    title: "Acceptance of Terms",
    body: "By accessing or using NexKey Collective, you agree to these Terms of Service. If you don't agree, please don't use the platform.",
  },
  {
    title: "Using the Platform",
    body: "NexKey Collective helps connect investors, wholesalers, and agents with off-market real estate opportunities. You agree to provide accurate information and to use the platform only for lawful purposes.",
  },
  {
    title: "No Investment Advice",
    body: "Deal listings, underwriting figures, and match scores are provided for informational purposes only and do not constitute financial, legal, or investment advice. You are responsible for conducting your own due diligence before entering any transaction.",
  },
  {
    title: "Accounts",
    body: "You're responsible for maintaining the confidentiality of your account credentials and for all activity under your account. Notify us immediately of any unauthorized use.",
  },
  {
    title: "Limitation of Liability",
    body: "NexKey Collective is provided \"as is\" without warranties of any kind. To the fullest extent permitted by law, we are not liable for any indirect, incidental, or consequential damages arising from your use of the platform.",
  },
  {
    title: "Changes to These Terms",
    body: "We may update these terms from time to time. Continued use of the platform after changes take effect constitutes acceptance of the revised terms.",
  },
  {
    title: "Contact Us",
    body: `Questions about these terms? Reach us at ${CONTACT.email} or ${CONTACT.phone}.`,
  },
];

export default function TermsOfServicePage() {
  return (
    <div className="public-site min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <h1
          className="text-[32px] sm:text-[40px] leading-tight mb-2"
          style={{ color: text, fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}
        >
          Terms of Service
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
