import React, { FC, ReactNode } from "react";

import { Header } from "#features/header";
import { Navbar } from "#features/navbar";
import { Layout } from "antd";

import { useStyles } from "./styles";

type PropTypes = {
  children: ReactNode;
};

export const MainScreen: FC<PropTypes> = (props) => {
  const { children } = props;

  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Layout className={classes.wrapperIn}>
        <Header />
        <Layout className={classes.layout}>
          <Navbar />
          <Layout.Content>{children}</Layout.Content>
        </Layout>
      </Layout>
    </div>
  );
};
