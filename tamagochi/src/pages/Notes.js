import React, { useState, useEffect } from 'react';
import { Button, Group } from '@mantine/core';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { FaSave } from "react-icons/fa";
import { getAllNotes, createNote, deleteNote } from './mongoapi'; // Replace with the correct path

const Notes = () => {
    const [notepad, setNotepad] = useState(false);
    const [notes, setNotes] = useState([]);
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    console.log(notes)

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const fetchedNotes = await getAllNotes();
                console.log(fetchedNotes)
                setNotes(fetchedNotes);
            } catch (error) {
                console.error('Error fetching notes:', error.message);
            }
        };

        fetchNotes();
    }, [notepad]);

    const handleCreateNote = async (title, description) => {
        try {
            const newNote = await createNote(title, description);
            setNotes((prevNotes) => [...prevNotes, newNote]);
            setDescription('');
            setTitle('');
            setNotepad(false);
        } catch (error) {
            console.error('Error creating a new note:', error.message);
        }
    };

    const handleDeleteNote = async (noteId) => {
        try {
            await deleteNote(noteId);
            setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
        } catch (error) {
            console.error('Error deleting the note:', error.message);
        }
    };

    const activateNotepad = () => {
        setNotepad(true);
    };

    const disableNotepad = () => {
        setNotepad(false);
    };

    return (
        <>
            {!notepad && (
                <>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
                    <Button variant="outlined" style={{ marginTop: '10px' }} onClick={activateNotepad}>
                        Add a new note!
                    </Button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <h2>Your Notes:</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', justifyContent: 'center' }}>
                        {notes.map((note, index) => (
                            <div key={index} style={{ border: '1px solid #ccc', padding: '8px', borderRadius: '4px', justifyContent: 'space-between', width: '50px' }}>
                                <FaSave style={{ marginRight: '8px' }} />
                                {note.title}
                            </div>
                        ))}
                    </div>
                </div>
                </>
            )}
            {notepad && (
                <>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
                        <Stack alignItems={'center'}>
                            <TextField
                                id="standard-textarea"
                                label="Add a title!"
                                placeholder="Enter your note..."
                                multiline
                                variant="standard"
                                width={300}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)} // Update the description state
                            />
                            <TextField
                                id="standard-textarea"
                                label="Create a note!"
                                placeholder="Enter your note..."
                                multiline
                                variant="standard"
                                width={300}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)} // Update the description state
                            />
                            <Button variant="outlined" style={{ marginTop: '10px' }} onClick={() => handleCreateNote(title, description)}>
                                Save your note!
                            </Button>
                            <Button variant="outlined" style={{ marginTop: '10px' }} onClick={() => setNotepad(false)}>
                                return
                            </Button>
                        </Stack>
                    </div>
                </>
            )}
        </>
    );
};

export default Notes;
