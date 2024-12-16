import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button, ScrollView } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomeScreen = ({ navigation, route }) => {
  const [tasks, setTasks] = useState([]); // State to store tasks

  useEffect(() => {
    if (route.params?.tasks) {
      setTasks(route.params.tasks);  // Update state with new tasks
    }
  }, [route.params?.tasks]);

  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const editTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.title === updatedTask.title ? updatedTask : task))
    );
  };

  const deleteTask = (taskToDelete) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter(
        (task) =>
          task.title !== taskToDelete.title ||
          task.startDate !== taskToDelete.startDate ||
          task.notes !== taskToDelete.notes
      );
      return updatedTasks;
    });
  };

  const navigateToSchedule = () => {
    navigation.navigate('Schedule');
  };

  const navigateToCalendar = () => {
    navigation.navigate('Calendar');
  };

  const editTaskHandler = (task) => {
    navigation.navigate('Schedule', {
      addTask,
      editTask,
      deleteTask,
      task,
      tasks,
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.taskItem, { backgroundColor: item.color }]}
      onPress={() => editTaskHandler(item)}
    >
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={styles.taskDate}>
        {new Date(item.startDate).toLocaleString()} to {new Date(item.endDate).toLocaleString()}
      </Text>
      <Text style={styles.taskDate}>{item.notes}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />

      <View style={styles.content}>
        {/* Left Half - Welcome and Description */}
        <View style={styles.leftSection}>
          {/* Welcome Card */}
          <View style={styles.welcomeCard}>
            <Text style={styles.welcomeText}>Welcome to Booker Study Mapper</Text>
            <Text style={styles.descriptionText}>
              Booker Study Mapper helps you organize your study tasks and schedule them effectively. 
              Track your study sessions, set deadlines, and stay on top of your academic goals.
            </Text>
          </View>
        </View>

        {/* Right Half - Tasks and Buttons */}
        <View style={styles.rightSection}>
          {/* Buttons Section */}
          <View style={styles.buttonsSection}>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity style={styles.customButton} onPress={navigateToSchedule}>
                <Text style={styles.buttonText}>Add New Task</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity style={styles.customButton} onPress={navigateToCalendar}>
                <Text style={styles.buttonText}>Go to Calendar</Text>
              </TouchableOpacity>
              
            </View>
            
          </View>

          {/* Task List Section with ScrollView */}
          <ScrollView contentContainerStyle={styles.taskListSection}>
            {tasks.map((task, index) => renderItem({ item: task, index }))}
          </ScrollView>
        </View>
      </View>

      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    flexDirection: 'row',
    flex: 1,
  },
  leftSection: {
    width: '50%',
    padding: 15,
    justifyContent: 'center',
  },
  welcomeCard: {
    backgroundColor: '#EFB8C8',  // Set the background color to match header
    padding: 20,
    borderRadius: 12,  // Rounded corners
    shadowColor: '#000',  // Shadow effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,  // For Android shadow
    width: '80%',  // Make the card narrower
    height: '50%',  // Make the card taller (height is set relative to the parent container)
    alignSelf: 'center',  // Center the card in the left half
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
  rightSection: {
    width: '50%',
    padding: 15,
    flex: 1,
  },
  buttonsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  buttonWrapper: {
    width: '48%',
  },
  customButton: {
    backgroundColor: '#EFB8C8',  // Button color same as header
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,  // Rounded corners
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,  // For Android shadow effect
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  taskListSection: {
    width: '100%',
    paddingBottom: 60,
  },
  taskItem: {
    padding: 15,
    borderRadius: 4,
    marginBottom: 10,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskDate: {
    fontSize: 14,
    color: '#555',
  },
});

export default HomeScreen;
