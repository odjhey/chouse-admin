/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * ListMetadataBase
 * auto generated base class for the model ListMetadataModel.
 */
export const ListMetadataModelBase = ModelBase
  .named('ListMetadata')
  .props({
    __typename: types.optional(types.literal("ListMetadata"), "ListMetadata"),
    count: types.union(types.undefined, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class ListMetadataModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
}
export function selectFromListMetadata() {
  return new ListMetadataModelSelector()
}

export const listMetadataModelPrimitives = selectFromListMetadata().count
