import { IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

const IssueDetailsPage = async ({ params }: Props) => {
  const issue = await getIssueById(params.id);

  if (issue === null) notFound();

  return (
    <div>
      <Heading>{issue.title}</Heading>

      <Flex gap="3" my="2">
        <IssueStatusBadge status={issue.status} />

        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>

      <Card>
        <p>{issue.description}</p>
      </Card>
    </div>
  );
};

export default IssueDetailsPage;

const getIssueById = async (id: string) => {
  await delay(1000);
  return await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });
};
