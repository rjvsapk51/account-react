import React, { forwardRef } from 'react'
import ListItem from '@material-ui/core/ListItem'
import { NavLink, NavLinkProps } from 'react-router-dom'

export interface SidebarMenuItemComponentProps {
  className?: string
  link?: string | null // because the InferProps props allows alows null value
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
}

const SidebarMenuItemComponent: React.FC<SidebarMenuItemComponentProps> = props => {
  const { className, onClick, link, children } = props

  // If link is not set return the orinary ListItem
  if (!link || typeof link !== 'string') {
    return (
      <ListItem
        button
        className={className}
        children={children}
        onClick={onClick}
      />
    )
  }

  // Return a LitItem with a link component
  return (
    <ListItem
      button
      className={className}
      children={children}
      component={forwardRef((props: NavLinkProps, ref: any) => <NavLink exact {...props} innerRef={ref} />)}
      to={link}
    />
  )
}

export default SidebarMenuItemComponent
