import { Image, View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Button } from 'react-native';
import user from '../data/user.json';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as FileSystem from "expo-file-system";
import ProfileScreenPosts from "../components/ProfileComponents/ProfileScreenPosts";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Add AsyncStorage import
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {auth, db} from "../util/FirebaseConfig";
// Directory and file paths
const userDir = FileSystem.documentDirectory + 'user';
const userFilePath = `${userDir}/user.json`;

// ProfileScreen Component
function ProfileScreen({ navigation }) {

    const handleSignOut = async () => {
        try {
            await auth.signOut(); // Firebase sign-out method
            await AsyncStorage.removeItem('userId'); // Remove the userId from AsyncStorage
            console.log("User signed out.");
            navigation.navigate("Auth"); // Navigate to the login screen or another screen
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const [userId, setUserId] = useState(null);  // State for storing userId
    const [postData, setPostData] = useState(null); // State for storing posts data
    const currentUser = auth.currentUser;

    // Function to fetch userId from AsyncStorage
    const getUserIdFromStorage = async () => {
        try {
            const storedUserId = await AsyncStorage.getItem('userId');
            if (storedUserId !== null) {
                setUserId(storedUserId); // Set the userId in state
            }
        } catch (error) {
            console.error('Error retrieving userId from AsyncStorage:', error);
        }
    };

    // Effect to initialize data and fetch userId on component mount
    useEffect(() => {
        getUserIdFromStorage(); // Retrieve userId from AsyncStorage
    }, []);

    // Fetch posts from Firestore
    useEffect(() => {
        if (userId) {
            const postCollectionRef = collection(db, "posts");
            const q = query(postCollectionRef, where("userId", "==", userId));

            getDocs(q)
                .then((querySnapshot) => {
                    if (querySnapshot.empty) {
                        console.log("No posts found for this user.");
                    } else {
                        querySnapshot.forEach((doc) => {
                            console.log(`Post ID: ${doc.id}, Data:`, doc.data());
                        });
                    }
                })
                .catch((error) => {
                    console.error("Error fetching posts:", error);
                });
        }
    }, [userId]);

    // Function to fetch user JSON data
    const userJSON = async () => {
        const JSONData = await FileSystem.readAsStringAsync(userFilePath);
        return JSON.parse(JSONData);
    };

    // Effect to initialize data for posts
    useEffect(() => {
        const initializeData = async () => {
            const data = await userJSON();
            setPostData(data);
        };
        initializeData();
    }, []);

    // Image sources for the profile picture
    const imageSources = {
        "profile.png": require('../data/profile.png'),
    };

    // Function to clear all posts
    const clearPosts = async () => {
        postData.posts = []; // Clear posts in the local state
        await FileSystem.writeAsStringAsync(userFilePath, JSON.stringify(postData, null, 2)); // Save changes to file
        console.log("Posts cleared:", postData);

        await handleSignOut()
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
