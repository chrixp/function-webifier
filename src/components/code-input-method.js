import React, { useState } from 'react'
import { useStore } from '../stores'
import { observer } from 'mobx-react'
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const CodeInputMethod = observer(() => {
    const { FunctionStore } = useStore()
    return (
        <div>
            <FormControl component="fieldset">
                <FormLabel component="legend">Method</FormLabel>
                <RadioGroup 
                    aria-label="method" 
                    name="method" 
                    value={FunctionStore.method} 
                    onChange={(e) =>  FunctionStore.setMethod(e.target.value)}>
                    <FormControlLabel 
                        value={"write"} 
                        control={<Radio />} 
                        label="Write your function" />
                    <FormControlLabel 
                        value={"upload"} 
                        control={<Radio />} 
                        label="Upload your function" />
                </RadioGroup>
            </FormControl>
        </div>
    )
})

export default CodeInputMethod