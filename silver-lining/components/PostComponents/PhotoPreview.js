import { Fontisto } from '@expo/vector-icons';
import { CameraCapturedPicture } from 'expo-camera';
import React from 'react'
import { TouchableOpacity, SafeAreaView, Image, StyleSheet, View } from 'react-native';

const PhotoPreview = ({
    photo, //Photo that was taken
    handleRetakePhoto, //Function to RetakePhoto
    handlePhotoKept //Function to handle if the photo is Kept

}) => (
    <SafeAreaView style={styles.container}>
        <View style={styles.box}>
            <Image
                style={styles.previewConatiner}
                source={{uri: photo.uri}}
            />
        </View>

        <View style={styles.buttonContainer}>
            {/* Trashcan buttton takes you back to the camera to retake photo*/}
            <TouchableOpacity style={styles.button} onPress={handleRetakePhoto}>
                <Fontisto name='trash' size={36} color='black' />
            </TouchableOpacity>

            {/* Check mark saves the uri of the photo and takes you back to the create post screen
            showing your photo there*/}
           <TouchableOpacity style={[styles.button, { backgroundColor: '#4261C7' }]} onPress={handlePhotoKept}>
                <Fontisto name='check' size={26} color='white' />
            </TouchableOpacity>
        </View>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        borderRadius: 15,
        padding: 1,
        width: '95%',
        backgroundColor: 'darkgray',
        justifyContent: 'center',
        alignItems: "center",
    },
    previewConatiner: {
        width: '95%',
        height: '85%',
        borderRadius: 15
    },
    buttonContainer: {
        marginTop: '4%',
        flexDirection: 'row',
        justifyContent: "space-between",
        width: '100%',
        paddingHorizontal:40
    },
    button: {
        backgroundColor: 'gray',
        borderRadius: 25,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }

});

export default PhotoPreview;