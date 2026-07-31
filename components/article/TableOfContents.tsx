"use client";

import { useEffect, useState } from "react";
import { Block, HeadingBlock } from "@/types/block";

interface TableOfContentsProps {
  blocks: Block[];
}

import { useLanguage } from "@/components/LanguageProvider";
import { getTranslation } from "@/lib/i18n";

export function TableOfContents({ blocks }: TableOfContentsProps) {
  const { language } = useLanguage();
  const t = getTranslation(language);

  const headings = blocks.filter(
    (b): b is HeadingBlock => b.type === "heading" && (b.level === 2 || !b.level)
  );

  const [activeId, setActiveId] = useState<string>(headings[0]?.id || "");

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -40% 0px",
        threshold: 0.2,
      }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
      setActiveId(id);
    }
  };

  return (
    <aside className="toc-sidebar">
      <div className="toc-title">{t.tableOfContents}</div>
      <nav className="toc-list">
        {headings.map((heading, index) => {
          const isActive = heading.id === activeId;
          return (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className={`toc-item ${isActive ? "active" : ""}`}
            >
              <span className="toc-number">{index + 1}.</span>
              <span className="toc-label">{heading.content}</span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
