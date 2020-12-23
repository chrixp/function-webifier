import { makeAutoObservable, action } from "mobx"
import axios from 'axios'

const defaultCode = `function add(a, b) {
    return a + b;
  }

module.exports = add
  `;
  
class FunctionStore {
    functionName = ''
    method = 'write'
    code = defaultCode
    args = []
    id = null
    url = null
    step = 0

    constructor() {
       makeAutoObservable(this)
    }   

    // Setters 

    setFunctionName (functionName) {
        this.functionName = functionName
    }

    setUrl(url) {
        this.url = url 
    }

    setStep (step) {
        this.step = step
    }

    setMethod (method) {
        this.method = method
    }

    setCode (code) {
        this.code = code
    }

    setId (id) {
        this.id = id
    }

    mapArgumentListToObject (args) {
        const objs = args.map(arg => ({
            label: arg,
            argument: arg,
            required: false,
            type: 'Number'
        }))
        this.args = objs
    }

    changeArgument (index,key,value) {
        this.args[index][key] = value
    }

    // Fetchers

    analyzeCode () {
        axios.post('/function-argument', {
            code: this.code
        })
            .then(res => {
                this.setId(res.data.id) 
                this.mapArgumentListToObject(res.data.args)
                this.setStep(1)
            })
            .catch(err => console.log(err))
    }

    generateWebsite () {
        
        const { id , args, functionName } = this
        axios.post('/generate-website', {
            id,
            args,
            functionName
        })
            .then(res => {
              if(res.status === 200) {
                  this.setUrl(`http://localhost:3000/${id}`)
              }
            })
            .catch(err => console.log(err))
            
        this.setStep(2)
    }
}

const store = new FunctionStore()
export default store