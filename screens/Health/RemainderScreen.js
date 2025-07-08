// screens/Health/RemainderScreen.js
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Alert, 
  TouchableOpacity
} from 'react-native';

// Import components
import Header from '../../components/common/Header';
import FilterChips from '../../components/common/FilterChips';
import ReminderCard from '../../components/health/ReminderCard';
import EmptyState from '../../components/common/EmptyState';

const sampleReminders = [
  {
    id: '1',
    type: 'Medication',
    title: 'Paracetamol',
    time: '08:00 AM',
    dosage: '500mg',
    frequency: 'Daily',
    isActive: true,
    nextDue: 'Today',
    priority: 'high',
    icon: '💊',
    color: '#3B82F6',
    notes: 'Take with food'
  },
  {
    id: '2',
    type: 'Medication',
    title: 'Vitamin D',
    time: '09:00 AM',
    dosage: '1000 IU',
    frequency: 'Daily',
    isActive: true,
    nextDue: 'Today',
    priority: 'medium',
    icon: '💊',
    color: '#3B82F6',
    notes: 'Best absorbed with fats'
  },
  {
    id: '3',
    type: 'Appointment',
    title: 'Cardiology Checkup',
    date: '2025-07-10',
    time: '11:30 AM',
    location: 'City Medical Center',
    doctor: 'Dr. Smith',
    isActive: true,
    nextDue: 'Tomorrow',
    priority: 'high',
    icon: '👨‍⚕️',
    color: '#EF4444',
    notes: 'Bring previous reports'
  },
  {
    id: '4',
    type: 'Medical Test',
    title: 'Blood Sugar Check',
    time: '07:00 AM',
    frequency: 'Weekly',
    isActive: true,
    nextDue: 'Today',
    priority: 'medium',
    icon: '🩸',
    color: '#F59E0B',
    notes: 'Fasting required'
  },
  {
    id: '5',
    type: 'Exercise',
    title: 'Morning Walk',
    time: '06:30 AM',
    duration: '30 minutes',
    frequency: 'Daily',
    isActive: false,
    nextDue: 'Today',
    priority: 'low',
    icon: '🏃‍♂️',
    color: '#10B981',
    notes: 'Light exercise recommended'
  }
];

export default function ReminderScreen() {
  const [reminders, setReminders] = useState(sampleReminders);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filterOptions = ['All', 'Today', 'Medication', 'Appointment', 'Test', 'Scan', 'Active'];

  const handleToggleReminder = (id) => {
    setReminders(prev => 
      prev.map(reminder => 
        reminder.id === id 
          ? { ...reminder, isActive: !reminder.isActive }
          : reminder
      )
    );
  };

  const handleDeleteReminder = (id) => {
    Alert.alert(
      'Delete Reminder',
      'Are you sure you want to delete this reminder?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setReminders(prev => prev.filter(reminder => reminder.id !== id));
          }
        }
      ]
    );
  };

  const handleAddReminder = () => {
    Alert.alert(
      'Add New Reminder',
      'What type of reminder would you like to create?',
      [
        { 
          text: '💊 Medication', 
          onPress: () => console.log('Add medication reminder') 
        },
        { 
          text: '👨‍⚕️ Appointment', 
          onPress: () => console.log('Add appointment reminder') 
        },
        { 
          text: '🩸 Medical Test', 
          onPress: () => console.log('Add test reminder') 
        },
        { 
          text: '🏃‍♂️ Exercise', 
          onPress: () => console.log('Add exercise reminder') 
        },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const filteredReminders = reminders.filter(reminder => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Today') return reminder.nextDue === 'Today';
    if (selectedFilter === 'Active') return reminder.isActive;
    return reminder.type === selectedFilter;
  });

  // Set up timers for notifications (example implementation)
  useEffect(() => {
    const timers = [];
    reminders.forEach(reminder => {
      if (reminder.isActive && reminder.nextDue === 'Today') {
        // This would set up actual notification timers
        console.log(`Setting up timer for ${reminder.title} at ${reminder.time}`);
      }
    });

    // Clean up timers on unmount
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [reminders]);

  return (
    <View style={styles.container}>
      <Header 
        title="Health Reminders"
        subtitle={`${filteredReminders.filter(r => r.isActive).length} active reminders`}
      />
      
      <FilterChips
        options={filterOptions}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
      />

      {filteredReminders.length === 0 ? (
        <EmptyState 
          title="No Reminders Found"
          subtitle="Add a new reminder to get started"
          icon="🔔"
          actionText="Add Reminder"
          onAction={handleAddReminder}
        />
      ) : (
        <FlatList
          data={filteredReminders}
          renderItem={({ item }) => (
            <ReminderCard
              reminder={item}
              onToggle={handleToggleReminder}
              onDelete={handleDeleteReminder}
              onEdit={(id) => Alert.alert('Edit', `Edit reminder ${id}`)}
            />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}

      <TouchableOpacity 
        style={styles.addButton}
        onPress={handleAddReminder}
      >
        <Text style={styles.addButtonText}>+ Add Reminder</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  separator: {
    height: 12,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
