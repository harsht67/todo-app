// styles
import './Filters.scss'

import { useDispatch, useSelector } from 'react-redux'
import { filterChanged } from '../../store/filtersSlice'

function Filters() {

    const dispatch = useDispatch()

    const filter = useSelector(state => state.filters.status)

    // change current selected status
    const changeFilter = (e) => {
        dispatch(filterChanged(e.target.getAttribute('data-val')))
    }

    return (
        <div className='filters'>
    
            <span 
                className={`filter ${filter=='all' && 'active'}`}
                data-val='all'
                onClick={changeFilter}
            >
                all
            </span>

            <span 
                className={`filter ${filter=='active' && 'active'}`}
                data-val='active'
                onClick={changeFilter}
            >
                active
            </span>

            <span 
                className={`filter ${filter=='completed' && 'active'}`}
                data-val='completed'
                onClick={changeFilter}
            >
                completed
            </span>
        
        </div>
    )
}

export default Filters