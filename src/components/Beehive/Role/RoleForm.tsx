import React, { useState, useEffect } from "react";
import { IRoleModel } from "../../../models/BeeHiveModel";
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
} from "@material-ui/core";

interface IProp {
  onAddorEdit: (role: IRoleModel) => void;
  currentIndex: number;
  roleCatalogue: Array<IRoleModel>;
  //for modal open and close
  modalState: boolean;
  toggleModelState: (modalState: boolean) => void;
  //for form reset;
  changeCurrentIndex: (currentIndex: number) => void;
}

interface IState {
  roleModel: IRoleModel;
  openModal: boolean;
}

const RoleForm = (props: IProp) => {
  const [roleState, setRoleState] = useState<IRoleModel>({
    id: 0,
    banner: "",
    isSuperAdmin: false,
    isActive: false,
    description: "",
  });
  const resetMenuState = () => {
    setRoleState({
      id: 0,
      banner: "",
      isSuperAdmin: false,
      isActive: false,
      description: "",
    });
  };
  const [modalState, setModalState] = useState<boolean>(false);

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
    setRoleState({
      ...roleState,
      [inputValue]: value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    props.onAddorEdit(roleState);
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
      setRoleState(props.roleCatalogue[props.currentIndex]);
      handleModalOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentIndex, props.modalState]);

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
                    value={roleState.banner}
                    required={true}
                    inputProps={{
                      maxLength: 50,
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                <FormLabel>Is super admin</FormLabel>
                  <Checkbox
                    checked={roleState.isSuperAdmin}
                    onChange={handleInputChange}
                    inputProps={{ "aria-label": "primary checkbox" }}
                    name="isSuperAdmin"
                  />
                </Grid>
                <Grid item xs={4}>
                <FormLabel>Is active</FormLabel>
                  <Checkbox
                    checked={roleState.isActive}
                    onChange={handleInputChange}
                    inputProps={{ "aria-label": "primary checkbox" }}
                    name="isActive"
                  />
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
                    value={roleState.description}
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

export default RoleForm;
