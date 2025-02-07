import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import List from '@material-ui/core/List'

import IconDashboard from '@material-ui/icons/Dashboard'
import IconShoppingCart from '@material-ui/icons/ShoppingCart'
import IconPeople from '@material-ui/icons/People'
import IconBarChart from '@material-ui/icons/BarChart'
// import IconLibraryBooks from '@material-ui/icons/LibraryBooks'
import IconSettings from '@material-ui/icons/Settings'
import SidebarMenuItem from './SidebarMenuItem'

const sidebarMenuItems = [
  {
    name: 'Dashboard',
    link: '/',
    Icon: IconDashboard,
  },
  {
    name: 'Menu',
    link: '/orders',
    Icon: IconShoppingCart,
  },
  {
    name: 'Customers',
    link: '/customers',
    Icon: IconPeople,
  },
  {
    name: 'Reports',
    link: '/reports',
    Icon: IconBarChart,
  },
  {
    name: 'Settings',
    Icon: IconSettings,
    items: [
      {
        name: 'Menu',
        link: '/menu'   
      },
      {
        name: 'Role',
        link: '/role'   
      },
      // {
      //   name: 'Level 2',
      //   items: [
      //     {
      //       name: 'Level 3',
      //     },
      //     {
      //       name: 'Level 3',
      //     },
      //   ],
      // },
    ],
  },
]

const SidebarMenu: React.FC = () => {
  const classes = useStyles()

  return (
    
    <List component="nav" className={classes.sidebarMenu} disablePadding>
      {sidebarMenuItems.map((item, index) => (
        <SidebarMenuItem {...item} key={index} />
      ))}
    </List>
  )
}

const drawerWidth = 240

const useStyles = makeStyles(theme =>
  createStyles({
    sidebarMenu: {
      width: '100%',
    },
    navList: {
      width: drawerWidth,
    },
    menuItem: {
      width: drawerWidth,
    },
    menuItemIcon: {
      color: '#97c05c',
    },
  }),
)

export default SidebarMenu
