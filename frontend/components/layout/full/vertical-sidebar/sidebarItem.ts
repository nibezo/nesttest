import {
  ApertureIcon,
  CopyIcon,
  LayoutDashboardIcon,
  LoginIcon,
  MoodHappyIcon,
  TypographyIcon,
  UserPlusIcon,
} from "vue-tabler-icons";

export interface menu {
  header?: string;
  title?: string;
  icon?: any;
  to?: string;
  chip?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: menu[] = [
  { header: "Главная" },
  {
    title: "Дашборд",
    icon: LayoutDashboardIcon,
    to: "/",
  },
  { header: "Дополнения" },
  {
    title: "Иконки",
    icon: MoodHappyIcon,
    to: "/icons",
  },
  {
    title: "Пользователи",
    icon: ApertureIcon,
    to: "/sample-page",
  },
];

export default sidebarItem;
