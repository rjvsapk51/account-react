export interface IAppContextModel {
    baseURL: string;
    menuLookup: IMenuLookup[];
  }

export interface IMenuLookup{
  id: number;
  banner: string;
}