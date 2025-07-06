// screens/ReminderScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, AppState } from 'react-native';

const sampleReminders = [
  {
    id: '1',
    type: 'Tablet',
    name: 'Paracetamol',
    time: '08:00 AM',
    dosage: '500mg',
  },
  {
    id: '2',
    type: 'Appointment',
    name: 'Doctor Visit',
    date: '2024-07-10',
    time: '11:30 AM',
    location: 'City Clinic',
  },
  {
    id: '3',
    type: 'Scan',
    name: 'MRI Scan',
    date: '2024-07-15',
    time: '02:00 PM',
    location: 'Health Diagnostics',
  },
];

function renderReminder({ item }) {
  if (item.type === 'Tablet') {
    return (
      <View style={styles.reminderBox}>
        <Text style={styles.reminderTitle}>💊 {item.name}</Text>
        <Text>Time: {item.time}</Text>
        <Text>Dosage: {item.dosage}</Text>
      </View>
    );
  }
  if (item.type === 'Appointment') {
    return (
      <View style={styles.reminderBox}>
        <Text style={styles.reminderTitle}>📅 {item.name}</Text>
        <Text>Date: {item.date}</Text>
        <Text>Time: {item.time}</Text>
        <Text>Location: {item.location}</Text>
      </View>
    );
  }
  if (item.type === 'Scan') {
    return (
      <View style={styles.reminderBox}>
        <Text style={styles.reminderTitle}>🩻 {item.name}</Text>
        <Text>Date: {item.date}</Text>
        <Text>Time: {item.time}</Text>
        <Text>Location: {item.location}</Text>
      </View>
    );
  }
  return null;
}

export default function ReminderScreen() {
  useEffect(() => {
    // Helper to parse time string to Date object for today
    function getTabletReminderDate(timeStr) {
      const [hourMin, ampm] = timeStr.split(' ');
      let [hour, min] = hourMin.split(':').map(Number);
      if (ampm === 'PM' && hour !== 12) hour += 12;
      if (ampm === 'AM' && hour === 12) hour = 0;
      const now = new Date();
      const reminderDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        hour,
        min,
        0,
        0
      );
      return reminderDate;
    }

    // Helper to parse date and time string to Date object
    function getEventReminderDate(dateStr, timeStr) {
      const [year, month, day] = dateStr.split('-').map(Number);
      const [hourMin, ampm] = timeStr.split(' ');
      let [hour, min] = hourMin.split(':').map(Number);
      if (ampm === 'PM' && hour !== 12) hour += 12;
      if (ampm === 'AM' && hour === 12) hour = 0;
      return new Date(year, month - 1, day, hour, min, 0, 0);
    }

    // Schedule popups
    const timers = [];

    sampleReminders.forEach(reminder => {
      let showAt;
      let message;
      if (reminder.type === 'Tablet') {
        const reminderDate = getTabletReminderDate(reminder.time);
        showAt = new Date(reminderDate.getTime() - 10 * 60 * 1000); // 10 mins before
        message = `Tablet Reminder: Take ${reminder.name} (${reminder.dosage}) at ${reminder.time}`;
      } else {
        const reminderDate = getEventReminderDate(reminder.date, reminder.time);
        showAt = new Date(reminderDate.getTime() - 24 * 60 * 60 * 1000); // 24 hours before
        message = `${reminder.type} Reminder: ${reminder.name} at ${reminder.time} on ${reminder.date}`;
      }

      const now = new Date();
      const msUntilShow = showAt - now;
      if (msUntilShow > 0) {
        const timer = setTimeout(() => {
          Alert.alert('Reminder', message);
        }, msUntilShow);
        timers.push(timer);
      }
    });

    // Clean up timers on unmount
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={sampleReminders}
        renderItem={renderReminder}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f7f7f7' },
  title: { fontSize: 22, fontWeight: 'bold', marginVertical: 20 },
  list: { width: '90%' },
  reminderBox: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  reminderTitle: { fontSize: 18, fontWeight: '600', marginBottom: 6 },
});
