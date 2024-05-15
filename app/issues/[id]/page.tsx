import { IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";

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
        <Heading>{issue.title}</Heading>

        <Flex gap="3" my="2">
          <IssueStatusBadge status={issue.status} />

          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>

        <Card>
          <ReactMarkdown className="prose">{issue.description}</ReactMarkdown>
        </Card>
      </Box>

      <Box>
        <Link href={`/issues/${issue.id}/edit`}>
          <Button>
            <Pencil2Icon />
            Edit Issue
          </Button>
        </Link>
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
