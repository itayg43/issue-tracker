import prisma from "@/prisma/client";
import { Box, Grid, Flex } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";

type Props = {
  params: {
    id: string;
  };
};

const IssueDetailsPage = async ({ params }: Props) => {
  if (isNaN(parseInt(params.id))) notFound();

  const issue = await getIssueById(params.id);

  if (issue === null) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>

      <Flex direction="column" gap="4">
        <EditIssueButton issueId={issue.id} />

        <DeleteIssueButton issueId={issue.id} />
      </Flex>
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
