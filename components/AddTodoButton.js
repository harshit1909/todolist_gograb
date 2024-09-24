// components/AddTodoButton.js

import * as React from "react";
import { FAB } from "react-native-paper";
import { StyleSheet } from "react-native";

const AddTodoButton = ({ onPress }) => {
  return (
    <FAB
      style={styles.fab}
      icon="plus" // The '+' icon (part of vector icons)
      color="#ffffff"
      onPress={onPress} // Handle press events
    />
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#0040eb", // Customize button color
  },
});

export default AddTodoButton;
