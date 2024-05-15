import { Skeleton } from "@/app/components";
import { Card, Flex, Heading } from "@radix-ui/themes";

const LoadingIssueDetailsPage = () => {
  return (
    <div className="max-w-xl">
      <Heading>
        <Skeleton />
      </Heading>

      <Flex gap="3" my="2">
        <Skeleton width="5rem" />

        <Skeleton width="8rem" />
      </Flex>

      <Card>
        <Skeleton count={3} />
      </Card>
    </div>
  );
};

export default LoadingIssueDetailsPage;
