import React, { Component } from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
interface IState {
  status: boolean;
  message: string;
  severity: 'success'|'error'|'info'|'warning';
}
interface IProps {
  status: boolean;
  message: string;
  severity: 'success'|'error'|'info'|'warning';
  
}

export default class Toaster extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { message: "", severity: "success", status: false };
  }
  componentDidUpdate(prevProp: IProps) {
    if(this.props.status===true){
        if (prevProp.status !== this.props.status) {
            this.setState({ status: this.props.status });
          }
          if (prevProp.message !== this.props.message) {
            this.setState({ message: this.props.message });
          }
          if (prevProp.severity !== this.props.severity) {
            this.setState({ severity: this.props.severity });
          }
    }
    


  }
  handleSnackbarClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ status: false,message:"",severity:"success" });
  };
  render() {
    return (
      <Snackbar
        open={this.state.status}
        autoHideDuration={3000}
        onClose={this.handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={this.handleSnackbarClose}
          severity={this.state.severity}
        >
          {this.state.message}
        </MuiAlert>
      </Snackbar>
    );
  }
}
