import React, { useState, useContext, useEffect, useRef } from "react";
import {  IRoleModel } from "../../../models/BeeHiveModel";
import { AppContext } from "../../../contexts/AppContext";
import { IAppContextModel } from "../../../models/ContextModel";
import Toaster from "../../General/Toaster";
import { GetAll, Post, Put, Delete } from "../../../helpers/CRUDHelper";
import RoleCatalogue from "./RoleCatalogue";
import RoleForm from "./RoleForm";
interface CatalogueRequests {
  role: IRoleModel;
  action: "create" | "update" | "delete" | undefined;
}

interface Snackbar {
  Status: boolean;
  Message: string;
  Severity: "success" | "error" | "info" | "warning";
}

const Role = () => {
  const context = useContext(AppContext) as IAppContextModel;
  const [roleListState, setRoleListState] = useState<Array<IRoleModel>>([]);
  const [currentIndexState, setCurrentIndexState] = useState<number>(-1);
  const [isLoadingState, setIsLoadingState] = useState<boolean>(true);
  const [snackBarState, setSnackBarState] = useState<Snackbar>({
    Message: "",
    Severity: "success",
    Status: false,
  });
  const [modalState, setModalState] = useState<boolean>(false);
  //set unset toaster.
  const handleToaster = (
    message: string,
    status: boolean,
    severity: "success" | "error" | "info" | "warning"
  ) => {
    setSnackBarState({ Message: message, Severity: severity, Status: status });
    setSnackBarState({ Message: "", Severity: severity, Status: false });
  };
  // toggle modal state
  const toggleModelState = (modalState: boolean) => {
    setModalState(modalState);
  };
  //update current index
  const changeCurrentIndex = (currentIndex: number) => {
    setCurrentIndexState(currentIndexState);
  };
  const fetchRoleCatalogue = async () => {
    try {
      setIsLoadingState(true);
      const response = await GetAll(context.baseURL + "Role");
      const data = await response.json();
      setIsLoadingState(false);
      setRoleListState(data);
    } catch (Exception) {
      setIsLoadingState(false);
    }
  };
  //Handle on add or edit clicks
  const onAddorEdit = async (data: IRoleModel) => {
    if (data.id !== 0) {
      const response = await Put(context.baseURL + "Role", data);
      if (response.ok)
        handleToaster("Role updated successfully", true, "success");
      else handleToaster("Failed to update role", true, "error");
      await fetchRoleCatalogue();
    } else {
      const response = await Post(context.baseURL + "Role", data);
      if (response.ok)
        handleToaster("Role created successfully", true, "success");
      else handleToaster("Failed to create role", true, "error");
      await fetchRoleCatalogue();
    }
    setCurrentIndexState(-1);
  };
  //handle requests from table
  const getIndex = (value: number) => {
    for (var i = 0; i < roleListState.length; i++) {
      if (roleListState[i].id === value) {
        return i;
      }
    }
    return -1;
  };
  const handleTableRequest = async (data: CatalogueRequests) => {
    if (data.action === "update") {
      setCurrentIndexState(
        getIndex(data.role.id !== undefined ? data.role.id : -1)
      );
    }
    if (data.action === "delete") {
      let index = data.role.id !== undefined ? data.role.id : -1;
      const uri = context.baseURL + "Role?id=" + index;
      const response = await Delete(uri);
      if (response.ok)
        handleToaster("Role deleted successfully", true, "success");
      else handleToaster("Oops! couldnot delete", true, "success");
      await fetchRoleCatalogue();
    }
    if (data.action === "create") {
      setCurrentIndexState(-2);
      setModalState(true);
    }
  };
  // handle on page load
  const contextRef = useRef(context);
  useEffect(() => {
    const fetchCatalogue = async () => {
      try {
        setIsLoadingState(true);
        const response = await GetAll(contextRef.current.baseURL + "Role");
        const data = await response.json();
        setIsLoadingState(false);
        setRoleListState(data);
      } catch (Exception) {
        setIsLoadingState(false);
      }
    };
    fetchCatalogue();
  }, []);

  return (
    <div>
      <Toaster
        status={snackBarState.Status}
        message={snackBarState.Message}
        severity={snackBarState.Severity}
      />
      <RoleForm
        onAddorEdit={onAddorEdit}
        currentIndex={currentIndexState}
        roleCatalogue={roleListState}
        modalState={modalState}
        toggleModelState={toggleModelState}
        changeCurrentIndex={changeCurrentIndex}
      />
      <RoleCatalogue
        onAnyButtonClick={handleTableRequest}
        roleList={roleListState}
        isLoading={isLoadingState}
      />
    </div>
  );
};
export default Role;
