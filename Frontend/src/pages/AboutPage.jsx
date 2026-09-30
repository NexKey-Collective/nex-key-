import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { ABOUT } from "../components/public/content";
import { SectionHead, Pill } from "../components/public/HomePrimitives";
import { usePublicSite } from "../components/public/PublicSiteContext";
import TestimonialsSection from "../components/TestimonialsSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

const resources = [
  ["Daily Deals", "Nationwide inventory regularly updated."],
  ["Smart Deal Filtering", "So you only see what matters."],
  ["Buy Box Preferences", "Set once, get matches that fit."],
  ["Progress Tracking", "Follow every step from lead to close."],
  ["Connector Network", "Deals travel faster with people aligned."],
  ["TC & Funding Partners", "When you’re ready to close, we’re ready too."],
  ["Educational Guides & FAQs", "Learn creative finance and investing without the overwhelm."],
];
const values = [
  ["Clarity", "We believe in transparency, real expectations, and clean workflows."],
  ["Connection", "We’re built on relationships focused on you, not just transactions."],
  ["Momentum", "We move fast but with focus — always helping others move forward."],
  ["Trust", "We earn it by delivering, communicating, and showing up."],
  ["Innovation", "We blend human insight with modern tools to do what others can’t."],
];
const team = [
  { name: "Kristie DeLouise", role: "Co-Founder / UX Strategist Turned Dispo Expert", initials: "KD", bio: "With a decade designing systems at JPMorgan, Kristie brings clarity, speed, and energy to every deal. She’s known for custom terms, fast communication, and processes that help buyers scale — all with a positive, no-fluff approach.", email: "kristie@nexkeycollective.com", phone: "(917) 608-8224", tel: "+19176088224" },
  { name: "John Matland", role: "Co-Founder / X-Ray Tech Turned Acquisitions Architect", initials: "JM", bio: "John is a dealmaker with national visibility as a former congressional candidate and podcast host. He thrives on creating win-win structures, communicating boldly, and unlocking creative paths to successful real estate deals.", email: "john@nexkeycollective.com", phone: "(718) 702-8366", tel: "+17187028366" },
];
const workflow = [
  { title: "Acquisitions", points: ["Help source deals from various channels: MLS, wholesalers, off-market, and direct-to-seller.", "Provide creative structure templates and calculators.", "Work directly with agents and sellers to lock in deal terms with the support you need."] },
  { title: "Dispositions", points: ["Deals found in one place, formatted the way buyers want to see and search.", "Buyers are offered deals that match their preferences on InvestorLift, social media and our VIP list.", "1-on-1 buyer strategy calls help connect the right deals even quicker.", "Follow-up and communication from buyer to JV partner is seamless and timely."] },
  { title: "Closings", points: ["TC partners specializing in creative finance are looped in automatically once a buyer commits.", "Flexible options to integrate into your workflows — let us know what you need and we’ll come up with a solution.", "Access to funding partners is available."] },
];
const section = "max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16";
const panel = "rounded-[1.75rem] border border-[#ece5db] bg-white p-6 sm:p-8";
const copy = "text-[#625a50] leading-relaxed";

export default function AboutPage() {
  const { onGate } = usePublicSite();
  const heading = useRef(null);
  useEffect(() => {
    const previous = document.title;
    document.title = "About NexKey Collective";
    window.scrollTo(0, 0);
    heading.current?.focus({ preventScroll: true });
    return () => { document.title = previous; };
  }, []);
  return (
    <div className="public-site min-h-screen">
      <main>
        <section className={`${section} text-center`}>
          <Pill>About NexKey Collective</Pill>
          <h1 ref={heading} tabIndex={-1} className="mt-6 max-w-4xl mx-auto text-[clamp(2.3rem,5vw,4rem)] font-semibold leading-[1.1] tracking-tight">We’re here to unlock what’s next in real estate <span className="text-brand">— for you.</span></h1>
          <p className={`mt-6 max-w-2xl mx-auto text-lg ${copy}`}>Behind every investor is a mission. We’re here to help you achieve it.</p>
          <Link to="/deals" className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-white">Find Your NexDeal <ArrowRight size={18} /></Link>
        </section>
        <section className={section}>
          <SectionHead eyebrow="About NexKey" title="Clarity, collaboration and support." sub={ABOUT.body} />
          <div className="mt-8 grid md:grid-cols-2 gap-5">
            <article className={panel}><h3 className="text-xl font-semibold">Our Mission</h3><p className={`mt-4 ${copy}`}>{ABOUT.points[0]}</p></article>
            <article className={`${panel} !bg-[#f6f1ea]`}><h3 className="text-xl font-semibold">Our Vision</h3><p className={`mt-4 ${copy}`}>We believe in a future where deal flow is tailored, communication is seamless, and every investor has a team behind them that gets the job done.</p></article>
          </div>
        </section>
        <section className={section}>
          <SectionHead eyebrow="Our Platform" title="More than deals — a partner in performance." sub="From Buy Box automation to transaction coordination and funding connections, we streamline the investing process." />
          <h3 className="mt-8 text-xl font-semibold">Your Resources</h3>
          <p className={`mt-3 max-w-3xl ${copy}`}>{ABOUT.points[1]}</p>
          <dl className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{resources.map(([title, body]) => <div key={title} className={panel}><dt className="text-lg font-semibold">{title}</dt><dd className={`mt-2 ${copy}`}>{body}</dd></div>)}</dl>
        </section>
        <section className={section}>
          <div className="rounded-[2rem] bg-[#f6f1ea] p-6 sm:p-10">
            <SectionHead eyebrow="Our Values" title="The way we show up for you." />
            <dl className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">{values.map(([title, body]) => <div key={title}><dt className="text-xl font-semibold">{title}</dt><dd className={`mt-2 ${copy}`}>{body}</dd></div>)}</dl>
          </div>
        </section>
        <section className={section}>
          <SectionHead eyebrow="Meet Our Team" title="Investors who understand your mission." sub="Power couple Kristie and John started NexKey to solve the same frustrations they experienced as investors: fragmented communication, unclear deal terms, and wasted time. And yes — time is money." />
          <p className={`mt-4 max-w-3xl ${copy}`}>Now, they are building the tech-forward, collectively powered solution they wish they had. They’re driven by the ability to help others build freedom through investing and pride themselves on being approachable, transparent, and committed to their partners’ success.</p>
          <div className="mt-8 grid md:grid-cols-2 gap-5">{team.map(person => <article key={person.name} className={panel}>
            <span aria-hidden="true" className="w-16 h-16 rounded-full bg-[#ffe4e5] text-brand grid place-items-center text-xl font-semibold">{person.initials}</span>
            <h3 className="mt-5 text-2xl font-semibold">{person.name}</h3><p className={`mt-2 text-sm ${copy}`}>{person.role}</p><p className={`mt-5 ${copy}`}>{person.bio}</p>
            <div className="mt-5 flex flex-col items-start gap-2"><a href={`mailto:${person.email}`} className="inline-flex items-center gap-2 min-h-11 break-all underline underline-offset-4"><Mail size={17} className="shrink-0" />{person.email}</a><a href={`tel:${person.tel}`} className="inline-flex items-center gap-2 min-h-11 underline underline-offset-4"><Phone size={17} />{person.phone}</a></div>
          </article>)}</div>
        </section>
        <section className={section}>
          <SectionHead title="Built on Experience. Backed by Community." sub="We’re proud to serve and collaborate with top-tier investors, communities, and educators." />
          <ul className="mt-6 flex flex-wrap gap-3">{["Directors of Creative Finance", "Members of Subto", "Member of NSOSI", "Member of CamaPlan"].map(name => <li key={name} className="rounded-full border border-[#ece5db] bg-white px-5 py-3">{name}</li>)}</ul>
        </section>
        <section className={section}>
          <SectionHead title="One Workflow. One Trusted Team. Every Time." />
          <div className="mt-8 grid lg:grid-cols-3 gap-5">{workflow.map(item => <article key={item.title} className={`${panel} flex flex-col`}><h3 className="text-xl font-semibold">{item.title}</h3><ul className={`mt-5 mb-6 space-y-4 list-disc pl-5 ${copy}`}>{item.points.map(point => <li key={point}>{point}</li>)}</ul>{item.title === "Dispositions" ? <button onClick={onGate} className="mt-auto self-start py-3 text-brand font-medium underline underline-offset-4">Set Your Buy Box</button> : <Link to="/deals" className="mt-auto self-start py-3 text-brand font-medium underline underline-offset-4">Find Your NexDeal</Link>}</article>)}</div>
        </section>
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
