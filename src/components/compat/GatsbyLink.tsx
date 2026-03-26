import NextLink from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  to: string;
  children?: ReactNode;
};

export default function GatsbyLink({ to, children, ...rest }: Props) {
  if (
    to.startsWith("http://") ||
    to.startsWith("https://") ||
    to.startsWith("mailto:") ||
    to.startsWith("tel:")
  ) {
    return (
      <a href={to} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <NextLink href={to} {...rest}>
      {children}
    </NextLink>
  );
}
