import styled from 'styled-components'

export const Button = styled.button`
    margin: 0.8em;
    font-size: 1.3em;
    padding: 0.3em;
    width: 5em;
    font-family: monospace;
    &:hover {
        cursor: pointer;
    }
`
export const Input = styled.input`
    font-family: monospace;
    color: white;
    &:hover {
        cursor: pointer;
    }
`
export const InputLabel = styled.label`
    text-align: center;
    font-family: monospace;
    font-size: 2em;
    color: white;
    margin-bottom: 0.5em;
`
export const InputContainer = styled.div`
    margin: 1em;
    display: flex;
    flex-direction: column;
`