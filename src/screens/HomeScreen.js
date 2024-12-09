import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]); // State to store tasks

  // Add task to the list
  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  // Edit task (by updating it)
  const editTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.title === updatedTask.title ? updatedTask : task))
    );
  };

  // Delete task
  const deleteTask = (taskToDelete) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task !== taskToDelete));
  };

  // Navigate to ScheduleScreen for adding a new task
  const navigateToSchedule = () => {
    navigation.navigate('Schedule', {
      addTask,  // Pass addTask function
      editTask,
      deleteTask,
      task: null, // task will be null for a new task
    });
  };

  // Navigate to CalendarScreen for viewing tasks on calendar
  const navigateToCalendar = () => {
    navigation.navigate('Calendar', {
      tasks, // Pass tasks
      editTask,
      deleteTask
    });
  };

  // Navigate to ScheduleScreen for editing an existing task
  const editTaskHandler = (task) => {
    navigation.navigate('Schedule', {
      addTask,
      editTask,
      deleteTask,
      task,  // Pass the existing task for editing
    });
  };

  // Render each task in the list
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.taskItem, { backgroundColor: item.color }]} // Apply color dynamically
      onPress={() => editTaskHandler(item)}
    >
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={styles.taskDate}>
       {new Date(item.startDate).toLocaleString()} to {new Date(item.endDate).toLocaleString()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />

      <View style={styles.content}>
        {/* Task List Section */}
        <View style={styles.taskList}>
          <FlatList
            data={tasks}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        {/* Button to navigate to Schedule Screen to Add New Task */}
        <Button title="Add New Task" onPress={navigateToSchedule} />

        {/* Button to navigate to Calendar Screen */}
        <Button title="Go to Calendar" onPress={navigateToCalendar} /> {/* New Button */}

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
    flexDirection: 'row',
    flex: 1,
  },
  taskList: {
    flex: 1,
    padding: 10,
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
