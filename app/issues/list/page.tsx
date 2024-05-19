import { IssueStatusBadge, Link } from "@/app/components";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import IssuesToolbar from "./IssuesToolbar";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: {
    status: Status;
  };
};

const IssuesPage = async ({ searchParams }: Props) => {
  const validStatuses = Object.values(Status);
  const status = validStatuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const issues = await getIssues(status);

  return (
    <>
      <div className="mb-5">
        <IssuesToolbar />
      </div>

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>

            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>

            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created At
            </Table.ColumnHeaderCell>
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

const getIssues = async (status: Status | undefined) => {
  return await prisma.issue.findMany({
    where: {
      status,
    },
  });
};
