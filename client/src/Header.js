// styles
import './Header.scss'

// icons
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

function Header(props) {

    const changeTheme = () => {
        props.changeTheme()
    }

    return (
        <div className='header'>
            
            <h1 className='header__title'>
                todo
            </h1>

            <div
                className='header__themeBtn'
                onClick={changeTheme}
            >
                { props.theme=='dark' ? <LightModeIcon/> : <DarkModeIcon/> }
            </div>
            
        </div>
    )
}

export default Header