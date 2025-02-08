import AsyncStorage from "@react-native-async-storage/async-storage";
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../util/FirebaseConfig";
import {Alert} from "react-native";

export const getData = async () =>{
    const storedId = await AsyncStorage.getItem('userId');
    const userRefCollection = collection(db, "users");
    const q = query(userRefCollection, where("userId", "==", storedId));
    try {
        console.log("Fetching user data for userId:", storedId);
        const snapshot = await getDocs(q);
         // No profile found for the user
            const userDoc = snapshot.docs[0]; // Assuming there's only one document for the user
        const userData = userDoc.data();

        return {
            firstName: userData.firstName,
            lastName: userData.lastName,
            profilePhotoUrl: userData.profilePhotoUrl,
            username: userData.username,
        };

    } catch (error) {
        console.error("Error fetching user data:", error);
        Alert.alert("Error", error.message); // Show error message in alert
    }
};



