
import RecommendationsScreen from './RecommendationsScreen';
import VaccinationScreen from './VaccinationScreen';
import HealthReportScreen from './HealthReportScreen';
import PersonalInformationScreen from './PersonalInformationScreen';
import MedicineInfoScreen from './MedicineInfoScreen';
import RemainderScreen from './RemainderScreen'; 
import  { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const screens = [
  { label: 'Personal Information', value: 'PersonalInformation' },
  { label: 'Health Report', value: 'HealthReport' },
  { label: 'Remainder', value: 'Remainder' },
  { label: 'Recommendations', value: 'Recommendations' },
  { label: 'Vaccination', value: 'Vaccination' },
  { label: 'Medicine Info', value: 'MedicineInfo' },
];

export default function HealthHistoryScreen() {
  const [selectedScreen, setSelectedScreen] = useState('PersonalInformation');

  let ScreenComponent;
  switch (selectedScreen) {
    case 'HealthReport':
      ScreenComponent = HealthReportScreen;
      break;
    case 'Remainder':
      ScreenComponent = RemainderScreen;
      break;
    case 'Recommendations':
      ScreenComponent = RecommendationsScreen;
      break;
    case 'Vaccination':
      ScreenComponent = VaccinationScreen;
      break;
    case 'MedicineInfo':
      ScreenComponent = MedicineInfoScreen;
      break;
    case 'PersonalInformation':
    default:
      ScreenComponent = PersonalInformationScreen;
      break;
  }

  return (
    <View style={styles.container}>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedScreen}
          style={styles.picker}
          itemStyle={{ fontSize: 16, height: 48 }} // Adjusted font size and height for better visibility
          onValueChange={(itemValue) => setSelectedScreen(itemValue)}
          mode="dropdown"
        >
          {screens.map(screen => (
            <Picker.Item key={screen.value} label={screen.label} value={screen.value} />
          ))}
        </Picker>
      </View>
      <View style={styles.screenContainer}>
        <ScreenComponent />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    backgroundColor: '#f5f7fa' // subtle background color
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#2d3436', 
    marginBottom: 16 
  },
  pickerWrapper: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginTop: 50,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e1e5ea',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden'
  },
  picker: {
    width: '100%',
    color: '#0984e3',
    fontSize: 16,
    height: 56 // Increased height for better text visibility
  },
  screenContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 24
  }
});


