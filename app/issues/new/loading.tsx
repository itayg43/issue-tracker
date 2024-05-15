import { Skeleton } from "@/app/components";

const LoadingNewIssuePage = () => {
  return (
    <div className="max-w-xl">
      <Skeleton />

      <Skeleton height="20rem" />

      <Skeleton />
    </div>
  );
};

export default LoadingNewIssuePage;
