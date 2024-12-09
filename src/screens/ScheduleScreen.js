import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RNPickerSelect from 'react-native-picker-select'; // Import the color picker
import DatePicker from "react-datepicker"; //npm install react-datepicker --save
import "react-datepicker/dist/react-datepicker.css";

const ScheduleScreen = ({ navigation, route }) => {
  const { addTask, editTask, deleteTask, task } = route.params; // Get functions and task from params

  // State to store form inputs
  const [startDate, setStartDate] = useState(task && task.startDate ? new Date(task.startDate) : null);
  const [endDate, setEndDate] = useState(task && task.endDate ? new Date(task.endDate) : null);
  const [title, setTitle] = useState(task ? task.title : '');
  const [notes, setNotes] = useState(task ? task.notes : '');
  const [color, setColor] = useState(task ? task.color : 'red');

  useEffect(() => {
    if (task) {
      // If we're editing, load the task data into the form
      setStartDate(task.startDate ? new Date(task.startDate) : null);
      setEndDate(task.endDate ? new Date(task.endDate) : null);
      setTitle(task.title);
      setNotes(task.notes);
      setColor(task.color);
    }
  }, [task]);

  const handleSubmit = () => {
    if (!title || !startDate || !endDate) {
      alert('Please fill all fields');
      return;
    }

    const newTask = {
      title,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      notes,
      color,
    };

    if (task) {
      // Edit existing task
      editTask(newTask);
    } else {
      // Add new task
      addTask(newTask);
    }

    // Navigate back to the home screen after adding/editing
    navigation.goBack();
  };

  // Handle Delete Task
  const handleDelete = () => {
    if (task) {
      deleteTask(task);  // Call deleteTask with the current task
      navigation.goBack();  // Go back to the home screen after deleting
    }
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>{task ? 'Edit Task' : 'Add a New Task'}</Text>

        {/* Task Title Input */}
        <TextInput
          style={styles.input}
          placeholder="Task Title"
          value={title}
          onChangeText={setTitle}
        />

        {/* Start Date Input */}
        <Text>Start Date: </Text>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="Pp"
          showTimeSelect
          isClearable
        />

        {/* End Date Input */}
        <Text>End Date: </Text>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="Pp"
          showTimeSelect
          isClearable
        />

        {/* Notes Input */}
        <TextInput
          style={styles.input}
          placeholder="Notes"
          value={notes}
          onChangeText={setNotes}
          multiline
        />

        {/* Color Picker */}
        <Text style={styles.label}>Select Task Importance</Text>
        <RNPickerSelect
          placeholder={{
            label: 'Select Task Importance',
            value: null,
          }}
          onValueChange={setColor}
          value={color}
          items={[
            { label: 'Very Important (Red)', value: 'red' },
            { label: 'Important (Orange)', value: 'orange' },
            { label: 'Less Important (Yellow)', value: 'yellow' },
          ]}
        />

        {/* Submit Button */}
        <Button title={task ? "Save Changes" : "Add Task"} onPress={handleSubmit} />

        {/* Delete Button (only visible when editing a task) */}
        {task && (
          <Button
            title="Delete Task"
            onPress={handleDelete}
            color="red"
          />
        )}
      </ScrollView>

      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Optional: Set background color to white
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100, // Ensure space at the bottom for footer visibility
    flexGrow: 1, // Allow ScrollView to grow and fill remaining space
    paddingTop: 10, // Optional: Add padding on top of the scroll container
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ScheduleScreen;
