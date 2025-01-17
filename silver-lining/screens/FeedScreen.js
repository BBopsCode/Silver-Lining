import React from "react";
import {View, StyleSheet, Image, SafeAreaView, FlatList} from "react-native";
import user from "../data/user.json";
import Post from "../components/Post"
import {posts} from '../data/posts.json'

const profilePicture = require("../data/profile.png");
const logo = require("../assets/Logo.png");

function renderPost(postData){
    return(
        <Post image={postData.item.image} caption={postData.item.caption}></Post>
    )
}

function FeedScreen() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Image source={logo} style={styles.logo} />

                <Image source={profilePicture} style={styles.profilePicture} />
            </View>
            <View>
                <FlatList
                    style={styles.feedList}
                    data={posts}
                    renderItem={renderPost}>
                </FlatList>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "000"

    },
    header: {
        flexDirection: "row", // Arrange items in a row
        justifyContent: "space-between", // Space between logo and profile picture
        alignItems: "center", // Center items vertically
        paddingHorizontal: 16, // Add horizontal padding for better spacing
        paddingVertical: 10, // Optional: vertical padding for aesthetics
        backgroundColor: "#000", // Optional: header background color
    },
    logo: {
        width: 100, // Adjust the size of your logo as needed
        height: 50,
        resizeMode: "contain", // Ensure the logo maintains its aspect ratio
    },
    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 25, // Makes the image circular
    },
    feedList:{
        paddingHorizontal: 5, // Add horizontal padding for better spacing
        paddingVertical: 10
    }
});

export default FeedScreen;
