import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AudioList from '../screen/AudioList'
import Player from '../screen/Player'
import PlayList from '../screen/PlayList'
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator()

const AppNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name='AudioList'
                component={AudioList}
                options={{ tabBarIcon: ({ color, size }) => (<MaterialIcons name="headset" size={size} color={color} />) }}
            />
            <Tab.Screen
                name='Player'
                component={Player}
                options={{ tabBarIcon: ({ color, size }) => (<FontAwesome5 name="compact-disc" size={size} color={color} />) }}
            />
            <Tab.Screen
                name='PlayList'
                component={PlayList}
                options={{ tabBarIcon: ({ color, size }) => (<MaterialIcons name="library-music" size={size} color={color} />) }}

            />
        </Tab.Navigator>)
}

export default AppNavigator
