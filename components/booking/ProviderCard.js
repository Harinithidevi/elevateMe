import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

/**
 * ProviderCard Component
 * 
 * A card component for displaying healthcare provider information.
 * 
 * @param {Object} provider - Provider object with rating, name, specialty, location, etc.
 * @param {Function} onSelect - Callback function called when provider is selected
 * @param {boolean} isSelected - Whether this provider is currently selected
 */
const ProviderCard = ({ 
  provider = {}, 
  onSelect = () => {}, 
  isSelected = false 
}) => {
  const renderRating = () => {
    if (!provider || !provider.rating) return null;
    
    const stars = [];
    const rating = parseFloat(provider.rating) || 0;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <MaterialIcons key={i} name="star" size={16} color="#FFD700" />
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <MaterialIcons key="half" name="star-half" size={16} color="#FFD700" />
      );
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <MaterialIcons key={`empty-${i}`} name="star-border" size={16} color="#FFD700" />
      );
    }
    
    return stars;
  };

  return (
    <TouchableOpacity 
      style={[styles.card, isSelected && styles.selectedCard]}
      onPress={onSelect}
    >
      <View style={styles.cardHeader}>
        <View style={styles.providerInfo}>
          <Text style={styles.providerImage}>{provider.image}</Text>
          <View style={styles.nameSection}>
            <Text style={styles.providerName}>{provider.name}</Text>
            <Text style={styles.specialty}>{provider.specialty}</Text>
            <Text style={styles.qualification}>{provider.qualification}</Text>
          </View>
        </View>
        {isSelected && (
          <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
        )}
      </View>
      
      <View style={styles.cardContent}>
        <View style={styles.ratingSection}>
          <View style={styles.stars}>
            {renderRating()}
          </View>
          <Text style={styles.ratingText}>
            {provider.rating} • {provider.experience}
          </Text>
        </View>
        
        <View style={styles.locationSection}>
          <MaterialIcons name="location-on" size={16} color="#666" />
          <Text style={styles.location}>{provider.location}</Text>
        </View>
        
        <View style={styles.feeSection}>
          <MaterialIcons name="attach-money" size={16} color="#4CAF50" />
          <Text style={styles.fee}>Consultation: {provider.consultationFee}</Text>
        </View>
        
        {provider.specializations && (
          <View style={styles.specializationsSection}>
            <Text style={styles.specializationsTitle}>Specializations:</Text>
            <View style={styles.specializationTags}>
              {provider.specializations.slice(0, 3).map((spec, index) => (
                <View key={index} style={styles.specializationTag}>
                  <Text style={styles.specializationText}>{spec}</Text>
                </View>
              ))}
              {provider.specializations.length > 3 && (
                <Text style={styles.moreSpecs}>+{provider.specializations.length - 3} more</Text>
              )}
            </View>
          </View>
        )}
        
        <View style={styles.availabilitySection}>
          <Text style={styles.availabilityTitle}>Available:</Text>
          <View style={styles.availabilityDays}>
            {provider.availability.map((day, index) => (
              <View key={index} style={styles.dayTag}>
                <Text style={styles.dayText}>{day}</Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.nextAvailableSection}>
          <MaterialIcons name="schedule" size={16} color="#FF9800" />
          <Text style={styles.nextAvailable}>
            Next available: {provider.nextAvailable}
          </Text>
        </View>
        
        {provider.languages && (
          <View style={styles.languagesSection}>
            <MaterialIcons name="language" size={16} color="#2196F3" />
            <Text style={styles.languages}>
              Languages: {provider.languages.join(', ')}
            </Text>
          </View>
        )}
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
  providerInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1
  },
  providerImage: {
    fontSize: 40,
    marginRight: 12
  },
  nameSection: {
    flex: 1
  },
  providerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2
  },
  specialty: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '500',
    marginBottom: 2
  },
  qualification: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic'
  },
  cardContent: {
    marginTop: 8
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  stars: {
    flexDirection: 'row',
    marginRight: 8
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500'
  },
  locationSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  location: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4
  },
  feeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  fee: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
    marginLeft: 4
  },
  specializationsSection: {
    marginBottom: 12
  },
  specializationsTitle: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
    marginBottom: 6
  },
  specializationTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  specializationTag: {
    backgroundColor: '#e7f3ff',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 4
  },
  specializationText: {
    fontSize: 10,
    color: '#2196F3',
    fontWeight: '500'
  },
  moreSpecs: {
    fontSize: 10,
    color: '#666',
    fontStyle: 'italic'
  },
  availabilitySection: {
    marginBottom: 8
  },
  availabilityTitle: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
    marginBottom: 6
  },
  availabilityDays: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  dayTag: {
    backgroundColor: '#f0f8f0',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 4,
    marginBottom: 4
  },
  dayText: {
    fontSize: 10,
    color: '#4CAF50',
    fontWeight: '500'
  },
  nextAvailableSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  nextAvailable: {
    fontSize: 12,
    color: '#FF9800',
    fontWeight: '500',
    marginLeft: 4
  },
  languagesSection: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  languages: {
    fontSize: 12,
    color: '#2196F3',
    marginLeft: 4
  }
});

export default ProviderCard;
