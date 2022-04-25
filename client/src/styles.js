import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    :root {
        --bck: ${props => props.theme.bck};
        --frg: ${props => props.theme.frg};
        --txt: ${props => props.theme.txt};
        --txt3: ${props => props.theme.txt3};
        --bs: ${props => props.theme.bs};
    }
`

export default GlobalStyle