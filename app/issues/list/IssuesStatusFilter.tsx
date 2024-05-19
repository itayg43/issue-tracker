"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const statuses: {
  label: string;
  value?: Status;
}[] = [
  {
    label: "All",
  },
  {
    label: "Open",
    value: "OPEN",
  },
  {
    label: "In Progress",
    value: "IN_PROGRESS",
  },
  {
    label: "Closed",
    value: "CLOSED",
  },
];

const IssuesStatusFilter = () => {
  const router = useRouter();

  const onStatusChange = (status: Status) => {
    const query = status ? `?status=${status}` : "";
    router.push(`/issues/list${query}`);
  };

  return (
    <Select.Root defaultValue="" onValueChange={onStatusChange}>
      {/* @ts-ignore */}
      <Select.Trigger />

      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.label} value={status.value || ""}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssuesStatusFilter;
