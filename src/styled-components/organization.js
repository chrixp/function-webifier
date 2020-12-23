import styled from 'styled-components'

export const BodyContainer = styled.div`
    padding-left: 2em;
    padding-right: 2em;
    overflow: auto;
    display: flex;
    margin: 0.5em;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: black;
`

export const ErrorMessage = styled.p`
    color: red;
    font-weight: 800;
`