import prisma from "@/prisma/client";
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
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>{issue.status}</p>
      <p>{issue.createdAt.toDateString()}</p>
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
