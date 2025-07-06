// screens/VaccinationScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PersonalInformationScreen() {
  const personalHealthData = {
    name: "John Doe",
    age: 32,
    gender: "Male",
    bloodType: "O+",
    allergies: "None",
    chronicConditions: "Hypertension",
    lastVisitedHospital: {
      name: "City General Hospital",
      date: "2024-05-15",
      reason: "Routine Checkup"
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.infoBox}>
        <Text style={styles.label}>Name: <Text style={styles.value}>{personalHealthData.name}</Text></Text>
        <Text style={styles.label}>Age: <Text style={styles.value}>{personalHealthData.age}</Text></Text>
        <Text style={styles.label}>Gender: <Text style={styles.value}>{personalHealthData.gender}</Text></Text>
        <Text style={styles.label}>Blood Type: <Text style={styles.value}>{personalHealthData.bloodType}</Text></Text>
        <Text style={styles.label}>Allergies: <Text style={styles.value}>{personalHealthData.allergies}</Text></Text>
        <Text style={styles.label}>Chronic Conditions: <Text style={styles.value}>{personalHealthData.chronicConditions}</Text></Text>
        <Text style={styles.label}>Blood Pressure: 120/80 mmHg</Text>
        <Text style={styles.label}>Hemoglobin: 14.2 g/dL</Text>
        <Text style={styles.label}>Sugar: 95 mg/dL</Text>
        <Text style={styles.label}>Major Surgery: None</Text>
      </View>
      <View style={styles.hospitalBox}>
        <Text style={styles.sectionTitle}>Last Visited Hospital</Text>
        <Text style={styles.label}>Hospital: <Text style={styles.value}>{personalHealthData.lastVisitedHospital.name}</Text></Text>
        <Text style={styles.label}>Date: <Text style={styles.value}>{personalHealthData.lastVisitedHospital.date}</Text></Text>
        <Text style={styles.label}>Reason: <Text style={styles.value}>{personalHealthData.lastVisitedHospital.reason}</Text></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fa',
    padding: 24,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 24,
    marginTop: 24,
    letterSpacing: 1,
  },
  infoBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  hospitalBox: {
    backgroundColor: '#e6f0fa',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 6,
    fontWeight: '600',
  },
  value: {
    fontWeight: '400',
    color: '#1e293b',
  },
});
