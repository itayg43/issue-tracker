import { IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Flex, Table } from "@radix-ui/themes";
import Link from "next/link";
import IssuesToolbar from "./IssuesToolbar";
import Pagination from "./Pagination";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    page: string;
  };
};

const IssuesPage = async ({ searchParams }: Props) => {
  const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    {
      label: "Issue",
      value: "title",
    },
    {
      label: "Status",
      value: "status",
      className: "hidden md:table-cell",
    },
    {
      label: "Created At",
      value: "createdAt",
      className: "hidden md:table-cell",
    },
  ];

  const validStatuses = Object.values(Status);
  const status = validStatuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = { status };

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const issuesCount = await getIssuesCount(where);
  const issues = await getIssues(where, orderBy, skip, take);

  return (
    <>
      <IssuesToolbar />

      <div className="my-5">
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              {columns.map((column) => (
                <Table.ColumnHeaderCell
                  key={column.value}
                  className={column.className}
                >
                  <Flex align="center" gap="1">
                    <Link
                      href={{
                        query: {
                          ...searchParams,
                          orderBy: column.value,
                        },
                      }}
                    >
                      {column.label}
                    </Link>

                    {column.value === searchParams.orderBy && <ArrowUpIcon />}
                  </Flex>
                </Table.ColumnHeaderCell>
              ))}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {issues.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Link href={`/issues/${issue.id}`}>{issue.title}</Link>

                  <div className="block md:hidden">
                    <IssueStatusBadge status={issue.status} />
                  </div>
                </Table.Cell>

                <Table.Cell className="hidden md:table-cell">
                  <IssueStatusBadge status={issue.status} />
                </Table.Cell>

                <Table.Cell className="hidden md:table-cell">
                  {issue.createdAt.toDateString()}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>

      <Pagination
        itemCount={issuesCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </>
  );
};

export default IssuesPage;

const getIssuesCount = async (where: {}) => {
  return await prisma.issue.count({
    where,
  });
};

const getIssues = async (
  where: {},
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
