import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    appBar: {
        marginBottom: '1em',
    },
  }));

const Header = (props) => {
    const classes = useStyles()
    return (
        <AppBar className={classes.appBar} position="static">
            <Toolbar>
                <Typography variant="h5">
                    {props.name}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header