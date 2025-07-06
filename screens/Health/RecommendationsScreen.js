// screens/RecommendationsScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const physicalRecommendations = [
  "Take a 30-minute walk daily",
  "Drink at least 2 liters of water",
  "Do 10 minutes of stretching",
];

const mentalRecommendations = [
  "Practice mindfulness for 5 minutes",
  "Write down 3 things you're grateful for",
  "Read a chapter of a book",
];

export default function RecommendationsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Physical Wellness</Text>
        {physicalRecommendations.map((rec, idx) => (
          <View key={idx} style={styles.recommendationBox}>
            <Text style={styles.recommendationText}>{rec}</Text>
          </View>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Mental Wellness</Text>
        {mentalRecommendations.map((rec, idx) => (
          <View key={idx} style={styles.recommendationBoxAlt}>
            <Text style={styles.recommendationText}>{rec}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f5f6fa',
    alignItems: 'center',
    flexGrow: 1,
  },
  section: {
    width: '100%',
    marginBottom: 32,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 16,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  recommendationBox: {
    backgroundColor: '#74b9ff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#0984e3',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  recommendationBoxAlt: {
    backgroundColor: '#ffeaa7',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#fdcb6e',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  recommendationText: {
    fontSize: 16,
    color: '#2d3436',
    fontWeight: '500',
    letterSpacing: 0.2,
  },
});
