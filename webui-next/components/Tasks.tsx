import React, { useMemo } from "react";
import Table from "./Table";

const TASKS = [
  {
    id: "2857",
    story_id: "2847",
    description:
      "create custom report for clubhouse showing all tasks - July 15, 2020 - DUE July 17, 2020",
    complete: "false",
    completed_at: null,
  },
  {
    id: "2312",
    story_id: "2299",
    description: "getAll",
    complete: "true",
    completed_at: "2020-05-18T07:43:42Z",
  },
  {
    id: "2313",
    story_id: "2299",
    description: "getById",
    complete: "true",
    completed_at: "2020-05-18T09:20:01Z",
  },
  {
    id: "2316",
    story_id: "2299",
    description: "getByStatus",
    complete: "true",
    completed_at: "2020-05-18T09:20:01Z",
  },
  {
    id: "2317",
    story_id: "2299",
    description: "getByType",
    complete: "true",
    completed_at: "2020-05-26T02:17:42Z",
  },
  {
    id: "1779",
    story_id: "1772",
    description: "request signed cert from a CA",
    complete: "true",
    completed_at: "2020-04-14T06:25:07Z",
  },
  {
    id: "1780",
    story_id: "1772",
    description: "configure nginx to use 443 and certs",
    complete: "true",
    completed_at: "2020-04-20T03:42:05Z",
  },
  {
    id: "1783",
    story_id: "1772",
    description: "test https://decodebase.com",
    complete: "true",
    completed_at: "2020-04-20T03:42:06Z",
  },
  {
    id: "2111",
    story_id: "2110",
    description: "backend",
    complete: "true",
    completed_at: "2020-05-08T14:30:27Z",
  },
  {
    id: "2112",
    story_id: "2110",
    description: "frontend",
    complete: "true",
    completed_at: "2020-05-07T07:22:39Z",
  },
];

const TasksList = () => {
  const columns = useMemo(
    () => [
      {
        Header: "Tasks",
        columns: [
          {
            Header: "Id",
            accessor: "id",
          },
          {
            Header: "Story",
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

  if (TASKS.length > 0) {
    return <Table columns={columns} data={TASKS}></Table>;
  }

  return <h1>So much empty.</h1>;
};

export default TasksList;
