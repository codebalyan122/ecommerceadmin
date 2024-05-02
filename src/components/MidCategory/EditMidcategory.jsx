import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  ListItemText,
  Link,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import FroalaEditor from "react-froala-wysiwyg";
import AdminNavbar from "../Navbar/NavbarComp";
import Sidebar from "../Sidebar/SideBar";
import { Home } from "@mui/icons-material";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import menuItems from "../../utils/menu";
import axios from "axios";
import toast from "react-hot-toast";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const EditMidcategory = () => {
  const { midCategoryId } = useParams();
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [categories, setCategories] = useState([]);
  const [topCategories, setTopCategories] = useState([]);

  const handleNameChange = (event) => setName(event.target.value);
  const handleEditorChange = (content) => setEditorContent(content);
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(file);
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const handleCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategories(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    const loading = toast.loading("Loading Details...");
    const fetchTopCategories = async () => {
      const response = await fetch(`${BASE_URL}topcategories`);
      const data = await response.json();
      toast.dismiss(loading);
      toast.success("Category Fetched Sucessfully");
      setTopCategories(data);
    };

    const fetchMidCategory = async () => {
      const response = await fetch(`${BASE_URL}midcategories/${id}`);
      const data = await response.json();
      console.log(data);
      setName(data.name);
      setEditorContent(data.content);
      // Check if data.categories is an array before mapping
      if (Array.isArray(data.categories)) {
        setCategories(data.categories.map((category) => category._id));
      } else {
        setCategories([]); // Set an empty array if data.categories is not an array
      }
      setImageUrl(data.imageUrl); // Assuming imageUrl is part of fetched data
    };
    fetchTopCategories();
    fetchMidCategory();
  }, [midCategoryId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("content", editorContent);
      formData.append("image", image);
      formData.append("categories", categories); // Send categories as an array of strings

      const response = await axios.patch(
        `${BASE_URL}midcategories/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);
      if (response.data) {
        console.log("Mid category updated successfully");
        toast.success(response.data.msg);
        // navigate("/midcategories"); // Redirect to midcategories list or other relevant page
      } else {
        console.error("Failed to update mid category");
        toast.error("Mid Category not updated successfully");
      }
    } catch (error) {
      console.error("Error updating mid category", error.response.data);
      toast.error(error.response.data);
    }
  };

  const [open, setOpen] = useState({});
  const handleClick = (text) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [text]: !prevOpen[text],
    }));
  };

  const [state, setState] = useState({
    left: true, // Set the initial state of the left drawer to true
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
          onSubmit={handleSubmit}
          sx={{ width: "90%", padding: 2, marginLeft: "16rem" }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" gutterBottom>
              Edit Mid Category
            </Typography>
            <Link
              to="/midcategories"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography variant="p">
                <Home fontSize="small" sx={{ marginBottom: "0.2rem" }} />/ Mid
                Category
              </Typography>
            </Link>
          </Box>
          <FormControl fullWidth margin="normal">
            <InputLabel id="mid-category-select-label">Top Category</InputLabel>
            <Select
              labelId="mid-category-select-label"
              multiple
              value={categories}
              onChange={handleCategoryChange}
              renderValue={(selected) =>
                selected
                  .map(
                    (categoryId) =>
                      topCategories.find(
                        (category) => category._id === categoryId
                      )?.name
                  )
                  .join(", ")
              }
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 48 * 4.5 + 8,
                    width: 250,
                  },
                },
              }}
            >
              {topCategories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  <Checkbox checked={categories.indexOf(category._id) > -1} />
                  <ListItemText primary={category.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Name"
            value={name}
            onChange={handleNameChange}
            fullWidth
            margin="normal"
          />
          <TextField
            type="file"
            onChange={handleImageUpload}
            fullWidth
            margin="normal"
          />
          <Box sx={{ border: "1px solid #ccc", padding: 1, marginY: 2 }}>
            <FroalaEditor
              tag="textarea"
              config={{
                placeholderText: "Edit Your Content Here!",
                charCounterCount: false,
              }}
              model={editorContent}
              onModelChange={handleEditorChange}
            />
          </Box>
          {imageUrl && (
            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="subtitle1">Uploaded Image:</Typography>
              <img src={imageUrl} alt="Uploaded" style={{ maxWidth: "100%" }} />
            </Box>
          )}
          <Button type="submit" variant="contained" color="primary">
            Update
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default EditMidcategory;
