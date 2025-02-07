import React, { useState, useEffect, forwardRef } from "react";
import { IRoleModel } from "../../../models/BeeHiveModel";
import MaterialTable, { Column, Icons } from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import EditOutlined from "@material-ui/icons/EditOutlined";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { Typography } from "@material-ui/core";
interface parentDate {
  role: IRoleModel;
  action: "create" | "update" | "delete" | undefined;
}

interface IProp {
  onAnyButtonClick: (data: parentDate) => void;
  roleList: IRoleModel[];
  isLoading: boolean;
}

const RoleCatalogue = (props: IProp) => {
  const [columnsState] = useState<Array<Column<IRoleModel>>>([
    { title: "Id", field: "id", hidden: true },
    { title: "Banner", field: "banner" },
    { title: "Is Super Admin", field: "isSuperAdmin", type: "boolean" },
    { title: "Is active", field: "isActive", type: "boolean" },
    { title: "Description", field: "description" },
  ]);
  const [roleListState, setRoleListState] = useState<IRoleModel[]>([]);
  //populate table on coponent load
  useEffect(() => {
    setRoleListState(props.roleList);
  }, [props.roleList, props.isLoading]);

  const handleAnyButtonClick = (data: parentDate) => {
    props.onAnyButtonClick(data);
  };
  const tableIcons: Icons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };
  return (
    <div>
      <MaterialTable
        title={
          <Typography
            color="textSecondary"
            gutterBottom
            align="left"
            variant="h5"
          >
            Role
          </Typography>
        }
        isLoading={props.isLoading}
        columns={columnsState}
        data={roleListState}
        icons={tableIcons}
        actions={[
          {
            icon: () => <EditOutlined />,
            tooltip: "Edit role",
            position: "row",
            onClick: (event, rowData) => {
              handleAnyButtonClick({
                role: rowData as IRoleModel,
                action: "update",
              });
            },
          },
          {
            icon: () => <DeleteOutline />,
            tooltip: "Delete role",
            position: "row",
            onClick: (event, rowData) => {
              handleAnyButtonClick({
                role: rowData as IRoleModel,
                action: "delete",
              });
            },
          },
          {
            icon: () => <AddBox />,
            tooltip: "Add role",
            position: "toolbar",
            onClick: (event) => {
              handleAnyButtonClick({ role: {}, action: "create" });
            },
          },
        ]}
        options={{ pageSize: 10, pageSizeOptions: [10, 20, 50, 100] }}
      />
    </div>
  );
};
export default RoleCatalogue;
