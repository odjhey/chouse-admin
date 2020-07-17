import React, { Component } from "react";
import { Admin, Resource, ListGuesser } from "react-admin";
import { Filter, TextInput, List, EmailField, DateField } from "react-admin";
import { Datagrid, TextField, Pagination } from "react-admin";

import buildGraphQLProvider from "ra-data-graphql-simple";

const TaskPagination = (props) => (
  <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />
);

const TaskList = (props) => (
  <List pagination={<TaskPagination />} filters={<TaskFilter />} {...props}>
    <Datagrid>
      <TextField source="description" />
      <TextField source="story_id" />
      <DateField source="updated_at" />
      <TextField source="id" />
      <TextField source="complete" />
      <DateField source="created_at" />
      <DateField source="completed_at" />
    </Datagrid>
  </List>
);

class App extends Component {
  constructor() {
    super({});
    this.state = { dataProvider: null };
  }
  componentDidMount() {
    buildGraphQLProvider({
      clientOptions: { uri: "http://localhost:4000" },
    }).then((dataProvider) => this.setState({ dataProvider }));
  }

  render() {
    //@ts-ignore
    const { dataProvider } = this.state;

    if (!dataProvider) {
      return <div>Loading</div>;
    }

    return (
      <Admin dataProvider={dataProvider}>
        <Resource name="Task" list={TaskList} />
      </Admin>
    );
  }
}

export default App;

const TaskFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
  </Filter>
);
