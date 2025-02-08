import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from 'react-native';
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
    const { isLoading, isAuthenticated, userId, userHasData } = useAuth();
    const [initialRoute, setInitialRoute] = useState(null);
    const [isAppReady, setIsAppReady] = useState(false); // Track if app initialization is complete

    useEffect(() => {
        const prepareApp = async () => {
            // Ensure directories and user file are ready
            await initializeApp();

            // Wait until user authentication and profile data are loaded
            if (!isLoading) {
                if (isAuthenticated) {
                    setInitialRoute(userHasData ? 'FeedScreen' : 'ProfileCreation');
                } else {
                    setInitialRoute('Auth');
                }
                setIsAppReady(true); // Mark app as ready
            }
        };

        prepareApp();
    }, [isLoading, isAuthenticated, userHasData]); // Re-run when these values change

    // Show loading indicator until the app is ready
    if (!isAppReady || isLoading || initialRoute === null) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName={initialRoute}>
                    <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="FeedScreen" component={FeedScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="CreatePost" component={CreatePostScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Profile" options={{ headerShown: false }}>
                        {(props) => <ProfileScreen {...props} userId={userId} />}
                    </Stack.Screen>
                    <Stack.Screen name="ProfileCreation" component={ProfileCreationScreen} options={{ headerShown: false }} />
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