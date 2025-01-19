import { Image, View, Text, StyleSheet } from 'react-native';
import user from '../data/user.json'; // Adjust path if needed

// Mapping the picture to a static require
const imageSources = {
    "profile.png": require('../data/profile.png'), // Adjust the path based on your folder structure
};

function ProfileScreen() {
    const picture = user.profile_data.picture;

    return (
        <View style={styles.container}>
            <Image
                source={imageSources[picture]} // Dynamically using the mapped image
                style={styles.profileImage}
            />
            <Text style={styles.greetingText}>Hello, {user.profile_data.first}! 👋</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black', // Background color for the screen
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60, // Makes the image round
        borderWidth: 2,
        borderColor: 'white', // Border to make it stand out on a black background
        marginBottom: 20,
    },
    greetingText: {
        fontSize: 24,
        color: 'white', // Text color for visibility on black
        fontWeight: 'bold',
        marginBottom: 10,
    },
    pinsText: {
        fontSize: 18,
        color: 'lightgray', // Slightly softer color for secondary text
    },
});

export default ProfileScreen;
