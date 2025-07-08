import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

/**
 * FilterChips Component
 * 
 * A horizontal scrollable filter component with selectable chips.
 * 
 * @param {Array} filters - Array of filter objects with {key, label, icon?} structure
 * @param {Array} options - Alternative prop name for filters (backward compatibility)
 * @param {string|null} selectedFilter - Key of the currently selected filter
 * @param {Function} onFilterChange - Callback function called when a filter is selected
 * @param {Object} containerStyle - Custom styles for the container
 * @param {Object} chipStyle - Custom styles for individual chips
 * @param {Object} activeChipStyle - Custom styles for the active chip
 * @param {Object} textStyle - Custom styles for chip text
 * @param {Object} activeTextStyle - Custom styles for active chip text
 */
const FilterChips = ({ 
  filters = [], 
  options = [], // Alternative prop name for backward compatibility
  selectedFilter = null, 
  onFilterChange = () => {}, 
  containerStyle = {},
  chipStyle = {},
  activeChipStyle = {},
  textStyle = {},
  activeTextStyle = {}
}) => {
  // Use filters prop if provided, otherwise use options prop
  const filterOptions = filters.length > 0 ? filters : options;
  const renderFilterChip = (filter) => {
    if (!filter || !filter.key) {
      return null;
    }
    
    return (
      <TouchableOpacity
        key={filter.key}
        style={[
          styles.filterChip,
          chipStyle,
          selectedFilter === filter.key && styles.activeFilterChip,
          selectedFilter === filter.key && activeChipStyle
        ]}
        onPress={() => {
          if (typeof onFilterChange === 'function') {
            onFilterChange(filter.key);
          }
        }}
      >
        {filter.icon && <Text style={styles.filterIcon}>{filter.icon}</Text>}
        <Text style={[
          styles.filterText,
          textStyle,
          selectedFilter === filter.key && styles.activeFilterText,
          selectedFilter === filter.key && activeTextStyle
        ]}>
          {filter.label || filter.key}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={[styles.filterContainer, containerStyle]}
      contentContainerStyle={styles.filterContent}
    >
      {Array.isArray(filterOptions) && filterOptions.length > 0 ? 
        filterOptions.map(renderFilterChip) : 
        null
      }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    height: 50,
  },
  filterContent: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 10,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeFilterChip: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  filterIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
});

export default FilterChips;
