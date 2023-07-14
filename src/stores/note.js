import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import apiClient from '../services/api'

export const useNoteStore = defineStore('note',() => {
  const notes = reactive([])

  

  const addNote = async (data) => {
    try {
      const res = await apiClient.post('/todo/new', data)
      notes.unshift(res.data)
      let todoId = res.data.data.todoId

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
        notes.push(row)
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