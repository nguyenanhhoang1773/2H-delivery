import React from "react";
import { View, StyleSheet, Text } from "react-native";
import ChatwootView from "@/components/ChatwootView";


const Chat = () => {
  return (
    <View style={styles.container}>
      <View style={styles.chatContainer}>
        <ChatwootView />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    fontSize: 18,
    fontWeight: "bold",
  },
  chatContainer: {
    flex: 1,
    position: "relative",
  },
});

export default Chat;
