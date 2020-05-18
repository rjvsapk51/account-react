import React, { useState, useContext, useEffect, useRef } from "react";
import { IMenuModel } from "../../../models/BeeHiveModel";
import { AppContext } from "../../../contexts/AppContext";
import { IAppContextModel } from "../../../models/ContextModel";
import Toaster from "../../General/Toaster";
import MenuForm from "./MenuForm";
import MenuCatalogue from "./MenuCatalogue";

interface CatalogueRequests {
  menu: IMenuModel;
  action: "create" | "update" | "delete" | undefined;
}

const Menu = () => {
  const context = useContext(AppContext) as IAppContextModel;
  const [menuListState, setMenuListState] = useState<Array<IMenuModel>>([]);
  const [currentIndexState, setCurrentIndexState] = useState<number>(-1);
  const[isLoadingState,setIsLoadingState]= useState<boolean>(true);
  const [snackBarState, setSnakeBarState] = useState<boolean>(false);
  const [snackBarMessageState, setSnackBarMessageState] = useState<string>("");
  const [snackBarSeverityState, setSnackBarSeverityState] = useState<
    "success" | "error" | "info" | "warning"
  >("success");

  const [modalState, setModalState] = useState<boolean>(false);
  //Toasters
  const handleToaster = (
    message: string,
    status: boolean,
    severity: "success" | "error" | "info" | "warning"
  ) => {
    setSnakeBarState(status);
    setSnackBarMessageState(message);
    setSnackBarSeverityState(severity);

    setSnakeBarState(false);
    setSnackBarMessageState("");
    setSnackBarSeverityState("success");
  };
  //CRUD operations
  const deleteRole = async (index: number) => {
    const uri = context.baseURL + "Menu?id=" + index;
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    await fetch(uri, requestOptions);
    await fetchMenuCatalogue();
    handleToaster("Menu deleted successfully", true, "success");
  };

  const handleEdit = (index: number) => {
    setCurrentIndexState(index);
  };
  const handleDelete = (index: number) => {
    deleteRole(index);
  };
  const handleCreate = () => {
    setCurrentIndexState(-2);
    setModalState(true);
  };

  const postRole = async (data: IMenuModel) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    await fetch(context.baseURL + "Menu", requestOptions);
    await fetchMenuCatalogue();
    handleToaster("Menu created successfully", true, "success");
  };

  const putRole = async (data: IMenuModel) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    await fetch(context.baseURL + "Menu", requestOptions);
    await fetchMenuCatalogue();
    handleToaster("Menu updated successfully", true, "success");
  };

  const onAddorEdit = (data: IMenuModel) => {
    if (data.id !== 0) {
      putRole(data);
    } else {
      postRole(data);
    }
    setCurrentIndexState(-1);
  };

  //MenuCatalogue
  const fetchMenuCatalogue = async () => {  
    setIsLoadingState(true);
    const uri = context.baseURL + "Menu";
    const response = await fetch(uri);
    setMenuListState(await response.json());
    setIsLoadingState(false);
  };

  const handleTableRequest = (data: CatalogueRequests) => {
    if (data.action === "update") {
      handleEdit(getIndex(data.menu.id !== undefined ? data.menu.id : -1));
    }
    if (data.action === "delete") {
      handleDelete(data.menu.id !== undefined ? data.menu.id : -1);
    }
    if (data.action === "create") {
      handleCreate();
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
  const contextRef =useRef(context);
  useEffect(() => {
    const fetchCatalogue = async () => {
      const uri = contextRef.current.baseURL + "Menu";
      const response = await fetch(uri);
      const data = await response.json();
      while(response.ok){
        setIsLoadingState(false);
        break;
      }
      setMenuListState(data);
    };
    fetchCatalogue();
    
  }, []);
  return (
    <div>
      <Toaster
        status={snackBarState}
        message={snackBarMessageState}
        severity={snackBarSeverityState}
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
        isLoading ={isLoadingState}
      />
    </div>
  );
};

export default Menu;
