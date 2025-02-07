import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../util/FirebaseConfig";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AuthScreen() {
    const navigation = useNavigation();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const signUp = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            if (userCredential.user) {
                await AsyncStorage.setItem('userToken', userCredential.user.uid); // Store user token
                navigation.navigate("ProfileCreation");
            }
        } catch (error) {
            alert("Sign up Failed: " + error.message);
        }
    };

    const signIn = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            if (userCredential.user) {
                await AsyncStorage.setItem('userToken', userCredential.user.uid); // Store user token
                navigation.navigate("FeedScreen");
            }
        } catch (error) {
            alert("Sign in Failed: " + error.message);
        }
    };

    const handleAuth = async () => {
        if (!isLogin && password !== confirmPassword) {
            alert("Passwords don't match");
        } else if (!isLogin) {
            await signUp();
        } else {
            await signIn();
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.title}>{isLogin ? 'Log In' : 'Sign Up'}</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor={"#777"}
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor={"#777"}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                {!isLogin && (
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        placeholderTextColor={"#777"}
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                )}
                <TouchableOpacity style={styles.button} onPress={handleAuth}>
                    <Text style={styles.buttonText}>{isLogin ? 'Log In' : 'Sign Up'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                    <Text style={styles.switchText}>
                        {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
                    </Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        color: "white",
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        color: "white"
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    switchText: {
        marginTop: 10,
        color: '#007bff',
    },
});