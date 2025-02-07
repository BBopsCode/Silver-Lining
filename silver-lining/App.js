import { StatusBar } from 'expo-status-bar';
import {useEffect} from "react";
import { ActivityIndicator, StyleSheet, View, } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from './hooks/useAuth'; // Import custom hook for auth
import { ensureDirsExist, ensureUserFilePath } from './util/fileSystem'; // Import utility functions
import * as FileSystem from 'expo-file-system'; // Ensure this is imported

import CreatePostScreen from './screens/CreatePostScreen';
import ProfileScreen from './screens/ProfileScreen';
import FeedScreen from './screens/FeedScreen';
import AuthScreen from './screens/AuthScreen';
import ProfileCreationScreen from "./screens/ProfileCreationScreen";

const Stack = createStackNavigator();
const userDir = FileSystem.documentDirectory + 'user';
const userFilePath = `${userDir}/user.json`;
const imageDir = FileSystem.documentDirectory + 'images';

/**
 * Ensures the directories and user file exist on app load.
 */
const initializeApp = async () => {
    await ensureDirsExist([userDir, imageDir]);
    await ensureUserFilePath(userFilePath);
};


export default function App() {
    const { isLoading, isAuthenticated, userId } = useAuth();
    const determineRoute = async () =>{

        const hasPersonalInfo = false
    }
     // Use custom auth hook

    useEffect(() => {
        initializeApp();
    }, []);

    if (isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName={isAuthenticated ? "FeedScreen" : "Auth"}>
                    <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="FeedScreen" component={FeedScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="CreatePost" component={CreatePostScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Profile" options={{ headerShown: false }}>
                        {(props) => <ProfileScreen {...props} userId={userId} />}
                    </Stack.Screen>
                    <Stack.Screen name={"ProfileCreation"} component={ProfileCreationScreen} options={{ headerShown: false }}/>
                </Stack.Navigator>
            </NavigationContainer>
            <StatusBar style="light" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
});
