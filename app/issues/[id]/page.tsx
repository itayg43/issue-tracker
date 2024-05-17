import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import AssigneeSelect from "./AssigneeSelect";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

type Props = {
  params: {
    id: string;
  };
};

const IssueDetailsPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  if (isNaN(parseInt(params.id))) notFound();

  const issue = await getIssueById(parseInt(params.id));

  if (issue === null) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>

      {session && (
        <Flex direction="column" gap="4">
          <AssigneeSelect issue={issue} />

          <EditIssueButton issueId={issue.id} />

          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      )}
    </Grid>
  );
};

export default IssueDetailsPage;

const getIssueById = async (id: number) => {
  return await prisma.issue.findUnique({
    where: {
      id,
    },
  });
};
