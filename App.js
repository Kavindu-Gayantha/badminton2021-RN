import React from 'react';
import {StyleSheet} from 'react-native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";
import Home from "./screens/Home";
import SmsScreen from "./screens/SmsScreen";
import BoysScreen from "./screens/BoysScreen";
import GirlsScreen from "./screens/GirlsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import {Ionicons} from "@expo/vector-icons";
import PlayersScreen from "./screens/PlayersScreen";

// const FeedStack = createNativeStackNavigator();
// function FeedScreen() {
//     return(
//         <Text>FeedScreen</Text>
//     );
// }

// const FeedStack = createNativeStackNavigator();
// function ProfileScreen() {
//     return(
//         <Text>ProfileScreen</Text>
//     );
// }
//
// function SettingsScreen() {
//     return(
//         <Text>SettingsScreen</Text>
//     );
// }

// function FeedStackScreen() {
//   return (
//     <FeedStack.Navigator>
//       <FeedStack.Screen name="Feed" component={FeedScreen} />
//       {/* other screens */}
//     </FeedStack.Navigator>
//   );
// }

// const ProfileStack = createNativeStackNavigator();
//
// function ProfileStackScreen() {
//   return (
//     <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
//       <ProfileStack.Screen name="Profile" component={ProfileScreen} />
//       {/* other screens */}
//     </ProfileStack.Navigator>
//   );
// }

const Tab = createBottomTabNavigator();


function HomeTabs() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: true }} initialRouteName="Home">
    
            <Tab.Screen name="Boys" component={BoysScreen} options={{
                tabBarIcon: ({color}) => (
                    <TabBarIcon name="man" color={color}/>
                ),
            
            }}/>
            <Tab.Screen name="Girls" component={GirlsScreen} options={{
                tabBarIcon: ({color}) => (
                    <TabBarIcon name="woman" color={color}/>
                ),
            }}/>
            <Tab.Screen name="Home" component={Home} options={{
                tabBarIcon: ({color}) => (
                    <TabBarIcon name="home" color={color}/>
                ),
            }}/>
            <Tab.Screen name="sms" component={SmsScreen} options={{
                tabBarIcon: ({color}) => (
                    <TabBarIcon name="mail" color={color}/>
                ),
            }}/>
            <Tab.Screen name="Settings" component={SettingsScreen} options={{
                tabBarIcon: ({color}) => (
                    <TabBarIcon name="settings" color={color}/>
                ),
            }}/>
            {/*<Tab.Screen name="sms" component={SmsScreen} />*/}
        </Tab.Navigator>
    );
}

const RootStack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <RootStack.Navigator screenOptions={{headerShown: false}}>
                <RootStack.Screen name="HomeTabs" component={HomeTabs} />
                <RootStack.Screen name="Players" component={PlayersScreen}/>
            </RootStack.Navigator>
        </NavigationContainer>
    );
}
// to add icons to tab bar
function TabBarIcon(props: {
    name: React.ComponentProps<typeof Ionicons>["name"];
    color: string;
}) {
    return <Ionicons size={30} style={{marginBottom: -3}} {...props} />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
