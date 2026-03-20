import type { Metadata } from "next";
import Link from "next/link";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact — codewithishant",
  description:
    "Get in touch with Ishant. Whether you have a question, feedback, or just want to say hi — reach out through the form or connect on social media.",
};

const socials = [
  {
    name: "GitHub",
    icon: "🐙",
    handle: "@codewithishant",
    href: "https://github.com/codewithishant",
  },
  {
    name: "Twitter / X",
    icon: "𝕏",
    handle: "@codewithishant",
    href: "https://x.com/codewithishant",
  },
  {
    name: "Email",
    icon: "✉️",
    handle: "hello@codewithishant.com",
    href: "mailto:hello@codewithishant.com",
  },
  {
    name: "LinkedIn",
    icon: "💼",
    handle: "in/codewithishant",
    href: "https://linkedin.com/in/codewithishant",
  },
];

export default function ContactPage() {
  return (
    <main className={styles.root}>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroEyebrow}>
          <span className={styles.eyebrowDot} />
          <span>get in touch</span>
        </div>
        <h1 className={styles.heroTitle}>
          <span className={styles.titleLine}>Let&apos;s</span>
          <span className={styles.titleLineAccent}>connect.</span>
        </h1>
        <p className={styles.heroSub}>
          Have a question, spotted a bug, or just want to say hi? I&apos;d love
          to hear from you. Drop a message below or find me on the platforms
          listed further down.
        </p>
        <div className={styles.heroDivider} />
      </section>

      {/* ── Contact Form ── */}
      <section className={styles.section}>
        <div className={styles.sectionLabel}>send a message</div>
        <div className={styles.formWrapper}>
          <form
            action="https://formspree.io/f/your-form-id"
            method="POST"
            className={styles.formGrid}
          >
            {/* Name */}
            <div className={styles.formGroup}>
              <label htmlFor="contact-name" className={styles.formLabel}>
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                className={styles.formInput}
              />
            </div>

            {/* Email */}
            <div className={styles.formGroup}>
              <label htmlFor="contact-email" className={styles.formLabel}>
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className={styles.formInput}
              />
            </div>

            {/* Subject */}
            <div className={`${styles.formGroup} ${styles.fieldFull}`}>
              <label htmlFor="contact-subject" className={styles.formLabel}>
                Subject
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                required
                placeholder="What's this about?"
                className={styles.formInput}
              />
            </div>

            {/* Message */}
            <div className={`${styles.formGroup} ${styles.fieldFull}`}>
              <label htmlFor="contact-message" className={styles.formLabel}>
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                placeholder="Write your message here…"
                className={styles.formTextarea}
              />
            </div>

            {/* Submit */}
            <button type="submit" className={styles.submitBtn}>
              Send message →
            </button>
          </form>
        </div>
      </section>

      {/* ── Connect ── */}
      <section className={styles.section}>
        <div className={styles.sectionLabel}>or find me here</div>
        <div className={styles.connectGrid}>
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.connectCard}
            >
              <span className={styles.cardIcon}>{s.icon}</span>
              <span className={styles.cardName}>{s.name}</span>
              <span className={styles.cardHandle}>{s.handle}</span>
              <span className={styles.cardArrow}>→</span>
            </a>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={`${styles.section} ${styles.ctaSection}`}>
        <div className={styles.ctaInner}>
          <span className={styles.ctaTag}>prefer reading?</span>
          <h2 className={styles.ctaHeading}>Explore the content.</h2>
          <div className={styles.ctaLinks}>
            <Link
              href="/blog"
              className={`${styles.ctaBtn} ${styles.ctaBtnPrimary}`}
            >
              Read the blog
            </Link>
            <Link
              href="/notes"
              className={`${styles.ctaBtn} ${styles.ctaBtnSecondary}`}
            >
              Browse notes
            </Link>
            <Link
              href="/about"
              className={`${styles.ctaBtn} ${styles.ctaBtnSecondary}`}
            >
              About me
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}