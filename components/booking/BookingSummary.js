import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

/**
 * BookingSummary Component
 * 
 * A comprehensive summary component for displaying booking details before confirmation.
 * 
 * @param {Object} bookingData - Object containing all booking information (default: empty object)
 * @param {Function} onConfirm - Callback function for confirming the booking (default: no-op function)
 * @param {Function} onEdit - Callback function for editing the booking (default: no-op function)
 */
const BookingSummary = ({ bookingData = {}, onConfirm = () => {}, onEdit = () => {} }) => {
  const getSummaryIcon = (type) => {
    switch (type) {
      case 'provider': return 'person';
      case 'appointment': return 'event';
      case 'date': return 'calendar-today';
      case 'time': return 'access-time';
      case 'location': return 'location-on';
      case 'cost': return 'attach-money';
      default: return 'info';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not specified';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'Time not specified';
    try {
      const [hour, minute] = timeString.split(':');
      const hourNum = parseInt(hour);
      const ampm = hourNum >= 12 ? 'PM' : 'AM';
      const displayHour = hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum;
      return `${displayHour}:${minute} ${ampm}`;
    } catch (error) {
      return 'Invalid time';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
        <Text style={styles.title}>Booking Summary</Text>
      </View>
      
      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <MaterialIcons name={getSummaryIcon('provider')} size={20} color="#2196F3" />
          <View style={styles.summaryContent}>
            <Text style={styles.summaryLabel}>Healthcare Provider</Text>
            <Text style={styles.summaryValue}>{bookingData.provider?.name || 'Provider not selected'}</Text>
            <Text style={styles.summarySubValue}>
              {bookingData.provider?.specialty || 'Specialty not specified'} • {bookingData.provider?.qualification || 'Qualification not specified'}
            </Text>
          </View>
        </View>
        
        <View style={styles.summaryRow}>
          <MaterialIcons name={getSummaryIcon('appointment')} size={20} color="#FF9800" />
          <View style={styles.summaryContent}>
            <Text style={styles.summaryLabel}>Appointment Type</Text>
            <Text style={styles.summaryValue}>{bookingData.appointmentType?.name || 'Type not selected'}</Text>
            <Text style={styles.summarySubValue}>
              Duration: {bookingData.appointmentType?.duration || 'Not specified'}
            </Text>
          </View>
        </View>
        
        <View style={styles.summaryRow}>
          <MaterialIcons name={getSummaryIcon('date')} size={20} color="#9C27B0" />
          <View style={styles.summaryContent}>
            <Text style={styles.summaryLabel}>Date</Text>
            <Text style={styles.summaryValue}>
              {bookingData.selectedDate ? formatDate(bookingData.selectedDate) : 'Not selected'}
            </Text>
          </View>
        </View>
        
        <View style={styles.summaryRow}>
          <MaterialIcons name={getSummaryIcon('time')} size={20} color="#FF5722" />
          <View style={styles.summaryContent}>
            <Text style={styles.summaryLabel}>Time</Text>
            <Text style={styles.summaryValue}>
              {bookingData.selectedTime ? formatTime(bookingData.selectedTime) : 'Not selected'}
            </Text>
          </View>
        </View>
        
        <View style={styles.summaryRow}>
          <MaterialIcons name={getSummaryIcon('location')} size={20} color="#607D8B" />
          <View style={styles.summaryContent}>
            <Text style={styles.summaryLabel}>Location</Text>
            <Text style={styles.summaryValue}>{bookingData.provider?.location || 'Location not specified'}</Text>
          </View>
        </View>
        
        <View style={[styles.summaryRow, styles.costRow]}>
          <MaterialIcons name={getSummaryIcon('cost')} size={20} color="#4CAF50" />
          <View style={styles.summaryContent}>
            <Text style={styles.summaryLabel}>Consultation Fee</Text>
            <Text style={[styles.summaryValue, styles.costValue]}>
              {bookingData.provider?.consultationFee || 'Fee not specified'}
            </Text>
          </View>
        </View>
      </View>
      
      {bookingData.notes && (
        <View style={styles.notesSection}>
          <Text style={styles.notesTitle}>Additional Notes:</Text>
          <Text style={styles.notesText}>{bookingData.notes}</Text>
        </View>
      )}
      
      <View style={styles.importantInfo}>
        <MaterialIcons name="info" size={20} color="#2196F3" />
        <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>Important Information:</Text>
          <Text style={styles.infoText}>
            • Please arrive 15 minutes before your appointment{'\n'}
            • Bring a valid ID and insurance card{'\n'}
            • You will receive a confirmation email shortly{'\n'}
            • You can reschedule up to 24 hours before the appointment
          </Text>
        </View>
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.editButton} onPress={onEdit}>
          <MaterialIcons name="edit" size={16} color="#2196F3" />
          <Text style={styles.editButtonText}>Edit Details</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
          <MaterialIcons name="check" size={16} color="#fff" />
          <Text style={styles.confirmButtonText}>Confirm Booking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginLeft: 12
  },
  summaryCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  costRow: {
    borderBottomWidth: 0,
    marginBottom: 0,
    backgroundColor: '#e8f5e8',
    marginHorizontal: -16,
    marginBottom: -16,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12
  },
  summaryContent: {
    flex: 1,
    marginLeft: 12
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    marginBottom: 4
  },
  summaryValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    marginBottom: 2
  },
  summarySubValue: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic'
  },
  costValue: {
    color: '#4CAF50',
    fontSize: 18
  },
  notesSection: {
    backgroundColor: '#e7f3ff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16
  },
  notesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6
  },
  notesText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20
  },
  importantInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3'
  },
  infoContent: {
    flex: 1,
    marginLeft: 12
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6
  },
  infoText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e7f3ff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#2196F3',
    flex: 0.45
  },
  editButtonText: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '600',
    marginLeft: 6
  },
  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    flex: 0.45,
    justifyContent: 'center'
  },
  confirmButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
    marginLeft: 6
  }
});

export default BookingSummary;