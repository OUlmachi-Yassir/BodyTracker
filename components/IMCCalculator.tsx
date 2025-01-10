import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useState } from "react";

export default function IMCCalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (w > 0 && h > 0) {
      const bmiValue = w / (h * h);
      setBmi(bmiValue);
    }
  };

  return (
    <View style={styles.container}>
      <Text>IMC Calculator</Text>
      <TextInput
        style={styles.input}
        placeholder="Weight (kg)"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Height (cm)"
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
      />
      <Button title="Calculate" onPress={calculateBMI} />
      {bmi && <Text>Your BMI: {bmi.toFixed(2)}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 5,
  },
});
