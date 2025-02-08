import { Image, View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Button } from 'react-native';
import { useEffect, useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchPosts } from '../helpers/firebasePostHelper'; // Firebase helper
import { readUserData } from '../helpers/userDataHelperPosts';
import {clearUserPosts} from "../helpers/firebasePostHelper";// User data helper
import {getData, getProfilePicture} from "../helpers/firebaseProfileData";
import { getAuth } from "firebase/auth";
import { auth } from "../util/FirebaseConfig";
import ProfileScreenPosts from "../components/ProfileComponents/ProfileScreenPosts";

// ProfileScreen Component
// ProfileScreen Component
function ProfileScreen({ navigation }) {
    const [userData, setUserData] = useState(null);
    const [userId, setUserId] = useState(null);  // State for storing userId
    const [postData, setPostData] = useState(null); // State for storing posts data
    // Fetch userId from AsyncStorage
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

    // Initialize data and fetch userId on component mount
    useEffect(() => {
        getUserIdFromStorage(); // Retrieve userId from AsyncStorage
        const fetchData = async () => {
            const data = await getData();
            setUserData(data);

        };
        fetchData();
    }, []);

    // Fetch posts from Firestore when userId is available
    useEffect(() => {
        if (userId) {
            fetchPosts(userId).then(fetchedPosts => {
                setPostData(fetchedPosts); // Update postData state
            });
        }
    }, [userId]);

    // Handle user sign-out
    const handleSignOut = async () => {
        try {
            navigation.navigate("Auth");
            await auth.signOut(); // Firebase sign-out method
            await AsyncStorage.removeItem('userId'); // Remove userId from AsyncStorage
            console.log("User signed out.");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    // Clear user posts
    const clearPosts = async () => {
        await clearUserPosts(userId); // Clear posts in local storage
    };

    // Profile picture and greeting text
    const imageSources = {
        "profile.png": require('../data/profile.png'),
    };

    // Make sure userData is not null before destructuring
    const { firstName, lastName, profilePhotoUrl, username } = userData || {};
    console.log(profilePhotoUrl, "DADDY")

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
            <TouchableOpacity
                onPress={handleSignOut}
                style={styles.signOutButton}
            >
                <MaterialIcons name={"logout"} size={30} color="red"></MaterialIcons>
            </TouchableOpacity>

            {/* Profile picture */}

            {profilePhotoUrl && <Image
                source={{uri:profilePhotoUrl}}
                style={styles.profileImage}
            />
            }
            {/* User greeting and pins */}
            <Text style={styles.greetingText}>Hello {firstName} 👋</Text>
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
    signOutButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        padding: 10,
    },
});

export default ProfileScreen;
