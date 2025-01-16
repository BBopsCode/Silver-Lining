import {Header} from "@react-navigation/stack";
import {View, StyleSheet, Image} from "react-native";
import user from '../data/user.json';  // Adjust path if needed

const profilePicture = require("../data/profile.png")

function FeedScreen(){
    return(
        <>
          <View className={styles.header}>
            <Image
                style={styles.profilePicture}
                source={profilePicture}
            />

          </View>
        </>
    )
}

const styles = StyleSheet.create({
    header:{

    },
    profilePicture:{
        width: 50,
        height: 50,
        borderRadius:10
    }
})
export default FeedScreen;