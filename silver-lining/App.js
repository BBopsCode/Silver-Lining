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
const userDir = FileSystem.documentDirectory + 'user';
const imageDir = FileSystem.documentDirectory + 'images';

const dirNames = [userDir, imageDir];

const ensureDirsExist = async (dirNames) => {
    for (const dir of dirNames) {
        try {
            const dirInfo = await FileSystem.getInfoAsync(dir);
            if (!dirInfo.exists) {
                console.log(`Directory ${dir} does not exist, creating ...`);
                await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
            } else {
                console.log(`${dir} exists`);
            }
        } catch (error) {
            console.error(`Error ensuring directory ${dir} exists:`, error);
        }
    }
};

const userFilePath = `${userDir}/user.json`;
const ensureUserFilePath = async () =>{
    const info = await FileSystem.getInfoAsync(userFilePath)
    if (!info.exists){
        console.log("User Info Does not Exist")
        const defaultData =
        {
        "profile_data": {
            "first": "Bryan",
            "last": "Wilson",
            "picture": "profile.png",
        },
        "posts":[]
        }
        await FileSystem.writeAsStringAsync(userFilePath, JSON.stringify(defaultData, null, 2))
        console.log("User Created")
    }else{
        console.log("User File Exists")
        const fileeContent = await FileSystem.readAsStringAsync(userFilePath)
        console.log(JSON.parse(fileeContent))
    }
}
export default function App() {
    useEffect(() => {
        ensureDirsExist(dirNames);
        ensureUserFilePath()
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
                                                    outputRange: [-layouts.screen.width, 0],
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
