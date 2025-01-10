import { View, Text, Button, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <Text>Welcome to My App</Text>
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
