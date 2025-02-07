import {Alert} from "react-native";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../util/FirebaseConfig";
import {addDoc, collection} from "firebase/firestore";

export const handleData = async(userId, firstName, lastName, username,profilePhotoUrl) =>{
    const correctFirstName =
}

export const createProfile = async (userId, firstName, lastName, username,profilePhotoUrl) => {
    const userCollectionRef = collection(db, "users");
    try {
        await addDoc(userCollectionRef, {
            userId: userId,
            firstName:firstName,
            lastName:lastName,
            username:username,
            timestamp: new Date().toISOString(),
            profilePhotoUrl: profilePhotoUrl
        })
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
};

export const uploadProfilePicture = async (image, user) =>{
    if (!user || !image) {
        console.log(`User: ${user}, Image: ${image}`); // Add logging to check values
        Alert.alert('No user or image found!');
        return;
    }

    console.log("Attempting to upload image: ", image); // Log the image URI for debugging

    try {
        const response = await fetch(image);
        const blob = await response.blob();

        const storageRef = ref(storage, `images/${user}/profilePhoto/${Date.now()}`);
        await uploadBytes(storageRef, blob);

        const URL = await getDownloadURL(storageRef)
        return URL
    } catch (error) {
        console.error("Error uploading image: ", error);
        Alert.alert('Upload failed!', error.message);
    }
}