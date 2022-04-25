// styles
import './Footer.scss'

// components
import Filters from './Filters'

import { useDispatch } from 'react-redux'
import { deleteCompletedTodos } from '../../store/todosSlice'

function Footer({n}) {

    const dispatch = useDispatch()

    const deleteCompletedTodosFunc = () => {
        dispatch(deleteCompletedTodos())
    }

    return (
        <div className='footer'>
        
            <section className='footer__row1'>

                <span>
                    {n} {n>1 ? 'items' : 'item'} left 
                </span>

                <Filters/>

                <span 
                    className='footer__clrBtn'
                    onClick={deleteCompletedTodosFunc}
                >
                    clear completed
                </span>

            </section>
        
            <section className='footer__row2'>

                <Filters/>

            </section>

        </div>
    )
}

export default Footer