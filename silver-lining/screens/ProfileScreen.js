import { Image, View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Button } from 'react-native';
import user from '../data/user.json';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as FileSystem from "expo-file-system";
import ProfileScreenPosts from "../components/ProfileScreenPosts";
import { useEffect, useState } from "react";

// Directory and file paths
const userDir = FileSystem.documentDirectory + 'user';
const userFilePath = `${userDir}/user.json`;

// ProfileScreen Component
function ProfileScreen({ navigation }) {
    // State for post data
    const [postData, setPostData] = useState(null);

    // Function to fetch user JSON data
    const userJSON = async () => {
        const JSONData = await FileSystem.readAsStringAsync(userFilePath);
        return JSON.parse(JSONData);
    };

    // Effect to initialize data when the component mounts
    useEffect(() => {
        const initializeData = async () => {
            const data = await userJSON();
            console.log("Data from post", data);
            setPostData(data);
        };
        initializeData();
    }, []);

    // Effect to log post data whenever it changes
    useEffect(() => {
        console.log("Post Data:", postData);
    }, [postData]);

    // Image sources for the profile picture
    const imageSources = {
        "profile.png": require('../data/profile.png'),
    };

    // Function to clear all posts
    const clearPosts = async () => {
        postData.posts = []; // Clear posts in the local state
        await FileSystem.writeAsStringAsync(userFilePath, JSON.stringify(postData, null, 2)); // Save changes to file
        console.log("Posts cleared:", postData);
    };

    // Profile picture path
    const picture = user.profile_data.picture;

    // Component rendering
    return (
        <SafeAreaView style={styles.container}>
            {/* Back button */}
            <TouchableOpacity
                onPress={() => navigation.navigate("FeedScreen")}
                style={styles.backButton}
            >
                <MaterialIcons name="arrow-back" size={30} color="white" />
            </TouchableOpacity>

            {/* Profile picture */}
            <Image
                source={imageSources[picture]}
                style={styles.profileImage}
            />

            {/* User greeting and pins */}
            <Text style={styles.greetingText}>Hello, {user.profile_data.first}! 👋</Text>
            <Text style={styles.pinsText}>📌 Pins</Text>

            {/* Clear posts button */}
            <Button title={"Clear Posts"} onPress={clearPosts} />

            {/* Render posts if postData exists */}
            {postData && <ProfileScreenPosts postData={postData} />}
        </SafeAreaView>
    );
}

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'black',
    },
    profileImage: {
        marginTop: 15,
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: 'white',
        marginBottom: 20,
    },
    greetingText: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    pinsText: {
        fontSize: 18,
        color: 'lightgray',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        padding: 10,
    },
});

export default ProfileScreen;
