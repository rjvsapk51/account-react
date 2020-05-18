export interface IRoleModel {
    id?: number;
    banner?: string;
    description?: string;
    isSuperAdmin?: boolean;
    isActive?: boolean;
  }
  
  export interface IMenuModel {
    id?: number;
    banner?: string;
    displayBanner?: string;
    icon?: string;
    routerLink?: string;
    orderNumber?: number;
    accessToAll?: boolean;
    isDashboardMenu?: boolean;
    isActive?: boolean;
    parentId?: number;
    description?: string;
  }
  