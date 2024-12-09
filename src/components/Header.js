// src/components/Header.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Header = ({ navigation }) => {
  return (
    <View style={styles.headerContainer}>
      

      {/* Static Title */}
      <Text style={styles.headerText}>Booker Study Mapper</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#EFB8C8',
    paddingHorizontal: 10,
  },
  arrow: {
    marginRight: 10,  // Space between arrow and text
  },
  headerText: {
    fontSize: 20,  // Default size for static title
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Header;
