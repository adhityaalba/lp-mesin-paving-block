import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUR } from "@/components/ui/icons";

type Tone = "red" | "light" | "ghost" | "wa";

/** Rounded pill button with a rotating arrow disc (like the reference's "Book Demo"). */
export function Pill({
  href,
  children,
  tone = "red",
  size,
  icon,
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: Tone;
  size?: "sm";
  icon?: ReactNode | false;
  className?: string;
}) {
  const cls = `pill ${tone} ${size ?? ""} ${icon === false ? "plain" : ""} ${className}`;
  const body = (
    <>
      <span>{children}</span>
      {icon !== false && <span className="ico">{icon ?? <ArrowUR />}</span>}
    </>
  );
  if (href.startsWith("#")) return <a href={href} className={cls}>{body}</a>;
  if (href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
    const ext = href.startsWith("http");
    return (
      <a href={href} className={cls} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {body}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {body}
    </Link>
  );
}
