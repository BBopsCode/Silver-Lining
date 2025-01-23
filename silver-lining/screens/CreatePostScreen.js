import React, { useState } from "react";
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text,
    Alert,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Image
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import PhotoPreview from "../components/PhotoPreview";
import TakePhoto from "../components/TakePhoto";
import * as FileSystem from "expo-file-system"

const userDir = FileSystem.documentDirectory + 'user';
const imageDir = FileSystem.documentDirectory + 'images';
const userFilePath = `${userDir}/user.json`;


const dirNames = [userDir, imageDir];

const userJSON = async () =>{
    const JSONData = await FileSystem.readAsStringAsync(userFilePath)
    return JSON.parse(JSONData)
}
const ensureDirsExist = async (dirNames) => {
    for (const dir of dirNames) {
        const dirInfo = await FileSystem.getInfoAsync(dir);
        if (!dirInfo.exists) {
            console.log(`Directory ${dir} does not exist, creating ...`);
            await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
        } else {
            console.log(`${dir} exists`);
        }
    }
};

export default function CreatePostScreen({ navigation }) {
    const [description, setDescription] = useState("");
    const [cameraOn, setCameraOn] = useState(false)
    const [photo, setPhoto] = useState(null)

    const handleTakePhoto = () => {
        setCameraOn(true)
    };

    const handleSubmitPost = async () => {
        if (description.trim() === "") {
            Alert.alert("Missing Description", "Please write about your miracle before submitting.");
            return;
        }
        // Logic for submitting the post goes herest
        ensureDirsExist(dirNames)
        Alert.alert("Post Submitted", "Your post has been successfully created!");
        savePhotoLocally()
        await updateUserPosts()

    };
    const updateUserPosts = async () =>{
        const data = await userJSON()
        console.log(data)
    }
    const savePhotoLocally = async () =>{
        console.log("Running")
        const photoFileName = photo.uri.split('/').pop()
        const newUri = `${imageDir}/${photoFileName}`

        try {
            await FileSystem.moveAsync({
                from: photo.uri,
                to: newUri,
            });

            console.log(`Photo Saved at ${newUri}`);
        } catch (error) {
            console.error("Error saving photo:", error);
        }

    }
    const handlePhoto = (photo) =>{
        setCameraOn(false)
        setPhoto(photo)
    }

    if (cameraOn) return <TakePhoto handleCloseCamera={handlePhoto}/>

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
                    {photo && photo.uri && <Image source={{uri: photo.uri}}
                                                  style={styles.postPhoto}
                                                  resizeMode="cover"></Image>}
                    <TouchableOpacity style={photo ? styles.photoButtonAfter : styles.photoButtonBefore} onPress={handleTakePhoto}>
                        <MaterialIcons name="photo-camera" size={photo ? 30 : 60} color="white" />
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
                    <TouchableOpacity style={styles.submitButton} onPress={()=>handleSubmitPost()}>
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
    photoButtonBefore: {
        width: 80,
        height: 80,
        backgroundColor: "#444",
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    photoButtonAfter:{
        width: 50,
        height: 50,
        backgroundColor: "#444",
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    postPhoto:{
        width: '50%',
        height: '30%',
        borderRadius: 15,
        marginBottom: 25,
        borderColor: "#C0c0c0",
        borderWidth: 3
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
