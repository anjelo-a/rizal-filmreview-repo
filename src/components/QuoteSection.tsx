"use client";

import ScrollReveal from "./ScrollReveal";

const QuoteSection = () => {
  return (
    <section className="px-4 py-20 text-center">
      <ScrollReveal>
        <div className="mx-auto max-w-4xl rounded-[32px] border border-[#92aa83]/35 bg-[linear-gradient(135deg,#92aa83_0%,#7c9970_42%,#5f7c59_100%)] px-6 py-12 shadow-[0_24px_70px_rgba(91,118,84,0.22)] md:px-10 md:py-16">
          <p className="text-xs uppercase tracking-[0.38em] text-[#f1f7ee]/78">
            Rizal in Dapitan
          </p>
          <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-serif italic leading-tight text-white md:text-5xl">
            "My exile in Dapitan was not a punishment, but a preparation."
          </h2>
          <p className="mt-5 text-base font-medium tracking-[0.08em] text-[#f1f7ee] md:text-lg">
            - José Rizal (paraphrased)
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default QuoteSection;
