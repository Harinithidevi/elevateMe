import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

/**
 * ReportCard Component
 * 
 * A card component for displaying medical report information.
 * 
 * @param {Object} report - Report object with date, patientName, doctor, hospital, etc.
 * @param {string} type - Report type (prescription, scan, test)
 * @param {Function} onPress - Callback function called when the card is pressed
 */
const ReportCard = ({ 
  report = {}, 
  type = 'general', 
  onPress = () => {} 
}) => {
  const getTypeIcon = () => {
    switch (type) {
      case 'prescription': return '💊';
      case 'scan': return '🏥';
      case 'test': return '🧪';
      default: return '📄';
    }
  };

  const getStatusColor = () => {
    if (type === 'prescription') return '#4CAF50';
    if (type === 'scan') return '#2196F3';
    if (type === 'test') return '#FF9800';
    return '#9E9E9E';
  };

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => {
        if (typeof onPress === 'function') {
          onPress();
        }
      }}
    >
      <View style={styles.cardHeader}>
        <View style={styles.typeSection}>
          <Text style={styles.typeIcon}>{getTypeIcon()}</Text>
          <View>
            <Text style={styles.reportType}>{type?.toUpperCase() || 'GENERAL'}</Text>
            <Text style={styles.date}>{report.date || 'Date not available'}</Text>
          </View>
        </View>
        <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
      </View>
      
      <View style={styles.cardContent}>
        <Text style={styles.patientName}>{report.patientName || 'Unknown Patient'}</Text>
        <Text style={styles.subtitle}>
          {report.disease || report.type || report.testType || 'General Report'}
        </Text>
        
        {report.doctor && (
          <Text style={styles.doctorInfo}>👨‍⚕️ {report.doctor}</Text>
        )}
        
        {report.hospital && (
          <Text style={styles.hospitalInfo}>🏥 {report.hospital}</Text>
        )}
      </View>
      
      <View style={styles.cardFooter}>
        <MaterialIcons name="chevron-right" size={24} color="#666" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    // Modern shadow approach for React Native Web
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    // Fallback for React Native
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0'
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  typeSection: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  typeIcon: {
    fontSize: 24,
    marginRight: 12
  },
  reportType: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    letterSpacing: 0.5
  },
  date: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500'
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4
  },
  cardContent: {
    marginBottom: 12
  },
  patientName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8
  },
  doctorInfo: {
    fontSize: 12,
    color: '#4CAF50',
    marginBottom: 2
  },
  hospitalInfo: {
    fontSize: 12,
    color: '#2196F3'
  },
  cardFooter: {
    alignItems: 'flex-end'
  }
});

export default ReportCard;
