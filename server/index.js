const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const { writeFile, mkdir, unlink, readFile } = require('fs').promises
const app = express();

app.use(express.json({
    limit: '50mb'
}));
app.use(session({ 
    secret: 'chris phan',
    resave: true,
    saveUninitialized: true
}))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(cookieParser())

app.get('/', (req,res) => {
    res.send("hi")

})

function getParamNames(func) {
  var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
  var ARGUMENT_NAMES = /([^\s,]+)/g;
  var fnStr = func.toString().replace(STRIP_COMMENTS, '');
  var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  if(result === null)
     result = [];
  return result;
}
app.post('/function-argument', async (req,res) => {
    const id = new Date().toISOString()
    const folderPath = `./temp/${id}`
    const functionPath = `${folderPath}/func.js`
    await mkdir(folderPath)
    await writeFile(functionPath,req.body.code)
    const func = require(functionPath)
    res.send({
        args: getParamNames(func),
        id
    })
})

app.post('/generate-website', async (req,res) => {
    const { id, ...args } = req.body
    const folderPath = `./temp/${id}`
    const argsPath = `${folderPath}/args`
    const stringifiedArgs = JSON.stringify(args)
    await writeFile(argsPath, stringifiedArgs)
    res.status(200).end()
})

app.get('/generated/:id', async (req,res) => {
    const id = req.params.id
    const argsPath = `./temp/${id}/args`
    const content = await readFile(argsPath)
    const parsedContent = JSON.parse(content)
    res.send(parsedContent)
})

app.post('/function/:id', async (req,res) => {
    const id = req.params.id
    const argsPath = `./temp/${id}/func.js`
    const func = require(argsPath)
    const body = req.body
    console.log(body)
    const answer = func(...body)
    console.log(answer)
    res.send({
        answer
    })
})

app.listen(5000);