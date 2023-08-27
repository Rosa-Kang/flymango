import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    background: '#38b2ac',   
    margin: '30px 0',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'colum',
    justifyContent: 'space-between'
  },
  left: {
    alignItems: 'center',
    display: 'flex',
    color: 'white',
    textDecoration: 'none',
  },
  logo: {
    fontFamily: 'Gloria Hallelujah',
    fontSize: '1.5em'
  },
  heading: {
    color: 'white',
  },
  rightBtn :{
    color: 'white',
    background: '#38b2ac',
    textAlign: 'center',
    margin: "0px 5px"
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '250px'
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));