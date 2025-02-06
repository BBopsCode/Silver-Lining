import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../util/FirebaseConfig";
import { StyleSheet, Image, FlatList, Alert, TouchableOpacity, SafeAreaView, Text, View } from 'react-native';
import { storage, auth } from "../util/FirebaseConfig"
import { getDownloadURL, ref, uploadBytes, listAll, deleteObject } from 'firebase/storage';

export const fetchPosts = async (userId) => {
    const postCollectionRef = collection(db, "posts");
    const q = query(postCollectionRef, where("userId", "==", userId));

    try {
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            console.log("No posts found for this user.");
            return [];
        } else {
            return querySnapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }));
        }
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
};

export const uploadImage = async (image, user) =>{
    if (!user || !image) {
        console.log(`User: ${user}, Image: ${image}`); // Add logging to check values
        Alert.alert('No user or image found!');
        return;
    }

    console.log("Attempting to upload image: ", image); // Log the image URI for debugging

    try {
        const response = await fetch(image);
        const blob = await response.blob();

        const storageRef = ref(storage, `images/${user}/${Date.now()}`);
        await uploadBytes(storageRef, blob);

    } catch (error) {
        console.error("Error uploading image: ", error);
        Alert.alert('Upload failed!', error.message);
    }
}