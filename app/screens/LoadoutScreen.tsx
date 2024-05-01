import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from "react-native"
import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Icon, Screen } from "../components"
import { fetchDocs } from "../utils/firebase"
import { useStores } from "../models"
import SelectDropdown from "react-native-select-dropdown"
import StatsTable from "../components/StatsTable"

// ADD comments to my interfaces

export interface Loadout {
  barrel?: string
  muzzle?: string
  optic?: string
  underbarrel?: string
  rearGrip?: string
  stock?: string
}

export interface WeaponDataType {
  name?: string
  type?: "AR" | "SMG" | "SECONDARY"
  meta?: Loadout
  ads?: Loadout
  longRange?: Loadout
  versatile?: Loadout
}

export const LoadoutScreen: FC = observer(({}) => {
  const [weaponData, setWeaponData] = useState<WeaponDataType[]>([])
  const [currentWeapon, setCurrentWeopon] = useState<WeaponDataType>({})
  const [loadout, setLoadout] = useState<Loadout>()
  const [tag, setTag] = useState<string | "meta" | "ads" | "longRange" | "versitile">("meta")
  const [loading, setLoading] = useState<boolean>(false)

  const DropDownButton = (selectedItem: any) => {
    return (
      <View style={styles.dropDownButtonStyle}>
        <Text>
          {(selectedItem && selectedItem.name + ` (${selectedItem.type})`) || "Choose your loadout"}
        </Text>
        <Icon icon="more" />
      </View>
    )
  }

  const RenderItem = (item: any, index: number, isSelected: any) => {
    return (
      <View
        style={[
          {
            ...(isSelected && { backgroundColor: "#D2D9DF" }),
          },
          styles.renderItemStyle,
        ]}
      >
        <Text>
          {item.name} {`(${item.type})`}
        </Text>
      </View>
    )
  }

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const docData: WeaponDataType[] = await fetchDocs()
      if (docData) {
        setLoading(false)
        setWeaponData(docData)
        setLoadout(findLoadoutObject(tag, docData[0]))
      } else {
        setLoading(false)
        setWeaponData([])
      }
    }
    fetchData()
  }, [])

  const findLoadoutObject = (loadout: string, selectedItem: WeaponDataType) => {
    if (loadout in selectedItem) {
      return selectedItem[loadout]
    }
    return null
  }

  const setWeaponStats = (selectedItem: WeaponDataType) => {
    setLoadout(findLoadoutObject(tag, selectedItem))
  }

  if(loading) return <ActivityIndicator size={250}/>

  return (
    <SafeAreaView>
      <SelectDropdown
        defaultValue={weaponData[0]}
        data={weaponData}
        onSelect={(selectedItem: WeaponDataType, index: number) => {
          setWeaponStats(selectedItem)
        }}
        renderButton={DropDownButton}
        renderItem={RenderItem}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropDownStyle}
      />

      <StatsTable classType={tag} loadout={loadout} />
    </SafeAreaView>
  )
})

const styles = StyleSheet.create({
  dropDownButtonStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    width: "95%",
    height: 50,
    backgroundColor: "#E9ECEF",
    borderRadius: 12,
    alignSelf: "center",
    alignItems: "center",
  },
  renderItemStyle: {
    paddingVertical: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dropDownStyle: {
    borderRadius: 15,
  },
})
