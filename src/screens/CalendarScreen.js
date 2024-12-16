// src/screens/CalendarScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CalendarScreen = ({ navigation, route }) => {
  const { tasks, editTask, deleteTask } = route.params; // Get tasks, editTask, deleteTask from navigation props
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // This useEffect will update the markedDates state whenever tasks change
  useEffect(() => {
    const taskDates = tasks.reduce((acc, task) => {
      const taskDate = task.startDate.slice(0, 10); // Extract YYYY-MM-DD from task's startDate

      // If the date already exists, push the task to that date
      if (acc[taskDate]) {
        acc[taskDate].tasks.push(task);
      } else {
        acc[taskDate] = { tasks: [task] };
      }

      return acc;
    }, {});

    // Log the taskDates to debug
    console.log("Task Dates: ", taskDates);

    // Update the markedDates state to be passed to the calendar
    const updatedMarkedDates = Object.keys(taskDates).reduce((acc, date) => {
      acc[date] = { marked: true, dotColor: 'blue', selectedDotColor: 'orange' };
      return acc;
    }, {});

    // Log the final markedDates to verify
    console.log("Updated Marked Dates: ", updatedMarkedDates);

    setMarkedDates(updatedMarkedDates);
  }, [tasks]); // Re-run when tasks are updated

  // Handle task click (on a specific date)
  const handleTaskClick = (task) => {
    // Open a modal or navigate to another screen to edit the task
    setSelectedDate(task.startDate);
    setModalVisible(true);
  };

  const renderTasksForDate = (date) => {
    const taskList = tasks.filter(task => task.startDate.slice(0, 10) === date);
    return taskList.map((task, index) => (
      <TouchableOpacity key={index} onPress={() => handleTaskClick(task)} style={[styles.taskItem, { backgroundColor: task.color }]}>
        <Text style={styles.taskTitle}>{task.title}</Text>
        <Text style={styles.taskTime}>
          {new Date(task.startDate).toLocaleString()} - {new Date(task.endDate).toLocaleString()}
        </Text>
        <Text>{task.notes}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />

      <View style={styles.content}>
        <Calendar
          current={new Date().toISOString().slice(0, 10)} // Default to today's date
          markedDates={markedDates} // Pass the markedDates object
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
          }}
          theme={{
            todayTextColor: '#00adf5',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
          }}
        />

        <View style={styles.taskListContainer}>
          {/* Render tasks for the selected date */}
          {renderTasksForDate(selectedDate)}
        </View>
      </View>

      {/* Modal for viewing/editing task details */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Task on {selectedDate}</Text>
            <Text>{renderTasksForDate(selectedDate)}</Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
              }}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 10,
  },
  taskListContainer: {
    marginTop: 20,
  },
  taskItem: {
    padding: 10,
    marginBottom: 5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskTime: {
    fontSize: 12,
    color: '#555',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ff0000',
    borderRadius: 4,
  },
  closeButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default CalendarScreen;
