import React from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import SmsScreen from "./screens/SmsScreen";
import BoysScreen from "./screens/BoysScreen";
import GirlsScreen from "./screens/GirlsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import { Ionicons } from "@expo/vector-icons";
import PlayersScreen from "./screens/PlayersScreen";
import HelpScreen from "./screens/HelpScreen";
import { globalStyles } from "./styles/globalStyles";
import EditProfileScreen from "./screens/ProfileScreen";
import LoginScreen from "./screens/LoginScreen";
import VideoScreen from "./screens/VideoScreen";
import ProfileComponent from "./components/EditProfileComponent";
import EditProfileComponent from "./components/EditProfileComponent";
import ProfileScreen from "./screens/ProfileScreen";
import PlayerProfileScreen from "./screens/PlayerProfileScreen";
import MyProfileScreen from "./screens/ProfileScreen";
import SchedulePracticeScreen from "./screens/SchedulePracticeScreen";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import RegisterScreen from "./screens/RegisterScreen";

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    // <SafeAreaView
    //   style={{ flex: 1, justifyContent: "space-between", alignItems: "center" }}
    // >
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarInactiveTintColor: "#ffffff",
        tabBarInactiveBackgroundColor: "#41733f",
        tabBarActiveTintColor: "#98ee99",
        tabBarActiveBackgroundColor: "#134717",
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Boys"
        component={BoysScreen}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="man" color={color} />,
          headerStyle: { backgroundColor: "green" },
          headerTitleStyle: { fontWeight: "bold" },
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="Girls"
        component={GirlsScreen}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="woman" color={color} />,
          headerStyle: { backgroundColor: "green" },
          headerTitleStyle: { fontWeight: "bold" },
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerStyle: { backgroundColor: "green" },
          headerTitleStyle: { fontWeight: "bold" },
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="sms"
        component={SmsScreen}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="mail" color={color} />,
          headerStyle: { backgroundColor: "green" },
          headerTitleStyle: { fontWeight: "bold" },
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="settings" color={color} />
          ),
          headerStyle: { backgroundColor: "green" },
          headerTitleStyle: { fontWeight: "bold" },
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
      />
      {/*<Tab.Screen name="sms" component={SmsScreen} />*/}
    </Tab.Navigator>
    // </SafeAreaView>
  );
}

const RootStack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer initialRouteName="Login">
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="Login" component={LoginScreen} />
          <RootStack.Screen name="Register" component={RegisterScreen} />
          <RootStack.Screen name="HomeTabs" component={HomeTabs} />
          <RootStack.Screen name="Videos" component={VideoScreen} />
          <RootStack.Screen name="Players" component={PlayersScreen} />
          <RootStack.Screen name="Help" component={HelpScreen} />
          <RootStack.Screen
            name="EditProfile"
            component={EditProfileComponent}
          />
          <RootStack.Screen name="MyProfile" component={MyProfileScreen} />
          <RootStack.Screen
            name="PlayerProfile"
            component={PlayerProfileScreen}
          />
          <RootStack.Screen
            name="SchedulePractice"
            component={SchedulePracticeScreen}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
// to add icons to tab bar
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"],
  color: string,
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
