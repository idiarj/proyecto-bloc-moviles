import React, { useState, useRef } from 'react';
import editIcon from '../../assets/lapiz.png';
import deleteIcon from '../../assets/eliminar2.png';
import favNoAdd from '../../assets/favSinAgregar.png';
import favAdd from '../../assets/favAgregado.png';


import { Picker } from '@react-native-picker/picker';


const CustomNotas = () => {
    const [notes, setNotes] = useState([]);
    const [newNoteTitle, setNewNoteTitle] = useState('');
    const [newNoteText, setNewNoteText] = useState('');
    const [newNoteCategory, setNewNoteCategory] = useState('neutral');
    const [modalVisible, setModalVisible] = useState(false);
    const [editingNoteId, setEditingNoteId] = useState(null);
    const [favoriteNotes, setFavoriteNotes] = useState([]); 
    const deleteNote = (id) => {
        setNotes((prevNotes) => prevNotes.filter(note => note.id !== id));
    };

    const editNote = (id) => {
        const noteToEdit = notes.find(note => note.id === id);
        if (noteToEdit) {
            setNewNoteTitle(noteToEdit.title);
            setNewNoteText(noteToEdit.text);
            setNewNoteCategory(noteToEdit.category);
            setEditingNoteId(id);
            setModalVisible(true);
        }
    };

    const addOrEditNote = () => {
        if (newNoteTitle.trim() && newNoteText.trim()) {
            if (editingNoteId) {
                setNotes((prevNotes) =>
                    prevNotes.map(note =>
                        note.id === editingNoteId
                            ? { ...note, title: newNoteTitle, text: newNoteText, category: newNoteCategory }
                            : note
                    )
                );
            } else {
                if (newNoteText.length > 250) {
                    Alert.alert('Error', 'La descripción de la nota no puede exceder los 250 caracteres.');
                    return;
                }
                const newNote = {
                    id: Date.now().toString(),
                    title: newNoteTitle,
                    text: newNoteText,
                    category: newNoteCategory,
                };
                setNotes((prevNotes) => [...prevNotes, newNote]);
            }
            setNewNoteTitle('');
            setNewNoteText('');
            setNewNoteCategory('neutral');
            setEditingNoteId(null);
            setModalVisible(false);
        } else {
            Alert.alert('Error', 'Por favor ingresa título y contenido para la nota.');
        }
    };

    const toggleFavorite = (id) => {
        setFavoriteNotes((prevFavs) => {
            if (prevFavs.includes(id)) {
                return prevFavs.filter(noteId => noteId !== id);
            } else {
                return [...prevFavs, id];
            }
        });
    };

    const renderNote = ({ item }) => {
        const isFavorite = favoriteNotes.includes(item.id);
        return (
            <View style={styles.note}>
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text style={styles.noteText}>{item.text}</Text>
            <Text style={styles.noteCategory}>Categoría: {item.category}</Text>
            <View style={styles.noteActions}>
                <TouchableOpacity onPress={() => editNote(item.id)}>
                    <Image source={editIcon} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteNote(item.id)}>
                    <Image source={deleteIcon} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
                    <Image source={isFavorite ? favAdd : favNoAdd} style={styles.icon} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
    >
        <View style={styles.fullScreenModalContainer}>
            <View style={styles.fullScreenModalView}>

                <View style={styles.modalButtons}>
                    <TouchableOpacity
                        style={styles.customButton}
                        onPress={addOrEditNote}
                    >
                        <Text style={styles.customButtonText}>Guardar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.customButton1}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={styles.customButtonText}>❌</Text>
                    </TouchableOpacity>
                </View>
                <TextInput
                    style={styles.customTitleInputFullScreen}
                    placeholder="Título de la nota"
                    value={newNoteTitle}
                    onChangeText={setNewNoteTitle}
                />
                <TextInput
                    style={styles.customDescriptionInputFullScreen}
                    placeholder="Descripción"
                    value={newNoteText}
                    onChangeText={setNewNoteText}
                    multiline={true}
                />

                <Picker
                    selectedValue={newNoteCategory} 
                    style={{ height: 50, width: '100%', color: 'white' }}
                    onValueChange={(itemValue) => setNewNoteCategory(itemValue)}
                >
                    <Picker.Item label="Relevante" value="relevante" />
                    <Picker.Item label="Neutral" value="neutral" />
                    <Picker.Item label="Irrelevante" value="irrelevante" />
                </Picker>

            </View>
        </View>
    </Modal>
    );
};

const styles = StyleSheet.create({

    noteCategory: {
        color: 'white', 
        fontSize: 14,
        marginVertical: 5, 
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
        modalButtons: {
        flexDirection: 'row',
        width: '100%',
        marginTop: -130,
        marginBottom: 20,
        marginLeft: 130,
    },
    fullScreenModalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro semitransparente
    },
    fullScreenModalView: {
        height: '86%',  // Ocupa el 95% de la pantalla
        width: '95%',   // Ancho casi total de la pantalla
        backgroundColor: '#FFCFC7', // Color suave como en la imagen
        borderRadius: 20,
        padding: 30,
        justifyContent: 'center',
    },
    customTitleInputFullScreen: {
        width: '100%',
        fontSize: 24, // Título más grande
        color: 'white',
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        marginBottom: 20,
        padding: 10,
    },
    customDescriptionInputFullScreen: {
        width: '100%',
        height: '55%', // Aumentamos la altura para más espacio de texto
        color: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        padding: 10,
        marginBottom: -15,
        fontSize: 18, // Texto de descripción más grande
    },
    customButton: {
        backgroundColor: '#faae97', 
        borderColor: 'white',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginLeft: 15,
        marginTop: 50,
    },

    customButton1: {
        backgroundColor: 'transparent',
        borderColor: 'white',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginLeft: 15,
        marginTop: 50,
    },

    customButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Garet',
    },
});

    export default CustomNotas;