"use client";

import ScrollReveal from './ScrollReveal';

const QuoteSection = () => {
  return (
    <section className="py-20 text-center">
      <ScrollReveal>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif italic text-gray-700">
            "My exile in Dapitan was not a punishment, but a preparation."
          </h2>
          <p className="mt-4 text-lg text-gray-500">- José Rizal (paraphrased)</p>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default QuoteSection;
