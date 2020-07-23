/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * TaskBase
 * auto generated base class for the model TaskModel.
 */
export const TaskModelBase = ModelBase
  .named('Task')
  .props({
    __typename: types.optional(types.literal("Task"), "Task"),
    description: types.union(types.undefined, types.null, types.string),
    story_id: types.union(types.undefined, types.null, types.string),
    completed_at: types.union(types.undefined, types.null, types.string),
    updated_at: types.union(types.undefined, types.null, types.string),
    owners: types.union(types.undefined, types.null, types.string),
    id: types.union(types.undefined, types.null, types.string),
    complete: types.union(types.undefined, types.null, types.string),
    created_at: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class TaskModelSelector extends QueryBuilder {
  get description() { return this.__attr(`description`) }
  get story_id() { return this.__attr(`story_id`) }
  get completed_at() { return this.__attr(`completed_at`) }
  get updated_at() { return this.__attr(`updated_at`) }
  get owners() { return this.__attr(`owners`) }
  get id() { return this.__attr(`id`) }
  get complete() { return this.__attr(`complete`) }
  get created_at() { return this.__attr(`created_at`) }
}
export function selectFromTask() {
  return new TaskModelSelector()
}

export const taskModelPrimitives = selectFromTask().description.story_id.completed_at.updated_at.owners.complete.created_at
