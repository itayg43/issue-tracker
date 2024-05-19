import prisma from "@/prisma/client";
import IssuesSummary from "./IssuesSummary";
import IssuesChart from "./IssuesChart";

const Home = async () => {
  const [open, inProgress, closed] = await Promise.all([
    prisma.issue.count({ where: { status: "OPEN" } }),
    prisma.issue.count({ where: { status: "IN_PROGRESS" } }),
    prisma.issue.count({ where: { status: "CLOSED" } }),
  ]);

  return <IssuesChart open={open} inProgress={inProgress} closed={closed} />;
};

export default Home;
