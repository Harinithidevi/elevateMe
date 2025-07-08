import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

/**
 * TimeSlotPicker Component
 * 
 * A component for selecting available time slots for appointments.
 * 
 * @param {Array} availableSlots - Array of available time slot strings (default: empty array)
 * @param {string} selectedDate - Currently selected date (default: null)
 * @param {string} selectedTime - Currently selected time slot (default: null)
 * @param {Function} onTimeSelect - Callback function for time selection (default: no-op function)
 */
const TimeSlotPicker = ({ 
  availableSlots = [], 
  selectedDate = null, 
  selectedTime = null, 
  onTimeSelect = () => {} 
}) => {
  const getTimeSlotStyle = (time) => {
    const isSelected = selectedTime === time;
    const isDisabled = !Array.isArray(availableSlots) || !availableSlots.includes(time);
    
    return [
      styles.timeSlot,
      isSelected && styles.selectedTimeSlot,
      isDisabled && styles.disabledTimeSlot
    ];
  };

  const getTimeSlotTextStyle = (time) => {
    const isSelected = selectedTime === time;
    const isDisabled = !Array.isArray(availableSlots) || !availableSlots.includes(time);
    
    return [
      styles.timeSlotText,
      isSelected && styles.selectedTimeSlotText,
      isDisabled && styles.disabledTimeSlotText
    ];
  };

  // Generate time slots from 8 AM to 6 PM
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
        const displayTime = `${displayHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
        
        slots.push({
          value: time,
          display: displayTime,
          available: Array.isArray(availableSlots) && availableSlots.includes(time)
        });
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="access-time" size={20} color="#333" />
        <Text style={styles.title}>Select Time</Text>
      </View>
      
      {selectedDate && (
        <Text style={styles.selectedDate}>
          Available slots for {selectedDate}
        </Text>
      )}
      
      <View style={styles.timeSlotsContainer}>
        {timeSlots.map((slot, index) => (
          <TouchableOpacity
            key={index}
            style={getTimeSlotStyle(slot.value)}
            onPress={() => slot.available && onTimeSelect(slot.value)}
            disabled={!slot.available}
          >
            <Text style={getTimeSlotTextStyle(slot.value)}>
              {slot.display}
            </Text>
            {!slot.available && (
              <View style={styles.unavailableOverlay}>
                <MaterialIcons name="block" size={16} color="#ccc" />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.availableDot]} />
          <Text style={styles.legendText}>Available</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.selectedDot]} />
          <Text style={styles.legendText}>Selected</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.unavailableDot]} />
          <Text style={styles.legendText}>Unavailable</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8
  },
  selectedDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    fontStyle: 'italic'
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  timeSlot: {
    width: '30%',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    position: 'relative'
  },
  selectedTimeSlot: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50'
  },
  disabledTimeSlot: {
    backgroundColor: '#f5f5f5',
    borderColor: '#f0f0f0'
  },
  timeSlotText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333'
  },
  selectedTimeSlotText: {
    color: '#fff',
    fontWeight: '600'
  },
  disabledTimeSlotText: {
    color: '#ccc'
  },
  unavailableOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)'
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0'
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6
  },
  availableDot: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
  selectedDot: {
    backgroundColor: '#4CAF50'
  },
  unavailableDot: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#f0f0f0'
  },
  legendText: {
    fontSize: 10,
    color: '#666'
  }
});

export default TimeSlotPicker;
