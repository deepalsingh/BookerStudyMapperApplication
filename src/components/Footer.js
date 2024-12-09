// src/components/Footer.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Footer = ({ navigation }) => {
  return (
    <View style={styles.footerContainer}>
      {/* Home Icon */}
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.iconContainer}>
        <Icon name="home" size={30} color="#333" />
      </TouchableOpacity>

      {/* Schedule Icon */}
      <TouchableOpacity onPress={() => navigation.navigate('Schedule')} style={styles.iconContainer}>
        <Icon name="create" size={30} color="#333" />
      </TouchableOpacity>

      {/* Calendar Icon */}
      <TouchableOpacity onPress={() => navigation.navigate('Calendar')} style={styles.iconContainer}>
        <Icon name="calendar" size={30} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#EFB8C8',
  },
  iconContainer: {
    padding: 10,
  },
});

export default Footer;
