import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import CreatePostScreen from './screens/CreatePostScreen';
import ProfileScreen from './screens/ProfileScreen';
import FeedScreen from './screens/FeedScreen';
import * as FileSystem from 'expo-file-system';
import { useEffect } from 'react';

const Stack = createStackNavigator();

// Define the directory paths for user data and images
const userDir = FileSystem.documentDirectory + 'user';
const imageDir = FileSystem.documentDirectory + 'images';

// Array of directories to ensure their existence
const dirNames = [userDir, imageDir];

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
            } else {
                console.log(`${dir} exists`); // Log if the directory already exists
            }
        } catch (error) {
            console.error(`Error ensuring directory ${dir} exists:`, error); // Log errors encountered
        }
    }
};

// Define the path to the user JSON file
const userFilePath = `${userDir}/user.json`;

/**
 * Ensures that the user JSON file exists.
 * If it doesn't exist, it creates the file with default data.
 */
const ensureUserFilePath = async () => {
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
        console.log("User File Exists");
        const fileContent = await FileSystem.readAsStringAsync(userFilePath); // Read the existing file content
        console.log(JSON.parse(fileContent)); // Log the parsed content of the user file
    }
};

// Main App Component
export default function App() {
    // useEffect runs once on component mount to ensure directories and user file exist
    useEffect(() => {
        ensureDirsExist(dirNames); // Ensure the required directories exist
        ensureUserFilePath(); // Ensure the user file exists
    }, []);

    return (
        <View style={styles.container}>
            <NavigationContainer>
                <Stack.Navigator id="1">
                    <Stack.Screen
                        name="FeedScreen"
                        component={FeedScreen}
                        options={{
                            headerShown: false,
                            cardStyle: { backgroundColor: '#000' },
                            cardStyleInterpolator: ({ current, layouts }) => {
                                return {
                                    cardStyle: {
                                        transform: [
                                            {
                                                translateX: current.progress.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [-layouts.screen.width, 0], // Slide in from the left
                                                }),
                                            },
                                        ],
                                    },
                                };
                            },
                        }}
                    />
                    <Stack.Screen
                        name="CreatePost"
                        component={CreatePostScreen}
                        options={{
                            headerShown: false,
                            cardStyle: { backgroundColor: '#000' },
                        }}
                    />
                    <Stack.Screen
                        name="Profile"
                        component={ProfileScreen}
                        options={{
                            headerShown: false,
                            cardStyle: { backgroundColor: '#000' },
                        }}
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
});
