import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileForm = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    age: '',
    nationality: '',
    weight: '',
    height: '',
    address: '',
    bmi: '',
    gender: '', 
  });

  const [fatData, setFatData] = useState({
    waist: '',
    neck: '',
    hip: '', 
    bodyFat: '',
  });
  const [bodyFatHistory, setBodyFatHistory] = useState<number[]>([]);

  useEffect(() => {
    loadProfileData();
    loadBodyFatHistory();
  }, []);

  // Update BMI
  useEffect(() => {
    if (user.weight && user.height) {
      const weight = parseFloat(user.weight);
      const height = parseFloat(user.height) / 100; 
      if (!isNaN(weight) && !isNaN(height) && height > 0) {
        const bmi = (weight / (height * height)).toFixed(2);
        setUser((prev) => ({ ...prev, bmi }));
      }
    }
  }, [user.weight, user.height]);

  // Calculate body fat percentage
  const calculateBodyFat = () => {
    const { waist, neck, hip } = fatData;
    const height = parseFloat(user.height);

    if (!waist || !neck || !height) {
      Alert.alert('Erreur', 'Veuillez renseigner toutes les données nécessaires');
      return;
    }

    const waistValue = parseFloat(waist);
    const neckValue = parseFloat(neck);
    const hipValue = hip ? parseFloat(hip) : 0;

    if (isNaN(waistValue) || isNaN(neckValue) || (hip && isNaN(hipValue))) {
      Alert.alert('Erreur', 'Veuillez entrer des nombres valides');
      return;
    }

    let bodyFat;
    if (user.gender.toLowerCase() === 'femme') {
      bodyFat =
        495 /
          (1.29579 -
            0.35004 * Math.log10(waistValue + hipValue - neckValue) +
            0.22100 * Math.log10(height)) -
        450;
    } else {
      bodyFat =
        495 /
          (1.0324 -
            0.19077 * Math.log10(waistValue - neckValue) +
            0.15456 * Math.log10(height)) -
        450;
    }

    const formattedBodyFat = bodyFat.toFixed(2);

    setFatData((prev) => ({ ...prev, bodyFat: formattedBodyFat }));
    saveBodyFatHistory(parseFloat(formattedBodyFat));
  };

  const saveBodyFatHistory = async (newBodyFat: number) => {
    try {
      const updatedHistory = [...bodyFatHistory, newBodyFat];
      setBodyFatHistory(updatedHistory);
      await AsyncStorage.setItem('bodyFatHistory', JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Error saving body fat history:', error);
    }
  };

  const loadBodyFatHistory = async () => {
    try {
      const data = await AsyncStorage.getItem('bodyFatHistory');
      if (data) {
        setBodyFatHistory(JSON.parse(data));
      }
    } catch (error) {
      console.error('Error loading body fat history:', error);
    }
  };

  const saveProfileData = async () => {
    try {
      await AsyncStorage.setItem('userProfile', JSON.stringify(user));
      Alert.alert('Succès', 'Profil enregistré avec succès !');
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du profil :', error);
    }
  };

  const loadProfileData = async () => {
    try {
      const data = await AsyncStorage.getItem('userProfile');
      if (data) {
        setUser(JSON.parse(data));
      }
    } catch (error) {
      console.error('Erreur lors du chargement du profil :', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Profil utilisateur</Text>

      {/* Profile Form Fields */}
      {[
        { label: 'Prénom', field: 'firstName' },
        { label: 'Nom', field: 'lastName' },
        { label: 'Âge', field: 'age' },
        { label: 'Nationalité', field: 'nationality' },
        { label: 'Poids (kg)', field: 'weight' },
        { label: 'Taille (cm)', field: 'height' },
        { label: 'Adresse', field: 'address' },
        { label: 'Genre (Homme/Femme)', field: 'gender' },
      ].map(({ label, field }) => (
        <View key={field} style={styles.inputContainer}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            style={styles.input}
            value={user[field as keyof typeof user]}
            onChangeText={(value) => setUser((prev) => ({ ...prev, [field]: value }))}
            keyboardType={['age', 'weight', 'height'].includes(field) ? 'numeric' : 'default'}
            placeholder={`Entrer ${label}`}
            placeholderTextColor="#999"
          />
        </View>
      ))}
      
      <Text style={styles.bmiText}>IMC : {user.bmi || 'Non calculé'}</Text>
      
      <Button title="Enregistrer le profil" onPress={saveProfileData} color="#6200ea" />
      
      <Text style={styles.title}>Calcul du pourcentage de graisse corporelle</Text>
      
      {[
        { label: 'Tour de taille (cm)', field: 'waist' },
        { label: 'Tour de cou (cm)', field: 'neck' },
      ].map(({ label, field }) => (
        <View key={field} style={styles.inputContainer}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            style={styles.input}
            value={fatData[field as keyof typeof fatData]}
            onChangeText={(value) =>
              setFatData((prev) => ({ ...prev, [field]: value }))
            }
            keyboardType="numeric"
            placeholder={`Entrer ${label}`}
            placeholderTextColor="#999"
          />
        </View>
      ))}

      {user.gender.toLowerCase() === 'femme' && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tour de hanche (cm)</Text>
          <TextInput
            style={styles.input}
            value={fatData.hip}
            onChangeText={(value) =>
              setFatData((prev) => ({ ...prev, hip: value }))
            }
            keyboardType="numeric"
            placeholder="Entrer tour de hanche"
            placeholderTextColor="#999"
          />
        </View>
      )}

      <Text style={styles.bmiText}>
        Graisse corporelle : {fatData.bodyFat || 'Non calculée'} %
      </Text>
      
      <Button title="Calculer le pourcentage de graisse corporelle" onPress={calculateBodyFat} color="#03dac5" />
      
      {bodyFatHistory.length > 0 && (
        <>
          <Text style={styles.title}>Historique hebdomadaire</Text>
          <View style={styles.chartContainer}>
            {bodyFatHistory.map((value, index) => (
              <View
                key={index}
                style={[
                  styles.chartBar,
                  { height: value * 2, backgroundColor: '#6200ea' },
                ]}
              />
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    minHeight: '100%',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6200ea',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingLeft: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 8,
  },
  bmiText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#333',
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 220,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginVertical: 20,
  },
  chartBar: {
    width: 25,
    marginHorizontal: 6,
    borderRadius: 5,
  },
});

export default ProfileForm;
