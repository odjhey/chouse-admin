import { Instance } from "mobx-state-tree"
import { ListMetadataModelBase } from "./ListMetadataModel.base"

/* The TypeScript type of an instance of ListMetadataModel */
export interface ListMetadataModelType extends Instance<typeof ListMetadataModel.Type> {}

/* A graphql query fragment builders for ListMetadataModel */
export { selectFromListMetadata, listMetadataModelPrimitives, ListMetadataModelSelector } from "./ListMetadataModel.base"

/**
 * ListMetadataModel
 */
export const ListMetadataModel = ListMetadataModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
