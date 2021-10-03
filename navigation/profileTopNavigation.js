import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import GirlsListComponent from "../screens/GirlsScreen";
import BoysListComponent from "../screens/BoysScreen";

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: "powderblue" },
      }}
    >
      <Tab.Screen
        name="Feed"
        component={GirlsListComponent}
        options={{ tabBarLabel: "Home" }}
      />
      <Tab.Screen
        name="Notifications"
        component={BoysListComponent}
        options={{ tabBarLabel: "Updates" }}
      />
      <Tab.Screen
        name="Profile"
        component={GirlsListComponent}
        options={{ tabBarLabel: "Profile" }}
      />
    </Tab.Navigator>
  );
}
