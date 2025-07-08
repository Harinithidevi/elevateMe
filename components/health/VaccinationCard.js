import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

/**
 * VaccinationCard Component
 * 
 * A card component for displaying vaccination information.
 * 
 * @param {Object} vaccination - Vaccination object with status, name, date, doses, etc.
 * @param {Function} onSchedule - Callback function for scheduling vaccinations
 * @param {Function} onViewCertificate - Callback function for viewing certificates
 */
const VaccinationCard = ({ 
  vaccination = {}, 
  onSchedule = () => {}, 
  onViewCertificate = () => {} 
}) => {
  const getStatusColor = () => {
    if (!vaccination || !vaccination.status) return '#9E9E9E';
    
    switch (vaccination.status) {
      case 'Completed': return '#4CAF50';
      case 'Overdue': return '#F44336';
      case 'Due Soon': return '#FF9800';
      case 'Scheduled': return '#2196F3';
      default: return '#9E9E9E';
    }
  };

  const getStatusIcon = () => {
    if (!vaccination || !vaccination.status) return 'help';
    
    switch (vaccination.status) {
      case 'Completed': return 'check-circle';
      case 'Overdue': return 'error';
      case 'Due Soon': return 'schedule';
      case 'Scheduled': return 'event';
      default: return 'help';
    }
  };

  const renderDoses = () => {
    if (!vaccination.doses || !Array.isArray(vaccination.doses)) return null;
    
    return (
      <View style={styles.dosesSection}>
        <Text style={styles.dosesTitle}>Doses:</Text>
        {vaccination.doses.map((dose, index) => (
          <View key={index} style={styles.doseItem}>
            <View style={[
              styles.doseIndicator,
              { backgroundColor: dose.completed ? '#4CAF50' : '#e0e0e0' }
            ]} />
            <View style={styles.doseInfo}>
              <Text style={styles.doseName}>Dose {dose.number}</Text>
              <Text style={styles.doseDate}>
                {dose.completed ? `Completed: ${dose.date}` : `Due: ${dose.dueDate}`}
              </Text>
              {dose.location && (
                <Text style={styles.doseLocation}>📍 {dose.location}</Text>
              )}
            </View>
            {dose.completed && (
              <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
            )}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.titleSection}>
          <Text style={styles.vaccineName}>{vaccination.name}</Text>
          <Text style={styles.diseaseInfo}>Protects against: {vaccination.protectsAgainst}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
          <MaterialIcons name={getStatusIcon()} size={16} color="#fff" />
          <Text style={styles.statusText}>{vaccination.status}</Text>
        </View>
      </View>
      
      <View style={styles.cardContent}>
        {vaccination.description && (
          <Text style={styles.description}>{vaccination.description}</Text>
        )}
        
        <View style={styles.infoGrid}>
          {vaccination.ageGroup && (
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Age Group:</Text>
              <Text style={styles.infoValue}>{vaccination.ageGroup}</Text>
            </View>
          )}
          
          {vaccination.nextDue && (
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Next Due:</Text>
              <Text style={[styles.infoValue, { color: getStatusColor() }]}>
                {vaccination.nextDue}
              </Text>
            </View>
          )}
          
          {vaccination.frequency && (
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Frequency:</Text>
              <Text style={styles.infoValue}>{vaccination.frequency}</Text>
            </View>
          )}
          
          {vaccination.lastReceived && (
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Last Received:</Text>
              <Text style={styles.infoValue}>{vaccination.lastReceived}</Text>
            </View>
          )}
        </View>
        
        {renderDoses()}
        
        {vaccination.sideEffects && (
          <View style={styles.sideEffectsSection}>
            <Text style={styles.sectionTitle}>Common Side Effects:</Text>
            <Text style={styles.sideEffectsText}>{vaccination.sideEffects}</Text>
          </View>
        )}
        
        {vaccination.contraindications && (
          <View style={styles.contraindicationsSection}>
            <Text style={styles.sectionTitle}>Contraindications:</Text>
            <Text style={styles.contraindicationsText}>{vaccination.contraindications}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.cardActions}>
        {vaccination.status !== 'Completed' && (
          <TouchableOpacity 
            style={[styles.actionButton, styles.primaryButton]}
            onPress={onSchedule}
          >
            <MaterialIcons name="event" size={16} color="#fff" />
            <Text style={styles.primaryButtonText}>
              {vaccination.status === 'Scheduled' ? 'Reschedule' : 'Schedule'}
            </Text>
          </TouchableOpacity>
        )}
        
        {vaccination.status === 'Completed' && (
          <TouchableOpacity 
            style={[styles.actionButton, styles.certificateButton]}
            onPress={onViewCertificate}
          >
            <MaterialIcons name="verified" size={16} color="#4CAF50" />
            <Text style={styles.certificateButtonText}>View Certificate</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity style={styles.infoButton}>
          <MaterialIcons name="info" size={16} color="#666" />
          <Text style={styles.infoButtonText}>More Info</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
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
    alignItems: 'flex-start',
    marginBottom: 12
  },
  titleSection: {
    flex: 1,
    marginRight: 12
  },
  vaccineName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4
  },
  diseaseInfo: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic'
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 4,
    letterSpacing: 0.5
  },
  cardContent: {
    marginBottom: 16
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12
  },
  infoItem: {
    width: '50%',
    marginBottom: 8
  },
  infoLabel: {
    fontSize: 12,
    color: '#888',
    fontWeight: '500'
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600'
  },
  dosesSection: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12
  },
  dosesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8
  },
  doseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  doseIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12
  },
  doseInfo: {
    flex: 1
  },
  doseName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333'
  },
  doseDate: {
    fontSize: 12,
    color: '#666'
  },
  doseLocation: {
    fontSize: 11,
    color: '#888'
  },
  sideEffectsSection: {
    backgroundColor: '#fff3cd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107'
  },
  contraindicationsSection: {
    backgroundColor: '#f8d7da',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#dc3545'
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4
  },
  sideEffectsText: {
    fontSize: 12,
    color: '#856404',
    lineHeight: 16
  },
  contraindicationsText: {
    fontSize: 12,
    color: '#721c24',
    lineHeight: 16
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    flex: 1,
    marginRight: 8
  },
  primaryButton: {
    backgroundColor: '#2196F3'
  },
  certificateButton: {
    backgroundColor: '#e8f5e8',
    borderWidth: 1,
    borderColor: '#4CAF50'
  },
  primaryButtonText: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 6,
    fontWeight: '600'
  },
  certificateButtonText: {
    fontSize: 14,
    color: '#4CAF50',
    marginLeft: 6,
    fontWeight: '600'
  },
  infoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
  infoButtonText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
    fontWeight: '500'
  }
});

export default VaccinationCard;
