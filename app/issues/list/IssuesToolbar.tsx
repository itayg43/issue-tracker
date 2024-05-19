import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssuesStatusFilter from "./IssuesStatusFilter";

const IssuesToolbar = () => {
  return (
    <Flex justify="between">
      <IssuesStatusFilter />

      <Link href="/issues/new">
        <Button>New Issue</Button>
      </Link>
    </Flex>
  );
};

export default IssuesToolbar;
