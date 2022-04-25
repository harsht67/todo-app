// styles
import './App.scss'

// components
import Header from './features/Header/Header'
import InputTodo from './features/Input/InputTodo'
import Todo from './features/Todo/Todo'
import Footer from './features/Footer/Footer'

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { fetchTodos, selectFilteredTodos } from './store/todosSlice.js'
import GlobalStyle from './styles'
import themes from './themes.js'
import { useEffect } from 'react'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTodos())
  }, [])

  const todos = useSelector(selectFilteredTodos)

  const [theme, setTheme] = useState('light')

  const changeTheme = () => {
    theme=='dark' ? setTheme('light') : setTheme('dark')
  }

  return (
    <div className="app">
      <ThemeProvider theme={themes[theme]} >
      
        <GlobalStyle/>
        
        <header>

          <Header
            theme={theme}
            changeTheme={changeTheme}
          />

          <InputTodo/>
        
        </header>

        <main>

            { todos.map(todo => <Todo key={todo.id} todo={todo} />) }

        </main>

        <footer>

          <Footer n={todos.length} />

        </footer>

      </ThemeProvider>
    </div>
  )
}

export default App;
