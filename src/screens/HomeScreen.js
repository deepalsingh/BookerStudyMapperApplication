// src/screens/HomeScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomeScreen = ({ navigation }) => {
  // Log navigation prop to check if it's passed correctly
  useEffect(() => {
    console.log("Navigation prop in HomeScreen:", navigation);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Header title="Booker Study Mapper" />
      
      <View style={styles.content}>
        <Text style={styles.text}>Welcome to BookerStudyMapper!</Text>
      </View>
      
      {/* Pass navigation prop to Footer */}
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
    fontSize: 20,
    marginBottom: 20,
  },
});

export default HomeScreen;
