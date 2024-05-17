"use client";

import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/app/components";

const AssigneeSelect = () => {
  const { isLoading, isError, data: users } = useUsers();

  if (isLoading) return <Skeleton height="2rem" />;

  if (isError) return null;

  return (
    <Select.Root>
      {/* @ts-ignore */}
      <Select.Trigger placeholder="Assign..." />

      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>

          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;

const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: async () => await getAllUsers(),
    staleTime: 60 * 1000,
    retry: 3,
  });

const getAllUsers = async () => {
  const { data } = await axios.get<User[]>("/api/users");
  return data;
};
