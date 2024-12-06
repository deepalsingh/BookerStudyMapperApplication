// src/screens/CalendarScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CalendarScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />

      <View style={styles.content}>
        <Text style={styles.text}>Your Calendar</Text>
      </View>

      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,  // Smaller font size for the screen title text
    marginBottom: 20,
  },
});

export default CalendarScreen;
