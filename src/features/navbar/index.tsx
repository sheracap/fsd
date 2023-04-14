import React, { FC } from "react";

import { Layout } from "antd";

import { useStyles } from "./styles";

export const Navbar: FC = () => {
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
    <Layout.Sider
      className="left-side-wrap"
      theme="light"
      breakpoint="lg"
      //collapsed={window.innerWidth < 1025 ? false : menuCollapsedState}
      collapsed={false}
      trigger={null}
      width={270}
      collapsedWidth={70}
    >
      Menu
    </Layout.Sider>
  );
};
