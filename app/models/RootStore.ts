import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { WeaponsStore } from "./LoadoutModel"
/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
    weapons: types.optional(WeaponsStore, {})
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
