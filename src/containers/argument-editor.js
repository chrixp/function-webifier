import React from 'react'
import TextField from '@material-ui/core/TextField';
import { observer } from 'mobx-react'
import { useStore } from '../stores'
import ArgumentOption from '../components/argument-option'
import Button from '@material-ui/core/Button';

const ArgumentEditor = observer(() => {
    const { FunctionStore } = useStore()
    const argOptions = FunctionStore.args.map((arg,index) => (
        <ArgumentOption 
            changeArgumentSettings={(key,value) => FunctionStore.changeArgument(index,key,value)}
            {...arg} />
    ))

    return (
        <React.Fragment>
            <TextField 
                label="Function Name"
                value={FunctionStore.functionName}
                onChange={e => FunctionStore.setFunctionName(e.target.value)}
            />
            {argOptions}
            <Button 
                variant="contained"
                color="primary"
                onClick={() => FunctionStore.generateWebsite()}>Generate Website</Button> 
        </React.Fragment>
    )
})

export default ArgumentEditor