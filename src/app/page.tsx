import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

import Hero from "@/components/Hero";
import Section from "@/components/Section";
import ReferenceItem from "@/components/ReferenceItem";
import ScrollReveal from "@/components/ScrollReveal";
import ImageReveal from "@/components/ImageReveal";
import QuoteSection from "@/components/QuoteSection";
import RizalDapitanExperience from "@/components/dapitan-exhibit/RizalDapitanExperience";
import ConclusionVerdictSection from "@/components/conclusion-rating/ConclusionVerdictSection";

import { references } from "@/data/references";
import { film } from "@/data/film";

async function getMarkdownContent(fileName: string) {
  const filePath = path.join(process.cwd(), "src", "content", `${fileName}.md`);
  try {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const matterResult = matter(fileContents);
    const contentWithoutTopHeading = matterResult.content.replace(
      /^#\s+.+\n+/,
      "",
    );
    const processedContent = await remark()
      .use(html)
      .process(contentWithoutTopHeading);
    const contentHtml = processedContent.toString();
    return contentHtml;
  } catch (_error) {
    return `<p>Error loading content for ${fileName}. Please create the file src/content/${fileName}.md</p>`;
  }
}

export default async function Page() {
  const introduction = await getMarkdownContent("introduction");
  const summary = await getMarkdownContent("summary");
  const analysis = await getMarkdownContent("analysis");
  const classDiscussion = await getMarkdownContent("class-discussion");
  const reflection = await getMarkdownContent("reflection");
  const conclusion = await getMarkdownContent("conclusion");
  const getReferenceKey = (
    reference: (typeof references)[number],
    index: number,
  ) =>
    reference.url ??
    `${reference.author}-${reference.year}-${reference.title}-${index}`;

  return (
    <div>
      <Hero />
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <Section id="introduction" title="Introduction">
            <div
              className="prose lg:prose-xl max-w-none"
              dangerouslySetInnerHTML={{ __html: introduction }}
            />
          </Section>
        </ScrollReveal>

        <div className="section-divider">
          <ScrollReveal>
            <Section id="summary" title="Film Summary">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div
                  className="prose lg:prose-xl max-w-none"
                  dangerouslySetInnerHTML={{ __html: summary }}
                />
                <ImageReveal
                  src={film.poster}
                  alt={`${film.title} poster`}
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>
            </Section>
          </ScrollReveal>
        </div>

        <QuoteSection />

        <div className="section-divider">
          <ScrollReveal>
            <Section
              id="analysis"
              title="Historical Accuracy and Creative Liberties"
            >
              <div
                className="prose lg:prose-xl max-w-none"
                dangerouslySetInnerHTML={{ __html: analysis }}
              />
            </Section>
          </ScrollReveal>
        </div>

        <div className="section-divider">
          <RizalDapitanExperience />
        </div>

        <div className="section-divider">
          <ScrollReveal>
            <Section
              id="class-discussion"
              title="Connection to Class Discussion"
            >
              <div
                className="prose lg:prose-xl max-w-none"
                dangerouslySetInnerHTML={{ __html: classDiscussion }}
              />
            </Section>
          </ScrollReveal>
        </div>

        <div className="section-divider">
          <ScrollReveal>
            <Section id="reflection" title="Reflection">
              <div
                className="prose lg:prose-xl max-w-none"
                dangerouslySetInnerHTML={{ __html: reflection }}
              />
            </Section>
          </ScrollReveal>
        </div>

        <div className="section-divider">
          <ScrollReveal>
            <Section id="conclusion" title="Conclusion">
              <div
                className="prose lg:prose-xl max-w-none"
                dangerouslySetInnerHTML={{ __html: conclusion }}
              />
              <div className="mt-12 not-prose">
                <ConclusionVerdictSection />
              </div>
            </Section>
          </ScrollReveal>
        </div>

        <div className="section-divider">
          <ScrollReveal>
            <Section id="references" title="References">
              <ul>
                {references.map((reference, index) => (
                  <ReferenceItem
                    key={getReferenceKey(reference, index)}
                    refItem={reference}
                  />
                ))}
              </ul>
            </Section>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
