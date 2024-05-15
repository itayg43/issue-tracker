import { Button } from "@radix-ui/themes";
import Link from "next/link";

const IssuesToolbar = () => {
  return (
    <>
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </>
  );
};

export default IssuesToolbar;
