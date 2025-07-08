import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

// Import components
import Header from '../../components/common/Header';
import SearchBar from '../../components/common/SearchBar';
import FilterChips from '../../components/common/FilterChips';
import ProviderCard from '../../components/booking/ProviderCard';
import AppointmentTypeCard from '../../components/booking/AppointmentTypeCard';
import TimeSlotPicker from '../../components/booking/TimeSlotPicker';
import BookingSummary from '../../components/booking/BookingSummary';
import EmptyState from '../../components/common/EmptyState';
import LoadingState from '../../components/common/LoadingState';

// Comprehensive healthcare providers database
const healthcareProviders = {
  doctors: [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      qualification: 'MD, FACC',
      experience: '15 years',
      rating: 4.9,
      location: 'Heart Care Center',
      availability: ['Mon', 'Wed', 'Fri'],
      timeSlots: ['09:00', '11:00', '14:00', '16:00'], // 24-hour format for TimeSlotPicker
      consultationFee: '$150',
      image: '👩‍⚕️',
      specializations: ['Heart Disease', 'Hypertension', 'Cardiac Surgery'],
      languages: ['English', 'Spanish'],
      nextAvailable: '2025-07-09'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Dermatologist',
      qualification: 'MD, FAAD',
      experience: '12 years',
      rating: 4.8,
      location: 'Skin Health Clinic',
      availability: ['Tue', 'Thu', 'Sat'],
      timeSlots: ['10:00', '13:00', '15:00', '17:00'], // 24-hour format for TimeSlotPicker
      consultationFee: '$120',
      image: '👨‍⚕️',
      specializations: ['Acne Treatment', 'Skin Cancer', 'Cosmetic Dermatology'],
      languages: ['English', 'Mandarin'],
      nextAvailable: '2025-07-08'
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrician',
      qualification: 'MD, FAAP',
      experience: '10 years',
      rating: 4.9,
      location: 'Children\'s Medical Center',
      availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      timeSlots: ['08:00', '10:00', '14:00', '16:00'], // 24-hour format for TimeSlotPicker
      consultationFee: '$100',
      image: '👩‍⚕️',
      specializations: ['Child Development', 'Immunizations', 'Pediatric Care'],
      languages: ['English', 'Spanish'],
      nextAvailable: '2025-07-07'
    }
  ],
  hospitals: [
    {
      id: 1,
      name: 'Central Medical Hospital',
      type: 'General Hospital',
      rating: 4.7,
      location: 'Downtown Medical District',
      departments: ['Emergency', 'Cardiology', 'Orthopedics', 'Neurology'],
      availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      timeSlots: ['08:00', '10:00', '12:00', '14:00', '16:00'], // 24-hour format for TimeSlotPicker
      phoneNumber: '+1 (555) 123-4567',
      address: '123 Medical Center Dr, Downtown',
      image: '🏥',
      services: ['24/7 Emergency', 'Surgery', 'Diagnostics', 'Specialized Care'],
      insurance: ['Medicare', 'Medicaid', 'Private Insurance'],
      parkingAvailable: true
    },
    {
      id: 2,
      name: 'Specialty Care Institute',
      type: 'Specialty Hospital',
      rating: 4.8,
      location: 'Medical Plaza',
      departments: ['Oncology', 'Radiology', 'Pathology', 'Rehabilitation'],
      availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      timeSlots: ['09:00', '11:00', '13:00', '15:00'], // 24-hour format for TimeSlotPicker
      phoneNumber: '+1 (555) 234-5678',
      address: '456 Specialty Blvd, Medical Plaza',
      image: '🏥',
      services: ['Cancer Treatment', 'Advanced Imaging', 'Lab Services', 'Physical Therapy'],
      insurance: ['Most Major Insurance Plans'],
      parkingAvailable: true
    }
  ]
};

export default function BookingScreen() {
  const [page, setPage] = useState('main');
  const [selectedType, setSelectedType] = useState(null);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [appointmentType, setAppointmentType] = useState('consultation');
  const [loading, setLoading] = useState(false);

  const appointmentTypes = [
    { key: 'consultation', label: 'Consultation', icon: '💬', description: 'General medical consultation' },
    { key: 'checkup', label: 'Check-up', icon: '🔍', description: 'Routine health examination' },
    { key: 'followup', label: 'Follow-up', icon: '📋', description: 'Follow-up appointment' },
    { key: 'emergency', label: 'Urgent Care', icon: '🚨', description: 'Urgent medical attention' }
  ];

  const filters = ['All', 'Available Today', 'High Rating', 'Nearby'];

  // Search handler
  const handleSearch = (text = '') => {
    setSearch(text);
    const searchTerm = text.toLowerCase();
    
    if (selectedType === 'doctor') {
      const filteredDoctors = searchTerm === '' 
        ? healthcareProviders.doctors 
        : healthcareProviders.doctors.filter(d => 
            d.name.toLowerCase().includes(searchTerm) ||
            d.specialty.toLowerCase().includes(searchTerm) ||
            d.specializations.some(spec => spec.toLowerCase().includes(searchTerm))
          );
      setResults(filteredDoctors);
    } else if (selectedType === 'hospital') {
      const filteredHospitals = searchTerm === '' 
        ? healthcareProviders.hospitals 
        : healthcareProviders.hospitals.filter(h => 
            h.name.toLowerCase().includes(searchTerm) ||
            h.location.toLowerCase().includes(searchTerm) ||
            h.departments.some(dept => dept.toLowerCase().includes(searchTerm))
          );
      setResults(filteredHospitals);
    }
  };

  // Load initial results when page changes to search
  useEffect(() => {
    if (page === 'search' && selectedType) {
      handleSearch(''); // Load all providers initially
    }
  }, [page, selectedType]);

  // Generate available dates for the next 7 days
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const isAvailable = selectedResult?.availability?.includes(dayName);
      
      if (isAvailable) {
        dates.push({
          value: date.toISOString().split('T')[0], // YYYY-MM-DD format
          display: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : 
                   date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          day: dayName
        });
      }
    }
    
    return dates;
  };

  const handleBookAppointment = () => {
    if (!selectedResult || !selectedDate || !selectedTime) {
      Alert.alert('Error', 'Please select all required fields');
      return;
    }

    // Generate booking confirmation details
    const bookingId = `BK${Date.now().toString().slice(-6)}`;
    const appointmentTypeName = appointmentTypes.find(t => t.key === appointmentType)?.label || appointmentType;
    const formattedDate = new Date(selectedDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // Convert time from 24-hour to 12-hour format for display
    const formatTime = (time24) => {
      const [hours, minutes] = time24.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      return `${displayHour}:${minutes} ${ampm}`;
    };

    const formattedTime = formatTime(selectedTime);
    
    // Create booking object for future reference
    const bookingDetails = {
      id: bookingId,
      provider: selectedResult,
      appointmentType: appointmentTypeName,
      date: selectedDate,
      formattedDate,
      time: selectedTime,
      formattedTime,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    // Show detailed confirmation popup
    Alert.alert(
      '🎉 Booking Confirmed!',
      `Your appointment has been successfully booked!\n\n` +
      `📋 Booking ID: ${bookingId}\n` +
      `👨‍⚕️ Provider: ${selectedResult.name}\n` +
      `🏥 Location: ${selectedResult.location || selectedResult.address}\n` +
      `📅 Date: ${formattedDate}\n` +
      `⏰ Time: ${formattedTime}\n` +
      `🎯 Type: ${appointmentTypeName}\n` +
      `💰 Fee: ${selectedResult.consultationFee || 'Contact for pricing'}\n\n` +
      `You will receive a confirmation email shortly.`,
      [
        {
          text: 'View Details',
          style: 'default',
          onPress: () => showBookingDetails(bookingDetails)
        },
        {
          text: 'Book Another',
          style: 'default',
          onPress: () => resetBookingForm()
        },
        {
          text: 'Done',
          style: 'default',
          onPress: () => {
            console.log('Booking saved:', bookingDetails);
            resetBookingForm();
          }
        }
      ]
    );
  };

  const showBookingDetails = (booking) => {
    Alert.alert(
      '📋 Booking Details',
      `Booking ID: ${booking.id}\n\n` +
      `Please save this booking ID for your records.\n\n` +
      `📞 To reschedule or cancel, contact:\n` +
      `${booking.provider.phoneNumber || 'Contact provider directly'}\n\n` +
      `🕐 Please arrive 15 minutes early for your appointment.`,
      [
        { text: 'Save to Calendar', onPress: () => console.log('Calendar integration') },
        { text: 'OK', onPress: () => resetBookingForm() }
      ]
    );
  };

  const resetBookingForm = () => {
    setPage('main');
    setSelectedResult(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setSearch('');
    setResults([]);
    setSelectedType(null);
    setAppointmentType('consultation');
  };

  if (loading) {
    return <LoadingState />;
  }

  // Main selection page
  if (page === 'main') {
    return (
      <View style={styles.container}>
        <Header 
          title="Book Appointment"
          subtitle="Find and book appointments with healthcare providers"
        />
        
        <ScrollView 
          style={styles.scrollContent}
          contentContainerStyle={styles.scrollContentContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionTitle}>Select Service Type</Text>
          
          <View style={styles.typeSelection}>
            <TouchableOpacity
              style={[styles.typeCard, selectedType === 'doctor' && styles.selectedCard]}
              onPress={() => setSelectedType('doctor')}
            >
              <Text style={styles.typeIcon}>👨‍⚕️</Text>
              <Text style={styles.typeTitle}>Doctor</Text>
              <Text style={styles.typeDescription}>Consult with specialist doctors</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.typeCard, selectedType === 'hospital' && styles.selectedCard]}
              onPress={() => setSelectedType('hospital')}
            >
              <Text style={styles.typeIcon}>🏥</Text>
              <Text style={styles.typeTitle}>Hospital</Text>
              <Text style={styles.typeDescription}>Book appointments at hospitals</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Select Appointment Type</Text>
          
          <AppointmentTypeCard
            types={appointmentTypes}
            selectedType={appointmentType}
            onTypeChange={setAppointmentType}
          />

          {/* Selection Summary */}
          {selectedType && (
            <View style={styles.selectionSummary}>
              <Text style={styles.summaryTitle}>Your Selections:</Text>
              <Text style={styles.summaryItem}>
                📋 Service: {selectedType === 'doctor' ? 'Doctor Consultation' : 'Hospital Appointment'}
              </Text>
              <Text style={styles.summaryItem}>
                💼 Type: {appointmentTypes.find(t => t.key === appointmentType)?.label || appointmentType}
              </Text>
            </View>
          )}

          {selectedType && (
            <View style={styles.continueSection}>
              <Text style={styles.continueHint}>Ready to proceed? 👇</Text>
              <TouchableOpacity
                style={styles.continueButton}
                onPress={() => setPage('search')}
              >
                <Text style={styles.continueButtonText}>Continue to Find Providers</Text>
                <MaterialIcons name="arrow-forward" size={20} color="#fff" style={styles.continueIcon} />
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }

  // Search and selection page
  if (page === 'search') {
    return (
      <View style={styles.container}>
        <Header 
          title={`Find ${selectedType === 'doctor' ? 'Doctor' : 'Hospital'}`}
          subtitle={`Search for ${selectedType === 'doctor' ? 'doctors' : 'hospitals'} in your area`}
          showBackButton={true}
          onBack={() => setPage('main')}
        />
        
        <SearchBar
          placeholder={`Search ${selectedType === 'doctor' ? 'doctors or specialties' : 'hospitals or departments'}...`}
          value={search}
          onChangeText={handleSearch}
          onSearch={() => handleSearch(search)}
          onSubmitEditing={() => handleSearch(search)}
          onClear={() => handleSearch('')}
        />

        <View style={styles.filterContainer}>
          <FilterChips
            filters={[
              { key: 'all', label: 'All' },
              { key: 'available', label: 'Available Today' },
              { key: 'rating', label: 'High Rating' },
              { key: 'nearby', label: 'Nearby' }
            ]}
            selectedFilter="all"
            onFilterChange={() => {}}
          />
        </View>

        {results.length === 0 ? (
          <EmptyState 
            customIcon="🔍"
            title="No Results Found"
            message="No providers match your search criteria. Try different keywords or clear the search to see all providers."
          />
        ) : (
          <ScrollView 
            style={styles.resultsContainer}
            contentContainerStyle={styles.resultsContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.resultsHeader}>
              {search ? `Search Results (${results.length})` : `Available ${selectedType === 'doctor' ? 'Doctors' : 'Hospitals'} (${results.length})`}
            </Text>
            {results.map(provider => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                type={selectedType}
                onSelect={() => {
                  setSelectedResult(provider);
                  setPage('booking');
                }}
              />
            ))}
          </ScrollView>
        )}
      </View>
    );
  }

  // Booking details page
  if (page === 'booking') {
    return (
      <View style={styles.container}>
        <Header 
          title="Book Appointment"
          subtitle={`With ${selectedResult.name}`}
          showBackButton={true}
          onBack={() => setPage('search')}
        />
        
        <ScrollView style={styles.content}>
          {/* Booking Progress */}
          <View style={styles.progressContainer}>
            <Text style={styles.progressTitle}>Booking Progress</Text>
            <View style={styles.progressSteps}>
              <View style={styles.progressStep}>
                <View style={[styles.progressDot, styles.completedDot]} />
                <Text style={styles.progressText}>Provider Selected</Text>
              </View>
              <View style={styles.progressLine} />
              <View style={styles.progressStep}>
                <View style={[styles.progressDot, selectedDate ? styles.completedDot : styles.pendingDot]} />
                <Text style={[styles.progressText, selectedDate && styles.completedText]}>Date Selected</Text>
              </View>
              <View style={styles.progressLine} />
              <View style={styles.progressStep}>
                <View style={[styles.progressDot, selectedTime ? styles.completedDot : styles.pendingDot]} />
                <Text style={[styles.progressText, selectedTime && styles.completedText]}>Time Selected</Text>
              </View>
            </View>
          </View>

          <ProviderCard
            provider={selectedResult}
            type={selectedType}
            compact={true}
          />

          {/* Date Selection */}
          <View style={styles.dateSection}>
            <Text style={styles.sectionTitle}>Select Date</Text>
            {getAvailableDates().length > 0 ? (
              <View style={styles.dateOptions}>
                {getAvailableDates().map((date, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dateButton,
                      selectedDate === date.value && styles.selectedDateButton
                    ]}
                    onPress={() => setSelectedDate(date.value)}
                  >
                    <Text style={[
                      styles.dateButtonText,
                      selectedDate === date.value && styles.selectedDateButtonText
                    ]}>
                      {date.display}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View style={styles.noDateContainer}>
                <Text style={styles.noDateText}>
                  📅 No available dates in the next 7 days
                </Text>
                <Text style={styles.noDateSubtext}>
                  Provider is available on: {selectedResult.availability.join(', ')}
                </Text>
              </View>
            )}
          </View>

          <TimeSlotPicker
            availableSlots={selectedResult.timeSlots || []}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onTimeSelect={setSelectedTime}
          />

          <BookingSummary
            provider={selectedResult}
            appointmentType={appointmentTypes.find(t => t.key === appointmentType)?.label || appointmentType}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onConfirm={handleBookAppointment}
            isComplete={!!(selectedDate && selectedTime)}
          />
        </ScrollView>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    padding: 16,
    paddingBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  typeSelection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  typeCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 8,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedCard: {
    borderColor: '#007AFF',
    backgroundColor: '#f0f8ff',
  },
  typeIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  typeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  typeDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  continueSection: {
    marginTop: 24,
    alignItems: 'center',
  },
  continueHint: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    textAlign: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  continueIcon: {
    marginLeft: 4,
  },
  selectionSummary: {
    backgroundColor: '#f0f8ff',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#e3f2fd',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1976d2',
    marginBottom: 8,
  },
  summaryItem: {
    fontSize: 14,
    color: '#424242',
    marginBottom: 4,
  },
  resultsContainer: {
    flex: 1,
  },
  resultsContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  resultsHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginVertical: 12,
  },
  filterContainer: {
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  dateSection: {
    marginBottom: 20,
  },
  dateOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dateButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
    minWidth: 80,
    alignItems: 'center',
  },
  selectedDateButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  dateButtonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  selectedDateButtonText: {
    color: '#fff',
  },
  progressContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  progressSteps: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressStep: {
    alignItems: 'center',
    flex: 1,
  },
  progressDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginBottom: 8,
  },
  completedDot: {
    backgroundColor: '#4CAF50',
  },
  pendingDot: {
    backgroundColor: '#E0E0E0',
  },
  progressLine: {
    height: 2,
    backgroundColor: '#E0E0E0',
    flex: 1,
    marginHorizontal: 8,
    marginBottom: 16,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  completedText: {
    color: '#4CAF50',
    fontWeight: '500',
  },
  noDateContainer: {
    backgroundColor: '#fff3cd',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffeaa7',
  },
  noDateText: {
    fontSize: 14,
    color: '#856404',
    textAlign: 'center',
    marginBottom: 4,
  },
  noDateSubtext: {
    fontSize: 12,
    color: '#6c5404',
    textAlign: 'center',
  },
});
