import { BiLinkExternal } from "react-icons/bi";
import { Link } from "./link";
import { buttonVariants } from "./ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { HTMLProps } from "react";
import { cn } from "@/lib/utils";
import { markdownToHtml } from "@/lib/markdown";

export const ProjectCard = async (props: Project) => {
  const href = `/blog/${props.slug}`;
  return (
    <Card className="flex h-fit basis-full flex-row flex-wrap items-center justify-center gap-3 bg-black py-3">
      <div className="flex basis-full flex-col gap-3 md:basis-5/12">
        <CardHeader>
          <CardTitle>
            {props.url ? (
              <Link href={props.url} target="_blank" rel="noopener">
                {props.title} <BiLinkExternal className="inline" />
              </Link>
            ) : (
              props.title
            )}
          </CardTitle>
        </CardHeader>

        {props.imageUrl && (
          <div className="flex w-full justify-center md:hidden">
            <CardImage
              alt={props.title}
              src={props.imageUrl}
              className="max-h-[60vh]"
            />
          </div>
        )}
        <CardFooter className="flex-col gap-6 py-3">
          <article
            className="prose prose-invert text-primary-foreground"
            dangerouslySetInnerHTML={{
              __html: await markdownToHtml(props.description),
            }}
          ></article>

          <div className="flex flex-row flex-wrap gap-3">
            {props.sourceUrl && (
              <Link
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className: "text-base lg:text-lg",
                })}
                href={props.sourceUrl}
              >
                source
              </Link>
            )}
            {props.hasBlog && (
              <Link
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className: "text-base lg:text-lg",
                })}
                href={href}
              >
                blog
              </Link>
            )}
          </div>
        </CardFooter>
      </div>
      {props.imageUrl && (
        <div className="hidden w-full basis-full justify-center md:flex md:basis-1/2">
          <CardImage
            alt={props.title}
            src={props.imageUrl}
            className="w-full max-w-screen-sm rounded"
          />
        </div>
      )}
    </Card>
  );
};

function CardImage({
  defer = true,
  ...props
}: HTMLProps<HTMLImageElement> & { defer?: boolean }) {
  return (
    <img
      {...props}
      className={cn(props.className)}
      loading={defer ? "lazy" : undefined}
    />
  );
}
