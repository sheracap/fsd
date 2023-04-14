import React, { FC } from "react";

import { ConfigProvider, ThemeConfig } from "antd";
import locale from "antd/es/locale/ru_RU";
import { createRoot } from "react-dom/client";

import { App } from "./app";
import "./styles.scss";

const customTheme: ThemeConfig = {
  token: {
    colorPrimary: "#64c5b1",
    borderRadius: 5,
    colorInfo: "#567aed",
  },
};

const Root: FC = () => {
  return (
    <ConfigProvider theme={customTheme} locale={locale}>
      <App />
    </ConfigProvider>
  );
};

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = createRoot(container);

root.render(<Root />);
