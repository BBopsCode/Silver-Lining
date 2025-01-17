import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";

import ProfileScreen from "./screens/ProfileScreen";
import FeedScreen from "./screens/FeedScreen";

const Stack = createStackNavigator()
export default function App() {
  return (
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator id='1'>
            <Stack.Screen
                name={"FeedScreen"}
                component={FeedScreen}
                options={{
                  headerShown: false,
                  cardStyle: { backgroundColor: '#000' }
                }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="light" />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});