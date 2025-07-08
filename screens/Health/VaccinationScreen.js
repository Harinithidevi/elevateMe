import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';

// Import components
import Header from '../../components/common/Header';
import FilterChips from '../../components/common/FilterChips';
import VaccinationCard from '../../components/health/VaccinationCard';
import EmptyState from '../../components/common/EmptyState';
import LoadingState from '../../components/common/LoadingState';

// Medical-standard vaccination schedule
const vaccinationSchedule = {
  infant: [
    {
      id: 1,
      name: 'Hepatitis B',
      shortName: 'HepB',
      ageRecommended: 'Birth',
      description: 'Protects against hepatitis B infection',
      doses: 3,
      schedule: ['Birth', '1-2 months', '6-18 months'],
      status: 'Completed',
      completedDoses: 3,
      lastReceived: '2024-03-15',
      nextDue: null,
      priority: 'essential',
      category: 'routine',
      ageGroup: 'Infant (0-1 yr)'
    },
    {
      id: 2,
      name: 'Diphtheria, Tetanus, Pertussis',
      shortName: 'DTaP',
      ageRecommended: '2 months',
      description: 'Protects against diphtheria, tetanus, and whooping cough',
      doses: 5,
      schedule: ['2 months', '4 months', '6 months', '15-18 months', '4-6 years'],
      status: 'Due Soon',
      completedDoses: 3,
      lastReceived: '2024-06-10',
      nextDue: '2025-08-15',
      priority: 'essential',
      category: 'routine',
      ageGroup: 'Infant (0-1 yr)'
    },
    {
      id: 3,
      name: 'Haemophilus influenzae type b',
      shortName: 'Hib',
      ageRecommended: '2 months',
      description: 'Protects against Haemophilus influenzae type b',
      doses: 4,
      schedule: ['2 months', '4 months', '6 months', '12-15 months'],
      status: 'Scheduled',
      completedDoses: 2,
      lastReceived: '2024-04-20',
      nextDue: '2025-07-20',
      priority: 'essential',
      category: 'routine',
      ageGroup: 'Infant (0-1 yr)'
    }
  ],
  child: [
    {
      id: 4,
      name: 'Measles, Mumps, Rubella',
      shortName: 'MMR',
      ageRecommended: '12-15 months',
      description: 'Protects against measles, mumps, and rubella',
      doses: 2,
      schedule: ['12-15 months', '4-6 years'],
      status: 'Completed',
      completedDoses: 2,
      lastReceived: '2024-05-10',
      nextDue: null,
      priority: 'essential',
      category: 'routine',
      ageGroup: 'Child (1-18 yr)'
    },
    {
      id: 5,
      name: 'Varicella (Chickenpox)',
      shortName: 'VAR',
      ageRecommended: '12-15 months',
      description: 'Protects against chickenpox',
      doses: 2,
      schedule: ['12-15 months', '4-6 years'],
      status: 'Overdue',
      completedDoses: 1,
      lastReceived: '2024-01-15',
      nextDue: '2025-01-15',
      priority: 'essential',
      category: 'routine',
      ageGroup: 'Child (1-18 yr)'
    }
  ],
  adult: [
    {
      id: 6,
      name: 'Influenza',
      shortName: 'Flu',
      ageRecommended: 'Annual',
      description: 'Annual flu vaccination',
      doses: 1,
      schedule: ['Every year'],
      status: 'Due Soon',
      completedDoses: 0,
      lastReceived: '2023-10-01',
      nextDue: '2024-10-01',
      priority: 'recommended',
      category: 'seasonal',
      ageGroup: 'Adult (18+ yr)'
    },
    {
      id: 7,
      name: 'COVID-19',
      shortName: 'COVID',
      ageRecommended: '6 months+',
      description: 'Protects against COVID-19',
      doses: 3,
      schedule: ['Initial', '3-4 weeks later', 'Booster after 6 months'],
      status: 'Completed',
      completedDoses: 3,
      lastReceived: '2024-03-01',
      nextDue: '2024-09-01',
      priority: 'essential',
      category: 'pandemic',
      ageGroup: 'Adult (18+ yr)'
    }
  ]
};

export default function VaccinationScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [loading, setLoading] = useState(false);

  // Age-based categories
  const ageCategories = [
    { key: 'all', label: 'All Ages' },
    { key: 'infant', label: 'Infant (0-1 yr)' },
    { key: 'child', label: 'Child (1-18 yr)' },
    { key: 'adult', label: 'Adult (18+ yr)' }
  ];

  // Status-based filters for tracking
  const statusFilters = [
    { key: 'all', label: 'All Status' },
    { key: 'Completed', label: 'Completed ✓' },
    { key: 'Due Soon', label: 'Yet to Take' },
    { key: 'Overdue', label: 'Missed/Overdue' },
    { key: 'Scheduled', label: 'Scheduled' }
  ];

  const getAllVaccinations = () => {
    return [
      ...vaccinationSchedule.infant,
      ...vaccinationSchedule.child,
      ...vaccinationSchedule.adult
    ];
  };

  const getFilteredVaccinations = () => {
    let vaccinations = selectedCategory === 'all' 
      ? getAllVaccinations()
      : (vaccinationSchedule[selectedCategory] || []);

    // Filter by status
    if (selectedStatus !== 'all') {
      vaccinations = vaccinations.filter(vaccine => vaccine.status === selectedStatus);
    }

    return vaccinations;
  };

  const getVaccinationStats = () => {
    const allVaccines = getAllVaccinations();
    return {
      total: allVaccines.length,
      completed: allVaccines.filter(v => v.status === 'Completed').length,
      pending: allVaccines.filter(v => v.status === 'Due Soon').length,
      overdue: allVaccines.filter(v => v.status === 'Overdue').length,
      scheduled: allVaccines.filter(v => v.status === 'Scheduled').length
    };
  };

  const filteredVaccinations = getFilteredVaccinations();
  const stats = getVaccinationStats();

  const handleVaccinationPress = (vaccination) => {
    console.log('Vaccination pressed:', vaccination.name);
    // Navigate to vaccination detail or schedule appointment
  };

  const handleSchedulePress = (vaccination) => {
    console.log('Schedule vaccination:', vaccination.name);
    // Navigate to appointment booking for this vaccination
  };

  if (loading) {
    return <LoadingState />;
  }

  return (
    <View style={styles.container}>
      <Header 
        title="Vaccination Records"
        subtitle={`${stats.completed}/${stats.total} completed • ${stats.overdue} overdue`}
      />
      
      {/* Vaccination Stats Summary */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats.completed}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, styles.pendingNumber]}>{stats.pending}</Text>
          <Text style={styles.statLabel}>Yet to Take</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, styles.overdueNumber]}>{stats.overdue}</Text>
          <Text style={styles.statLabel}>Missed</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, styles.scheduledNumber]}>{stats.scheduled}</Text>
          <Text style={styles.statLabel}>Scheduled</Text>
        </View>
      </View>

      {/* Age Category Filter */}
      <View style={styles.filterContainer}>
        <FilterChips
          filters={ageCategories}
          selectedFilter={selectedCategory}
          onFilterChange={setSelectedCategory}
        />
      </View>
      
      {/* Status Filter */}
      <View style={styles.filterContainer}>
        <FilterChips
          filters={statusFilters}
          selectedFilter={selectedStatus}
          onFilterChange={setSelectedStatus}
        />
      </View>

      {filteredVaccinations.length === 0 ? (
        <EmptyState 
          customIcon="💉"
          title="No Vaccinations Found"
          message={`No ${selectedStatus === 'all' ? '' : selectedStatus + ' '}vaccinations found for ${selectedCategory === 'all' ? 'all ages' : selectedCategory + ' category'}.`}
        />
      ) : (
        <FlatList
          data={filteredVaccinations}
          renderItem={({ item }) => (
            <VaccinationCard
              vaccination={item}
              onSchedule={() => handleSchedulePress(item)}
            />
          )}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#16a34a',
  },
  pendingNumber: {
    color: '#f59e0b',
  },
  overdueNumber: {
    color: '#dc2626',
  },
  scheduledNumber: {
    color: '#3b82f6',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
    textAlign: 'center',
  },
  filterContainer: {
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  listContainer: {
    padding: 16,
    paddingTop: 8,
  },
  separator: {
    height: 8,
  },
});
