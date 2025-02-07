import React, {useEffect, useState} from 'react';
import {Modal, View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from "expo-image-picker";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../../util/FirebaseConfig";
import {getUserIdFromStorage} from "../../helpers/userDataHelperPosts";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import MaterialIcons

export default function ProfileImagePicker({ onClose }) {

    const closeModal = (image) => {
        onClose(image);
    };

    const pickImage = async () => {
        await ImagePicker.requestMediaLibraryPermissionsAsync()
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const imageUri = result.assets[0].uri;
            closeModal(imageUri)
        }
    };

    const handleTakePhoto = () => {
        const openCamera = async () => {
            // Request camera permission
            const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
            if (permissionResult.granted === false) {
                alert('Permission to access camera is required!');
                return;
            }

            // Launch camera to take a photo
            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,  // If you want to allow image editing (crop, rotate)
                aspect: [1, 1],       // To ensure the photo is square if needed
                quality: 0.5,         // Image quality, 1 is highest, 0 is lowest
            });

            if (!result.canceled){
                closeModal(result.assets[0].uri)
            }

        };
        openCamera()
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={true} // Set visibility of modal to true
            onRequestClose={closeModal}
        >
            <TouchableWithoutFeedback onPress={closeModal}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        {/* Buttons Container */}
                        <View style={styles.buttonsContainer}>
                            {/* Take Photo Button */}
                            <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
                                <Icon name="camera-alt" size={30} color="#fff" />
                                <Text style={styles.buttonText}>Take Photo</Text>
                            </TouchableOpacity>

                            {/* Choose Photo Button */}
                            <TouchableOpacity style={styles.button} onPress={pickImage}>
                                <Icon name="photo-library" size={30} color="#fff" />
                                <Text style={styles.buttonText}>Choose Photo</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: '#C0c0c0',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
        marginBottom: 200
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', // To space out buttons evenly
        width: '100%', // Full width of the modal container
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(12,11,11,0.99)',
        borderRadius: 10,
        width: 120,
        height: 100,
    },
    buttonText: {
        fontSize: 14,
        color: '#fff',
        marginTop: 10,
    },
    closeButton: {
        fontSize: 16,
        color: 'red',
        marginTop: 20,
    },
});
