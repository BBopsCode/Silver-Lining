import {Image, Text, StyleSheet, View} from "react-native";

function Post({image, caption}){
    return(
        <View style={styles.postFrame}>
            <Image
                source={{uri: image}}
                style={{width: '100%', height: 300, borderRadius:15}}  // or whatever dimensions you want
                resizeMode="cover"
            ></Image>
            <Text style={{color:'white'}}>{image}</Text>
            <Text style={{color: 'white'}}>{caption}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    postFrame:{
        marginTop:10,
        paddingBottom:15

    }
})
export default Post;