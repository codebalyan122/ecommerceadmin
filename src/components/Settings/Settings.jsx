import React, { useEffect, useState } from "react";
import AdminNavbar from "../Navbar/NavbarComp";
import Sidebar from "../Sidebar/SideBar";
import { TextField, Button, Grid, Box, IconButton } from "@mui/material";
import menuItems from "../../utils/menu";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import toast from "react-hot-toast";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Settings = () => {
  const [open, setOpen] = useState({});
  const handleClick = (text) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [text]: !prevOpen[text],
    }));
  };

  const [state, setState] = useState({
    left: true,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const [image, setImage] = useState(null);
  const [prevImage, setPrevImage] = useState("");
  const [formData, setFormData] = useState({
    imageURL: "",
    email: "",
    companyName: "",
    contactNumber: "",
    whatsappNumber: "",
    address: "",
    footerCopyright: "",
    socialMedia: {
      facebook: "",
      instagram: "",
      twitter: "",
      youtube: "",
      linkedin: "",
    },
  });

  useEffect(() => {
    const loading = toast.loading("Loading Settings....");
    // Fetch data from API
    fetch(`http://localhost:9000/api/settings`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Remove _id and __v fields from data
        const { _id, __v, imageURL, ...filteredData } = data;
        // Update form data with fetched data
        setFormData(filteredData);
        // Update previous image URL
        setPrevImage(imageURL);
        toast.dismiss(loading);
        toast.success("Setting loaded succesfully");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error("Failed to load settings");
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const [parentProperty, childProperty] = name.split(".");

    if (childProperty) {
      // If the input field belongs to a nested object
      setFormData((prevFormData) => ({
        ...prevFormData,
        [parentProperty]: {
          ...prevFormData[parentProperty],
          [childProperty]: value,
        },
      }));
    } else {
      // If the input field belongs to the top-level object
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();

      // Convert socialMedia object to a plain JavaScript object
      const plainSocialMediaObject = { ...formData.socialMedia };

      // Append non-file fields to the FormData object
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "socialMedia") {
          // Append each key-value pair of the socialMedia object separately
          Object.entries(value).forEach(
            ([socialMediaKey, socialMediaValue]) => {
              formDataToSend.append(
                `socialMedia.${socialMediaKey}`,
                socialMediaValue
              );
            }
          );
        } else {
          formDataToSend.append(key, value);
        }
      });

      // Append the image file to the FormData object
      if (image) {
        formDataToSend.append("image", image);
      }

      console.log(formData);
      // Send a PATCH request to the API
      const response = await fetch(
        `http://localhost:9000/api/settings/662cb2234be98292b9d42972`,
        {
          method: "PATCH",
          body: formDataToSend,
        }
      );

      if (response.ok) {
        // Handle successful update
        console.log("Settings updated successfully");
        toast.success("Settings updated successfully");
      } else {
        // Handle error
        console.error("Error updating settings");
        toast.error("Error updating settings");
      }
    } catch (error) {
      console.error("Error updating settings:", error);
      toast.error("Something went wrong...");
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <AdminNavbar
        toggleDrawer={toggleDrawer}
        state={state}
        setState={setState}
      />
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar
          menuItems={menuItems}
          state={state}
          toggleDrawer={toggleDrawer}
          handleClick={handleClick}
          open={open}
        />
        <Box
          component="form"
          noValidate
          sx={{
            display: "flex",
            flex: 1,
            padding: "20px",
            marginLeft: "16rem",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <label htmlFor="image-upload">
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <IconButton color="primary" component="span">
                  <AddPhotoAlternateIcon />
                </IconButton>
                <span>{image ? image.name : "Select an image"}</span>
              </label>
            </Grid>
            <Grid item xs={12}>
              {prevImage && (
                <img
                  src={`http://localhost:9000/settings/${prevImage}`}
                  alt="Previous Image"
                  style={{ maxWidth: "200px" }}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="email"
                required
                id="email"
                label="Email"
                type="email"
                fullWidth
                value={formData?.email}
                autoComplete="name"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="companyName"
                required
                id="companyname"
                label="Company Name"
                // type="text"
                fullWidth
                value={formData?.companyName}
                autoComplete="companyname"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                name="contactNumber"
                id="contactNumber"
                label="ContactNumber"
                type="text"
                fullWidth
                value={formData?.contactNumber}
                autoComplete="contactnumber"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                // required
                name="whatsappNumber"
                id="whatsappnumber"
                label="WhatsAppNumber"
                type="text"
                value={formData.whatsappNumber}
                fullWidth
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // required
                name="address"
                id="address"
                label="Address"
                fullWidth
                value={formData.address}
                autoComplete="address"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // required
                name="footerCopyright"
                id="footercopyright"
                label="FooterCopyright"
                fullWidth
                value={formData.footerCopyright}
                autoComplete="footercopyright"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // required
                name="socialMedia.facebook"
                id="facebook"
                label="Facebook"
                fullWidth
                value={formData?.socialMedia?.facebook}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // required
                name="socialMedia.instagram"
                id="instagram"
                label="Instagram"
                fullWidth
                autoComplete="instagram"
                value={formData?.socialMedia?.instagram}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // required
                name="socialMedia.twitter"
                id="twitter"
                label="Twitter"
                fullWidth
                value={formData?.socialMedia?.twitter}
                onChange={handleInputChange}
                // autoComplete=""
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // required
                name="socialMedia.youtube"
                id="youtube"
                label="Youtube"
                fullWidth
                value={formData?.socialMedia?.youtube}
                onChange={handleInputChange}
                // autoComplete=""
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // required
                id="linkedin"
                label="Linkedin"
                fullWidth
                name="socialMedia.linkedin"
                // autoComplete=""
                value={formData?.socialMedia?.linkedin}
                onChange={handleInputChange}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                required
                id="notes"
                label="Additional Notes"
                multiline
                rows={4}
                fullWidth
              />
            </Grid> */}
            <Grid item xs={12}>
              <Button
                onClick={handleSubmit}
                type="submit"
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default Settings;
