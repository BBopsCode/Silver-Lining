import React, { useState } from "react";
import {View, TextInput, StyleSheet, TouchableOpacity, Text, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import PhotoPreview from "../components/PhotoPreview";
import TakePhoto from "../components/TakePhoto";

export default function CreatePostScreen({ navigation }) {
    const [description, setDescription] = useState("");
    const [cameraOn, setCameraOn] = useState(false)

    const handleTakePhoto = () => {
        setCameraOn(true)
    };

    const handleSubmitPost = () => {
        if (description.trim() === "") {
            Alert.alert("Missing Description", "Please write about your miracle before submitting.");
            return;
        }
        // Logic for submitting the post goes here
        Alert.alert("Post Submitted", "Your post has been successfully created!");
        setDescription(""); // Clear the input box
        navigation.navigate("FeedScreen"); // Navigate back to FeedScreen
    };
    if (cameraOn) return <TakePhoto handleCloseCamera={()=>setCameraOn(false)}/>

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("FeedScreen")}
                        style={styles.backButton}
                    >
                        <MaterialIcons name="arrow-back" size={30} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.photoButton} onPress={handleTakePhoto}>
                        <MaterialIcons name="photo-camera" size={60} color="white" />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Write about your miracle..."
                        placeholderTextColor="gray"
                        multiline
                        value={description}
                        onChangeText={setDescription}
                        keyboardType="default"
                        returnKeyType="done"
                        onSubmitEditing={Keyboard.dismiss}
                    />
                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmitPost}>
                        <Text style={styles.submitText}>Submit Post</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    photoButton: {
        width: 80,
        height: 80,
        backgroundColor: "#444",
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    backButton: {
        position: "absolute",
        top: 50,
        left: 20,
        padding: 10,
    },
    textInput: {
        width: "100%",
        backgroundColor: "#222",
        borderRadius: 10,
        color: "white",
        padding: 15,
        fontSize: 16,
        marginBottom: 20,
        textAlignVertical: "top",
        minHeight: 150,
    },
    submitButton: {
        backgroundColor: "#007AFF",
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
    },
    submitText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
});
