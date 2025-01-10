import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Button({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#6200ee",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
});
