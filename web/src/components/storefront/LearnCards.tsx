import React from "react";
import Link from "next/link";
import { LEARN_ARTICLES } from "@/data/storefront";
import { ArrowRight, BookOpen } from "lucide-react";

export function LearnCards() {
  return (
    <section className="py-16 sm:py-24 max-w-[1240px] mx-auto px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <div className="inline-block text-xs font-mono uppercase tracking-widest text-[var(--muted-ink)] mb-2">
            Apiculture Knowledge
          </div>
          <h2 className="headline-display text-3xl sm:text-4xl text-[var(--ink)]">
            Learn about honest honey.
          </h2>
        </div>
        <Link
          href="/our-story#faq"
          className="text-xs font-mono font-medium text-[var(--ink)] underline hover:text-[var(--signature)]"
        >
          View all educational guides →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {LEARN_ARTICLES.map((article, idx) => (
          <div
            key={article.id}
            className="rounded-3xl p-6 sm:p-7 bg-[var(--sand)] border border-[var(--line)] flex flex-col justify-between hover:shadow-xs transition-shadow"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--text-subtle)]">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[var(--forest)]" />
                  <span>Guide 0{idx + 1}</span>
                </span>
                <span>{article.readTime}</span>
              </div>

              <h3 className="font-serif text-lg sm:text-xl font-bold text-[var(--ink)] leading-snug">
                {article.title}
              </h3>

              <p className="text-xs sm:text-sm text-[var(--muted-ink)] leading-relaxed">
                {article.snippet}
              </p>
            </div>

            <div className="pt-6 mt-4 border-t border-[var(--line)]">
              <Link
                href={`/our-story${article.anchor}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-sans font-medium bg-[var(--signature)] text-[var(--ink)] hover:brightness-95 transition-all"
              >
                <span>Read guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
