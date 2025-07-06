import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 8;
const CARD_WIDTH = (width * 0.9 - CARD_MARGIN * 4) / 3; // 3 cards per row, 4 margins

const sampleVaccinations = [
  { id: 1, name: 'Hepatitis B', status: 'Done', date: '2023-01-15' },
  { id: 2, name: 'Polio', status: 'Done', date: '2023-03-10' },
  { id: 3, name: 'MMR', status: 'Yet to do', date: null },
  { id: 4, name: 'DTP', status: 'Done', date: '2023-05-20' },
  { id: 5, name: 'Varicella', status: 'Yet to do', date: null },
];

export default function VaccinationScreen() {
  // Split vaccinations into rows of 3
  const rows = [];
  for (let i = 0; i < sampleVaccinations.length; i += 3) {
    rows.push(sampleVaccinations.slice(i, i + 3));
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false}>
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map(vaccine => (
              <View
                key={vaccine.id}
                style={[
                  styles.card,
                  vaccine.status === 'Done' ? styles.cardDone : styles.cardPending,
                ]}
              >
                <Text style={styles.vaccineName}>{vaccine.name}</Text>
                <Text
                  style={[
                    styles.status,
                    vaccine.status === 'Done' ? styles.statusDone : styles.statusPending,
                  ]}
                >
                  {vaccine.status}
                </Text>
                <Text style={styles.date}>
                  {vaccine.status === 'Done' ? `Date: ${vaccine.date}` : 'Date: -'}
                </Text>
              </View>
            ))}
            {/* Fill empty slots if row has less than 3 items */}
            {row.length < 3 &&
              Array.from({ length: 3 - row.length }).map((_, idx) => (
                <View key={`empty-${idx}`} style={styles.cardEmpty} />
              ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    paddingTop: 48,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 28,
    letterSpacing: 1.2,
    textShadowColor: '#c7d2fe',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
  },
  listContainer: {
    width: '90%',
    paddingBottom: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    width: CARD_WIDTH,
    minHeight: 120,
    marginHorizontal: CARD_MARGIN / 2,
    backgroundColor: '#fff',
    borderRadius: 18,
    borderLeftWidth: 7,
    paddingVertical: 18,
    paddingHorizontal: 12,
    shadowColor: '#2563eb',
    shadowOpacity: 0.13,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  cardDone: {
    borderLeftColor: '#22c55e',
    backgroundColor: '#e7fbe9',
  },
  cardPending: {
    borderLeftColor: '#f59e42',
    backgroundColor: '#fff7ed',
  },
  cardEmpty: {
    width: CARD_WIDTH,
    marginHorizontal: CARD_MARGIN / 2,
    backgroundColor: 'transparent',
  },
  vaccineName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  status: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 2,
    overflow: 'hidden',
  },
  statusDone: {
    color: '#22c55e',
    backgroundColor: '#bbf7d0',
  },
  statusPending: {
    color: '#f59e42',
    backgroundColor: '#fde68a',
  },
  date: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
    fontStyle: 'italic',
  },
});
