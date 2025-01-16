import { Image, View, Text } from "react-native";
import user from '../data/user.json';  // Adjust path if needed

// Mapping the picture to a static require
const imageSources = {
    "profile.png": require('../data/profile.png') // Adjust the path based on your folder structure
};

function ProfileScreen() {
    const picture = user.profile_data.picture;

    return (
        <View>
            <Image
                source={imageSources[picture]} // Dynamically using the mapped image
                style={{ width: 100, height: 100 }}
            />
            <Text>Hello, {user.profile_data.first}! 👋</Text>
            <Text>📌 Pins</Text>

        </View>
    );
}

export default ProfileScreen;
