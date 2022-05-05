import * as React from 'react';
import { useCallback, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { HomePageScreen, NoteViewScreen } from '../screens/Home';
import { HomeParamList } from '../types';
import Colors from '../constants/Colors';
import { AddNoteScreen, EditNotescreen } from '../screens/Note';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Stack = createStackNavigator<HomeParamList>();
export default function HomeNavigator() {
  //Recipe Note sec Notes
    return (
        //homepage sec
        <Stack.Navigator
            initialRouteName='HomePage'
            screenOptions={({ navigation }) => ({
                title: 'Notes', headerShown: false, headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: Colors.bg
                }, headerTintColor: Colors.txt,
                headerLeft: () => (
                    <TouchableOpacity
                        style={{ marginLeft: 5
                        }}
                        onPress={() => {navigation.toggleDrawer();}}
                    >
                    </TouchableOpacity>
                ),
            })}
        >
            <Stack.Screen name="HomePage" component={HomePageScreen} />
            <Stack.Screen
            //Viewing Recipe note
                options={({ navigation }) => ({ title: 'View Note', headerRight: () => (
                        <TouchableOpacity
                            style={{marginRight: 5}}
                            onPress={() => {
                                navigation.navigate("Home", {screen: "HomePage"
                                });
                            }}
                        >
                            <Ionicons name='chevron-back' size={32} color='#FAFAFF'
                            />
                        </TouchableOpacity>
                    ),
                })}
                name="NoteView" component={NoteViewScreen}
            />
            <Stack.Screen
                 //Adding a Note
                options={({ navigation }) => ({
                    title: 'Add Note',
                    headerRight: () => (
                        <TouchableOpacity
                            style={{marginRight: 5}}
                            onPress={() => {
                            navigation.navigate("Home", {screen: "HomePage"});}}
                        >
                            <Ionicons name='chevron-back' size={32} color='#FAFAFF'
                            />
                        </TouchableOpacity>
                    ),
                })}
                name="AddNote" component={AddNoteScreen}
            />
            <Stack.Screen
                 //Editing a Note
                options={({ navigation }) => ({
                    title: 'Edit Note',
                    headerRight: () => (
                        <TouchableOpacity
                            style={{marginRight: 5}}
                            onPress={() => {
                                navigation.navigate("Home", {screen: "HomePage"});
                            }}
                        >
                            <Ionicons name='chevron-back' size={32} color='#FAFAFF'
                            />
                        </TouchableOpacity>
                    ),
                })}
                name="EditNote" component={EditNotescreen}
            />
        </Stack.Navigator>
    );
}