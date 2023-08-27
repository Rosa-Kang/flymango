import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  editPaper: {
    zIndex: "9999",
    position: "fixed",
    left: "50%",
    transform: "translate(-50%, 0)",
    padding: "1em",
    width: "80%",
    top: "10%",
  },
  editMedia: {
    height: 0,
    paddingTop: "56.25%",
  },
  fullHeightCard: {
    height: "100%",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    position: "relative",
  },
  editOverlay: {
    position: "absolute",
    top: "20px",
    left: "20px",
    color: "white",
    borderRadius: "3px",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  editOverlay2: {
    position: "absolute",
    top: "20px",
    right: "20px",
    color: "white",
  },
  grid: {
    display: "flex",
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px",
  },
  editTitle: {
    fontSize: "1em",
    padding: "0 16px",
  },
  edit: {
    backgroundColor: "#38b2ac",
    color: "whiteSmoke",
    marginTop: "2em",
  },
  // noValid: {
  //   backgroundColor: "whiteSmoke"
  // }
}));
