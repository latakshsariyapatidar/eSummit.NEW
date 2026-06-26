import { useState } from "react";
import { SectionHeader } from "../ui/SectionHeader";
import { useFAQs } from "@/lib/store";

export function FAQSection() {
  const [activeFaq, setActiveFaq] = useState(null);
  const faqs = useFAQs();

  return (
    <section className="py-28 md:py-36">
      <div className="mx-auto max-w-400 px-6 lg:px-12 grid lg:grid-cols-[1fr_2fr] gap-16">
        <SectionHeader
          tag="/ 04 — Pit Stop"
          title={
            <>
              Briefing
              <br />
              questions.
            </>
          }
        />
        <div className="divide-y divide-border/20 border-t border-b border-border/20 text-left">
          {faqs.map((f, i) => {
            const isOpen = activeFaq === i;
            return (
              <div key={i} className="py-6">
                <button
                  onClick={() => setActiveFaq(isOpen ? null : i)}
                  className="flex w-full justify-between items-center cursor-pointer text-left focus:outline-none group"
                >
                  <span className="font-sans text-lg md:text-xl font-medium tracking-tight text-foreground group-hover:text-primary transition-colors duration-300 pr-6">
                    {f.q}
                  </span>
                  <span
                    className={`font-mono text-xl text-primary transition-transform duration-300 select-none transform ${
                      isOpen ? "rotate-45" : "rotate-0"
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 mt-4"
                      : "grid-rows-[0fr] opacity-0 mt-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-base text-muted-foreground/80 leading-relaxed max-w-2xl">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
