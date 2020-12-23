import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import beautify from 'vkbeautify'
const styles = {
    hidden: {
      display: "none",
    },
    importLabel: {
      color: "black",
      color: "#fff",
      backgroundColor: "#3f51b5",
      padding: "6px 16px",
      fontSize: "0.875rem",
      minWidth: "64px",
      boxSizing: "border-box",
      fontFamily: "Roboto",
      fontWeight: "500",
      lineHeight: "1.75",
      borderRadius: "4px",
      letterSpacing: "0.02857em",
      textTransform: "uppercase"
        
    },
  };
const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
}

export default () => {
    const [args, setArgs] = useState([])
    const [functionName, setFunctionName] = useState('')
    const [id, setId] = useState('')
    const [answer, setAnswer] = useState('')

    const changeArgs = (i, value) => {
        setArgs(prev => {
            const cur = [...prev]
            cur[i].value = value
            return cur
        })
    }

    const runAlgorithm = async () => {
        setAnswer('')
        await axios.post(`/function/${id}`, args.map(arg => arg.value))
            .then(res => setAnswer(res.data.answer))
            .catch(err => console.log(err))
    }

    const prettifyAnswer = () => {
        if(answer instanceof Object) {
            return beautify.json(answer, 4)
        } else {
            return answer
        }
    }

    useEffect(async () => {
        const pathId = window.location.pathname.slice(1)
        setId(pathId)
        await axios.get(`/generated/${pathId}`)
                .then(res => {
                    const { functionName, args }  = res.data
                    setFunctionName(functionName)
                    const inputs = args.map(arg => ({
                        ...arg,
                        value: ''
                    }))
                    setArgs(inputs)
                })
                .catch(err => console.log(err))


    },[])
    const generateInput = (each, i) => {
        switch(each.type) {
            case 'Number':
                return <TextField
                type="number"
                label={each.label}
                value={each.value}
                onChange={(e) => changeArgs(i, parseInt(e.target.value))}
             />
            case 'String':
                return <TextField
                label={each.label}
                value={each.value}
                onChange={(e) => changeArgs(i, e.target.value)}
             />
            case 'Text':
                return (
                <React.Fragment>
                    <InputLabel>{each.label}</InputLabel>
                    <TextareaAutosize
                    rowsMin={3}
                    rowsMax={6}
                    value={each.value}
                    onInput={(e) => changeArgs(i, e.target.value)}
                        /> 
                </React.Fragment>
                    
                )
            case 'Text Upload':
                return (
                    <React.Fragment>
                    <label htmlFor="upload-photo">
                    <input
                        style={{ display: 'none' }}
                        id="upload-photo"
                        name="upload-photo"
                        type="file"
                    />

                    <Button color="secondary" variant="contained" component="span" fullWidth>
                        Upload
                    </Button>
                    </label>
                </React.Fragment>
            )
        }
    }
    return (
        <Container style={containerStyle}>
            {args.length === 0 ? <Typography variant="h1">Loading...</Typography> : (
                <React.Fragment>
                    <Typography variant="h1">{functionName}</Typography>
                    {args.map((each,i) => {   
                    return generateInput(each,i)
                })}
                <br />
                <Button 
                    variant='contained'
                    color='primary'
                    onClick={runAlgorithm}>Run Function</Button>
                <br />
                {answer && (
                    <div>
                        <h1>Result:</h1>
                        <div>{prettifyAnswer()}</div>
                    </div>
                )}
                </React.Fragment>
                
            )}
            
        </Container>
    )
}