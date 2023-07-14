import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import apiClient from '../services/api'

export const useNoteStore = defineStore('note',() => {
  const notes = reactive([])

  

  const addNote = async (data) => {
    try {
      const res = await apiClient.post('/todos', {
        "title": data.title,
        "description": data.description,
        "done": data.done
      })
      if (res.status == 201) {
        await getAllNotes()
      }

    } catch (error) {
      console.log(error);
    }
  }
  const getNote = async (id) => {
    try {
      const res = await apiClient.get(`/todos/${id}`)
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }

  const getAllNotes = async () => {
    try {
      const { data } = await apiClient.get('/todos');
      // console.log(data.content);
      data.content.forEach((row) => {
        let index = notes.findIndex((v) => {
          return v.todoId == row.todoId
        })
        if (index === -1) {
          notes.push(row)
        }
      })
    } catch (error) {
      
    }
  }

  const updateNote = async (id, data) => {
    try {
      const response = await apiClient.put(`/todos/${id}`, data)
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  const deleteNote = async (id) => {
    try {
      const response = await apiClient.delete(`/todo/delete/${id}`)
      const index = notes.findIndex((note) => note._id === id)
      await notes.splice(index, 1);
    }
    catch (err) {
      console.log(err);
    }
  }


  return {
    notes,
    addNote,
    getAllNotes,
    updateNote,
    deleteNote
  }

})