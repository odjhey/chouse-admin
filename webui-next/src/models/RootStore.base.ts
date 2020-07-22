/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { ObservableMap } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin, QueryOptions, withTypedRefs } from "mst-gql"

import { BookModel, BookModelType } from "./BookModel"
import { bookModelPrimitives, BookModelSelector } from "./BookModel.base"
import { TaskModel, TaskModelType } from "./TaskModel"
import { taskModelPrimitives, TaskModelSelector } from "./TaskModel.base"
import { ListMetadataModel, ListMetadataModelType } from "./ListMetadataModel"
import { listMetadataModelPrimitives, ListMetadataModelSelector } from "./ListMetadataModel.base"


export type TaskFilter = {
  q?: string
  id?: string
  title?: string
  views?: number
  views_lt?: number
  views_lte?: number
  views_gt?: number
  views_gte?: number
  user_id?: string
}
/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  tasks: ObservableMap<string, TaskModelType>
}


/**
* Enums for the names of base graphql actions
*/
export enum RootStoreBaseQueries {
queryTask="queryTask",
queryAllTasks="queryAllTasks",
query_allTasksMeta="query_allTasksMeta"
}


/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = withTypedRefs<Refs>()(MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['Book', () => BookModel], ['Task', () => TaskModel], ['ListMetadata', () => ListMetadataModel]], ['Task'], "js"))
  .props({
    tasks: types.optional(types.map(types.late((): any => TaskModel)), {})
  })
  .actions(self => ({
    queryTask(variables?: {  }, resultSelector: string | ((qb: TaskModelSelector) => TaskModelSelector) = taskModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ Task: TaskModelType}>(`query Task { Task {
        ${typeof resultSelector === "function" ? resultSelector(new TaskModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryAllTasks(variables: { page?: number, perPage?: number, sortField?: string, sortOrder?: string, filter?: TaskFilter }, resultSelector: string | ((qb: TaskModelSelector) => TaskModelSelector) = taskModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ allTasks: TaskModelType[]}>(`query allTasks($page: Int, $perPage: Int, $sortField: String, $sortOrder: String, $filter: TaskFilter) { allTasks(page: $page, perPage: $perPage, sortField: $sortField, sortOrder: $sortOrder, filter: $filter) {
        ${typeof resultSelector === "function" ? resultSelector(new TaskModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    query_allTasksMeta(variables: { page?: number, perPage?: number, sortField?: string, sortOrder?: string, filter?: TaskFilter }, resultSelector: string | ((qb: ListMetadataModelSelector) => ListMetadataModelSelector) = listMetadataModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ _allTasksMeta: ListMetadataModelType}>(`query _allTasksMeta($page: Int, $perPage: Int, $sortField: String, $sortOrder: String, $filter: TaskFilter) { _allTasksMeta(page: $page, perPage: $perPage, sortField: $sortField, sortOrder: $sortOrder, filter: $filter) {
        ${typeof resultSelector === "function" ? resultSelector(new ListMetadataModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
  })))
