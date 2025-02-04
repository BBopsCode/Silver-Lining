import { FlatList, View, Text, Image, StyleSheet } from "react-native";
import post from "../PostComponents/Post";

/**
 * Render function for each item in the FlatList, displaying an image.
 * @param {item} postData.posts[i]
 */
const renderItem = ({ item }) => (
    <View>
        {/* Display image from the provided URI */}
        <Image
            source={{ uri: item.imageFileLocation }} // Set the image source to the item’s imageFileLocation
            style={styles.image} // Apply styles to the image
        />
    </View>
);

/**
 * ProfileScreenPosts component for displaying a list of posts
 * @param {postData} postData - info about the post
 */
export default function ProfileScreenPosts({ postData }) {
    //Needed to display posts on user profile to show correct order
    const sortedPosts = postData.posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return (
        <View>
            {/* FlatList to render posts in multiple columns */}
            <FlatList
                data={sortedPosts}
                renderItem={renderItem}
                numColumns={3} // Display posts in 3 columns
            />
        </View>
    );
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