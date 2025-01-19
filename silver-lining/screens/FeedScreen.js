import React from "react";
import { View, StyleSheet, Image, SafeAreaView, FlatList, TouchableOpacity, Text } from "react-native";
import user from "../data/user.json";
import Post from "../components/Post";
import { posts } from '../data/posts.json';

const profilePicture = require("../data/profile.png");
const logo = require("../assets/Logo.png");

function renderPost(postData) {
    return (
        <Post image={postData.item.image} caption={postData.item.caption}></Post>
    );
}

function FeedScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Image source={logo} style={styles.logo} />
                <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                    <Image source={profilePicture} style={styles.profilePicture} />
                </TouchableOpacity>
            </View>
            <View style={styles.feedContainer}>
                <FlatList
                    style={styles.feedList}
                    data={posts}
                    renderItem={renderPost}>
                </FlatList>
            </View>

            <TouchableOpacity style={styles.prayerButton} onPress={() =>  navigation.navigate("CreatePost")}>
                <Text style={styles.prayerText}>🙏</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#000",  // Set background to black
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: "#000",  // Header background color
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
        justifyContent: 'flex-start',
    },
    prayerButton: {
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: '#89CFF0',
        padding: 15,
        borderRadius: 50,
    },
    prayerText: {
        fontSize: 40,
        color: "white",
    }
});

export default FeedScreen;
