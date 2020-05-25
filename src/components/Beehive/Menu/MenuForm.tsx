import React, { useState, useEffect, useContext } from "react";
import { IMenuModel } from "../../../models/BeeHiveModel";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
  FormLabel,
  Checkbox,
  DialogActions,
  Button,
  MenuItem,
  Select,
} from "@material-ui/core";
import { AppContext } from "../../../contexts/AppContext";
import { IAppContextModel } from "../../../models/ContextModel";

interface IProp {
  onAddorEdit: (menu: IMenuModel) => void;
  currentIndex: number;
  menuCatalogue: Array<IMenuModel>;
  //for modal open and close
  modalState: boolean;
  toggleModelState: (modalState: boolean) => void;
  //for form reset;
  changeCurrentIndex: (currentIndex: number) => void;
}

interface IState {
  menuModel: IMenuModel;
  openModal: boolean;
}

const MenuForm = (props: IProp) => {
  const context = useContext(AppContext) as IAppContextModel;
  const [menuState, setMenuState] = useState<IMenuModel>({
    id: 0,
    banner: "",
    displayBanner: "",
    icon: "",
    routerLink: "",
    orderNumber: 0,
    accessToAll: false,
    isDashboardMenu: false,
    isActive: false,
    parentId: 0,
    description: "",
  });
  const resetMenuState = () => {
    setMenuState({
      id: 0,
      banner: "",
      displayBanner: "",
      icon: "",
      routerLink: "",
      orderNumber: 0,
      accessToAll: false,
      isDashboardMenu: false,
      isActive: false,
      parentId: 0,
      description: "",
    });
  };
  const [modalState, setModalState] = useState<boolean>(false);

  const handleSelectChange = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    let inputName = e.target.name as string;
    let inputValue = e.target.value as number;
    setMenuState({
      ...menuState,
      [inputName]: inputValue,
    });
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.currentTarget.name;
    var value: any;
    if (e.currentTarget.type === "checkbox") {
      value = e.currentTarget.checked;
    } else if (e.currentTarget.type === "number") {
      value = parseInt(e.currentTarget.value);
    } else {
      value = e.currentTarget.value;
    }
    setMenuState({
      ...menuState,
      [inputValue]: value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    props.onAddorEdit(menuState);
    setModalState(false);
  };

  const handleModalClose = () => {
    setModalState(false);
    props.changeCurrentIndex(-1);
  };
  const handleModalOpen = () => {
    setModalState(true);
  };
  
  useEffect(() => {
    //create modal pop up
    if (props.currentIndex === -2 && props.modalState === true) {
      resetMenuState();
      handleModalOpen();
      props.toggleModelState(false);
    }
    if (props.currentIndex === -1) {
      resetMenuState();
    }
    //edit modal pop up
    if (props.currentIndex >= 0) {
      setMenuState(props.menuCatalogue[props.currentIndex]);
      handleModalOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentIndex,props.modalState]);

  return (
    <div>
      <div>
        <Dialog
          open={modalState}
          onClose={handleModalClose}
          aria-labelledby="form-dialog-title"
          fullWidth={true}
          maxWidth="lg"
        >
          <DialogTitle id="form-dialog-title">Create Menu</DialogTitle>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <DialogContent>
              <Grid id="1" container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="banner"
                    label="Banner"
                    type="text"
                    fullWidth={true}
                    name="banner"
                    onChange={handleInputChange}
                    variant="outlined"
                    value={menuState.banner}
                    required={true}
                    inputProps={{
                      maxLength: 50,
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    margin="dense"
                    id="displayBanner"
                    label="Display banner"
                    type="text"
                    fullWidth={true}
                    name="displayBanner"
                    onChange={handleInputChange}
                    variant="outlined"
                    value={menuState.displayBanner}
                    required={true}
                    inputProps={{
                      maxLength: 50,
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    margin="dense"
                    id="icon"
                    label="Icon"
                    type="text"
                    fullWidth={true}
                    name="icon"
                    onChange={handleInputChange}
                    variant="outlined"
                    value={menuState.icon}
                    required={true}
                    inputProps={{
                      maxLength: 20,
                    }}
                  />
                </Grid>
              </Grid>
              <Grid id="2" container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    margin="dense"
                    id="routerLink"
                    label="Router link"
                    type="text"
                    fullWidth={true}
                    name="routerLink"
                    onChange={handleInputChange}
                    variant="outlined"
                    value={menuState.routerLink}
                    inputProps={{
                      maxLength: 50,
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    margin="dense"
                    id="orderNumber"
                    label="Order number"
                    type="number"
                    fullWidth={true}
                    name="orderNumber"
                    onChange={handleInputChange}
                    variant="outlined"
                    value={menuState.orderNumber}
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormLabel>Access to all</FormLabel>
                  <Checkbox
                    checked={menuState.accessToAll}
                    onChange={handleInputChange}
                    inputProps={{ "aria-label": "primary checkbox" }}
                    name="accessToAll"
                  />
                </Grid>
              </Grid>

              <Grid id="3" container spacing={2}>
                <Grid item xs={4}>
                  <FormLabel>Is dashboard menu</FormLabel>
                  <Checkbox
                    checked={menuState.isDashboardMenu}
                    onChange={handleInputChange}
                    inputProps={{ "aria-label": "primary checkbox" }}
                    name="isDashboardMenu"
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormLabel>Is active</FormLabel>
                  <Checkbox
                    checked={menuState.isActive}
                    onChange={handleInputChange}
                    inputProps={{ "aria-label": "primary checkbox" }}
                    name="isActive"
                  />
                </Grid>
                <Grid item xs={4}>
                  <Select
                    label="Parent id"
                    id="parentId"
                    value={menuState.parentId}
                    onChange={handleSelectChange}
                    name="parentId"
                    variant="outlined"
                    fullWidth={true}
                  >
                    <MenuItem value="0">
                      <em>None</em>
                    </MenuItem>
                    {context.menuLookup.map((item, index) => {
                      return <MenuItem value={item.id} key={index}>{item.banner}</MenuItem>;
                    })}
                  </Select>
                </Grid>
              </Grid>
              <Grid id="3" container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    margin="dense"
                    id="description"
                    label="Description"
                    type="text"
                    multiline={true}
                    fullWidth={true}
                    name="description"
                    onChange={handleInputChange}
                    variant="outlined"
                    value={menuState.description}
                    inputProps={{
                      maxLength: 200,
                    }}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleModalClose} color="primary">
                Cancel
              </Button>
              <Button color="primary" type="submit">
                Save
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </div>
  );
};

export default MenuForm;
