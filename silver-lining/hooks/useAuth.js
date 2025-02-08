import { useEffect, useState } from 'react';
import { auth, db } from '../util/FirebaseConfig'; // Import Firebase auth
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";
import { collection, getDocs, query, where } from "firebase/firestore";

/**
 * Custom hook to manage authentication state.
 * It stores and retrieves the user ID from AsyncStorage.
 */
export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);
    const [hasProfileData, setHasProfileData] = useState(false);  // Initialize to false

    const getUserData = async (storedId) => {
        const userRefCollection = collection(db, "users");
        const q = query(userRefCollection, where("userId", "==", storedId));
        try {
            console.log("Fetching user data for userId:", storedId);
            const snapshot = await getDocs(q);
            if (snapshot.empty) {
                console.log("No profile found for the user");
                setHasProfileData(false);  // No profile found for the user
            } else {
                const userDoc = snapshot.docs[0]; // Assuming there's only one document for the user
                const userData = userDoc.data();
                if (Object.values(userData).some(value => value === null || value === '')) {
                    console.log("Some fields in the user profile are empty");
                    setHasProfileData(false);  // Profile fields are incomplete
                } else {
                    console.log("User profile data is complete");
                    setHasProfileData(true);
                }
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            Alert.alert("Error", error.message); // Show error message in alert
            setHasProfileData(false);  // Ensure hasProfileData is set to false in case of error
        } finally {
            setIsLoading(false);  // Ensure loading is set to false after the operation
        }
    };

    useEffect(() => {
        const checkUserAuth = async () => {
            const storedUserId = await AsyncStorage.getItem('userId');
            if (storedUserId) {
                setUserId(storedUserId);
                setIsAuthenticated(true);
                await getUserData(storedUserId);
            } else {
                setIsAuthenticated(false);
                AsyncStorage.removeItem('userId');  // Remove userId if logged out
                setIsLoading(false);  // Ensure loading is set to false if no user is found
            }
        };

        checkUserAuth();

        const unsubscribe = auth.onAuthStateChanged((authenticatedUser) => {
            if (authenticatedUser) {
                setUserId(authenticatedUser.uid);
                AsyncStorage.setItem('userId', authenticatedUser.uid); // Persist userId
                setIsAuthenticated(true);
                getUserData(authenticatedUser.uid);  // Fetch user data on auth state change
            } else {
                setIsAuthenticated(false);
                AsyncStorage.removeItem('userId'); // Remove userId if logged out
                setIsLoading(false);  // Ensure loading is set to false if user logs out
            }
        });

        return unsubscribe;
    }, []);

    console.log("useAuth state:", { isLoading, isAuthenticated, userId, hasProfileData });
    return { isLoading, isAuthenticated, userId, userHasData: hasProfileData };
};