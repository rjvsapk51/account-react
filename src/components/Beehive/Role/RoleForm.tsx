import React, { Component } from "react";
import { IRoleModel } from "../../../models/BeeHiveModel";
interface IProps {
  onAddorEdit: (person: IRoleModel) => void;
  currentIndex: number;
  roleCatalogue: Array<IRoleModel>;
}
class RoleForm extends Component<IProps, IRoleModel> {
  constructor(props: IProps) {
    super(props);
    if (props.currentIndex === -1) {
      this.state = {
        id: 0,
        banner: "",
        description: "",
        isActive: true,
        isSuperAdmin: false,
      };
    } else {
      this.state = props.roleCatalogue[props.currentIndex];
    }
  }
  componentDidUpdate(prevProp: IProps) {
    if (
      prevProp.currentIndex !== this.props.currentIndex ||
      prevProp.roleCatalogue.length !== this.props.roleCatalogue.length
    ) {
      this.setState(this.props.roleCatalogue[this.props.currentIndex]);
    }
    if (
      this.props.currentIndex !== prevProp.currentIndex &&
      this.props.currentIndex === -1
    ) {
      this.setState({
        id: 0,
        banner: "",
        description: "",
        isActive: true,
        isSuperAdmin: false,
      });
    }
  }
  handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    var value;
    if (e.currentTarget.type === "checkbox") {
      value = e.currentTarget.checked;
    } else if (e.currentTarget.type === "number") {
      value = parseInt(e.currentTarget.value);
    } else {
      value = e.currentTarget.value;
    }
    this.setState({
      [e.currentTarget.name]: value,
    });
  };

  private handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    this.props.onAddorEdit(this.state);
  };

  render() {
    return (
      <div>
        <h1>Role Form</h1>
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          <input
            type="checkbox"
            name="isActive"
            checked={this.state.isActive}
            onChange={this.handleInputChange}
          />
          <br />
          <input
            type="checkbox"
            name="isSuperAdmin"
            checked={this.state.isSuperAdmin}
            onChange={this.handleInputChange}
          />
          <br />
          <input
            type="text"
            name="banner"
            value={this.state.banner}
            placeholder="banner"
            onChange={this.handleInputChange}
          />
          <br />
          <input
            type="text"
            name="description"
            value={this.state.description}
            placeholder="description"
            onChange={this.handleInputChange}
          />
          <br />
          <input type="submit" value="Save" />
        </form>
      </div>
    );
  }
}
export default RoleForm;
