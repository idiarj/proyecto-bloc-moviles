import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, FlatList, Alert, Image, TextInput, Modal, Animated, Easing } from 'react-native';
import CustomButton from '../../components/Button/CustomButton';  
import fondo2 from '../../assets/fondo2.jpg'; 
import editIcon from '../../assets/lapiz.png';
import deleteIcon from '../../assets/eliminar2.png';
import addIcon from '../../assets/agregar.png';
import deploy from '../../assets/flechaMenu.png';
import folderIcon from '../../assets/folderb.png'; 
import favoriteICon from '../../assets/star.png';

const Carpetas = ({ navigation }) => {
    const [folders, setFolders] = useState([]); // Cambia 'notes' por 'folders'
    const [newFolderName, setNewFolderName] = useState(''); // Para el nombre de la carpeta
    const [modalVisible, setModalVisible] = useState(false);
    const [editingFolderId, setEditingFolderId] = useState(null); // Para editar carpetas
    const [menuVisible, setMenuVisible] = useState(false);  
    const slideAnim = useRef(new Animated.Value(-100)).current;

    const deleteFolder = (id) => {
        setFolders((prevFolders) => prevFolders.filter(folder => folder.id !== id));
    };

    const editFolder = (id) => {
        const folderToEdit = folders.find(folder => folder.id === id);
        if (folderToEdit) {
            setNewFolderName(folderToEdit.name); // Cargar el nombre de la carpeta
            setEditingFolderId(id);               // Guardar el ID de la carpeta en edición
            setModalVisible(true);              // Mostrar el modal
        }
    };

    const addOrEditFolder = () => {
        if (newFolderName.trim()) {
            if (editingFolderId) {
                // Editar carpeta existente
                setFolders((prevFolders) =>
                    prevFolders.map(folder =>
                        folder.id === editingFolderId
                            ? { ...folder, name: newFolderName }
                            : folder
                    )
                );
            } else {
                // Agregar nueva carpeta
                const newFolder = {
                    id: Date.now().toString(),
                    name: newFolderName,
                };
                setFolders((prevFolders) => [...prevFolders, newFolder]);
            }
            // Limpiar el formulario y cerrar el modal
            setNewFolderName('');
            setEditingFolderId(null);
            setModalVisible(false);
        } else {
            Alert.alert('Error', 'Por favor ingresa un nombre para la carpeta.');
        }
    };

    const renderFolder = ({ item }) => (
        <View style={styles.folder}>
            <Image source={folderIcon} style={styles.folderIcon} /> {/* Mostrar ícono de carpeta */}
            <Text style={styles.folderName}>{item.name}</Text>
            <View style={styles.folderActions}>
                <TouchableOpacity onPress={() => editFolder(item.id)}>
                    <Image source={editIcon} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteFolder(item.id)}>
                    <Image source={deleteIcon} style={styles.icon} />
                </TouchableOpacity>
            </View>
        </View>
    );

    const toggleMenu = () => {
        Animated.timing(slideAnim, {
            toValue: menuVisible ? -100 : 0,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
        setMenuVisible(!menuVisible);
    };

    return (
        <ImageBackground source={fondo2} style={styles.background}>
            <View style={styles.container}>
                <TouchableOpacity onPress={toggleMenu} style={styles.deployContainer}>
                    <Image source={deploy} style={styles.deployIcon} />
                </TouchableOpacity>

                {menuVisible && (
                    <Animated.View style={[styles.menu, { transform: [{ translateX: slideAnim }] }]}>
                        <CustomButton
                            onPress={() => Alert.alert('Cerrar sesión')}
                            text="CERRAR SESIÓN"
                            bgColor="#faae97"
                        />
                        <CustomButton
                            onPress={() => Alert.alert('Borrar cuenta')}
                            text="BORRAR CUENTA"
                            bgColor="#faae97"
                        />
                    </Animated.View>
                )}

                <Text style={styles.title}>BIENVENIDO A TUS CARPETAS</Text>

                {folders.length > 0 ? (
                    <FlatList
                        data={folders}
                        renderItem={renderFolder} // Renderizar carpetas
                        keyExtractor={item => item.id}
                        style={styles.folderList}
                    />
                ) : (
                    <Text style={styles.noFoldersText}>No tienes carpetas aún. ¡Agrega una!</Text>
                )}

                <Text style={styles.fixedDailyDiaries}>DAILY DIARIES</Text>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>
                            {editingFolderId ? 'Editar carpeta' : 'Agregar nueva carpeta'}
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre de la carpeta"
                            value={newFolderName}
                            onChangeText={setNewFolderName}
                        />

                        <View style={styles.modalButtons}>
                            <CustomButton onPress={addOrEditFolder} text={editingFolderId ? "Guardar cambios" : "Guardar"} bgColor="#faae97" />
                            <CustomButton onPress={() => setModalVisible(false)} text="Cancelar" bgColor='#faae97' />
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={styles.navbar}>

            <TouchableOpacity onPress={() => navigation.navigate('AnotherScreen')}>
                    <Image source={fileICon} style={styles.navIcon1} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('AnotherScreen')}>
                    <Image source={folderIcon} style={styles.navIcon} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('AnotherScreen')}>
                    <Image source={favoriteICon} style={styles.navIcon2} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
                    <Image source={addIcon} style={styles.addIcon} />
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    // Resto de los estilos
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        marginVertical: 30, 
        marginTop: 100,
    },
    noFoldersText: {
        color: 'white',
        fontSize: 18,
        marginBottom: 60,
        textAlign: 'center',
        marginTop: 5,
    },
    folderList: {
        flex: 1,
        width: '100%',
    },
    folder: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        padding: 20,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    folderName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    folderActions: {
        flexDirection: 'row',
    },
    icon: {
        width: 25,
        height: 25,
        marginLeft: 10,
    },
    fixedDailyDiaries: {
        position: 'absolute',
        bottom: 200, 
        marginTop: 20,
        color: 'white',
        fontFamily: 'Garet',
        fontSize: 35,
        opacity: 0.3,
    },
    addButton: {
        backgroundColor: '#fff',
        borderRadius: 50,
        padding: 10,
    },
    addIcon: {
        width: 40,
        height: 40,
    },
    folderIcon: {
        width: 50,
        height: 50,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 20,
        padding: 10,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    navbar: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
 
    navIcon: {
        width: 50,
        height: 50,
    },

    navIcon1: {
        width: 50,
        height: 50,
        left: 0,
    },

    navIcon2: {
        width: 50,
        height: 50,
        left: 0,
    },
});

export default Carpetas;
