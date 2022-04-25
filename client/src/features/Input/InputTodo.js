// styles
import './InputTodo.scss'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewTodo } from '../../store/todosSlice'

function InputTodo() {

    const dispatch = useDispatch()

    const [todo, setTodo] = useState('')

    const changeHandler = (e) => {
        setTodo(e.target.value)
    }

    // adds a new todo 
    const submitFunc = (e) => {
        if(e.keyCode==13 && todo!=0) {

            let id = Date.now() + Math.floor(Math.random()*Date.now()+1)
            dispatch(addNewTodo({
                completed: false,
                text: todo,
            }))

            setTodo('')
        }
    }

    return (
        <div className='inputTodo'>
            
            <input
                value={todo}
                onChange={changeHandler}
                onKeyDown={submitFunc}
                placeholder='Create a new todo...'
            />

        </div>
    )
}

export default InputTodo