import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
    paper: {
        marginTop: '0.75em',
        marginBottom: '0.75em',
        padding: '1.5em',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    }
  }));

const VerticalContainer = styled.div`
    margin-top: 0.75em;
    margin-bottom: 0.75em;
    display: flex;
    flex-direction: column;
`
const InputOption = (props) => {
    const classes = useStyles()
    return (
        <Paper className={classes.paper} elevation={3}>
        <Typography variant="h4">Argument {props.argument}</Typography>
        <TextField 
            readOnly
            label="Label"
            value={props.label}
            onChange={e => props.changeArgumentSettings('label', e.target.value)} />       
        
        <VerticalContainer>
            <InputLabel id="demo-simple-select-label">Data Type</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            value={props.type}
            onChange={e => props.changeArgumentSettings('type', e.target.value)}
            id="demo-simple-select"
            >
            <MenuItem value="Number">Number</MenuItem>
            <MenuItem value="String">String</MenuItem>
            <MenuItem value="Text">Text</MenuItem>
            <MenuItem value="Text Upload">Text Upload</MenuItem>
            <MenuItem value="Image Upload">Image Upload</MenuItem>
            </Select>
        </VerticalContainer>
        <FormControlLabel 
            control={<Checkbox 
                value={props.required}
                onChange={e => props.changeArgumentSettings('required',e.target.checked)}
            />}
            label="Required" />
        </Paper>
    )
}

export default InputOption