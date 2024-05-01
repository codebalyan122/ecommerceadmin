import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import CategoryIcon from "@mui/icons-material/Category";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";

const MenuItems = () => {
  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      link: "/home",
    },
    {
      text: "Settings",
      icon: <SettingsIcon />,
      link: "/settings",
    },
    {
      text: "Slider",
      icon: <ViewCarouselIcon />,
      link: "/slider",
    },
    {
      text: "Add Products",
      icon: <ProductionQuantityLimitsIcon />,
      link: "/products",
    },
    {
      text: "Categories",
      icon: <CategoryIcon />,
      children: [
        { text: "Top Category", icon: <CategoryIcon />, link: "/topcategory" },
        { text: "Mid Category", icon: <CategoryIcon />, link: "/midcategory" },
      ],
    },
  ];

  return menuItems;
};

export default MenuItems;
