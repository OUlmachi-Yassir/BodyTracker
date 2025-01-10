import Button from "@/components/Button";
import { View, Text, StyleSheet } from "react-native";

export default function AboutScreen() {
  return (
    <View >
      <Text style={styles.container}>About My App</Text>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
