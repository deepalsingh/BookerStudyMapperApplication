import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RNPickerSelect from 'react-native-picker-select'; // Import the color picker
import DatePicker from "react-datepicker"; //npm install react-datepicker --save
import "react-datepicker/dist/react-datepicker.css";

const ScheduleScreen = ({ navigation, route }) => {
  const { addTask, editTask, deleteTask, task, tasks } = route.params; // Get functions and task from params

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
      id: task ? task.id : Date.now(),
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

    // Pass updated tasks back to HomeScreen after adding or editing a task
    navigation.navigate('Home', {
      tasks: [...tasks.filter((t) => t.id !== newTask.id), newTask], // Ensure you update tasks here
    });
  };

  // Handle Delete Task
  const handleDelete = () => {
    if (task) {
      deleteTask(task);  // Call deleteTask with the current task
      navigation.navigate('Home')  // Go back to the home screen after deleting
    };
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
        <div>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="Pp"
          showTimeSelect
          isClearable
        />
        </div>

        {/* End Date Input */}
        <Text>End Date: </Text>
        <div>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="Pp"
          showTimeSelect
          isClearable
        />
        </div>

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
            { label: 'Moderate (Yellow)', value: 'yellow' },
            { label: 'Low (Green)', value: 'green' },
          ]}
        />

        {/* Submit Button */}
        <Button title={task ? 'Save Changes' : 'Add Task'} onPress={handleSubmit} color="#EFB8C8" />
        
        {/* Delete Button (only if task exists) */}
        {task && (
          <Button title="Delete Task" onPress={handleDelete} color="red" />
        )}
      </ScrollView>

      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 15,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15, // Equal margin bottom for consistency between inputs
    paddingLeft: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ScheduleScreen;
