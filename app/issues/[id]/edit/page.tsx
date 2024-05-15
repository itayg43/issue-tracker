import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueForm from "../../_components/IssueForm";

type Props = {
  params: {
    id: string;
  };
};

const EditIssuePage = async ({ params }: Props) => {
  const issue = await getIssueById(params.id);

  if (issue === null) notFound();

  return <IssueForm issue={issue} />;
};

export default EditIssuePage;

const getIssueById = async (id: string) => {
  return await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });
};
