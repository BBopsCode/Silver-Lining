import {Alert} from "react-native";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {db, storage} from "../util/FirebaseConfig";
import {addDoc, collection, getDocs, query, where, setDoc, doc} from "firebase/firestore";

export const usernameExists = async (username) =>{
    const userRefCollection = collection(db, "users")
    const q = query(userRefCollection, where("username", "==", username))
    try {
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
            throw new Error("Invalid username, this username is already taken");

        } else {
            return false;
        }
    } catch (error) {
        console.error("Error updating user data:", error);
        Alert.alert("Error", error.message); // Slight modification for clarity
        return true
    }

}

export const handleData = async (userId, firstName, lastName, username, profilePhotoUrl) => {
    try {
        // Validate userId (should not be empty)
        if (!userId || typeof userId !== 'string') {
            throw new Error("Invalid user ID.");
        }

        // Function to validate and sanitize names
        const sanitizeName = (name) => {
            if (!name || typeof name !== 'string') return null;

            // Trim, enforce max length (24 chars), and allow only letters
            const trimmedName = name.trim().substring(0, 24);
            if (!/^[a-zA-Z]+$/.test(trimmedName)) {
                throw new Error("Names can only contain letters.");
            }

            // Capitalize first letter, lowercase rest
            return trimmedName.charAt(0).toUpperCase() + trimmedName.slice(1).toLowerCase();
        };

        const correctFirstName = sanitizeName(firstName);
        const correctLastName = sanitizeName(lastName);

        // Validate username (alphanumeric, max 15 chars)
        if (
            !username ||
            typeof username !== 'string' ||
            username.length < 3 ||  // Enforce min 3 chars
            username.length > 15 || // Enforce max 15 chars
            !/^[a-zA-Z0-9_]+$/.test(username) // Enforce allowed characters (alphanumeric + underscore)
        ) {
            Alert.alert("Username must be between 3 and 15 characters and can only contain alphanumeric characters and underscores.");
            return
        }
        await createProfile(userId,correctFirstName,correctLastName,username,profilePhotoUrl)

    } catch (error) {
        console.error("Error updating user data:", error.message);
        Alert.alert(error.message)
        return { success: false, message: error.message };
    }
};

const profieExistsEditing = async (userId) =>{
    const userCollectionRef = collection(db, "users");
    const q = query(userCollectionRef,where("userId", "==", userId))
    try {
        const snapshot = await getDocs(q);
        return !snapshot.empty;
    } catch (error) {
        console.error("Error updating user data:", error);
        Alert.alert("Error", error.message); // Slight modification for clarity
        return true
    }
}

export const createProfile = async (userId, firstName, lastName, username, profilePhotoUrl) => {
    const userExists = await profieExistsEditing(userId); // Check if the user exists

    const userCollectionRef = collection(db, "users");
    const userDocRef = doc(userCollectionRef, userId); // Reference the document using userId
    const downloadUrl = await uploadProfilePicture(profilePhotoUrl,userId)

    try {
        if (!userExists) {
            // If the user doesn't exist, create the profile
            await setDoc(userDocRef, {
                userId: userId,
                firstName: firstName,
                lastName: lastName,
                username: username,
                profilePhotoUrl: downloadUrl,
                timestamp: new Date().toISOString()
            });
            console.log("User created successfully");
        } else {
            console.log("User aready made bruh")
            // If the user exists, update the profile
            await setDoc(userDocRef, {
                firstName: firstName,
                lastName: lastName,
                username: username,
                profilePhotoUrl: downloadUrl,
                timestamp: new Date().toISOString()
            }, { merge: true }); // Merge the new data with the existing data
            console.log("User updated successfully");
        }

    } catch (error) {
        console.error("Error fetching posts:", error);
        return []; // Optionally handle the error (like returning an empty array)
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

        const storageRef = ref(storage, `images/${user}/profilePhoto/ProfilePhoto`);
        await uploadBytes(storageRef, blob);

        const URL = await getDownloadURL(storageRef)
        return URL
    } catch (error) {
        console.error("Error uploading image: ", error);
        Alert.alert('Upload failed!', error.message);
    }
}