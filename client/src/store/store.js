import { configureStore } from '@reduxjs/toolkit'

import todosReducer from './todosSlice.js'
import filtersReducer from './filtersSlice.js'

const store = configureStore({
    reducer: {
        todos: todosReducer,
        filters: filtersReducer,
    }
})

export default store