import Layout from "../components/Layout";
import TaskList from "./../pages/tasks/TaskList";

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <TaskList></TaskList>
  </Layout>
);

export default IndexPage;
