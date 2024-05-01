import { flow, Instance, types } from "mobx-state-tree";
import { fetchDocs } from "../utils/firebase";

const Category = types.model("Category").props({
  value: types.maybeNull(types.string || undefined),
});

const WeaponModel = types.model("Weapon").props({
  name: types.string,
  type: types.string,
  categories: types.model("Categories").props({
    barrel: types.optional(Category, {}),
    muzzle: types.optional(Category, {}),
    optic: types.optional(Category, {}),
    rearGrip: types.optional(Category, {}),
    underBarrel: types.optional(Category, {}),
    stock: types.optional(Category, {}),
  }),
});

export const WeaponsStore = types
  .model("WeaponsStore")
  .props({
    weapons: types.array(WeaponModel),
  })
  .actions(self => ({
    setWeapons(weaponsData) {
      self.weapons = weaponsData;
    },
    fetchWeapons: flow(function* () {
      try {
        const fetchedData = yield fetchDocs();
        console.log(fetchedData);
        
        const validData = fetchedData.filter(item => item.name && item.type);
        const weapons = validData.map(item => ({
          name: item.name,
          type: item.type,
          categories: {
            barrel: { value: item.meta?.Barrel || item.meta?.barrel || null },
            muzzle: { value: item.meta?.Muzzle || item.meta?.muzzle || null },
            optic: { value: item.meta?.Optic || item.meta?.optic || null },
            rearGrip: { value: item.meta?.["Rear Grip"] || item.meta?.["rear grip"] || null },
            underBarrel: { value: item.meta?.UnderBarrel || item.meta?.underbarrel || null },
            stock: { value: item.meta?.Stock || item.meta?.stock || null },
          },
        }));
        console.log(weapons);
        
        self.setWeapons(weapons);
      } catch (error) {
        console.error("Failed to fetch weapons:", error);
      }
    }),
  }));

export interface IWeaponsStore extends Instance<typeof WeaponsStore> {}
