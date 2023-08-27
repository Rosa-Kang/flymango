import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    zIndex: "9999",
    position: "fixed",
    background: 'rgba(0,0,0,0.5)',
    left: "50%",
    transform: "translate(-50%, 0)",
    padding: "1em",
    width: "60%",
    top: "10%"
  },
  form: {
    background: "white",
    borderRadius: '20px',
    padding: '1em',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
  },
  pleaseLogin: {
    padding:"2px"
  },
  buttonClose: {
    marginTop: "2px"
  }
}));