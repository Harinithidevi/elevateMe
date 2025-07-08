import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

/**
 * MedicineCard Component
 * 
 * A card component for displaying medicine information.
 * 
 * @param {Object} medicine - Medicine object with status, category, name, dosage, etc.
 * @param {Function} onSetReminder - Callback function for setting reminders
 * @param {Function} onViewDetails - Callback function for viewing details
 * @param {Function} onMarkTaken - Callback function for marking as taken
 */
const MedicineCard = ({ 
  medicine = {}, 
  onSetReminder = () => {}, 
  onViewDetails = () => {}, 
  onMarkTaken = () => {},
  onPress = () => {}
}) => {
  // Provide default values to prevent undefined errors
  const medicineData = {
    name: 'Unknown Medicine',
    category: 'General',
    status: 'Unknown',
    ...medicine
  };
  const getStatusColor = () => {
    switch (medicineData.status) {
      case 'Active': return '#4CAF50';
      case 'Discontinued': return '#F44336';
      case 'Completed': return '#2196F3';
      case 'Paused': return '#FF9800';
      default: return '#9E9E9E';
    }
  };

  const getCategoryIcon = () => {
    switch (medicineData.category) {
      case 'Antibiotics': return '🦠';
      case 'Pain Relief': return '💊';
      case 'NSAIDs': return '🩹';
      case 'Antihistamines': return '🤧';
      case 'Proton Pump Inhibitors': return '🫃';
      case 'Antidiabetics': return '🩸';
      case 'Vitamin': return '🌟';
      case 'Heart': return '❤️';
      case 'Mental Health': return '🧠';
      case 'Digestive': return '🫃';
      default: return '💉';
    }
  };

  const renderDosageInfo = () => (
    <View style={styles.dosageSection}>
      {medicineData.strength && (
        <View style={styles.dosageItem}>
          <Text style={styles.dosageLabel}>Strength:</Text>
          <Text style={styles.dosageValue}>{medicineData.strength}</Text>
        </View>
      )}
      {medicineData.frequency && (
        <View style={styles.dosageItem}>
          <Text style={styles.dosageLabel}>Frequency:</Text>
          <Text style={styles.dosageValue}>{medicineData.frequency}</Text>
        </View>
      )}
      {medicineData.duration && (
        <View style={styles.dosageItem}>
          <Text style={styles.dosageLabel}>Duration:</Text>
          <Text style={styles.dosageValue}>{medicineData.duration}</Text>
        </View>
      )}
    </View>
  );

  const renderProgress = () => {
    if (!medicineData.totalDoses || !medicineData.takenDoses) return null;
    
    const progressPercentage = (medicineData.takenDoses / medicineData.totalDoses) * 100;
    
    return (
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Progress</Text>
          <Text style={styles.progressText}>
            {medicineData.takenDoses}/{medicineData.totalDoses} doses
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${progressPercentage}%`,
                backgroundColor: getStatusColor()
              }
            ]} 
          />
        </View>
      </View>
    );
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.cardHeader}>
        <View style={styles.titleSection}>
          <Text style={styles.categoryIcon}>{getCategoryIcon()}</Text>
          <View style={styles.titleInfo}>
            <Text style={styles.medicineName}>{medicineData.name || 'Unknown Medicine'}</Text>
            <Text style={styles.category}>{medicineData.category || 'General'}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
          <Text style={styles.statusText}>{medicineData.status || 'Unknown'}</Text>
        </View>
      </View>
      
      <View style={styles.cardContent}>
        {medicineData.indication && (
          <Text style={styles.purpose}>For: {medicineData.indication}</Text>
        )}
        
        {/* Dosage Information */}
        {medicineData.dosage && (
          <View style={styles.dosageSection}>
            <Text style={styles.sectionTitle}>Dosage:</Text>
            {medicineData.dosage.adult && (
              <View style={styles.dosageItem}>
                <Text style={styles.dosageLabel}>Adult:</Text>
                <Text style={styles.dosageValue}>{medicineData.dosage.adult}</Text>
              </View>
            )}
            {medicineData.dosage.pediatric && (
              <View style={styles.dosageItem}>
                <Text style={styles.dosageLabel}>Pediatric:</Text>
                <Text style={styles.dosageValue}>{medicineData.dosage.pediatric}</Text>
              </View>
            )}
          </View>
        )}
        
        {/* Generic dosage fallback */}
        {!medicineData.dosage && renderDosageInfo()}
        
        <View style={styles.infoGrid}>
          {medicineData.prescribedBy && (
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Prescribed by:</Text>
              <Text style={styles.infoValue}>{medicineData.prescribedBy}</Text>
            </View>
          )}
          
          {medicineData.startDate && (
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Start Date:</Text>
              <Text style={styles.infoValue}>{medicineData.startDate}</Text>
            </View>
          )}
          
          {medicineData.endDate && (
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>End Date:</Text>
              <Text style={styles.infoValue}>{medicineData.endDate}</Text>
            </View>
          )}
          
          {medicineData.nextDose && (
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Next Dose:</Text>
              <Text style={[styles.infoValue, { color: '#FF9800' }]}>
                {medicineData.nextDose}
              </Text>
            </View>
          )}
        </View>
        
        {renderProgress()}
        
        {medicineData.instructions && (
          <View style={styles.instructionsSection}>
            <Text style={styles.sectionTitle}>Instructions:</Text>
            <Text style={styles.instructions}>{medicineData.instructions}</Text>
          </View>
        )}
        
        {medicineData.sideEffects && (
          <View style={styles.sideEffectsSection}>
            <Text style={styles.sectionTitle}>Side Effects:</Text>
            {typeof medicineData.sideEffects === 'string' ? (
              <Text style={styles.sideEffects}>{medicineData.sideEffects}</Text>
            ) : (
              <View>
                {medicineData.sideEffects.common && medicineData.sideEffects.common.length > 0 && (
                  <View style={styles.sideEffectCategory}>
                    <Text style={styles.sideEffectType}>Common:</Text>
                    <Text style={styles.sideEffects}>
                      {medicineData.sideEffects.common.join(', ')}
                    </Text>
                  </View>
                )}
                {medicineData.sideEffects.rare && medicineData.sideEffects.rare.length > 0 && (
                  <View style={styles.sideEffectCategory}>
                    <Text style={styles.sideEffectType}>Rare:</Text>
                    <Text style={styles.sideEffects}>
                      {medicineData.sideEffects.rare.join(', ')}
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
        )}
        
        {medicineData.warnings && (
          <View style={styles.warningsSection}>
            <MaterialIcons name="warning" size={16} color="#F44336" />
            <Text style={styles.warnings}>
              {Array.isArray(medicineData.warnings) 
                ? medicineData.warnings.join(', ') 
                : medicineData.warnings}
            </Text>
          </View>
        )}
        
        {/* Additional Medicine Information */}
        {medicineData.brandNames && medicineData.brandNames.length > 0 && (
          <View style={styles.brandSection}>
            <Text style={styles.sectionTitle}>Brand Names:</Text>
            <Text style={styles.brandNames}>
              {medicineData.brandNames.join(', ')}
            </Text>
          </View>
        )}
        
        {medicineData.mechanism && (
          <View style={styles.mechanismSection}>
            <Text style={styles.sectionTitle}>How it works:</Text>
            <Text style={styles.mechanism}>{medicineData.mechanism}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.cardActions}>
        {medicineData.status === 'Active' && (
          <TouchableOpacity 
            style={[styles.actionButton, styles.primaryButton]}
            onPress={onMarkTaken}
          >
            <MaterialIcons name="check" size={16} color="#fff" />
            <Text style={styles.primaryButtonText}>Mark Taken</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.secondaryButton]}
          onPress={onSetReminder}
        >
          <MaterialIcons name="notifications" size={16} color="#2196F3" />
          <Text style={styles.secondaryButtonText}>Set Reminder</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.infoButton}
          onPress={onViewDetails}
        >
          <MaterialIcons name="info" size={16} color="#666" />
        </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: 12
  },
  titleInfo: {
    flex: 1
  },
  medicineName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2
  },
  category: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic'
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 0.5
  },
  cardContent: {
    marginBottom: 16
  },
  purpose: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 12,
    backgroundColor: '#f0f8ff',
    padding: 8,
    borderRadius: 6
  },
  dosageSection: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12
  },
  dosageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4
  },
  dosageLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500'
  },
  dosageValue: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600'
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
    fontSize: 12,
    color: '#333',
    fontWeight: '600'
  },
  progressSection: {
    marginBottom: 12
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6
  },
  progressLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500'
  },
  progressText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600'
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    borderRadius: 3
  },
  instructionsSection: {
    backgroundColor: '#e7f3ff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8
  },
  sideEffectsSection: {
    backgroundColor: '#fff3cd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8
  },
  warningsSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f8d7da',
    borderRadius: 8,
    padding: 12
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4
  },
  instructions: {
    fontSize: 12,
    color: '#0c5460',
    lineHeight: 16
  },
  sideEffects: {
    fontSize: 12,
    color: '#856404',
    lineHeight: 16
  },
  warnings: {
    fontSize: 12,
    color: '#721c24',
    lineHeight: 16,
    marginLeft: 8,
    flex: 1
  },
  sideEffectCategory: {
    marginBottom: 6
  },
  sideEffectType: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 2
  },
  brandSection: {
    backgroundColor: '#e8f5e8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8
  },
  brandNames: {
    fontSize: 12,
    color: '#333',
    fontStyle: 'italic'
  },
  mechanismSection: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8
  },
  mechanism: {
    fontSize: 12,
    color: '#333',
    lineHeight: 16
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8
  },
  primaryButton: {
    backgroundColor: '#4CAF50',
    flex: 1
  },
  secondaryButton: {
    backgroundColor: '#e7f3ff',
    borderWidth: 1,
    borderColor: '#2196F3',
    flex: 1
  },
  primaryButtonText: {
    fontSize: 12,
    color: '#fff',
    marginLeft: 4,
    fontWeight: '600'
  },
  secondaryButtonText: {
    fontSize: 12,
    color: '#2196F3',
    marginLeft: 4,
    fontWeight: '600'
  },
  infoButton: {
    padding: 8
  }
});

export default MedicineCard;
