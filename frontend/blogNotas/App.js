import React from 'react';
import { SafeAreaView,StyleSheet, Text } from 'react-native';
import Login from './screens/login/login';
import Register from './screens/register/register';
import ForgotPassword from './screens/ForgotPassword/ForgotPassword'; 
import ResetPassword from './screens/ResetPassword/resetPassword';
import Notas from './screens/notas/notas';
import Carpetas from './screens/Carpetas/carpetas';
import Favoritos from './screens/Favoritos/favoritos';
import Navigation from './navigation';

const App = () => {  
  return (
   <SafeAreaView style={styles.root}>
    <Login />
    {/* <Register/> */}
    <ForgotPassword />
    {/* <Notas /> */}
    {/* <Favoritos /> */}
    {/* <ResetPassword /> */}
    {/* <Navigation/> */}
    {/* <Carpetas /> */}

    </SafeAreaView> 
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    },
});

export default App;