import { Skeleton } from "@/app/components";

const IssueFormSkeleton = () => {
  return (
    <div className="max-w-xl">
      <Skeleton height="2rem" />

      <Skeleton height="20rem" />

      <Skeleton height="2rem" />
    </div>
  );
};

export default IssueFormSkeleton;
