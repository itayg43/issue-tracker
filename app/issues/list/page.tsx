import { IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Flex, Table } from "@radix-ui/themes";
import Link from "next/link";
import IssuesToolbar from "./IssuesToolbar";
import { ArrowUpIcon } from "@radix-ui/react-icons";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
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

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const issues = await getIssues(status, orderBy);

  return (
    <>
      <div className="mb-5">
        <IssuesToolbar />
      </div>

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
    </>
  );
};

export default IssuesPage;

const getIssues = async (
  status: Status | undefined,
  orderBy: { [key: string]: string } | undefined
) => {
  return await prisma.issue.findMany({
    where: {
      status,
    },
    orderBy,
  });
};
