import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import CalendarScreen from '../screens/CalendarScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [tasks, setTasks] = useState([]); // State to manage tasks

  // Add task to the list
  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  // Edit task
  const editTask = (updatedTask) => {
    setTasks((prevTasks) => 
      prevTasks.map((task) => task.title === updatedTask.title ? updatedTask : task)
    );
  };

  // Delete task
  const deleteTask = (taskToDelete) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task !== taskToDelete));
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Pass the task management functions as props */}
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          initialParams={{ tasks, addTask, editTask, deleteTask }} 
        />
        <Stack.Screen 
          name="Schedule" 
          component={ScheduleScreen} 
          initialParams={{ tasks, addTask, editTask, deleteTask }} 
        />
        <Stack.Screen 
          name="Calendar" 
          component={CalendarScreen} 
          initialParams={{ tasks, editTask, deleteTask }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
