import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

/**
 * AppointmentTypeCard Component
 * 
 * A card component for displaying appointment type information with selection state.
 * 
 * @param {Object} type - Appointment type object with id, name, category, description, etc.
 * @param {Array} types - Alternative prop name for backward compatibility (array of types)
 * @param {Function} onSelect - Callback function called when the card is selected
 * @param {Function} onTypeChange - Alternative prop name for onSelect (backward compatibility)
 * @param {boolean} isSelected - Whether this card is currently selected
 * @param {string} selectedType - Alternative prop name for checking selection (backward compatibility)
 */
const AppointmentTypeCard = ({ 
  type = {}, 
  types = [], // Backward compatibility
  onSelect = () => {}, 
  onTypeChange = () => {}, // Backward compatibility
  isSelected = false,
  selectedType = null // Backward compatibility
}) => {
  // Handle backward compatibility - if types array is provided, render multiple cards
  if (Array.isArray(types) && types.length > 0) {
    return (
      <View>
        {types.map((appointmentType, index) => (
          <AppointmentTypeCard
            key={appointmentType.key || appointmentType.id || index}
            type={{
              id: appointmentType.key || appointmentType.id,
              name: appointmentType.label || appointmentType.name,
              category: appointmentType.category || 'General',
              description: appointmentType.description || '',
              duration: appointmentType.duration || '30 minutes',
              cost: appointmentType.cost || 'Contact for pricing',
              urgency: appointmentType.urgency || 'Normal',
              preparation: appointmentType.preparation,
              benefits: appointmentType.benefits
            }}
            isSelected={selectedType === (appointmentType.key || appointmentType.id)}
            onSelect={() => {
              if (typeof onTypeChange === 'function') {
                onTypeChange(appointmentType.key || appointmentType.id);
              } else if (typeof onSelect === 'function') {
                onSelect(appointmentType);
              }
            }}
          />
        ))}
      </View>
    );
  }

  // Helper functions for single card rendering
  const getTypeIcon = () => {
    if (!type || !type.id) return '📅';
    
    switch (type.id) {
      case 'consultation': return '🩺';
      case 'follow-up': return '📋';
      case 'emergency': return '🚨';
      case 'screening': return '🔍';
      case 'vaccination': return '💉';
      case 'therapy': return '🧘‍♀️';
      default: return '📅';
    }
  };

  const getUrgencyColor = () => {
    if (!type || !type.urgency) return '#2196F3';
    
    switch (type.urgency) {
      case 'Emergency': return '#F44336';
      case 'Urgent': return '#FF9800';
      case 'Normal': return '#4CAF50';
      default: return '#2196F3';
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.card, isSelected && styles.selectedCard]}
      onPress={() => {
        if (typeof onSelect === 'function') {
          onSelect();
        }
      }}
    >
      <View style={styles.cardHeader}>
        <View style={styles.typeInfo}>
          <Text style={styles.typeIcon}>{getTypeIcon()}</Text>
          <View style={styles.nameSection}>
            <Text style={styles.typeName}>{type.name || 'Unknown Type'}</Text>
            <Text style={styles.category}>{type.category || 'General'}</Text>
          </View>
        </View>
        <View style={styles.selectionIndicator}>
          {isSelected ? (
            <MaterialIcons name="radio-button-checked" size={24} color="#4CAF50" />
          ) : (
            <MaterialIcons name="radio-button-unchecked" size={24} color="#ccc" />
          )}
        </View>
      </View>
      
      <Text style={styles.description}>{type.description || 'No description available'}</Text>
      
      <View style={styles.detailsSection}>
        <View style={styles.detailRow}>
          <MaterialIcons name="schedule" size={16} color="#666" />
          <Text style={styles.detailText}>Duration: {type.duration || 'Not specified'}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <MaterialIcons name="attach-money" size={16} color="#666" />
          <Text style={styles.detailText}>Cost: {type.cost || 'Contact for pricing'}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <MaterialIcons name="priority-high" size={16} color={getUrgencyColor()} />
          <Text style={[styles.detailText, { color: getUrgencyColor() }]}>
            {type.urgency || 'Normal'}
          </Text>
        </View>
        
        {type.preparation && (
          <View style={styles.preparationSection}>
            <MaterialIcons name="info" size={16} color="#2196F3" />
            <Text style={styles.preparationText}>
              Preparation: {type.preparation}
            </Text>
          </View>
        )}
      </View>
      
      {type.benefits && Array.isArray(type.benefits) && type.benefits.length > 0 && (
        <View style={styles.benefitsSection}>
          <Text style={styles.benefitsTitle}>What's included:</Text>
          {type.benefits.slice(0, 3).map((benefit, index) => (
            <View key={index} style={styles.benefitItem}>
              <MaterialIcons name="check" size={14} color="#4CAF50" />
              <Text style={styles.benefitText}>{benefit}</Text>
            </View>
          ))}
          {type.benefits.length > 3 && (
            <Text style={styles.moreBenefits}>
              +{type.benefits.length - 3} more benefits
            </Text>
          )}
        </View>
      )}
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
  selectedCard: {
    borderColor: '#4CAF50',
    borderWidth: 2,
    backgroundColor: '#f0f8f0'
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12
  },
  typeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  typeIcon: {
    fontSize: 32,
    marginRight: 12
  },
  nameSection: {
    flex: 1
  },
  typeName: {
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
  selectionIndicator: {
    marginLeft: 12
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20
  },
  detailsSection: {
    marginBottom: 12
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  detailText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
    fontWeight: '500'
  },
  preparationSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#e7f3ff',
    padding: 8,
    borderRadius: 6,
    marginTop: 8
  },
  preparationText: {
    fontSize: 11,
    color: '#2196F3',
    marginLeft: 8,
    flex: 1,
    lineHeight: 16
  },
  benefitsSection: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12
  },
  benefitsTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },
  benefitText: {
    fontSize: 11,
    color: '#333',
    marginLeft: 6,
    flex: 1
  },
  moreBenefits: {
    fontSize: 10,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 4
  }
});

export default AppointmentTypeCard;
