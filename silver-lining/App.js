import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import CreatePostScreen from './screens/CreatePostScreen';
import ProfileScreen from './screens/ProfileScreen';
import FeedScreen from './screens/FeedScreen';
import AuthScreen from './screens/AuthScreen';
import * as FileSystem from 'expo-file-system';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from './util/FirebaseConfig'; // Import Firebase auth

const Stack = createStackNavigator();

// Define the directory paths for user data and images
const userDir = FileSystem.documentDirectory + 'user';
const imageDir = FileSystem.documentDirectory + 'images';
const dirNames = [userDir, imageDir]; // Array of directories to ensure their existence
const userFilePath = `${userDir}/user.json`; // Path to the user JSON file

/**
 * Ensures the specified directories exist.
 * If a directory doesn't exist, it is created.
 * @param {string[]} dirNames - Array of directory paths to check
 */
const ensureDirsExist = async (dirNames) => {
    for (const dir of dirNames) {
        try {
            const dirInfo = await FileSystem.getInfoAsync(dir); // Check if the directory exists
            if (!dirInfo.exists) {
                console.log(`Directory ${dir} does not exist, creating ...`);
                await FileSystem.makeDirectoryAsync(dir, { intermediates: true }); // Create the directory if it doesn't exist
            }
            // else {
            //     console.log(`${dir} exists`); // Log if the directory already exists
            // }
        } catch (error) {
            console.error(`Error ensuring directory ${dir} exists:`, error); // Log errors encountered
        }
    }
};

/**
 * Ensures that the user JSON file exists.
 * If it doesn't exist, it creates the file with default data.
 */
const ensureUserFilePath = async () => {
    try {
        const info = await FileSystem.getInfoAsync(userFilePath); // Check if the user JSON file exists
        if (!info.exists) {
            console.log("User Info Does not Exist");
            const defaultData = {
                profile_data: {
                    first: "Bryan", // Default first name
                    last: "Wilson", // Default last name
                    picture: "profile.png", // Default profile picture
                },
                posts: [], // Default empty posts array
            };
            await FileSystem.writeAsStringAsync(userFilePath, JSON.stringify(defaultData, null, 2)); // Write default data to the file
            console.log("User Created");
        } else {
            // console.log("User File Exists");
            const fileContent = await FileSystem.readAsStringAsync(userFilePath); // Read the existing file content
            // console.log(JSON.parse(fileContent)); // Log the parsed content of the user file
        }
    } catch (error) {
        console.error("Error ensuring user file exists:", error);
    }
};

// Main App Component
export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check authentication state on app load
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setIsAuthenticated(true); // User is authenticated
            } else {
                setIsAuthenticated(false); // User is not authenticated
            }
            setIsLoading(false); // Stop loading
        });

        return unsubscribe; // Cleanup subscription
    }, []);

    // Ensure directories and user file exist on app load
    useEffect(() => {
        ensureDirsExist(dirNames); // Ensure the required directories exist
        ensureUserFilePath(); // Ensure the user file exists
    }, []);

    // Show a loading indicator while checking authentication
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
                    <Stack.Screen
                        name="Auth"
                        component={AuthScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="FeedScreen"
                        component={FeedScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="CreatePost"
                        component={CreatePostScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Profile"
                        component={ProfileScreen}
                        options={{ headerShown: false }}
                    />
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