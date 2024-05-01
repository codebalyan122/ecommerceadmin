import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse } from "@mui/material";
import { Link } from "react-router-dom";

export default function Sidebar({
  menuItems,
  state,
  toggleDrawer,
  handleClick,
  open,
}) {
  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        marginTop: "3rem",
      }}
      role="presentation"
    >
      <List>
        {menuItems.map((item) => (
          <React.Fragment key={item.text}>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={item.link}
            >
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleClick(item.text)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>

                  <ListItemText primary={item.text} />

                  {item.children ? (
                    open[item.text] ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )
                  ) : null}
                </ListItemButton>
              </ListItem>
            </Link>
            {item.children && (
              <Collapse in={open[item.text]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.children.map((child) => (
                    <Link
                      style={{ textDecoration: "none", color: "inherit" }}
                      to={child.link}
                      key={child.text}
                    >
                      <ListItem disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItemIcon>{child.icon}</ListItemIcon>

                          <ListItemText primary={child.text} />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
      {/* <Divider /> */}
      {/* <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  return (
    <div>
      {/* <IconButton onClick={toggleDrawer("left", !state.left)}>
        <MenuIcon />
      </IconButton> */}
      <Drawer
        anchor="left"
        open={state.left}
        onClose={toggleDrawer("left", false)}
        variant="persistent"
      >
        {list("left")}
      </Drawer>
    </div>
  );
}
