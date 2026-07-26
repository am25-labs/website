"use client";

import { useMemo, useState } from "react";
import type { TiptapDoc } from "@plank-cms/react-renderer";
import ContentRenderer from "@/components/ContentRenderer";
import { Button } from "@/components/ui/button";

interface WorkDescriptionProps {
  content: string | TiptapDoc;
}

const paragraphLimit = 2;

function isDoc(value: unknown): value is TiptapDoc {
  return (
    typeof value === "object" &&
    value !== null &&
    "type" in value &&
    value.type === "doc" &&
    "content" in value &&
    Array.isArray(value.content)
  );
}

function getDoc(content: WorkDescriptionProps["content"]) {
  if (isDoc(content)) {
    return content;
  }

  try {
    const parsed = JSON.parse(content);
    return isDoc(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function trimDoc(doc: TiptapDoc) {
  const total = doc.content.filter((node) => node.type === "paragraph").length;

  if (total <= paragraphLimit) {
    return { content: doc, hasMore: false };
  }

  let paragraphs = 0;
  const content: TiptapDoc["content"] = [];

  for (const node of doc.content) {
    if (paragraphs >= paragraphLimit) {
      break;
    }

    content.push(node);

    if (node.type === "paragraph") {
      paragraphs += 1;
    }
  }

  return { content: { ...doc, content }, hasMore: true };
}

export default function WorkDescription({ content }: WorkDescriptionProps) {
  const [expanded, setExpanded] = useState(false);
  const doc = useMemo(() => getDoc(content), [content]);

  if (!doc) {
    return <ContentRenderer content={content} />;
  }

  const trimmed = trimDoc(doc);
  const visibleContent = expanded ? doc : trimmed.content;

  return (
    <div className="flex flex-col items-start gap-4">
      <ContentRenderer content={visibleContent} />
      {trimmed.hasMore && (
        <Button
          type="button"
          variant="link"
          className="h-auto p-0 uppercase"
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? "View less" : "View more"}
        </Button>
      )}
    </div>
  );
}
