import { Image, Text, StyleSheet, View } from "react-native";

// Functional component for displaying a post with an image and caption
function Post({ image, caption }) {
    return (
        <View style={styles.postFrame}>
            {/* Display the image, with a border-radius for rounded corners */}
            <Image
                source={{ uri: image }} // Set the image source from the passed URI
                style={{ width: '100%', height: 300, borderRadius: 15 }} // Set image dimensions and rounded corners
                resizeMode="cover" // Ensure the image covers the area without distorting
            />
            {/* Display the image URI as text */}
            <Text style={{ color: 'white' }}>{image}</Text>
            {/* Display the caption, defaulting to "Default" if not provided, with dynamic style based on caption presence */}
            <Text style={caption ? styles.styleWhite : styles.styleBlue}>
                {caption || "Default"} {/* Show caption or default text */}
            </Text>
        </View>
    );
}

export default Post;

const styles = StyleSheet.create({
    postFrame:{
        marginTop:10,
        paddingBottom:15

    },

    styleWhite:{
        color: "white"
    },
    styleBlue:{
        color: "blue"
    }
})
