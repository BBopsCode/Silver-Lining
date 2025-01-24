import PhotoPreview from "../components/PhotoPreview";
import { AntDesign } from '@expo/vector-icons';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import photoPreview from "../components/PhotoPreview";

//
/**
 * TakePhoto component for capturing photos
 * @param {handleCloseCamera} handleCloseCamera - function to close the camera if photo is kept
 */
export default function TakePhoto({
                                      handleCloseCamera
                                  }) {
    // State variables
    const [facing, setFacing] = useState('back'); // Set initial camera facing to 'back'
    const [permission, requestPermission] = useCameraPermissions(); // Hook for camera permissions
    const [photo, setPhoto] = useState(null); // Store the captured photo
    const [preview, setPreview] = useState(null); // Store whether the preview is visible
    const cameraRef = useRef(null); // Ref to access the camera component

    // If permission is still loading, return an empty view
    if (!permission) {
        return <View />;
    }

    // If permission is not granted, show a message and button to request permission
    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="Grant Permission" />
            </View>
        );
    }

    // Function to toggle between front and back camera
    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    // Function to capture a photo
    const handleTakePhoto = async () => {
        if (cameraRef.current) {
            const options = {
                quality: 1,
                base64: true,
                exif: false,
            };
            const takedPhoto = await cameraRef.current.takePictureAsync(options);

            setPreview(true); // Show the preview after taking the photo
            setPhoto(takedPhoto); // Store the captured photo
        }
    };

    // Function to allow the user to retake the photo
    const handleRetakePhoto = () => {
        setPreview(false); // Hide preview and allow retake
    };

    // Function to hide the preview and close the camera
    const hidePreview = () => {
        setPreview(false); // Hide the preview
        handleCloseCamera(photo); // Close the camera and pass the photo back
    }

    // If a photo is taken and preview is visible, show the PhotoPreview component
    if (photo && preview) return <PhotoPreview photo={photo} handleRetakePhoto={handleRetakePhoto} handlePhotoKept={hidePreview} />

    // Render the camera view when no photo is taken
    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
                <TouchableOpacity onPress={handleCloseCamera} style={styles.backButton}>
                    <MaterialIcons name="arrow-back" size={30} color="white" />
                </TouchableOpacity>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                        <AntDesign name='retweet' size={44} color='black' />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
                        <AntDesign name='camera' size={44} color='black' />
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        padding: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
        marginHorizontal: 10,
        backgroundColor: 'gray',
        borderRadius: 10,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});
