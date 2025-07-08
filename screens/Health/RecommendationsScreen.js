// screens/Health/RecommendationsScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';

// Import components
import Header from '../../components/common/Header';
import FilterChips from '../../components/common/FilterChips';
import RecommendationCard from '../../components/health/RecommendationCard';
import EmptyState from '../../components/common/EmptyState';

const recommendationsData = {
  daily: [
    {
      id: 1,
      category: 'Hydration',
      title: 'Stay Hydrated',
      description: 'Drink 8-10 glasses of water throughout the day',
      icon: '💧',
      priority: 'high',
      timeframe: 'Throughout the day',
      benefits: 'Improves energy, aids digestion, supports kidney function'
    },
    {
      id: 2,
      category: 'Exercise',
      title: 'Daily Movement',
      description: 'Take a 30-minute walk or light exercise',
      icon: '🚶‍♂️',
      priority: 'high',
      timeframe: 'Morning or evening',
      benefits: 'Boosts cardiovascular health, improves mood'
    },
    {
      id: 3,
      category: 'Sleep',
      title: 'Quality Sleep',
      description: 'Maintain 7-9 hours of quality sleep',
      icon: '😴',
      priority: 'high',
      timeframe: 'Nighttime',
      benefits: 'Enhances recovery, improves cognitive function'
    }
  ],
  nutrition: [
    {
      id: 4,
      category: 'Diet',
      title: 'Balanced Meals',
      description: 'Include fruits, vegetables, proteins, and whole grains',
      icon: '🥗',
      priority: 'high',
      timeframe: 'Each meal',
      benefits: 'Provides essential nutrients, maintains energy levels'
    },
    {
      id: 5,
      category: 'Vitamins',
      title: 'Vitamin D',
      description: 'Get 15-20 minutes of sunlight or consider supplements',
      icon: '☀️',
      priority: 'medium',
      timeframe: 'Morning',
      benefits: 'Supports bone health, immune system'
    },
    {
      id: 6,
      category: 'Limits',
      title: 'Reduce Sugar',
      description: 'Limit processed foods and added sugars',
      icon: '🚫',
      priority: 'medium',
      timeframe: 'Daily',
      benefits: 'Prevents diabetes, maintains healthy weight'
    }
  ],
  wellness: [
    {
      id: 7,
      category: 'Mental Health',
      title: 'Mindfulness',
      description: 'Practice 5-10 minutes of meditation or deep breathing',
      icon: '🧘‍♀️',
      priority: 'medium',
      timeframe: 'Morning or evening',
      benefits: 'Reduces stress, improves focus and emotional well-being'
    },
    {
      id: 8,
      category: 'Social',
      title: 'Stay Connected',
      description: 'Maintain social connections with family and friends',
      icon: '👥',
      priority: 'medium',
      timeframe: 'Regular basis',
      benefits: 'Improves mental health, provides emotional support'
    },
    {
      id: 9,
      category: 'Learning',
      title: 'Mental Stimulation',
      description: 'Read, solve puzzles, or learn something new',
      icon: '📚',
      priority: 'low',
      timeframe: 'Daily',
      benefits: 'Keeps mind sharp, prevents cognitive decline'
    }
  ],
  preventive: [
    {
      id: 10,
      category: 'Checkups',
      title: 'Regular Health Screenings',
      description: 'Schedule annual checkups and recommended screenings',
      icon: '🩺',
      priority: 'high',
      timeframe: 'As scheduled',
      benefits: 'Early detection of health issues, preventive care'
    },
    {
      id: 11,
      category: 'Hygiene',
      title: 'Hand Hygiene',
      description: 'Wash hands frequently with soap for 20 seconds',
      icon: '🤲',
      priority: 'high',
      timeframe: 'Throughout the day',
      benefits: 'Prevents infections, maintains good health'
    },
    {
      id: 12,
      category: 'Vaccinations',
      title: 'Stay Up-to-Date',
      description: 'Keep vaccinations current as recommended by your doctor',
      icon: '💉',
      priority: 'high',
      timeframe: 'As scheduled',
      benefits: 'Prevents serious diseases, protects community health'
    }
  ]
};

export default function RecommendationsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('daily');

  const categories = ['daily', 'nutrition', 'wellness', 'preventive'];

  const getAllRecommendations = () => {
    return [
      ...recommendationsData.daily,
      ...recommendationsData.nutrition,
      ...recommendationsData.wellness,
      ...recommendationsData.preventive
    ];
  };

  const filteredRecommendations = selectedCategory === 'all' 
    ? getAllRecommendations()
    : recommendationsData[selectedCategory] || [];

  const handleRecommendationPress = (recommendation) => {
    // Handle recommendation action (could open detail screen, mark as completed, etc.)
    console.log('Recommendation pressed:', recommendation.title);
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Health Recommendations"
        subtitle={`${filteredRecommendations.length} recommendations for better health`}
      />
      
      <FilterChips
        options={categories}
        selectedFilter={selectedCategory}
        onFilterChange={setSelectedCategory}
      />

      {filteredRecommendations.length === 0 ? (
        <EmptyState 
          title="No Recommendations Found"
          subtitle="Check back later for personalized health tips"
          icon="💡"
        />
      ) : (
        <FlatList
          data={filteredRecommendations}
          renderItem={({ item }) => (
            <RecommendationCard
              recommendation={item}
              onPress={() => handleRecommendationPress(item)}
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
  listContainer: {
    padding: 16,
  },
  separator: {
    height: 8,
  },
});
