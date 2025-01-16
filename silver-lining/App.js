import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";

import ProfileScreen from "./screens/ProfileScreen";
import FeedScreen from "./screens/FeedScreen";

const Stack = createStackNavigator()
export default function App() {
  return (
   <>
    <NavigationContainer>
      <Stack.Navigator id='1'>
        <Stack.Screen name={"FeedScreen"} component={FeedScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
   </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
