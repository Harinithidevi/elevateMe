import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

/**
 * CategoryFilter Component
 * 
 * A document category filter with visual chips, icons, and count badges.
 * 
 * @param {Array} categories - Array of category strings
 * @param {string} selectedCategory - Currently selected category
 * @param {Function} onCategorySelect - Callback function called when a category is selected
 * @param {Function} onCategoryChange - Alternative prop name for onCategorySelect (backward compatibility)
 * @param {Object} documentCounts - Object with category counts {category: count}
 */
const CategoryFilter = ({ 
  categories = [], 
  selectedCategory = 'all', 
  onCategorySelect = () => {}, 
  onCategoryChange = () => {}, // Alternative prop name for backward compatibility
  documentCounts = {} 
}) => {
  // Use onCategorySelect if provided, otherwise use onCategoryChange
  const handleCategorySelect = onCategorySelect !== (() => {}) ? onCategorySelect : onCategoryChange;
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'all': return 'list';
      case 'laboratory': return 'science';
      case 'imaging': return 'medical-services';
      case 'prescription': return 'medication';
      case 'vaccination': return 'vaccines';
      case 'report': return 'description';
      case 'certificate': return 'verified';
      default: return 'folder';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'all': return '#607D8B';
      case 'laboratory': return '#4CAF50';
      case 'imaging': return '#2196F3';
      case 'prescription': return '#FF9800';
      case 'vaccination': return '#9C27B0';
      case 'report': return '#795548';
      case 'certificate': return '#00BCD4';
      default: return '#9E9E9E';
    }
  };

  const formatCategoryName = (category) => {
    if (category === 'all') return 'All Documents';
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter by Category</Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesScroll}
        contentContainerStyle={styles.categoriesContainer}
      >
        {Array.isArray(categories) && categories.length > 0 ? categories.map((category) => {
          if (!category) return null;
          
          const isSelected = selectedCategory === category;
          const categoryColor = getCategoryColor(category);
          const count = documentCounts?.[category] || 0;
          
          return (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                isSelected && { backgroundColor: categoryColor }
              ]}
              onPress={() => {
                if (typeof handleCategorySelect === 'function') {
                  handleCategorySelect(category);
                }
              }}
            >
              <View style={styles.categoryContent}>
                <MaterialIcons 
                  name={getCategoryIcon(category)} 
                  size={20} 
                  color={isSelected ? '#fff' : categoryColor} 
                />
                <Text style={[
                  styles.categoryText,
                  isSelected && styles.selectedCategoryText
                ]}>
                  {formatCategoryName(category)}
                </Text>
                {count > 0 && (
                  <View style={[
                    styles.countBadge,
                    isSelected && styles.selectedCountBadge
                  ]}>
                    <Text style={[
                      styles.countText,
                      isSelected && styles.selectedCountText
                    ]}>
                      {count}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        }) : null}
      </ScrollView>
      
      <View style={styles.filterStats}>
        <View style={styles.statItem}>
          <MaterialIcons name="folder" size={16} color="#666" />
          <Text style={styles.statText}>
            Total: {Object.values(documentCounts || {}).reduce((sum, count) => sum + count, 0)} documents
          </Text>
        </View>
        <View style={styles.statItem}>
          <MaterialIcons name="filter-list" size={16} color="#666" />
          <Text style={styles.statText}>
            Showing: {formatCategoryName(selectedCategory)}
          </Text>
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
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12
  },
  categoriesScroll: {
    marginBottom: 16
  },
  categoriesContainer: {
    paddingRight: 16
  },
  categoryChip: {
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    minWidth: 120
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  categoryText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
    marginLeft: 6,
    marginRight: 6
  },
  selectedCategoryText: {
    color: '#fff',
    fontWeight: '600'
  },
  countBadge: {
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center'
  },
  selectedCountBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)'
  },
  countText: {
    fontSize: 10,
    color: '#666',
    fontWeight: '600'
  },
  selectedCountText: {
    color: '#fff'
  },
  filterStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0'
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  statText: {
    fontSize: 11,
    color: '#666',
    marginLeft: 6,
    fontWeight: '500'
  }
});

export default CategoryFilter;
