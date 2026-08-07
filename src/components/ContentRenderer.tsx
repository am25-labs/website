import { PlankRenderer } from "@plank-cms/react-renderer";
import type { NodeComponents, TiptapDoc } from "@plank-cms/react-renderer";
import { ArrowUpRightIcon } from "lucide-react";

const components: NodeComponents = {
  heading: ({ level, children }) => {
    const Tag = `h${level}` as "h1" | "h2" | "h3";
    const className =
      level === 1
        ? "!text-4xl uppercase pt-6"
        : level === 2
          ? "!text-3xl uppercase pt-6"
          : level === 3
            ? "uppercase pt-4"
            : undefined;
    return <Tag className={className}>{children}</Tag>;
  },
  bulletList: ({ children }) => (
    <ul className="marker:text-am-y group-data-[variant=yellow]:marker:text-black group-data-[variant=light]:marker:text-black">
      {children}
    </ul>
  ),
  orderedList: ({ children }) => (
    <ol className="marker:text-am-y group-data-[variant=yellow]:marker:text-black group-data-[variant=light]:marker:text-black">
      {children}
    </ol>
  ),
  link: ({ href, target, rel, children }) => (
    <a
      href={href}
      target={target ?? undefined}
      rel={rel ?? undefined}
      className="inline-flex items-center hover:font-bold"
    >
      {children}
      <ArrowUpRightIcon
        size={20}
        className="text-am-y group-data-[variant=yellow]:text-black group-data-[variant=light]:text-black shrink-0"
      />
    </a>
  ),
};

interface Props {
  content: string | TiptapDoc;
}

export function ContentRenderer({ content }: Props) {
  return <PlankRenderer content={content} components={components} />;
}

export default ContentRenderer;
