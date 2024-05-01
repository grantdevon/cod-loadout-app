import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { LoadoutScreen } from "../screens/LoadoutScreen"

const Tab = createBottomTabNavigator()

export default function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="LoadoutScreen" component={LoadoutScreen} options={{
        headerShown: false
      }}/>
    </Tab.Navigator>
  )
}
