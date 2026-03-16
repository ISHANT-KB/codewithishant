import type { Metadata } from "next";
import Link from "next/link";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About — codewithishant",
  description:
    "Learn about Ishant, the solo creator behind codewithishant — a growing knowledge base covering programming, CS fundamentals, mathematics, computer architecture, and design.",
};

const topics = [
  { label: "Python",                icon: "🐍" },
  { label: "JavaScript",            icon: "⚡" },
  { label: "C++",                   icon: "🔩" },
  { label: "Data Structures",       icon: "🌲" },
  { label: "Algorithms",            icon: "🔁" },
  { label: "Mathematics",           icon: "∑"  },
  { label: "Computer Architecture", icon: "🖥️" },
  { label: "Design Principles",     icon: "✏️" },
  { label: "Operating Systems",     icon: "⚙️" },
  { label: "Web Development",       icon: "🌐" },
];

const contentTypes = [
  { title: "Tutorials",     desc: "Step-by-step guides from absolute zero to confident understanding. Written to be honest about the hard parts.", glyph: "01" },
  { title: "Notes",         desc: "Condensed study notes that cut the fluff. Think of them as the cheat-sheets I wish I had in class.", glyph: "02" },
  { title: "Blog",          desc: 'Deeper dives, opinion pieces, and "aha moment" write-ups on things I found worth exploring.', glyph: "03" },
  { title: "Code Snippets", desc: "Reusable, copy-paste-ready patterns for common problems. No bloated boilerplate.", glyph: "04" },
  { title: "Projects",      desc: "Full project walkthroughs that show how the small pieces connect into something real.", glyph: "05" },
];

const philosophy = [
  { title: "Depth over breadth",         body: "I'd rather cover one topic really well than skim over ten. Every piece gets proper attention before it goes live." },
  { title: "No paywalls, ever",          body: "Everything here is free. Knowledge compounds best when it circulates freely." },
  { title: "Honest about difficulty",    body: "Some things are genuinely hard. I won't pretend otherwise — I'll just try to make the hard parts clearer." },
  { title: "Always a work in progress",  body: "Posts get updated as I learn more. A living document beats a stale one." },
];

export default function AboutPage() {
  return (
    <main className={styles.root}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroEyebrow}>
          <span className={styles.eyebrowDot} />
          <span>about this space</span>
        </div>
        <h1 className={styles.heroTitle}>
          <span className={styles.titleLine}>A brain dump,</span>
          <span className={styles.titleLineAccent}>thoughtfully arranged.</span>
        </h1>
        <p className={styles.heroSub}>
          Hi — I&apos;m <strong>Ishant</strong>. I built this site because I
          couldn&apos;t find one place that was honest, deep, and actually fun
          to read for all the CS topics I care about. So I made it myself.
        </p>
        <div className={styles.heroDivider} />
      </section>

      {/* Story */}
      <section className={styles.section}>
        <div className={styles.sectionLabel}>the story</div>
        <div className={styles.storyGrid}>
          <div className={styles.storyLargeNum}>∞</div>
          <div className={styles.storyText}>
            <p>
              Every article, note, tutorial, and snippet on this site is written
              entirely by me — one person, no team, no AI-generated filler. That
              means it takes time to grow, but it also means every page exists
              because I genuinely found it worth writing.
            </p>
            <p>
              The site started as a collection of personal study notes and quickly
              turned into something I wanted to share properly. If you&apos;ve ever
              wished a topic was explained the way a friend who just learned it
              would explain it — clear, informal, with the &quot;wait, but why?&quot;
              questions answered — that&apos;s what I&apos;m going for.
            </p>
            <p>
              The site is still under active development. New content drops
              regularly across programming languages, maths, systems, and design.
            </p>
          </div>
        </div>
      </section>

      {/* What you'll find */}
      <section className={styles.section}>
        <div className={styles.sectionLabel}>what you&apos;ll find</div>
        <div className={styles.contentGrid}>
          {contentTypes.map((c) => (
            <div className={styles.contentCard} key={c.glyph}>
              <span className={styles.cardGlyph}>{c.glyph}</span>
              <h3 className={styles.cardTitle}>{c.title}</h3>
              <p className={styles.cardDesc}>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Topics */}
      <section className={styles.section}>
        <div className={styles.sectionLabel}>topics covered</div>
        <p className={styles.topicsNote}>(and more being added — this list keeps growing)</p>
        <div className={styles.topicsWrap}>
          {topics.map((t) => (
            <span className={styles.topicChip} key={t.label}>
              <span className={styles.chipIcon}>{t.icon}</span>
              {t.label}
            </span>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className={styles.section}>
        <div className={styles.sectionLabel}>the philosophy</div>
        <blockquote className={styles.philosophyQuote}>
          &ldquo;If I can&apos;t explain it simply,
          <br />I don&apos;t understand it well enough.&rdquo;
          <cite>— a principle worth living by</cite>
        </blockquote>
        <div className={styles.philosophyGrid}>
          {philosophy.map((item) => (
            <div className={styles.philItem} key={item.title}>
              <span className={styles.philMarker}>→</span>
              <div>
                <h4>{item.title}</h4>
                <p>{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={`${styles.section} ${styles.ctaSection}`}>
        <div className={styles.ctaInner}>
          <span className={styles.ctaTag}>ready?</span>
          <h2 className={styles.ctaHeading}>Start exploring.</h2>
          <div className={styles.ctaLinks}>
            <Link href="/blog"    className={`${styles.ctaBtn} ${styles.ctaBtnPrimary}`}>Read the blog</Link>
            <Link href="/notes"   className={`${styles.ctaBtn} ${styles.ctaBtnSecondary}`}>Browse notes</Link>
            <Link href="/explore" className={`${styles.ctaBtn} ${styles.ctaBtnSecondary}`}>Explore all</Link>
          </div>
        </div>
      </section>
    </main>
  );
}