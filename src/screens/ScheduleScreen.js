// src/screens/ScheduleScreen.js
import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ScheduleScreen = ({ navigation }) => {
  // Log navigation prop to check if it's passed correctly
  useEffect(() => {
    console.log("Navigation prop in ScheduleScreen:", navigation);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Header title="Schedule" />

      <View style={styles.content}>
        <Text style={styles.text}>Your Study Schedule</Text>
        <Button
          title="Go to Home"
          onPress={() => navigation.navigate('Home')}
        />
        <Button
          title="Go to Calendar"
          onPress={() => navigation.navigate('Calendar')}
        />
      </View>

      <Footer navigation={navigation} />  {/* Ensure Footer has navigation prop */}
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

export default ScheduleScreen;
