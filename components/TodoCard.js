// components/TodoCard.js

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Card, IconButton } from "react-native-paper";

const screenWidth = Dimensions.get("window").width; // Get the screen width

const TodoCard = ({ todo, onDelete }) => {
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <Text style={styles.todoText}>{todo.text}</Text>
        <TouchableOpacity onPress={() => onDelete(todo.id)}>
          <IconButton
            icon="delete"
            size={20}
            color="#f44336" // Red color for the delete icon
          />
        </TouchableOpacity>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: screenWidth*0.9, // Set width to the entire screen width
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 15, // Remove border radius for a flat edge
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15, // Optional: add padding for content
  },
  todoText: {
    fontSize: 16,
    color: "#333",
    textAlign: "left", // Ensure text is left-aligned
  },
});

export default TodoCard;
