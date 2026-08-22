import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";

interface ContactLinksProps {
  email: string;
}

export default function ContactLinks({ email }: ContactLinksProps) {
  return (
    <div className="mt-6 flex flex-col space-y-2">
      <Link
        href="https://wa.me/message/ZW5NRUU3HCGUO1"
        target="_blank"
        rel="noopener"
        className="flex w-fit items-center text-lg text-neutral-400 hover:underline group-data-[variant=yellow]:text-black md:text-xl"
      >
        WhatsApp
        <ArrowUpRightIcon size={24} className="shrink-0" />
      </Link>
      <Link
        href={`mailto:${email}`}
        target="_blank"
        rel="noopener"
        className="flex w-fit items-center text-lg text-neutral-400 hover:underline group-data-[variant=yellow]:text-black md:text-xl"
      >
        Email
        <ArrowUpRightIcon size={24} className="shrink-0" />
      </Link>
      <Link
        href="https://www.instagram.com/am25work"
        target="_blank"
        rel="noopener"
        className="mt-8 flex w-fit items-center text-lg text-neutral-400 hover:underline group-data-[variant=yellow]:text-black md:text-xl"
      >
        Instagram
        <ArrowUpRightIcon size={24} className="shrink-0" />
      </Link>
    </div>
  );
}
