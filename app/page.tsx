import prisma from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import IssuesChart from "./IssuesChart";
import IssuesSummary from "./IssuesSummary";
import LatestIssues from "./LatestIssues";

const Home = async () => {
  const [open, inProgress, closed] = await Promise.all([
    prisma.issue.count({ where: { status: "OPEN" } }),
    prisma.issue.count({ where: { status: "IN_PROGRESS" } }),
    prisma.issue.count({ where: { status: "CLOSED" } }),
  ]);

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssuesSummary open={open} inProgress={inProgress} closed={closed} />

        <IssuesChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>

      <LatestIssues />
    </Grid>
  );
};

export default Home;
