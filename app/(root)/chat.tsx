import React from "react";
import { View, StyleSheet, Text } from "react-native";
import ChatwootView from "@/components/ChatwootView";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
const Chat = () => {
  const { top } = useSafeAreaInsets();
  return (
    <View
      style={[styles.container, { paddingTop: top, backgroundColor: "white" }]}
    >
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
