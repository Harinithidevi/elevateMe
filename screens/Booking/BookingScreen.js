import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function BookingScreen() {
  const [page, setPage] = React.useState('main');
  const [selectedType, setSelectedType] = React.useState(null);
  const [search, setSearch] = React.useState('');
  const [results, setResults] = React.useState([]);
  const [selectedResult, setSelectedResult] = React.useState(null);

  // Dummy data for doctors and hospitals
  const doctors = [
    { id: 1, name: 'Dr. Alice Smith', specialty: 'Cardiologist' },
    { id: 2, name: 'Dr. Bob Johnson', specialty: 'Dermatologist' },
    { id: 3, name: 'Dr. Carol Lee', specialty: 'Pediatrician' },
  ];
  const hospitals = [
    { id: 1, name: 'City Hospital', location: 'Downtown' },
    { id: 2, name: 'Green Valley Clinic', location: 'Uptown' },
    { id: 3, name: 'Sunrise Medical Center', location: 'Suburbs' },
  ];

  // Search handler
  const handleSearch = (text) => {
    setSearch(text);
    if (selectedType === 'doctor') {
      setResults(doctors.filter(d => d.name.toLowerCase().includes(text.toLowerCase())));
    } else if (selectedType === 'hospital') {
      setResults(hospitals.filter(h => h.name.toLowerCase().includes(text.toLowerCase())));
    }
  };

  // Main page
  if (page === 'main') {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Book an Appointment</Text>
        <Text style={styles.subtitle}>Choose what you want to book</Text>
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => {
              setSelectedType('doctor');
              setPage('search');
              setSearch('');
              setResults(doctors);
            }}
          >
            <Ionicons name="medkit" size={44} color="#4F8EF7" style={styles.icon} />
            <Text style={styles.cardTitle}>Doctor</Text>
            <Text style={styles.cardDesc}>Consult with a specialist</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => {
              setSelectedType('hospital');
              setPage('search');
              setSearch('');
              setResults(hospitals);
            }}
          >
            <MaterialCommunityIcons name="hospital-building" size={44} color="#4F8EF7" style={styles.icon} />
            <Text style={styles.cardTitle}>Hospital</Text>
            <Text style={styles.cardDesc}>Book a hospital appointment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  // Search page
  if (page === 'search') {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={() => setPage('main')}>
          <Ionicons name="arrow-back" size={28} color="#4F8EF7" />
        </TouchableOpacity>
        <Text style={styles.title}>
          {selectedType === 'doctor' ? 'Search Doctor' : 'Search Hospital'}
        </Text>
        <View style={{ width: '100%', marginVertical: 16 }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderRadius: 10,
            paddingHorizontal: 12,
            elevation: 2,
          }}>
            <Ionicons name="search" size={22} color="#4F8EF7" />
            <Text
              style={{
                flex: 1,
                fontSize: 16,
                marginLeft: 8,
                color: '#22223b',
                paddingVertical: 12,
              }}
              onPress={() => {}}
            >
              <TextInput
                style={{ flex: 1, fontSize: 16, marginLeft: 8, color: '#22223b', paddingVertical: 8 }}
                placeholder={`Search ${selectedType === 'doctor' ? 'doctor' : 'hospital'}...`}
                value={search}
                onChangeText={handleSearch}
                autoFocus
              />
            </Text>
          </View>
          {/* Render search results */}
          {results.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#fff',
                borderRadius: 10,
                padding: 16,
                marginVertical: 8,
                elevation: 2,
              }}
              onPress={() => {
                setSelectedResult(item);
                setPage('confirm');
              }}
            >
              <Ionicons
                name={selectedType === 'doctor' ? 'person-circle' : 'business'}
                size={32}
                color="#4F8EF7"
                style={{ marginRight: 16 }}
              />
              <View>
                <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#22223b' }}>
                  {item.name}
                </Text>
                <Text style={{ color: '#6c757d', fontSize: 14 }}>
                  {selectedType === 'doctor' ? item.specialty : item.location}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  }

  // Confirm booking page
  if (page === 'confirm' && selectedResult) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <TouchableOpacity onPress={() => setPage('search')} style={{ position: 'absolute', top: 40, left: 24 }}>
          <Ionicons name="arrow-back" size={28} color="#4F8EF7" />
        </TouchableOpacity>
        <Ionicons
          name={selectedType === 'doctor' ? 'person-circle' : 'business'}
          size={64}
          color="#4F8EF7"
          style={{ marginBottom: 24 }}
        />
        <Text style={styles.title}>Confirm Booking</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#22223b', marginBottom: 8 }}>
          {selectedResult.name}
        </Text>
        <Text style={{ color: '#6c757d', fontSize: 16, marginBottom: 24 }}>
          {selectedType === 'doctor' ? selectedResult.specialty : selectedResult.location}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#4F8EF7',
            borderRadius: 10,
            paddingVertical: 16,
            paddingHorizontal: 48,
            marginTop: 16,
          }}
          onPress={() => {
            setPage('main');
            setSelectedResult(null);
            setSelectedType(null);
            setSearch('');
            setResults([]);
            // You can add booking logic here
            alert('Booking confirmed!');
          }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Confirm Booking</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f7fafd',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#22223b',
    marginBottom: 8,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#4F8EF7',
    marginBottom: 32,
    fontWeight: '500',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch', // Added to stretch cards vertically
    gap: 20,
    flexWrap: 'wrap', // Allow wrapping if not enough space
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingVertical: 28,
    paddingHorizontal: 24,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#4F8EF7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 8,
    marginHorizontal: 8,
    minWidth: 140,
    minHeight: 180,
    // Removed transition (not supported in React Native)
    flex: 1, // Allow cards to grow and fill space
    maxWidth: 180, // Prevent cards from being too wide
  },
  icon: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#22223b',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  cardDesc: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
  },
});
