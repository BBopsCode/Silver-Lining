import React, {useEffect, useState} from "react";
import { View, StyleSheet, Image, SafeAreaView, FlatList, TouchableOpacity, Text } from "react-native";
import user from "../data/user.json";
import Post from "../components/PostComponents/Post";
import { posts } from '../data/posts.json';
import {getUserIdFromStorage} from "../helpers/userDataHelperPosts";
import {fetchAllPosts} from "../helpers/firebasePostHelper";

const profilePicture = require("../data/profile.png");
const logo = require("../assets/Logo.png");

/**
 * Renders a single post item in the FlatList.
 * @param {Object} postData - Contains the data of the post to render.
 * @returns {JSX.Element} A Post component.
 */
function renderPost(postData) {
    return (
        <Post image={postData.item.image} caption={postData.item.caption} />
    );
}

/**
 * Main feed screen of the app.
 * Displays a header, a feed of posts, and a button to create a post.
 * @param  navigation - Navigation object for navigating between screens.
 * @returns The FeedScreen component.
 */
function FeedScreen({ navigation }) {
    const [userId, setUserId] = useState(null)
    const [posts, setPosts] = useState(null)

    useEffect(() => {
        const fetchUserId = async () => {
            const id = await getUserIdFromStorage(); // Retrieve userId from AsyncStorage
            setUserId(id);
        };

        const fetchAllPostsFromFirebase = async () =>{
            await fetchAllPosts()
        }
        fetchUserId();
        fetchAllPostsFromFirebase()
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header with app logo and profile picture */}
            <View style={styles.header}>
                <Image source={logo} style={styles.logo} />
                <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                    <Image source={profilePicture} style={styles.profilePicture} />
                </TouchableOpacity>
            </View>

            {/* Feed container with posts */}
            <View style={styles.feedContainer}>
                {/*<FlatList*/}
                {/*    style={styles.feedList}*/}
                {/*    data={posts}*/}
                {/*    renderItem={renderPost}*/}
                {/*/>*/}
            </View>

            {/* Floating button to navigate to the Create Post screen */}
            <TouchableOpacity
                style={styles.prayerButton}
                onPress={() => navigation.navigate("CreatePost")}
            >
                <Text style={styles.prayerText}>🙏</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#000", // Set background to black
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: "#000", // Header background color
    },
    logo: {
        width: 100,
        height: 50,
        resizeMode: "contain",
    },
    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    feedList: {
        paddingHorizontal: 5,
        paddingVertical: 10,
    },
    feedContainer: {
        flex: 1,
        justifyContent: "flex-start",
    },
    prayerButton: {
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: "#89CFF0",
        padding: 15,
        borderRadius: 50,
    },
    prayerText: {
        fontSize: 40,
        color: "white",
    },
});

export default FeedScreen;
