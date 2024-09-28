import React from 'react';
import { SafeAreaView,StyleSheet, Text } from 'react-native';
import Login from './screens/login';
import Register from './screens/register';

const App = () => { 
  return (
   <SafeAreaView style={styles.root}>
    {/* <Login /> */}
    <Register/>
    </SafeAreaView> 
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    },
});

export default App;