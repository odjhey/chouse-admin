import React, { useMemo } from "react";
import Table from "./Table";
import { useQuery } from "./../src/models";
import { observer } from "mobx-react";

const TasksList = () => {
  const { store, loading, error } = useQuery((store) =>
    store.queryAllTasks({})
  );
  const columns = useMemo(
    () => [
      {
        Header: "Tasks",
        columns: [
          {
            Header: "Task Id",
            accessor: "id",
          },
          {
            Header: "Story Id",
            accessor: "story_id",
          },
          {
            Header: "Task Description",
            accessor: "description",
          },
          {
            Header: "Complete",
            accessor: "complete",
          },
          {
            Header: "Date Completed",
            accessor: "completed_at",
          },
        ],
      },
    ],
    []
  );

  if (store.vTasks().length > 0) {
    return <Table columns={columns} data={store.vTasks()}></Table>;
  }

  if (loading) {
    return <h1>Loading.</h1>;
  }
  if (error) {
    return <h1>Error fetching data, please try again in a few mins.</h1>;
  }
  return <h1>So much empty.</h1>;
};

export default observer(TasksList);
