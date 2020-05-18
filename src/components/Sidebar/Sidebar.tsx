import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import SidebarMenu from "./SidebarMenu";
import RoleCatalogue from "../Beehive/Role/RoleCatalogue";
import TopBar from "../Topbar/Topbar";
import Breadcrumb from "../Breadcrum/Breadcrum";
import Menu from "../Beehive/Menu/Menu";

const Sidebar: React.FC = () => {
  const classes = useStyles();
  // const [state, setState] = React.useState({
  //   menuState: true,
  // });
  // const toggleDrawer = () => (
  //   event: React.KeyboardEvent | React.MouseEvent,
  // ) => {
  //   if (
  //     event.type === 'keydown' &&
  //     ((event as React.KeyboardEvent).key === 'Tab' ||
  //       (event as React.KeyboardEvent).key === 'Shift')
  //   ) {
  //     return;
  //   }
  //   setState({ menuState:!state.menuState });
  // };
  return (
    <BrowserRouter>
      <CssBaseline />
      <TopBar />
      <nav className="navbar-default navbar-static-side">
        <div className="sidebar-collapse">
          <Drawer
            variant="persistent"
            anchor="left"
            open={true}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <SidebarMenu />
          </Drawer>
        </div>
      </nav>
      <div id="page-wrapper" className="gray-bg">
        <div className="wrapper wrapper-content animated fadeInRight">
          <div className="col-lg-12">
            <Breadcrumb />
            <Switch>
              <Route path="/menu">
                <Menu />
              </Route>
              <Route path="/role">
                <RoleCatalogue />
              </Route>
            </Switch>
          </div>
        </div>
        <div className="footer">
            <div className="pull-right">
                10GB of <strong>250GB</strong> Free.
            </div>
            <div>
                <strong>Copyright</strong> Business Doctors &copy; 2016-2020
            </div>
        </div>
      </div>     
    </BrowserRouter>
  );
};

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    background: "#535454",
    color: "#fff",
    minHeight: "1200px",
    height:'calc(100% - 64px)'
  },
  content: {
    flexGrow: 0,
    // height: '500vh',
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default Sidebar;
