import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {auth, db} from "../util/FirebaseConfig";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import {addDoc, collection, getDocs, query, where} from "firebase/firestore";
import ProfileImagePicker from "../components/ProfileComponents/ProfileImagePicker";
import {handleData, usernameExists} from '../helpers/firebaseProfileCreationHelper'

export default function ProfileCreationScreen() {
    const [firstName, setFirstName] =useState('')
    const [lastName, setLastName] =useState('')
    const [username, setUsername] =useState('')
    const [profilePictureModal, setProfilePictureModal] = useState(false)
    const [profilePhoto, setProfilePhoto] = useState(null)
    const [isDupeUsername, setIsDupeUsername] = useState(false)
    const [userId, setUserId] = useState(null)

    const navigation = useNavigation();


    const getUserIdFromStorage = async () => {
        try {
            const storedUserId = await AsyncStorage.getItem('userId');
            if (storedUserId !== null) {
                setUserId(storedUserId); // Set the userId in state
            }
        } catch (error) {
            console.error('Error retrieving userId from AsyncStorage:', error);
        }
    };

    useEffect(()=>{
        getUserIdFromStorage()
    }, [])


    const handleProfilePhotoModal = (photo) =>{
        if (!profilePictureModal){
            setProfilePictureModal(true)
        }
        else{
            if (photo){
                setProfilePhoto(photo)
                console.log("Here is photo", photo)
            }
            setProfilePictureModal(false)
        }
    }

    const handleUsernameCheck = async () =>{
        console.log(username)
        const usernameDupeCheck = await usernameExists(username)
        setIsDupeUsername(usernameDupeCheck)
    }
    const sendData = async () =>{
        if (!firstName) {
            Alert.alert("First Name is required");
        } else if (!lastName) {
            Alert.alert("Last Name is required");
        } else if (!username) {
            Alert.alert("Username is required");
        } else if (!profilePhoto) {
            Alert.alert("Profile photo is required");
        } else if (isDupeUsername){
            Alert.alert("Username is taken")
        }else
         {
            // All fields are present, you can proceed with further actions
             await handleData(userId, firstName, lastName, username, profilePhoto)
             navigation.navigate("ProfileScreen")
        }


    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <View style={styles.container}>
                {profilePictureModal && <ProfileImagePicker onClose={handleProfilePhotoModal}></ProfileImagePicker>}

                <Text style={styles.title}>Create Your Profile</Text>
                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    placeholderTextColor={"#777"}
                    value={firstName}
                    onChangeText={setFirstName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    placeholderTextColor={"#777"}
                    value={lastName}
                    onChangeText={setLastName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor={"#777"}
                    value={username}
                    onChangeText={setUsername}
                    onBlur={handleUsernameCheck}
                />
                <TouchableOpacity style={styles.button} onPress={handleProfilePhotoModal}>
                    <Text style={styles.buttonText}>Choose Profile Image</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={sendData}>
                    <Text style={styles.buttonText}>Create Account</Text>
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
        marginBottom:10
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