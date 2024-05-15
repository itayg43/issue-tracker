import { Link as RadixLink } from "@radix-ui/themes";
import NextLink from "next/link";
import { PropsWithChildren } from "react";

type Props = {
  href: string;
} & PropsWithChildren;

const Link = ({ href, children }: Props) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <RadixLink>{children}</RadixLink>
    </NextLink>
  );
};

export default Link;
