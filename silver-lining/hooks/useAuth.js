import { useEffect, useState } from 'react';
import { auth } from '../util/FirebaseConfig'; // Import Firebase auth
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from "react-native";

/**
 * Custom hook to manage authentication state.
 * It stores and retrieves the user ID from AsyncStorage.
 */
export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const checkUserAuth = async () => {
            const storedUserId = await AsyncStorage.getItem('userId');
            if (storedUserId) {
                setUserId(storedUserId);
                setIsAuthenticated(true);
            }
            else{
                if (storedUserId) {
                    await AsyncStorage.removeItem('userId');
                    Alert.alert("You have been logged out!")
                }
            }
        };

        checkUserAuth();

        const unsubscribe = auth.onAuthStateChanged((authenticatedUser) => {
            if (authenticatedUser) {
                setUserId(authenticatedUser.uid);
                AsyncStorage.setItem('userId', authenticatedUser.uid); // Persist userId
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                AsyncStorage.removeItem('userId'); // Remove userId if logged out
            }
            setIsLoading(false);
        });

        return unsubscribe;
    }, []);

    return { isLoading, isAuthenticated, userId };
};
