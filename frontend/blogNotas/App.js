import React from 'react';
import { SafeAreaView,StyleSheet, Text } from 'react-native';
import Login from './screens/login';

const App = () => { 
  return (
   <SafeAreaView style={styles.root}>
    <Login />
    </SafeAreaView> 
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default App;