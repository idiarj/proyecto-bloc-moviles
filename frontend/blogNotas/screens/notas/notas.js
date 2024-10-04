import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, FlatList, Alert, Image, TextInput, Modal } from 'react-native';
import CustomButton from '../../components/Button/CustomButton';  
import fondo2 from '../../assets/fondo2.jpg'; 
import folderIcon from '../../assets/folder.png';
import editIcon from '../../assets/lapizN.png';  
import deleteIcon from '../../assets/eliminar2.png';
import addIcon from '../../assets/agregar.png';

const Notas = ({ navigation }) => {
    const [notes, setNotes] = useState([]);
    const [newNoteTitle, setNewNoteTitle] = useState('');
    const [newNoteText, setNewNoteText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const deleteNote = (id) => {
        setNotes((prevNotes) => prevNotes.filter(note => note.id !== id));
    };

    const editNote = (id) => {
        Alert.alert('Editar', `Editando la nota con id: ${id}`);
    };

    const addNote = () => {
        if (newNoteTitle.trim() && newNoteText.trim()) {
            const newNote = {
                id: Date.now().toString(),
                title: newNoteTitle,
                text: newNoteText,
            };
            setNotes((prevNotes) => [...prevNotes, newNote]);
            setNewNoteTitle('');
            setNewNoteText('');
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

    return (
        <ImageBackground source={fondo2} style={styles.background}>
            <View style={styles.container}>
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

                {/* Modal para agregar una nueva nota */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalTitle}>Agregar nueva nota</Text>
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
                                <CustomButton onPress={addNote} text="Guardar" bgColor="#faae97" />
                                <CustomButton onPress={() => setModalVisible(false)} text="Cancelar" bgColor="#faae97" />
                            </View>
                        </View>
                    </View>
                </Modal>

                {/* Navbar con íconos */}
                <View style={styles.navbar}>
                    <TouchableOpacity onPress={() => navigation.navigate('AnotherScreen')}>
                        <Image source={folderIcon} style={styles.navIcon} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
                        <Image source={addIcon} style={styles.addIcon} />
                    </TouchableOpacity>
                </View>
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
        marginVertical: 20,
    },
    noNotesText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
    noteList: {
        flex: 1,
        width: '100%',
    },
    note: {
        backgroundColor: 'rgba(255,255,255,0.8)',
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
    },
    noteText: {
        fontSize: 16,
        maxWidth: '60%',
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
    navbar: {
        width: '115%',
        height: 80,
        backgroundColor: 'rgba(255,255,255,0.5)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingVertical: 10,
        position: 'absolute',
        bottom: 0, 
    },
    navIcon: {
        width: 40,
        height: 40,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 15,
        fontWeight: 'bold',
        color: '#faae97',
    },
    input: {
        width: '100%',
        borderColor: '#faae97',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
});

export default Notas;
