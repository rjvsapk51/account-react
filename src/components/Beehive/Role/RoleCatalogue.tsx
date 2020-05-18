import React, { Component } from "react";
import Role from "./RoleForm";
import { IRoleModel } from "../../../models/BeeHiveModel";
import {AppContext} from "../../../contexts/AppContext";
interface IProp {}

interface IState {
  RoleModel: Array<IRoleModel>;
  loading: boolean;
  currentIndex: number;
}

class RoleCatalogue extends Component<IProp, IState> {

  static contextType=AppContext;

  constructor(props: IProp) {
    super(props);
    this.state = { RoleModel: [], loading: true, currentIndex: -1 };
  }

  async componentDidMount() {
    await this.fetchRoleCatalogue();
  }

  async fetchRoleCatalogue() {
    const uri = this.context.baseURL+"Role";
    const response = await fetch(uri);
    this.setState({
      RoleModel: await response.json(),
      loading: false,
      currentIndex: -1,
    });
  }

  async postRole(data: IRoleModel) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    await fetch(this.context.baseURL+"Role", requestOptions);
    await this.fetchRoleCatalogue();
  }

  async putRole(data: IRoleModel) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    await fetch(this.context.baseURL+"Role", requestOptions);
    await this.fetchRoleCatalogue();
  }

  async deleteRole(index: number) {
    const uri = this.context.baseURL+"Role?id=" + index;
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    await fetch(uri, requestOptions);
    await this.fetchRoleCatalogue();
  }

  onAddorEdit = (data: IRoleModel) => {
    if (data.id !== 0) {
      this.putRole(data);
    } else {
      this.postRole(data);
    }
    this.setState({ currentIndex: -1 });
  };

  handleEdit = (index: number) => {
    this.setState({ currentIndex: index });
  };
  
  handleDelete = (index: number) => {
    this.deleteRole(index);
  };

  render() {
    const items = this.state.loading ? (
      <div>Loading...</div>
    ) : (
      <table>
        <tbody>
          {this.state.RoleModel.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td> {item.banner} </td>
                <td>{item.description}</td>
                <td>
                  <button onClick={() => this.handleEdit(index)}>Edit</button>
                </td>
                <td>
                  <button
                    onClick={() =>
                      this.handleDelete(item.id !== undefined ? item.id : 0)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
    return (
      <div>
        <Role
          onAddorEdit={this.onAddorEdit}
          currentIndex={this.state.currentIndex}
          roleCatalogue={this.state.RoleModel}
        />
        <hr />
        {items}
      </div>
    );
  }
}

export default RoleCatalogue;
