import React, { useState, useContext, useEffect, useRef } from "react";
import { IMenuModel } from "../../../models/BeeHiveModel";
import { AppContext } from "../../../contexts/AppContext";
import { IAppContextModel } from "../../../models/ContextModel";
import Toaster from "../../General/Toaster";
import MenuForm from "./MenuForm";
import MenuCatalogue from "./MenuCatalogue";
import { GetAll, Post, Put, Delete } from "../../../helpers/CRUDHelper";

interface CatalogueRequests {
  menu: IMenuModel;
  action: "create" | "update" | "delete" | undefined;
}
interface Snackbar {
  Status: boolean;
  Message: string;
  Severity: "success" | "error" | "info" | "warning";
}

const Menu = () => {
  const context = useContext(AppContext) as IAppContextModel;
  const [menuListState, setMenuListState] = useState<Array<IMenuModel>>([]);
  const [currentIndexState, setCurrentIndexState] = useState<number>(-1);
  const [isLoadingState, setIsLoadingState] = useState<boolean>(true);
  const [snackBarState, setSnackBarState] = useState<Snackbar>({
    Message: "",
    Severity: "success",
    Status: false,
  });

  const [modalState, setModalState] = useState<boolean>(false);

  const handleToaster = (
    message: string,
    status: boolean,
    severity: "success" | "error" | "info" | "warning"
  ) => {
    setSnackBarState({ Message: message, Severity: severity, Status: status });
    setSnackBarState({ Message: "", Severity: severity, Status: false });
  };

  const onAddorEdit = async (data: IMenuModel) => {
    if (data.id !== 0) {
      const response = await Put(context.baseURL + "Menu", data);
      if (response.ok)
        handleToaster("Menu updated successfully", true, "success");
      else handleToaster("Failed to update menu", true, "error");
      await fetchMenuCatalogue();
    } else {
      const response = await Post(context.baseURL + "Menu", data);
      if (response.ok)
        handleToaster("Menu created successfully", true, "success");
      else handleToaster("Failed to create menu", true, "error");
      await fetchMenuCatalogue();
    }
    setCurrentIndexState(-1);
  };

  //MenuCatalogue
  const fetchMenuCatalogue = async () => {
    try {
      setIsLoadingState(true);
      const response = await GetAll(contextRef.current.baseURL + "Menu");
      const data = await response.json();
      setIsLoadingState(false);
      setMenuListState(data);
    } catch (Exception) {
      setIsLoadingState(false);
    }
  };

  const handleTableRequest = async (data: CatalogueRequests) => {
    if (data.action === "update") {
      setCurrentIndexState(
        getIndex(data.menu.id !== undefined ? data.menu.id : -1)
      );
    }
    if (data.action === "delete") {
      let index = data.menu.id !== undefined ? data.menu.id : -1;
      const uri = context.baseURL + "Menu?id=" + index;
      const response = await Delete(uri);
      if (response.ok)
        handleToaster("Menu deleted successfully", true, "success");
      else handleToaster("Oops! couldnot delete", true, "success");
      await fetchMenuCatalogue();
    }
    if (data.action === "create") {
      setCurrentIndexState(-2);
      setModalState(true);
    }
  };

  const getIndex = (value: number) => {
    for (var i = 0; i < menuListState.length; i++) {
      if (menuListState[i].id === value) {
        return i;
      }
    }
    return -1;
  };

  const toggleModelState = (modalState: boolean) => {
    setModalState(modalState);
  };
  const changeCurrentIndex = (currentIndex: number) => {
    setCurrentIndexState(currentIndexState);
  };
  const contextRef = useRef(context);
  useEffect(() => {
    const fetchCatalogue = async () => {
      try {
        setIsLoadingState(true);
        const response = await GetAll(contextRef.current.baseURL + "Menu");
        const data = await response.json();
        setIsLoadingState(false);
        setMenuListState(data);
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
      <MenuForm
        onAddorEdit={onAddorEdit}
        currentIndex={currentIndexState}
        menuCatalogue={menuListState}
        modalState={modalState}
        toggleModelState={toggleModelState}
        changeCurrentIndex={changeCurrentIndex}
      />
      <MenuCatalogue
        onAnyButtonClick={handleTableRequest}
        menuList={menuListState}
        isLoading={isLoadingState}
      />
    </div>
  );
};

export default Menu;
