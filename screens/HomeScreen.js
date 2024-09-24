// screens/HomeScreen.js

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import * as SQLite from "expo-sqlite/legacy";
import AddTodoButton from "../components/AddTodoButton";
import TodoCard from "../components/TodoCard";

const db = SQLite.openDatabase("poopoolist.db");

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [todoText, setTodoText] = useState("");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    // Create the todos table if it doesn't exist
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT);",
        [],
        () => {
          console.log("Table created successfully");
        },
        (error) => {
          console.error("Error creating table: ", error);
        }
      );

      // Load existing todos
      loadTodos(tx);
    });
  }, []);

  const loadTodos = (tx) => {
    tx.executeSql(
      "SELECT * FROM todos;",
      [],
      (_, { rows }) => {
        setTodoList(rows._array);
      },
      (error) => {
        console.error("Error loading todos: ", error);
      }
    );
  };

  const handleAddTodo = () => {
    if (todoText.trim()) {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO todos (text) VALUES (?);",
          [todoText],
          () => {
            setTodoText("");
            console.log("Added item")
            setModalVisible(false);
            loadTodos(tx); // Refresh the todo list
          },
          (error) => {
            console.error("Error adding todo: ", error);
          }
        );
      });
    } else {
      Alert.alert("Error", "Please enter a todo item.");
    }
  };

  const handleDeleteTodo = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM todos WHERE id = ?;",
        [id],
        () => {
          loadTodos(tx); // Refresh the todo list
        },
        (error) => {
          console.error("Error deleting todo: ", error);
        }
      );
    });
  };

  const renderTodoItem = ({ item }) => (
    <TodoCard todo={item} onDelete={handleDeleteTodo} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your Todo List</Text>

      <FlatList
        data={todoList}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Add New Todo</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your todo"
              value={todoText}
              onChangeText={setTodoText}
            />
            <View style={styles.buttonContainer}>
              <Button title="Add Todo" onPress={handleAddTodo} />
              <Button
                title="Cancel"
                color="red"
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>

      <AddTodoButton onPress={() => setModalVisible(true)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  text: {
    fontSize: 20,
    color: "#333",
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default HomeScreen;
