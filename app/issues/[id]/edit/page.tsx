import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";

const IssueForm = dynamic(() => import("../../_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

type Props = {
  params: {
    id: string;
  };
};

const EditIssuePage = async ({ params }: Props) => {
  if (isNaN(parseInt(params.id))) notFound();

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
