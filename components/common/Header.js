import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * Header Component
 * 
 * A customizable header component with optional back button and subtitle support.
 * 
 * @param {string} title - Header title text (default: 'Untitled')
 * @param {string} subtitle - Optional subtitle text (default: null)
 * @param {boolean} showBackButton - Whether to show back button (default: false)
 * @param {Function} onBackPress - Callback for back button press (default: no-op function)
 * @param {string} backgroundColor - Header background color (default: '#3B82F6')
 * @param {string} titleColor - Title text color (default: '#FFFFFF')
 * @param {string} subtitleColor - Subtitle text color (default: '#E0E7FF')
 */
const Header = ({ 
  title = 'Untitled', 
  subtitle = null, 
  showBackButton = false, 
  onBackPress = () => {}, 
  backgroundColor = '#3B82F6',
  titleColor = '#FFFFFF',
  subtitleColor = '#E0E7FF' 
}) => {
  return (
    <View style={[styles.header, { backgroundColor }]}>
      {showBackButton && (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={titleColor} />
        </TouchableOpacity>
      )}
      <View style={styles.headerContent}>
        <Text style={[styles.headerTitle, { color: titleColor }]}>{title}</Text>
        {subtitle && (
          <Text style={[styles.headerSubtitle, { color: subtitleColor }]}>{subtitle}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#2563EB',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default Header;
