import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

/**
 * RecommendationCard Component
 * 
 * A card component for displaying health recommendations.
 * 
 * @param {Object} recommendation - Recommendation object with priority, category, title, etc.
 * @param {Function} onBookAppointment - Callback function for booking appointments
 * @param {Function} onDismiss - Callback function for dismissing recommendations
 */
const RecommendationCard = ({ 
  recommendation = {}, 
  onBookAppointment = () => {}, 
  onDismiss = () => {} 
}) => {
  const getPriorityColor = () => {
    if (!recommendation || !recommendation.priority) return '#2196F3';
    
    switch (recommendation.priority) {
      case 'High': return '#F44336';
      case 'Medium': return '#FF9800';
      case 'Low': return '#4CAF50';
      default: return '#2196F3';
    }
  };

  const getCategoryIcon = () => {
    if (!recommendation || !recommendation.category) return '💡';
    
    switch (recommendation.category) {
      case 'Preventive': return '🛡️';
      case 'Treatment': return '🩺';
      case 'Lifestyle': return '🌱';
      case 'Screening': return '🔍';
      case 'Follow-up': return '📋';
      default: return '💡';
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.categorySection}>
          <Text style={styles.categoryIcon}>{getCategoryIcon()}</Text>
          <View>
            <Text style={styles.category}>{recommendation.category || 'General'}</Text>
            <Text style={styles.source}>From: {recommendation.source || 'Unknown source'}</Text>
          </View>
        </View>
        <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor() }]}>
          <Text style={styles.priorityText}>{recommendation.priority || 'Normal'}</Text>
        </View>
      </View>
      
      <View style={styles.cardContent}>
        <Text style={styles.title}>{recommendation.title || 'No title available'}</Text>
        <Text style={styles.description}>{recommendation.description || 'No description available'}</Text>
        
        {Array.isArray(recommendation.benefits) && recommendation.benefits.length > 0 && (
          <View style={styles.benefitsSection}>
            <Text style={styles.subsectionTitle}>Benefits:</Text>
            {recommendation.benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <MaterialIcons name="check-circle" size={16} color="#4CAF50" />
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            ))}
          </View>
        )}
        
        {Array.isArray(recommendation.risks) && recommendation.risks.length > 0 && (
          <View style={styles.risksSection}>
            <Text style={styles.subsectionTitle}>Risks of not following:</Text>
            {recommendation.risks.map((risk, index) => (
              <View key={index} style={styles.riskItem}>
                <MaterialIcons name="warning" size={16} color="#FF9800" />
                <Text style={styles.riskText}>{risk}</Text>
              </View>
            ))}
          </View>
        )}
        
        {recommendation.timeline && (
          <View style={styles.timelineSection}>
            <MaterialIcons name="schedule" size={16} color="#666" />
            <Text style={styles.timelineText}>Recommended by: {recommendation.timeline}</Text>
          </View>
        )}
        
        {recommendation.frequency && (
          <View style={styles.frequencySection}>
            <MaterialIcons name="repeat" size={16} color="#666" />
            <Text style={styles.frequencyText}>Frequency: {recommendation.frequency}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.cardActions}>
        {recommendation.actionable && (
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={onBookAppointment}
          >
            <MaterialIcons name="event" size={16} color="#fff" />
            <Text style={styles.primaryButtonText}>Book Appointment</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={onDismiss}
        >
          <MaterialIcons name="close" size={16} color="#666" />
          <Text style={styles.secondaryButtonText}>Dismiss</Text>
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
  categorySection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: 12
  },
  category: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    letterSpacing: 0.5
  },
  source: {
    fontSize: 11,
    color: '#888',
    fontStyle: 'italic'
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 0.5
  },
  cardContent: {
    marginBottom: 16
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    lineHeight: 22
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20
  },
  benefitsSection: {
    marginBottom: 12
  },
  risksSection: {
    marginBottom: 12
  },
  subsectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    paddingLeft: 8
  },
  benefitText: {
    fontSize: 13,
    color: '#333',
    marginLeft: 8,
    flex: 1,
    lineHeight: 18
  },
  riskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    paddingLeft: 8
  },
  riskText: {
    fontSize: 13,
    color: '#333',
    marginLeft: 8,
    flex: 1,
    lineHeight: 18
  },
  timelineSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#f0f8ff',
    padding: 8,
    borderRadius: 6
  },
  timelineText: {
    fontSize: 12,
    color: '#333',
    marginLeft: 8,
    fontWeight: '500'
  },
  frequencySection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 6
  },
  frequencyText: {
    fontSize: 12,
    color: '#333',
    marginLeft: 8,
    fontWeight: '500'
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    flex: 1,
    marginRight: 8
  },
  primaryButtonText: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 6,
    fontWeight: '600'
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
  secondaryButtonText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
    fontWeight: '500'
  }
});

export default RecommendationCard;
