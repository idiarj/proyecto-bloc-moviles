import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, FlatList, Alert, Image, TextInput, Modal, Animated, Easing } from 'react-native';
import CustomButton from '../../components/Button/CustomButton';  
import fondo2 from '../../assets/fondo2.jpg'; 
import editIcon from '../../assets/lapiz.png';
import deleteIcon from '../../assets/eliminar2.png';
import addIcon from '../../assets/agregar.png';
import deploy from '../../assets/flechaMenu.png';
import folderIcon from '../../assets/folderb.png';

const Notas = ({ navigation }) => {
    const [notes, setNotes] = useState([]);
    const [newNoteTitle, setNewNoteTitle] = useState('');
    const [newNoteText, setNewNoteText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [editingNoteId, setEditingNoteId] = useState(null); // Estado para controlar la nota en edición
    const [menuVisible, setMenuVisible] = useState(false);  // Para controlar el menú desplegable
    const slideAnim = useRef(new Animated.Value(-100)).current;  // Para la animación de despliegue del menú

    const deleteNote = (id) => {
        setNotes((prevNotes) => prevNotes.filter(note => note.id !== id));
    };

    const editNote = (id) => {
        const noteToEdit = notes.find(note => note.id === id);
        if (noteToEdit) {
            setNewNoteTitle(noteToEdit.title);  // Cargar el título de la nota
            setNewNoteText(noteToEdit.text);    // Cargar el texto de la nota
            setEditingNoteId(id);               // Guardar el ID de la nota en edición
            setModalVisible(true);              // Mostrar el modal
        }
    };

    const addOrEditNote = () => {
        if (newNoteTitle.trim() && newNoteText.trim()) {
            if (editingNoteId) {
                // Editar nota existente
                setNotes((prevNotes) =>
                    prevNotes.map(note =>
                        note.id === editingNoteId
                            ? { ...note, title: newNoteTitle, text: newNoteText }
                            : note
                    )
                );
            } else {
                // Agregar nueva nota
                const newNote = {
                    id: Date.now().toString(),
                    title: newNoteTitle,
                    text: newNoteText,
                };
                setNotes((prevNotes) => [...prevNotes, newNote]);
            }
            // Limpiar el formulario y cerrar el modal
            setNewNoteTitle('');
            setNewNoteText('');
            setEditingNoteId(null);  // Limpiar el estado de edición
            setModalVisible(false);
        } else {
            Alert.alert('Error', 'Por favor ingresa título y contenido para la nota.');
        }
    };

    const renderNote = ({ item }) => (
        <View style={styles.note}>
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text style={styles.noteText}>{item.text}</Text>
            <View style={styles.noteActions}>
                <TouchableOpacity onPress={() => editNote(item.id)}>
                    <Image source={editIcon} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteNote(item.id)}>
                    <Image source={deleteIcon} style={styles.icon} />
                </TouchableOpacity>
            </View>
        </View>
    );

    // Función para controlar la animación del menú desplegable
    const toggleMenu = () => {
        Animated.timing(slideAnim, {
            toValue: menuVisible ? -100 : 0,  // Desplegar o esconder el menú
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
        setMenuVisible(!menuVisible);  // Cambiar estado del menú
    };

    return (
        <ImageBackground source={fondo2} style={styles.background}>
            <View style={styles.container}>

                {/* Botón de despliegue */}
                <TouchableOpacity onPress={toggleMenu} style={styles.deployContainer}>
                    <Image source={deploy} style={styles.deployIcon} />
                </TouchableOpacity>

                {/* Menú Desplegable - Solo visible cuando se toca la flecha */}
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

                <Text style={styles.title}>BIENVENIDO A TUS NOTAS</Text>

                {notes.length > 0 ? (
                    <FlatList
                        data={notes}
                        renderItem={renderNote}
                        keyExtractor={item => item.id}
                        style={styles.noteList}
                    />
                ) : (
                    <Text style={styles.noNotesText}>No tienes notas aún. ¡Agrega una!</Text>
                )}

                <Text style={styles.fixedDailyDiaries}>DAILY DIARIES</Text>
            </View>

            {/* Modal para agregar o editar una nota */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>
                            {editingNoteId ? 'Editar nota' : 'Agregar nueva nota'}
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Título de la nota"
                            value={newNoteTitle}
                            onChangeText={setNewNoteTitle}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Texto de la nota"
                            value={newNoteText}
                            onChangeText={setNewNoteText}
                            multiline={true}
                        />

                        <View style={styles.modalButtons}>
                            <CustomButton onPress={addOrEditNote} text={editingNoteId ? "Guardar cambios" : "Guardar"} bgColor="#faae97" />
                            <CustomButton onPress={() => setModalVisible(false)} text="Cancelar" bgColor='#faae97' />
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Navbar con ícono de carpeta y botón para agregar nota */}
            <View style={styles.navbar}>
                <TouchableOpacity onPress={() => navigation.navigate('AnotherScreen')}>
                    <Image source={folderIcon} style={styles.navIcon} />
                </TouchableOpacity>

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
        marginTop: 100,
    },
    noNotesText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 5,
    },
    noteList: {
        flex: 1,
        width: '100%',
    },
    note: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        padding: 20,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    noteTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    noteText: {
        fontSize: 16,
        maxWidth: '60%',
        color: 'white',
    },
    noteActions: {
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
    deployContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 10,
        marginTop: 15,
    },
    deployIcon: {
        width: 70,
        height: 40,
    },
    menu: {
        position: 'absolute',
        top: 20,
        left: 0,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 10,
        zIndex: 1,
        elevation: 5,
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 20,
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    navIcon: {
        width: 65,
        height: 65,
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
        borderBottomColor: 'gray',
        marginBottom: 15,
        padding: 10,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});

export default Notas;
