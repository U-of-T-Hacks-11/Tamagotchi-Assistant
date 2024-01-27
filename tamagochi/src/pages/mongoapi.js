import axios from "axios";
export const deleteNote = async (noteId) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/notes/${noteId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting the note:', error.message);
      throw error;
    }
  };
  export  const createNote = async (title, value) => {
    try {
        console.log('Creating', title, value);
        const response = await axios.post('http://localhost:3001/api/notes', null, {
            headers: {
                'Content-Type': 'application/json',
                title: title,
                description: value
            },
        });
              return response.data;
    } catch (error) {
      console.error('Error creating a new note:', error.message);
      throw error;
    }
  };
export const getAllNotes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/notes');
      return response.data;
    } catch (error) {
      console.error('Error fetching notes:', error.message);
      throw error;
    }
  };
      