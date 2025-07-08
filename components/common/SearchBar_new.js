import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

/**
 * SearchBar Component
 * 
 * A customizable search input component with optional clear button functionality.
 * 
 * @param {string} value - Current search value (default: empty string)
 * @param {Function} onChangeText - Callback for text changes (default: no-op function)
 * @param {string} placeholder - Placeholder text (default: "Search...")
 * @param {Function} onClear - Callback for clear button press (default: no-op function)
 * @param {Function} onSearch - Callback for search action (default: no-op function)
 * @param {Function} onSubmitEditing - Callback for submit/enter press (default: no-op function)
 * @param {boolean} showClearButton - Whether to show clear button (default: true)
 * @param {Object} containerStyle - Additional container styles (default: empty object)
 * @param {Object} inputStyle - Additional input styles (default: empty object)
 */
const SearchBar = ({ 
  value = '', 
  onChangeText = () => {}, 
  placeholder = "Search...", 
  onClear = () => {},
  onSearch = () => {},
  onSubmitEditing = () => {},
  showClearButton = true,
  containerStyle = {},
  inputStyle = {}
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <MaterialIcons 
        name="search" 
        size={20} 
        color="#666" 
        style={styles.searchIcon} 
      />
      <TextInput
        style={[styles.input, inputStyle]}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        placeholder={placeholder}
        placeholderTextColor="#999"
        returnKeyType="search"
      />
      {showClearButton && value && value.length > 0 && (
        <TouchableOpacity onPress={onClear} style={styles.clearButton}>
          <MaterialIcons name="clear" size={20} color="#666" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
  searchIcon: {
    marginRight: 8
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: '#333'
  },
  clearButton: {
    padding: 4,
    marginLeft: 8
  }
});

export default SearchBar;
