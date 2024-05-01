import { StyleSheet, Text, View } from "react-native"
import React, { FC } from "react"
import { Loadout } from "../screens/LoadoutScreen"

interface StatsTableProps {
  loadout: Loadout
  classType?: string | "meta" | "ads" | "longRange" | "versitile"
}

const StatsTable: FC<StatsTableProps> = ({ loadout, classType }) => {
  const optionalStat = (stat: string) => {
    return loadout?.[stat] ? (
      <View>
        <Text style={{
            fontSize: 15, fontWeight: '200', textAlign: "center"
        }}>{stat}</Text>
        <Text style={{
            textAlign: "center", fontSize: 17, fontWeight: '700' , paddingVertical: 10
        }}>{loadout?.[stat]}</Text>
      </View>
    ) : null
  }

  return (
    <View style={styles.container}>
      {optionalStat("barrel")}
      {optionalStat("muzzle")}
      {optionalStat("optic")}
      {optionalStat("underbarrel")}
      {optionalStat("rearGrip")}
      {optionalStat("stock")}
    </View>
  )
}

export default StatsTable

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    marginHorizontal: 20,
    marginVertical: 20
  },
})
