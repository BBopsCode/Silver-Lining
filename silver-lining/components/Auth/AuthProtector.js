import React from "react";
import { View, ActivityIndicator } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { NavigationContainer } from "@react-navigation/native";

const AuthGuard = ({ children, navigation }) => {
    const { user, loading } = useAuth(); // Get user state from context

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (!user) {
        navigation.replace("LoginScreen"); // Redirect to login if not authenticated
        return null;
    }

    return children;
};

export default AuthGuard;
