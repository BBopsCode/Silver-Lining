import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";

const userFilePath = FileSystem.documentDirectory + 'user/user.json';

export const readUserData = async () => {
    const JSONData = await FileSystem.readAsStringAsync(userFilePath);
    return JSON.parse(JSONData);
};

export const clearUserPosts = async (data) => {
    data.posts = [];
    await FileSystem.writeAsStringAsync(userFilePath, JSON.stringify(data, null, 2));
    console.log("Posts cleared.");
};

export const getUserIdFromStorage = async () => {
    try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId !== null) {
            return storedUserId;
        }
    } catch (error) {
        console.error('Error retrieving userId from AsyncStorage:', error);
    }
};