import React from 'react'
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs'
import 'prismjs/themes/prism.css';
import { useStore } from '../stores'
import { observer } from 'mobx-react'

const CodeEditor = observer(() => {
    const { FunctionStore } = useStore()
    return (
        <Editor
            value={FunctionStore.code}
            onValueChange={code => FunctionStore.setCode(code)}
            highlight={code => {
                const res = Prism.highlight(code, Prism.languages.javascript, 'javascript')
                return res
            }}
            padding={10}
            style={{
                width: "80%",
                minHeight: "350px",
                maxHeight: "350px",
                margin: "1.5em auto",
                overflow: "scroll",
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 14,
                border: '1px solid black'
        }}
   />
   ) 
})

export default CodeEditor