import React from 'react'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CodeInputMethod from '../components/code-input-method'
import CodeEditor from '../components/code-editor'
import { useStore } from '../stores'
import { observer } from 'mobx-react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    button: {
        margin: 'auto'
    },
    paper: {
        padding: '1.5em',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    }
  }));

const CodeUploader = (props) => {
    return (
        <label htmlFor="upload-code">
            <input
                style={{ display: 'none' }}
                id="upload-code"
                name="upload-code"
                type="file"
                onChange={props.uploadCode}
            />
            <Button 
                color="secondary" 
                variant="contained" 
                component="span" 
                fullWidth>
                Upload
            </Button>
        </label>
    )
}

const CodeInput = observer(() => {
    const classes = useStyles()
    const { FunctionStore } = useStore()
    const uploadCode = (e) => {
        const reader = new FileReader()
        reader.onload = async (e) => {
            const text = (e.target.result)
            FunctionStore.setMethod("write")
            FunctionStore.setCode(text)
        }
        if(e.target.files.length > 0) {
            reader.readAsText(e.target.files[0])
        }
    }
    return (
        <Paper className={classes.paper} elevation={3}>
            <CodeInputMethod />
            { FunctionStore.method === "write" ? (
                <React.Fragment>
                    <CodeEditor />
                    <Button 
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        onClick={() => FunctionStore.analyzeCode()}>Analyze Function</Button>
                    </React.Fragment>
            ): <CodeUploader uploadCode={uploadCode} />}
        </Paper>
    )
})

export default CodeInput