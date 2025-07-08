import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * StatsCard Component
 * 
 * A card component for displaying statistical information in a grid layout.
 * 
 * @param {Array} stats - Array of stat objects with value and label properties (default: empty array)
 * @param {Object} colors - Object mapping stat keys to colors for customization (default: empty object)
 */
const StatsCard = ({ stats = [], colors = {} }) => {
  // Ensure stats is an array and has valid data
  if (!Array.isArray(stats) || stats.length === 0) {
    return (
      <View style={styles.statsContainer}>
        <Text style={styles.noDataText}>No statistics available</Text>
      </View>
    );
  }

  return (
    <View style={styles.statsContainer}>
      {stats.map((stat, index) => (
        <View key={stat?.key || index} style={styles.statCard}>
          <Text style={[
            styles.statNumber, 
            { color: colors[stat?.key] || '#3B82F6' }
          ]}>
            {stat?.value || '0'}
          </Text>
          <Text style={styles.statLabel}>{stat?.label || 'Unknown'}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '500',
    marginTop: 2,
  },
  noDataText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    flex: 1,
  },
});

export default StatsCard;
