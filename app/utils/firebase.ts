import firestore from "@react-native-firebase/firestore"
import { WeaponDataType } from "../screens/LoadoutScreen"

export const fetchDocs = async () => {
  const docData: WeaponDataType[] = []
  try {
    const loadoutData = await firestore().collection("loadouts").get()
    loadoutData.docs.forEach((doc) => {
      docData.push(doc.data())
    })
    return docData
  } catch (error) {
    console.log("catchErrrr ", error)
  }
}
