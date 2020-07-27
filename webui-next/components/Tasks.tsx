import React, { useMemo } from "react";
import Table from "./Table";
import { useQuery } from "./../src/models";
import { observer } from "mobx-react";

//const LinkCell = ({ value, column: { getProps }, row }: any) => {
const LinkCell = (props) => {
  const { data, row, value } = props;
  //console.log("data props", data[row.index], row);
  //return getProps().fieldname
  return (
    <a href={data[row.index].app_url} rel="noopener noreferrer" target="_blank">
      {value}
    </a>
  );
};

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
            Cell: LinkCell,
            getProps: () => ({ fieldname: "app_url" }),
          },
          {
            Header: "Task Description",
            accessor: "description",
          },
          {
            Header: "Complete",
            accessor: "complete",
            Filter: ({ column: { filterValue, setFilter, filter } }) => {
              return (
                <input
                  value={filterValue || ""}
                  onChange={(e) => {
                    setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
                  }}
                  placeholder={`Search ${filter ? filter : ""}...`}
                />
              );
            },
          },
          { Header: "Date Completed", accessor: "completed_at" },
          { Header: "Owners", accessor: "owners" },
          {
            Header: "Date updated",
            accessor: "updated_at",
            Filter: ({ column: { filterValue, setFilter, filter } }) => {
              return (
                <input
                  type={"date"}
                  value={filterValue || ""}
                  onChange={(e) => {
                    setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
                  }}
                  placeholder={`Search ${filter ? filter : ""}...`}
                />
              );
            },
          },
        ],
      },
    ],
    []
  );

  if (loading) {
    return <h1>Loading.</h1>;
  }
  if (error) {
    return <h1>Error fetching data, please try again in a few mins.</h1>;
  }

  if (store.vTasks().length > 0) {
    return <Table columns={columns} data={store.vTasks()}></Table>;
  }

  return <h1>So much empty.</h1>;
};

export default observer(TasksList);
