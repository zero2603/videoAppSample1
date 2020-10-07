import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/Home';
import Call from './src/Call';

const Stack = createStackNavigator();

export default class App extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Call" component={Call} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}
