import React, { Component } from "react";
import { IAppContextModel } from "../models/ContextModel";

export const AppContext = React.createContext({});



class AppContextProvider extends Component<{}, IAppContextModel> {

  constructor(props: {}) {
    super(props);
    this.state = { baseURL: "http://localhost:8001/",menuLookup:[] };
  }
  componentDidMount(){
    this.fetchMenuLookup();
  }
  fetchMenuLookup = async () => {    
    const uri = this.state.baseURL + "Menu/GetAllMenuLookup";
    const response = await fetch(uri);
    this.setState({menuLookup:await response.json()});
  };

  render() {
    return (
      <AppContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </AppContext.Provider>
    );  
  }
}

export default AppContextProvider;
