import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

import Hero from "@/components/Hero";
import Section from "@/components/Section";
import ReferenceItem from "@/components/ReferenceItem";
import ScrollReveal from "@/components/ScrollReveal";
import RizalDapitanExperience from "@/components/dapitan-exhibit/RizalDapitanExperience";
import ConclusionVerdictSection from "@/components/conclusion-rating/ConclusionVerdictSection";

import { references } from "@/data/references";

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
        <Section id="introduction" title="Introduction">
          <ScrollReveal direction="up" threshold={0.18}>
            <div
              className="prose lg:prose-xl max-w-none"
              dangerouslySetInnerHTML={{ __html: introduction }}
            />
          </ScrollReveal>
        </Section>

        <div className="section-divider">
          <Section id="summary" title="Film Summary">
            <ScrollReveal direction="up" threshold={0.18}>
              <div
                className="prose lg:prose-xl max-w-none"
                dangerouslySetInnerHTML={{ __html: summary }}
              />
            </ScrollReveal>
          </Section>
        </div>
        <div className="section-divider">
          <Section
            id="analysis"
            title="Historical Accuracy and Creative Liberties"
          >
            <ScrollReveal direction="up" threshold={0.18}>
              <div
                className="prose lg:prose-xl max-w-none"
                dangerouslySetInnerHTML={{ __html: analysis }}
              />
            </ScrollReveal>
          </Section>
        </div>

        <div className="section-divider">
          <RizalDapitanExperience />
        </div>

        <div className="section-divider">
          <Section
            id="class-discussion"
            title="Connection to Class Discussion"
          >
            <ScrollReveal direction="up" threshold={0.18}>
              <div
                className="prose lg:prose-xl max-w-none"
                dangerouslySetInnerHTML={{ __html: classDiscussion }}
              />
            </ScrollReveal>
          </Section>
        </div>

        <div className="section-divider">
          <Section id="reflection" title="Reflection">
            <ScrollReveal direction="up" threshold={0.18}>
              <div
                className="prose lg:prose-xl max-w-none"
                dangerouslySetInnerHTML={{ __html: reflection }}
              />
            </ScrollReveal>
          </Section>
        </div>

        <div className="section-divider">
          <Section id="conclusion" title="Conclusion">
            <ScrollReveal direction="up" threshold={0.18}>
              <div
                className="prose lg:prose-xl max-w-none"
                dangerouslySetInnerHTML={{ __html: conclusion }}
              />
            </ScrollReveal>
            <ScrollReveal delay={120} direction="up" threshold={0.12}>
              <div className="mt-12 not-prose">
                <ConclusionVerdictSection />
              </div>
            </ScrollReveal>
          </Section>
        </div>

        <div className="section-divider">
          <Section id="references" title="References">
            <ScrollReveal direction="up" threshold={0.18}>
              <ul>
                {references.map((reference, index) => (
                  <ReferenceItem
                    key={getReferenceKey(reference, index)}
                    refItem={reference}
                  />
                ))}
              </ul>
            </ScrollReveal>
          </Section>
        </div>
      </div>
    </div>
  );
}
