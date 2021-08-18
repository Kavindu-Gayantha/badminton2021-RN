import * as React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {Home} from "../screens/Home";
import {NavigationContainer} from "@react-navigation/native";

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
    return(
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="home" component={Home} />
                <Tab.Screen name="second" component={Home} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
