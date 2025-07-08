import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

/**
 * ReminderCard Component
 * 
 * A card component for displaying health reminder information.
 * 
 * @param {Object} reminder - Reminder object with priority, type, title, time, etc.
 * @param {Function} onToggle - Callback function called when reminder is toggled
 * @param {Function} onEdit - Callback function called when reminder is edited
 * @param {Function} onDelete - Callback function called when reminder is deleted
 */
const ReminderCard = ({ 
  reminder = {}, 
  onToggle = () => {}, 
  onEdit = () => {}, 
  onDelete = () => {} 
}) => {
  const getPriorityColor = () => {
    if (!reminder || !reminder.priority) return '#9E9E9E';
    
    switch (reminder.priority) {
      case 'High': return '#F44336';
      case 'Medium': return '#FF9800';
      case 'Low': return '#4CAF50';
      default: return '#9E9E9E';
    }
  };

  const getTypeIcon = () => {
    if (!reminder || !reminder.type) return '⏰';
    
    switch (reminder.type) {
      case 'Medication': return '💊';
      case 'Appointment': return '🏥';
      case 'Exercise': return '🏃‍♂️';
      case 'Diet': return '🥗';
      case 'Checkup': return '🩺';
      default: return '⏰';
    }
  };

  return (
    <View style={[styles.card, reminder.completed && styles.completedCard]}>
      <View style={styles.cardHeader}>
        <View style={styles.typeSection}>
          <Text style={styles.typeIcon}>{getTypeIcon()}</Text>
          <View>
            <Text style={styles.reminderType}>{reminder.type || 'General'}</Text>
            <Text style={styles.time}>{reminder.time || 'Time not set'}</Text>
          </View>
        </View>
        <View style={styles.prioritySection}>
          <View style={[styles.priorityDot, { backgroundColor: getPriorityColor() }]} />
          <Text style={[styles.priorityText, { color: getPriorityColor() }]}>
            {reminder.priority || 'Normal'}
          </Text>
        </View>
      </View>
      
      <View style={styles.cardContent}>
        <Text style={[styles.title, reminder.completed && styles.completedText]}>
          {reminder.title || 'No title'}
        </Text>
        <Text style={[styles.description, reminder.completed && styles.completedText]}>
          {reminder.description || 'No description'}
        </Text>
        
        {reminder.medication && (
          <View style={styles.medicationInfo}>
            <Text style={styles.medicationName}>{reminder.medication.name || 'Unknown medication'}</Text>
            <Text style={styles.medicationDosage}>{reminder.medication.dosage || 'Dosage not specified'}</Text>
          </View>
        )}
        
        {reminder.frequency && (
          <Text style={styles.frequency}>Frequency: {reminder.frequency}</Text>
        )}
      </View>
      
      <View style={styles.cardActions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.completeButton, reminder.completed && styles.completedButton]}
          onPress={() => {
            if (typeof onToggle === 'function') {
              onToggle();
            }
          }}
        >
          <MaterialIcons 
            name={reminder.completed ? "check-circle" : "radio-button-unchecked"} 
            size={20} 
            color={reminder.completed ? "#4CAF50" : "#666"} 
          />
          <Text style={[styles.actionText, reminder.completed && styles.completedActionText]}>
            {reminder.completed ? 'Completed' : 'Mark Done'}
          </Text>
        </TouchableOpacity>
        
        <View style={styles.actionGroup}>
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => {
              if (typeof onEdit === 'function') {
                onEdit();
              }
            }}
          >
            <MaterialIcons name="edit" size={20} color="#2196F3" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => {
              if (typeof onDelete === 'function') {
                onDelete();
              }
            }}
          >
            <MaterialIcons name="delete" size={20} color="#F44336" />
          </TouchableOpacity>
        </View>
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
  completedCard: {
    backgroundColor: '#f8f9fa',
    opacity: 0.7
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
  reminderType: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    letterSpacing: 0.5
  },
  time: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500'
  },
  prioritySection: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '600'
  },
  cardContent: {
    marginBottom: 16
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999'
  },
  medicationInfo: {
    backgroundColor: '#f0f8f0',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8
  },
  medicationName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333'
  },
  medicationDosage: {
    fontSize: 12,
    color: '#666'
  },
  frequency: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic'
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
  completeButton: {
    flex: 1,
    marginRight: 12
  },
  completedButton: {
    backgroundColor: '#e8f5e8',
    borderColor: '#4CAF50'
  },
  actionText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
    fontWeight: '500'
  },
  completedActionText: {
    color: '#4CAF50'
  },
  actionGroup: {
    flexDirection: 'row'
  },
  iconButton: {
    padding: 8,
    marginLeft: 4
  }
});

export default ReminderCard;
