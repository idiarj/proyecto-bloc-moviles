import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, FlatList, Alert, Image, TextInput, Modal, Animated, Easing } from 'react-native';
import CustomButton from '../../components/Button/CustomButton';  
import fondo2 from '../../assets/fondo2.jpg'; 
import addIcon from '../../assets/agregar.png';
import folderIcon from '../../assets/folderb.png'; // Folder icon
import fileICon from '../../assets/file.png';
import favoriteICon from '../../assets/star.png';
import deploy from '../../assets/flechaMenu.png';
import deleteIcon from '../../assets/eliminar2.png';

const Carpetas = ({ navigation }) => {
    const [folders, setFolders] = useState([]); // Folder state
    const [selectedFolder, setSelectedFolder] = useState(null); // To open folder
    const [newFolderName, setNewFolderName] = useState(''); // New folder name state
    const [newNoteName, setNewNoteName] = useState(''); // New note name state
    const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
    const [menuVisible, setMenuVisible] = useState(false);  // For sliding menu
    const slideAnim = useRef(new Animated.Value(-100)).current;

    // Add new folder
    const addFolder = () => {
        if (newFolderName.trim()) {
            const newFolder = {
                id: Date.now().toString(),
                name: newFolderName,
                notes: [], // Empty notes array inside each folder
            };
            setFolders((prevFolders) => [...prevFolders, newFolder]);
            setNewFolderName(''); // Reset the input
            setModalVisible(false); // Close the modal
        } else {
            Alert.alert('Error', 'Please enter a folder name.');
        }
    };

    // Add new note to the selected folder
    const addNote = (folderId) => {
        if (newNoteName.trim()) {
            setFolders((prevFolders) =>
                prevFolders.map(folder =>
                    folder.id === folderId
                        ? { ...folder, notes: [...folder.notes, newNoteName] }
                        : folder
                )
            );
            setNewNoteName('');
        } else {
            Alert.alert('Error', 'Please enter a note name.');
        }
    };

    // Open/close folder to display notes
    const toggleFolder = (folder) => {
        setSelectedFolder(selectedFolder?.id === folder.id ? null : folder);
    };

    const renderFolder = ({ item }) => (
        <View style={styles.folderContainer}>
            <TouchableOpacity style={styles.folder} onPress={() => toggleFolder(item)}>
                <Image source={folderIcon} style={styles.folderIcon} />
                <Text style={styles.folderName}>{item.name}</Text>
            </TouchableOpacity>
            {/* If the folder is selected, show its notes and "Add Note" option */}
            {selectedFolder?.id === item.id && (
                <View style={styles.notesContainer}>
                    <FlatList
                        data={item.notes}
                        renderItem={({ item }) => <Text style={styles.noteItem}>{item}</Text>}
                        keyExtractor={(note, index) => index.toString()}
                        style={styles.noteList}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="New Note"
                        value={newNoteName}
                        onChangeText={setNewNoteName}
                    />
                    <CustomButton onPress={() => addNote(item.id)} text="Add Note" bgColor="#faae97" />
                </View>
            )}
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

                {/* Sliding Menu */}
                {menuVisible && (
                    <Animated.View style={[styles.menu, { transform: [{ translateX: slideAnim }] }]}>
                        <CustomButton onPress={() => Alert.alert('Cerrar sesión')} text="CERRAR SESIÓN" bgColor="#faae97" />
                        <CustomButton onPress={() => Alert.alert('Borrar cuenta')} text="BORRAR CUENTA" bgColor="#faae97" />
                    </Animated.View>
                )}

                <Text style={styles.title}>Tus carpetas</Text>

                {folders.length > 0 ? (
                    <FlatList
                        data={folders}
                        renderItem={renderFolder}
                        keyExtractor={item => item.id}
                        style={styles.folderList}
                    />
                ) : (
                    <Text style={styles.noFoldersText}>No hay carpetas todavia. Agrega una!</Text>
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
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre de la carpeta"
                            value={newFolderName}
                            onChangeText={setNewFolderName}
                        />
                        <CustomButton onPress={addFolder} text="Add Folder" bgColor="#faae97" />
                        <CustomButton onPress={() => setModalVisible(false)} text="Cancel" bgColor='#faae97' />
                    </View>
                </View>
            </Modal>
            <View style={styles.navbar}>
                    <TouchableOpacity onPress={() => navigation.navigate('carpetas')}>
                        <Image source={fileICon} style={styles.navIcon1} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('AnotherScreen')}>
                        <Image source={folderIcon} style={styles.navIcon} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('AnotherScreen')}>
                        <Image source={favoriteICon} style={styles.navIcon2} />
                    </TouchableOpacity>

                    {/* Button for adding folders inside the navbar */}
                    <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
                        <Image source={addIcon} style={styles.addIcon} />
                    </TouchableOpacity>
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
    },
    folderList: {
        flex: 1,
        width: '100%',
    },
    noFoldersText: {
        color: 'white',
        fontSize: 18,
        marginBottom: 60,
        textAlign: 'center',
    },
    folderContainer: {
        marginBottom: 20,
    },
    folder: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        padding: 20,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
    folderIcon: {
        width: 50,
        height: 50,
    },
    folderName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    notesContainer: {
        marginTop: 10,
        paddingHorizontal: 20,
    },
    noteItem: {
        color: 'white',
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
        padding: 10,
        color: 'white',
    },
    addButton: {
         backgroundColor: '#fff',
        borderRadius: 50,
        padding: 10,
        marginLeft: 10, 
    },
    addIcon: {
        width: 40,
        height: 40,
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
        
    },  navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 80,
        padding: 20,
        backgroundColor: '#ffc9b9',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
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

    deployContainer: {
        position: 'absolute',
        top: 20,
        left: 10,
    },
    deployIcon: {
        width: 40,
        height: 40,
    },
    menu: {
        position: 'absolute',
        top: 70,
        left: 0,
        width: 230,
        backgroundColor: '#fff',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        padding: 10,
    },
});

export default Carpetas;
