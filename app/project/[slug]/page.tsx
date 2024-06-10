import { ProjectCarouselItem } from "@/components/project-carousel-item";
import { Carousel } from "@/components/ui/carousel";
import { projects } from "@/data/projects";
import type { Metadata } from "next";
import { micromark } from "micromark";
import { gfm, gfmHtml } from "micromark-extension-gfm";
import { notFound } from "next/navigation";
import { existsSync, readFileSync } from "fs";
import { Badge } from "@/components/ui/badge";

export const generateStaticParams = () => {
  return projects.map(({ slug }) => ({
    slug,
  }));
};

export const generateMetadata = ({
  params,
}: {
  params: { slug: string };
}): Metadata => {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};

  return {
    title: `James' Projects: ${project.title}`,
    authors: { name: "Jamese E", url: "https://jamese.dev" },
    description: project.description,
  };
};

type Props = {
  params: { slug: string };
};

export default function Project({ params: { slug } }: Props) {
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const path = `./data/posts/${project.slug}.md`;
  if (!existsSync(path)) notFound();

  const markdown = readFileSync(path).toString();

  return (
    <article>
      <div
        dangerouslySetInnerHTML={{
          __html: markdown
            ? micromark(markdown, {
                extensions: [gfm()],
                htmlExtensions: [gfmHtml()],
                allowDangerousHtml: true,
              })
            : "",
        }}
      />
      <hr />
      <span className="inline-flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-nowrap">
            {tag}
          </Badge>
        ))}
      </span>
    </article>
  );
}
