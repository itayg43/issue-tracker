import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import IssuesTable, { columnNames, IssueQuery } from "./IssuesTable";
import IssuesToolbar from "./IssuesToolbar";
import Pagination from "./Pagination";
import { Flex } from "@radix-ui/themes";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: IssueQuery;
};

const IssuesPage = async ({ searchParams }: Props) => {
  const validStatuses = Object.values(Status);
  const status = validStatuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = { status };

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const issuesCount = await getIssuesCount(where);
  const issues = await getIssues(where, orderBy, skip, take);

  return (
    <Flex direction="column" gap="3">
      <IssuesToolbar />

      <IssuesTable searchParams={searchParams} issues={issues} />

      <Pagination
        itemCount={issuesCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
};

export default IssuesPage;

const getIssuesCount = async (where: object) => {
  return await prisma.issue.count({
    where,
  });
};

const getIssues = async (
  where: object,
  orderBy: { [key: string]: string } | undefined,
  skip: number,
  take: number
) => {
  return await prisma.issue.findMany({
    where,
    orderBy,
    skip,
    take,
  });
};
