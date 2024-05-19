import Pagination from "./issues/list/Pagination";

const Home = () => {
  return <Pagination itemCount={100} pageSize={10} currentPage={1} />;
};

export default Home;
