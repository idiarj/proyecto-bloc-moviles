import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import Input from '../components/inputs';

const Login = () => {
    return (
            <View style={styles.container}>
                <Text style={styles.text}>DAILY DIARIES</Text>
                <Input />
                <Input />
            </View>
        
    );
};

const styles = StyleSheet.create({
  
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginTop: 80,
    },
    text: {
        fontSize: 24,
        color: 'black',
        fontFamily: 'Garet',
    },
});

export default Login;