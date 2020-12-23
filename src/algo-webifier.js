import React, { useContext } from 'react';
import { observer } from "mobx-react"
import { StoreContext, useStore } from './stores'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container';
import Header from './components/header'
import CodeInput from './containers/code-input'
import ArgumentEditor from './containers/argument-editor'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    container : {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    paper: {
        padding: '1.5em',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    }
  }));
//    {url && <h2>You can visit your website at}

const steps = [
    'Define function',
    'Define arguments',
]

const App = observer(() => {
  const classes = useStyles()
  const { FunctionStore } = useStore()
  const getStepContent = (step) => {
      switch(step) {
          case 0:
            return <CodeInput />
          case 1:
            return <ArgumentEditor />
          default:
            return <h1>Unknown step</h1>
      }
  }
  return (
    <Container className={classes.container}>
        <Header name="Function Webifier" />
        <Stepper activeStep={FunctionStore.step} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                {getStepContent(index)}
                </StepContent>
          </Step>
        ))}
        {FunctionStore.step === 2 &&  <h2>You can visit your website at<a href={FunctionStore.url} target="__blank">{FunctionStore.url}</a></h2>}
      </Stepper>
    </Container>
  );
})


export default App;