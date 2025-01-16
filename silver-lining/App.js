import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";

import ProfileScreen from "./screens/ProfileScreen";

const Stack = createStackNavigator()
export default function App() {
  return (
   <>
    <NavigationContainer>
      <Stack.Navigator id='1'>
        <Stack.Screen name={"ProfileScreen"} component={ProfileScreen}></Stack.Screen>
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
