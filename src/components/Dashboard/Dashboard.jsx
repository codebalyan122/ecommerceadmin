import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  ></Box>
);
const colors = {
  1: "#66b2ff",
  2: "#da9490",
  3: "#87d068",
  4: "#ff7f50",
  5: "#8d6e63",
  6: "#78909c",
};

const menuItems = [
  {
    text: "Add Top Category",
    link: "/topcategory",
  },
  {
    text: "Add Slider",
    link: "/slider",

    // children: [
    //   { text: "Account Settings", link: <Settingslink /> },
    //   { text: "Notifications", link: <Maillink /> },
    // ],
  },
  {
    text: "Add Product",
    link: "/product",
  },
  //   {
  //     text: "Add Products",
  //     link: <ProductionQuantityLimitslink />,
  //   },
];
export default function Dashboard() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        // alignItems: "center",
        height: "100%",
        marginLeft: "17rem",
      }}
    >
      <Grid container spacing={2} sx={{ maxWidth: "80rem" }}>
        {menuItems.map((value, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                maxWidth: 300,
                backgroundColor: colors[index + 1],
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "13vh",
              }}
            >
              <CardContent>
                {/* <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Word of the Day
                </Typography> */}
                <Link
                  to={value.link}
                  style={{
                    textDecoration: "none",
                    color: "white",
                    // "&:hover": {
                    //   textDecoration: "none",
                    // },
                  }}
                >
                  <Typography variant="h5" component="div">
                    {value.text}
                  </Typography>
                </Link>
                {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  adjective
                </Typography> */}
                {/* <Typography variant="body2">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography> */}
              </CardContent>
              {/* <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions> */}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
