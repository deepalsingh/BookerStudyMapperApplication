import React from 'react';
import 'react-native-gesture-handler';  // Make sure gesture handler is imported at the top
import AppNavigator from './src/navigation/AppNavigator'; // Import AppNavigator

// No need to manually define stack navigator here; just use AppNavigator
function App() {
  return <AppNavigator />;  // Use AppNavigator instead of defining the navigator here
}

export default App;
