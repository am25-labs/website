import { PlankRenderer } from "@plank-cms/react-renderer";
import type { NodeComponents, TiptapDoc } from "@plank-cms/react-renderer";
import { ArrowUpRightIcon } from "lucide-react";
import ScrollReveal from "@/components/scroll-reveal";

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

function shouldReveal(isLast?: boolean, isOnly?: boolean) {
  return isLast !== undefined || isOnly !== undefined;
}

function revealBlock(
  element: React.ReactElement,
  isLast?: boolean,
  isOnly?: boolean,
) {
  if (!shouldReveal(isLast, isOnly)) {
    return element;
  }

  return <ScrollReveal viewportAmount={0.01}>{element}</ScrollReveal>;
}

const revealedComponents: NodeComponents = {
  heading: ({ level, children, isLast, isOnly }) => {
    const Tag = `h${level}` as "h1" | "h2" | "h3";
    const className =
      level === 1
        ? "!text-4xl uppercase pt-6"
        : level === 2
          ? "!text-3xl uppercase pt-6"
          : level === 3
            ? "uppercase pt-4"
            : undefined;

    return revealBlock(
      <Tag className={className}>{children}</Tag>,
      isLast,
      isOnly,
    );
  },
  paragraph: ({ children, isLast, isOnly }) =>
    revealBlock(<p>{children}</p>, isLast, isOnly),
  bulletList: ({ children, isLast, isOnly }) =>
    revealBlock(
      <ul className="marker:text-am-y group-data-[variant=yellow]:marker:text-black group-data-[variant=light]:marker:text-black">
        {children}
      </ul>,
      isLast,
      isOnly,
    ),
  orderedList: ({ start, children, isLast, isOnly }) =>
    revealBlock(
      <ol
        start={start}
        className="marker:text-am-y group-data-[variant=yellow]:marker:text-black group-data-[variant=light]:marker:text-black"
      >
        {children}
      </ol>,
      isLast,
      isOnly,
    ),
  blockquote: ({ children, isLast, isOnly }) =>
    revealBlock(
      <div className="blockquote-wrapper">
        <blockquote>{children}</blockquote>
      </div>,
      isLast,
      isOnly,
    ),
  codeBlock: ({ children, isLast, isOnly }) =>
    revealBlock(
      <pre>
        <code>{children}</code>
      </pre>,
      isLast,
      isOnly,
    ),
  image: ({ src, alt, title, width, height, isLast, isOnly }) =>
    revealBlock(
      title ? (
        <figure>
          <img
            src={src}
            alt={alt ?? ""}
            title={title}
            width={width ?? undefined}
            height={height ?? undefined}
            className="border"
          />
          <figcaption className="text-xs text-neutral-500">{title}</figcaption>
        </figure>
      ) : (
        <img
          src={src}
          alt={alt ?? ""}
          width={width ?? undefined}
          height={height ?? undefined}
          className="border"
        />
      ),
      isLast,
      isOnly,
    ),
  link: components.link,
};

interface Props {
  content: string | TiptapDoc;
  revealBlocks?: boolean;
}

export function ContentRenderer({ content, revealBlocks = false }: Props) {
  if (typeof content === "string" && !content.trim()) {
    return null;
  }

  return (
    <PlankRenderer
      content={content}
      components={revealBlocks ? revealedComponents : components}
    />
  );
}

export default ContentRenderer;
