import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    status: 'idle',
    entities: {},
}

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const res = await axios.get('http://localhost:5000/todos')
    return res.data
})

export const addNewTodo = createAsyncThunk('todos/addNewTodo', async todo => {
    const res = await axios.post('http://localhost:5000/todo', todo)
    return res.data 
})

export const toggleTodo = createAsyncThunk('todos/toggleTodo', async todo => {
    const res = await axios.put('http://localhost:5000/todo', todo)
    return res.data 
})

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async id => {
    const res = await axios.delete('http://localhost:5000/todo/'+id)
    return res.data
})

export const deleteCompletedTodos = createAsyncThunk('todos/deleteCompletedTodos', async () => {
    const res = await axios.delete('http://localhost:5000/todos')
    return res.data
})

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchTodos.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                let todos = {}
                action.payload.forEach(todo => {
                    todos[todo._id] = todo
                })
                state.entities = todos 
                state.status = 'idle'
            })
            .addCase(addNewTodo.fulfilled, (state, action) => {
                let todo = action.payload
                state.entities[todo._id] = todo
            })
            .addCase(toggleTodo.fulfilled, (state, action) => {
                let id = action.payload
                state.entities[id].completed = !state.entities[id].completed
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                let id = action.payload
                id && delete state.entities[id]
            })
            .addCase(deleteCompletedTodos.fulfilled, (state, action) => {
                let res = action.payload
                res && 
                    Object.values(state.entities).forEach(todo => {
                        if(todo.completed) {
                            delete state.entities[todo._id]
                        }
                    })
            })
    }
})

export default todosSlice.reducer

// selectors 
export const selectFilteredTodos = createSelector(
    state => state.todos.entities,
    state => state.filters.status,
    (todos, filter) => {
        if(filter=='all') {
            return Object.values(todos)
        }
        if(filter=='active') {
            let list = Object.values(todos).filter(todo => !todo.completed)
            return list 
        }
        if(filter=='completed') {
            let list = Object.values(todos).filter(todo => todo.completed)
            return list 
        }
    }
)