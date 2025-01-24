import {FlatList, View, Text, Image, StyleSheet} from "react-native";
const renderItem = ({item}) => (
    <View>
       <Image source={{uri: item.imageFileLocation}}
              style={styles.image}

       ></Image>
    </View>
);
export default function ProfileScreenPosts({postData}){
    return(
        <View>
            <FlatList data={postData.posts}
                      renderItem={renderItem}
                      numColumns={3}

            ></FlatList>
        </View>
    )
}
const styles = StyleSheet.create({
    image:{
        width: 115,
        height: 175,
        marginHorizontal: 7,
        marginBottom:7,
        borderColor: "#C0c0c0",
        borderWidth: 3,
        borderRadius: 15,
    }
})