import React, { forwardRef } from "react";
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
import { Typography, TablePagination, Hidden } from "@material-ui/core";
import { IMenuModel } from "./models/BeeHiveModel";
interface Row {
  name: string;
  surname: string;
  birthYear: number;
  birthCity: number;
}

interface TableState {
  columns: Array<Column<Row>>;
  data: Row[];
}
interface IProp{
  onAddorEdit: (index: number) => void;
  menuList: Array<IMenuModel>
}

export default function MaterialTableDemo(props:IProp) {
  props.onAddorEdit(1);
  const cp = (data:number) =>{
    props.onAddorEdit(data);
  }
  const [state, setState] = React.useState<TableState>({
    columns: [
      { title: "Name", field: "name",hidden:true},
      { title: "Surname", field: "surname" },
      { title: "Birth Year", field: "birthYear", type: "numeric" },
      {
        title: "Birth Place",
        field: "birthCity",
        lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
      },

    ],
    data: [
      { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
      {
        name: "Zerya Betül",
        surname: "Baran",
        birthYear: 2017,
        birthCity: 34,
      },
    ],
  });
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
  const actions = [

];
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
            Menu
          </Typography>
        }
        columns={state.columns}
        data={state.data}
        icons={tableIcons}
        actions={[
          {
            icon: () => <EditOutlined />,
            tooltip: 'Edit Index',
            position:'row',
            onClick: (event, rowData) => {
              cp(2);
            },
        },
        {
          icon: () => <DeleteOutline />,
            tooltip: 'Delete Index',
            position:'row',
            onClick: (event, rowData) => {
              console.log(rowData.name);
              cp(3);
            }
        }
        
        ]}
        options={{ pageSize: 10 }}       
      />
    </div>
  );
}
