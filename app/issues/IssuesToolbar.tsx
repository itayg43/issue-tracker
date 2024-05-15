import { Button } from "@radix-ui/themes";
import Link from "next/link";

const IssuesToolbar = () => {
  return (
    <Link href="/issues/new">
      <Button>New Issue</Button>
    </Link>
  );
};

export default IssuesToolbar;
