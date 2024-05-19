import Pagination from "./issues/list/Pagination";

type Props = {
  searchParams: {
    page: string;
  };
};

const Home = ({ searchParams }: Props) => {
  return (
    <Pagination
      itemCount={100}
      pageSize={10}
      currentPage={parseInt(searchParams.page)}
    />
  );
};

export default Home;
