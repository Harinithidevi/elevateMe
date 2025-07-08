// screens/PersonalInformationScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';

export default function PersonalInformationScreen() {
  const personalHealthData = {
    name: "John Doe",
    age: 32,
    gender: "Male",
    bloodType: "O+",
    allergies: "None",
    chronicConditions: "Hypertension",
    height: "5'10\"",
    weight: "75 kg",
    bmi: "23.4",
    emergencyContact: {
      name: "Jane Doe",
      relationship: "Spouse",
      phone: "+1 (555) 123-4567"
    },
    insurance: {
      provider: "HealthCare Plus",
      policyNumber: "HP123456789",
      groupNumber: "GRP001"
    },
    lastVisitedHospital: {
      name: "City General Hospital",
      date: "2024-05-15",
      reason: "Routine Checkup"
    }
  };

  const vitalSigns = {
    bloodPressure: "120/80 mmHg",
    heartRate: "72 bpm",
    temperature: "98.6°F",
    oxygenSaturation: "98%",
    hemoglobin: "14.2 g/dL",
    bloodSugar: "95 mg/dL",
    cholesterol: "180 mg/dL"
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>👤 Personal Health Profile</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>✏️ Edit</Text>
        </TouchableOpacity>
      </View>
      {/* Basic Information */}
      <View style={styles.infoBox}>
        <Text style={styles.sectionTitle}>📋 Basic Information</Text>
        <InfoRow icon="👤" label="Full Name" value={personalHealthData.name} />
        <InfoRow icon="🎂" label="Age" value={`${personalHealthData.age} years`} />
        <InfoRow icon="⚧️" label="Gender" value={personalHealthData.gender} />
        <InfoRow icon="🩸" label="Blood Type" value={personalHealthData.bloodType} />
        <InfoRow icon="📏" label="Height" value={personalHealthData.height} />
        <InfoRow icon="⚖️" label="Weight" value={personalHealthData.weight} />
        <InfoRow icon="📊" label="BMI" value={personalHealthData.bmi} />
      </View>

      {/* Current Vital Signs */}
      <View style={styles.vitalBox}>
        <Text style={styles.sectionTitle}>💓 Current Vital Signs</Text>
        <InfoRow icon="🫀" label="Blood Pressure" value={vitalSigns.bloodPressure} />
        <InfoRow icon="💗" label="Heart Rate" value={vitalSigns.heartRate} />
        <InfoRow icon="🌡️" label="Temperature" value={vitalSigns.temperature} />
        <InfoRow icon="🫁" label="Oxygen Saturation" value={vitalSigns.oxygenSaturation} />
        <InfoRow icon="🧬" label="Hemoglobin" value={vitalSigns.hemoglobin} />
        <InfoRow icon="🍬" label="Blood Sugar" value={vitalSigns.bloodSugar} />
        <InfoRow icon="📈" label="Cholesterol" value={vitalSigns.cholesterol} />
      </View>

      {/* Medical Information */}
      <View style={styles.medicalBox}>
        <Text style={styles.sectionTitle}>🏥 Medical Information</Text>
        <InfoRow icon="🌼" label="Allergies" value={personalHealthData.allergies} />
        <InfoRow icon="💊" label="Chronic Conditions" value={personalHealthData.chronicConditions} />
        <InfoRow icon="🔪" label="Major Surgeries" value="None" />
        <InfoRow icon="💉" label="Current Medications" value="Lisinopril 10mg daily" />
      </View>

      {/* Emergency Contact */}
      <View style={styles.emergencyBox}>
        <Text style={styles.sectionTitle}>🚨 Emergency Contact</Text>
        <InfoRow icon="👥" label="Name" value={personalHealthData.emergencyContact.name} />
        <InfoRow icon="❤️" label="Relationship" value={personalHealthData.emergencyContact.relationship} />
        <InfoRow icon="📞" label="Phone" value={personalHealthData.emergencyContact.phone} />
      </View>

      {/* Insurance Information */}
      <View style={styles.insuranceBox}>
        <Text style={styles.sectionTitle}>🛡️ Insurance Information</Text>
        <InfoRow icon="🏢" label="Provider" value={personalHealthData.insurance.provider} />
        <InfoRow icon="📄" label="Policy Number" value={personalHealthData.insurance.policyNumber} />
        <InfoRow icon="👥" label="Group Number" value={personalHealthData.insurance.groupNumber} />
      </View>

      {/* Last Hospital Visit */}
      <View style={styles.hospitalBox}>
        <Text style={styles.sectionTitle}>🏥 Last Hospital Visit</Text>
        <InfoRow icon="🏨" label="Hospital" value={personalHealthData.lastVisitedHospital.name} />
        <InfoRow icon="📅" label="Date" value={personalHealthData.lastVisitedHospital.date} />
        <InfoRow icon="📝" label="Reason" value={personalHealthData.lastVisitedHospital.reason} />
      </View>

    </ScrollView>
  );
}

// Info Row Component
function InfoRow({ icon, label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    flex: 1,
  },
  editButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  vitalBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444',
  },
  medicalBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
  },
  emergencyBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  insuranceBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#8b5cf6',
  },
  hospitalBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#06b6d4',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 4,
  },
  icon: {
    fontSize: 20,
    marginRight: 12,
    width: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 15,
    color: '#64748b',
    fontWeight: '600',
    marginRight: 8,
    minWidth: 120,
  },
  value: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1e293b',
    flex: 1,
  },
});
