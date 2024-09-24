import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./screens/HomeScreen"; // Assume you have screens folder
// import ProfileScreen from "./screens/ProfileScreen"; // Assume you have screens folder
import DrawerContent from "./components/DrawerContent"; // Import Drawer Component
// import SQLite from "react-native-sqlite-storage";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="Todos" component={HomeScreen} />
        {/* <Drawer.Screen name="Profile" component={ProfileScreen} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
