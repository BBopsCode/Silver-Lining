import {Image, View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Button} from 'react-native';
import user from '../data/user.json';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as FileSystem from "expo-file-system"

const userDir = FileSystem.documentDirectory + 'user';
const imageDir = FileSystem.documentDirectory + 'images';
const userFilePath = `${userDir}/user.json`;

const userJSON = async () =>{
    const JSONData = await FileSystem.readAsStringAsync(userFilePath)
    return JSON.parse(JSONData)
}

const imageSources = {
    "profile.png": require('../data/profile.png'),
};
const clearPosts = async () =>{
    const data = await userJSON()
    data.posts = []
    await FileSystem.writeAsStringAsync(userFilePath, JSON.stringify(data, null, 2))
    console.log(data)
}

function ProfileScreen({navigation}) {
    const picture = user.profile_data.picture;

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={()=> navigation.navigate("FeedScreen")} style={styles.backButton}>
                <MaterialIcons name="arrow-back" size={30} color="white" />
            </TouchableOpacity>
            <Image
                source={imageSources[picture]}
                style={styles.profileImage}
            />
            <Text style={styles.greetingText}>Hello, {user.profile_data.first}! 👋</Text>
            <Text style={styles.pinsText}>📌 Pins</Text>
            <Button title={"Clear Posts"} onPress={clearPosts}></Button>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'black',
    },
    profileImage: {
        marginTop:15,
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: 'white',
        marginBottom: 20,
    },
    greetingText: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    pinsText: {
        fontSize: 18,
        color: 'lightgray',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        padding: 10,
    },
});

export default ProfileScreen;
