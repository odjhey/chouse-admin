import dynamic from "next/dynamic";
import React from "react";

const NoSSRTaskList = dynamic(() => import("./../../components/Tasks"), {
  ssr: false,
});

const TaskList = () => {
  return <NoSSRTaskList></NoSSRTaskList>;
};

export default TaskList;
