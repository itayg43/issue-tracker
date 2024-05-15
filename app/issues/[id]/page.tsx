import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

type Props = {
  params: {
    id: string;
  };
};

const IssueDetailsPage = async ({ params }: Props) => {
  const issue = await getIssueById(params.id);

  if (issue === null) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "2" }} gap="5">
      <Box>
        <IssueDetails issue={issue} />
      </Box>

      <Box>
        <EditIssueButton issueId={issue.id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailsPage;

const getIssueById = async (id: string) => {
  return await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });
};
