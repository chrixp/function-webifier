import React from 'react'
import {
    Input,
    InputContainer,
    InputLabel
} from '../styled-components/input'
import styled from 'styled-components'

const TextInput = styled(Input)`
    color: black;
`
const TextField = (props) => {
    return (
        <InputContainer>    
            <InputLabel>{props.label}</InputLabel>
            <TextInput
                type="text"
                value={props.value}
                onChange={(e) => props.setValue(e.target.value)} />
        </InputContainer>
    )
}

export default TextField
