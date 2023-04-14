import React, { FC } from "react";

import { Layout } from "antd";

import { useStyles } from "./styles";

export const Header: FC = () => {
  const classes = useStyles();

  // const menuCollapsedState = useStore($menuCollapsed.store);
  // const mobileMenuOpenedState = useStore($mobileMenuOpened.store);
  //
  // const onCollapse = () => {
  //   const type = menuCollapsedState ? constants.MENU_TYPE_NOT_COLLAPSED : constants.MENU_TYPE_COLLAPSED;
  //
  //   localStorage.setItem("menuCollapsed", type);
  //
  //   $menuCollapsed.update(!menuCollapsedState);
  // };
  //
  // const onCollapseMobileMenu = () => {
  //   $mobileMenuOpened.update(!mobileMenuOpenedState);
  // };

  return (
    <Layout.Header className={classes.header}>
      <div>Logo</div>
      <div>User</div>
    </Layout.Header>
  );
};
