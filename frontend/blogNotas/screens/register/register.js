import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, Alert } from 'react-native';
import CustomInput from '../../components/Input/CustomInput';  
import CustomButton from '../../components/Button/CustomButton';
import register from '../../assets/register.jpg';

const Register = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [correoError, setCorreoError] = useState('');
    const [username, setUsername] = useState('');


    const validarCorreo = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const onSingUpPressed= () => {
        if (!validarCorreo(correo)) {
            setCorreoError('Por favor ingrese un correo válido.');
        } else {
            setCorreoError('');
            console.log('Sing up');
            Alert.alert('Registro exitoso', 'Su cuenta ha sido creada.');
                }
    };

    return (
        <ImageBackground source={register} style={styles.background}>
            <View style={styles.container}>

                <Text style={styles.title}>DAILY DIARIES</Text>
                <Text style={styles.subTitle}>Registro Paso 1</Text>

                <CustomInput
                    value={nombre} 
                    setvalue={setNombre} 
                    placeholder="Nombre" 
                />
                <CustomInput 
                    value={apellido} 
                    setvalue={setApellido} 
                    placeholder="Apellido" 
                />

                <CustomInput
                    value={username} 
                    setvalue={setUsername} 
                    placeholder="Usuario" 
                />  
                <CustomInput
                    value={correo} 
                    setvalue={setCorreo} 
                    placeholder="Correo" 
                />
                {correoError ? <Text style={styles.errorText}>{correoError}</Text> : null}
                <CustomInput
                    value={password} 
                    setvalue={setPassword} 
                    placeholder="Contraseña" 
                    secureTextEntry 
                />

                <Text style={styles. signInText}>Al registrarte, confirmas que aceptas nuestros términos de uso y política de privacidad.</Text>

                <CustomButton text="Registrarse" onPress={onSingUpPressed}/>


                <Text style={styles.signInText}>
                    ¿Tienes cuenta? <Text style={styles.signInLink}>Iniciar sesión aquí</Text>
                </Text>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '80%',
        alignItems: 'Flex-start',
        borderRadius: 10,
        padding: 20,
        marginTop: -200,
    },
    title: {
        color: 'white',
        fontSize: 40,
        alignSelf: 'center',
        fontFamily: 'Garet',
        marginBottom: 30,
        marginTop: 50,
    },
    subTitle: {
        color: 'white',
        fontSize: 25,
        marginBottom: 20,
        marginLeft: 15,
    },
 
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Garet',
    },
    errorText: {
        color: 'red',
    },
    signInText: {
        color: 'white',
        marginTop: 3,        
        alignSelf: 'center',
    },
    signInLink: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
});

export default Register;