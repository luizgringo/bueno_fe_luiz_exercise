import {Team} from 'pages/Teams/types';
import {UserData} from 'pages/UserOverview/types';

export interface ListItemColumn {
  key: string;
  value: string;
}
export interface ListItem {
  id: string;
  url?: string;
  columns?: Array<ListItemColumn>;
  navigationProps?: UserData | Team;
  name?: string;
  isTeam?: boolean;
}
