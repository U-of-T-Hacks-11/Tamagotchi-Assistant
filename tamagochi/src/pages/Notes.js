import React, { useState, useEffect } from 'react';
import { Button, Group } from '@mantine/core';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { FaSave } from "react-icons/fa";
import { getAllNotes, createNote, deleteNote } from './mongoapi'; // Replace with the correct path
import './Chat.css';

const Notes = () => {
    const [notepad, setNotepad] = useState(false);
    const [notes, setNotes] = useState([]);
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [selectedNote, setSelectedNote] = useState(undefined);
    const [noteCreated, setNoteCreated] = useState(false);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const fetchedNotes = await getAllNotes();
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
            setNoteCreated(true);
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
                        <button className='chat-button' onClick={activateNotepad}>
                            Add a new note!
                        </button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '-30px' }}>
                        {!selectedNote && (
                            <div style={{ marginTop: '10px' }}>
                                <h2>Your Notes:</h2>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', justifyContent: 'center', overflow: 'auto', height: '260px' }}>
                                    {notes.map((note, index) => (
                                        <div onClick={() => setSelectedNote(index + 1)} key={index} style={{ border: '1px solid #ccc', padding: '8px', borderRadius: '4px', justifyContent: 'space-between', width: '50px', height: '50px', overflow: 'auto' }}>
                                            <FaSave style={{ marginRight: '8px' }} />
                                            {note.title}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {selectedNote && (
                            <div style={{ position: 'relative', marginTop: '100px' }}>
                                <button
                                    onClick={() => setSelectedNote(undefined)}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: -50,
                                        backgroundColor: 'red',
                                        color: 'white',
                                        border: 'none',
                                        padding: '5px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    X
                                </button>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '20px' }}>
                                    <Stack>
                                        <h2>{notes[selectedNote - 1].title}</h2>
                                        <div>{notes[selectedNote - 1].description}</div>
                                    </Stack>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
            {notepad && (
                <>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: noteCreated ? '60vh' : '40vh', marginTop: '20px' }}>
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
                                label="Add a description!"
                                placeholder="Enter your note..."
                                multiline
                                variant="standard"
                                width={300}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)} // Update the description state
                            />
                            <Button className='chat-button' onClick={() => { handleCreateNote(title, description); setNoteCreated(true) }}>
                                Save your note!
                            </Button>
                            <Button className='chat-button' onClick={() => { setNotepad(false); setNoteCreated(false) }}>
                                Return
                            </Button>
                            <div>{noteCreated && <div className='chat-button'>Note Created!</div>}</div>
                        </Stack>
                    </div>
                </>
            )}
        </>
    );
};

export default Notes;
