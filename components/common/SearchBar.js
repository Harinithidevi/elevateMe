import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

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
  const handleClear = () => {
    if (onClear) {
      onClear();
    }
  };

  const handleSubmit = () => {
    if (onSubmitEditing) {
      onSubmitEditing();
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <MaterialIcons name="search" size={20} color="#666" style={styles.searchIcon} />
      <TextInput
        style={[styles.input, inputStyle]}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={handleSubmit}
        placeholder={placeholder}
        placeholderTextColor="#999"
        returnKeyType="search"
      />
      {showClearButton && value && value.length > 0 ? (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <MaterialIcons name="clear" size={20} color="#666" />
        </TouchableOpacity>
      ) : null}
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
