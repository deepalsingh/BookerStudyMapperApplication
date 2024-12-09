import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 

const MainLayout = ({ children }) => {
  return (
    <View style={styles.container}>
      <Header /> 
      
      <ScrollView contentContainerStyle={styles.content}>
        {children} 
      </ScrollView>
      
      <Footer /> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  content: {
    padding: 20,
    flexGrow: 1,
  },
});

export default MainLayout;
