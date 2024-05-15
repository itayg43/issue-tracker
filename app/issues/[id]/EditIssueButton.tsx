import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

type Props = {
  issueId: number;
};

const EditIssueButton = ({ issueId }: Props) => {
  return (
    <Link href={`/issues/${issueId}/edit`}>
      <Button>
        <Pencil2Icon />
        Edit Issue
      </Button>
    </Link>
  );
};

export default EditIssueButton;
