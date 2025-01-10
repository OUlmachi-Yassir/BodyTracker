import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserProfile {
  firstName: string;
  lastName: string;
  age: string;
  nationality: string;
  weight: string;
  height: string;
  address: string;
  gender: string;
  bmi: string;
}

export default function AboutScreen() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const data = await AsyncStorage.getItem('userProfile');
      if (data) {
        setUserProfile(JSON.parse(data)); 
      }
    } catch (error) {
      console.error('Error loading profile data:', error);
      Alert.alert('Erreur', 'Impossible de charger les données du profil');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>À propos de moi</Text>

      {userProfile ? (
        <View style={styles.profileContainer}>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Nom: </Text>
            <Text style={styles.tableData}>{userProfile.firstName} {userProfile.lastName}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Âge: </Text>
            <Text style={styles.tableData}>{userProfile.age}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Nationalité: </Text>
            <Text style={styles.tableData}>{userProfile.nationality}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Poids: </Text>
            <Text style={styles.tableData}>{userProfile.weight} kg</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Taille: </Text>
            <Text style={styles.tableData}>{userProfile.height} cm</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Adresse: </Text>
            <Text style={styles.tableData}>{userProfile.address}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Genre: </Text>
            <Text style={styles.tableData}>{userProfile.gender}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>IMC: </Text>
            <Text style={styles.tableData}>{userProfile.bmi}</Text>
          </View>
        </View>
      ) : (
        <Text style={styles.noProfileText}>Aucune donnée de profil trouvée.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#1e1e2f',  
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#fff',
    textShadowColor: '#6200ea',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  profileContainer: {
    backgroundColor: '#2c3e50',  
    padding: 20,
    borderRadius: 10,
    elevation: 8, 
    shadowColor: '#000',  
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    width: '100%',
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#34495e', 
    paddingBottom: 5,
  },
  tableLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ecf0f1',  
    width: '40%',
  },
  tableData: {
    fontSize: 16,
    color: '#ecf0f1',
    width: '60%',
  },
  noProfileText: {
    fontSize: 18,
    color: '#e74c3c',  
    fontStyle: 'italic',
  },
});
