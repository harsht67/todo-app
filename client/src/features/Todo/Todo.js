// styles
import './Todo.scss'

// icons 
import CloseIcon from '@mui/icons-material/Close'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

import { useDispatch } from 'react-redux'
import { deleteTodo, toggleTodo } from '../../store/todosSlice'

function Todo(props) {

    const dispatch = useDispatch()

    // delete todo 
    const deleteTodoFunc = () => {
        dispatch(deleteTodo(_id))
    }

    // toggle completed status of todo
    const toggleTodoFunc = () => {
        dispatch(toggleTodo({
            _id,
            completed,
        }))
    }

    const {_id, completed, text} = props.todo

    return (
        <div className='todo'>
            

            <label className='todo__checkbox'>

                <input
                    type='checkbox'
                    checked={completed}
                    onChange={toggleTodoFunc}
                />

                <svg width={0} height={0}>
                    <linearGradient id="myGradient" gradientTransform="rotate(45)">
                        <stop offset="50%"  stop-color="hsl(192, 100%, 67%)" />
                        <stop offset="100%" stop-color="hsl(280, 87%, 65%)" />
                    </linearGradient>
                </svg>

                {
                    completed
                    ? <CheckCircleIcon sx={{fill: "url(#myGradient)"}}/>
                    : <div className='todo__customCheckbox'></div>
                }
            
            </label>


            <span className={`todo__text ${completed && 'completed'}`}>
                {text}
            </span>

            <CloseIcon
                className='todo__closeBtn'
                onClick={deleteTodoFunc}
            />
    
        </div>
    )
}

export default Todo