"use client";

import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

type Props = {
  issue: Issue;
};

const AssigneeSelect = ({ issue }: Props) => {
  const { isLoading, isError, data: users } = useUsers();

  const onAssignIssue = async (userId: string) => {
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        assignedUserId: userId || null,
      });
    } catch (error) {
      toast.error("Changes could not be saved.");
    }
  };

  if (isLoading) return <Skeleton height="2rem" />;

  if (isError) return null;

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedUserId || ""}
        onValueChange={onAssignIssue}
      >
        <Select.Trigger />

        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>

            <Select.Item value="">Unassigned</Select.Item>

            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>

      <Toaster />
    </>
  );
};

export default AssigneeSelect;

const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: async () => await getAllUsers(),
    staleTime: 60 * 60 * 1000, // 1 hour
    retry: 3,
  });

const getAllUsers = async () => {
  const { data } = await axios.get<User[]>("/api/users");
  return data;
};
