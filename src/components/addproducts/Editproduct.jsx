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
} from "@mui/material";
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import FroalaEditorConfig from "froala-editor/js/plugins.pkgd.min.js";
import menuItems from "../../utils/menu";
import AdminNavbar from "../Navbar/NavbarComp";
import Sidebar from "../Sidebar/SideBar";
import { Home } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Editproduct = () => {
  const { id } = useParams();
  // Assuming you're using react-router-dom

  const [name, setName] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [topCategories, setTopCategories] = useState([]);
  const [midCategories, setMidCategories] = useState([]);
  const [selectedTopCategories, setSelectedTopCategories] = useState("");
  const [selectedMidCategories, setSelectedMidCategories] = useState([]);
  const [isNewArrival, setIsNewArrival] = useState("No");

  const [isBestSelling, setIsBestSelling] = useState("No");

  useEffect(() => {
    // Fetch product data from the server
    const fetchProductData = async () => {
      const loadingToastId = toast.loading("Loading Product Data...");
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products/${id}`
        );

        const productData = response.data;

        setName(productData.name);
        setEditorContent(productData.content);
        setImageUrl(productData.image); // Assuming you have an 'image' field in the product data
        setPrice(productData.price.toString());
        setColor(productData.color);

        // Update the selected top and mid categories
        const selectedTopCategoryId = productData.categories[0].topCategory._id;
        setSelectedTopCategories(selectedTopCategoryId);

        const selectedMidCategoryIds =
          productData.categories[0].midCategory.map((category) => category._id);
        setSelectedMidCategories(selectedMidCategoryIds);

        setIsNewArrival(productData.isNewArrival);
        setIsBestSelling(productData.isBestSelling);
        toast.dismiss(loadingToastId);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [id]);

  useEffect(() => {
    // Fetch top categories and mid categories from the server
    const fetchCategories = async () => {
      try {
        const topCategoriesResponse = await axios.get(
          "http://localhost:8000/api/topcategories"
        );
        const midCategoriesResponse = await axios.get(
          "http://localhost:8000/api/midcategories"
        );
        setTopCategories(topCategoriesResponse.data);
        setMidCategories(midCategoriesResponse.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("something went wrong in categories");
      }
    };

    fetchCategories();
  }, []);

  // console.log(selectedTopCategories, selectedMidCategories);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(file);
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("content", editorContent);
      formData.append("image", image);
      formData.append("price", price);
      formData.append("color", color);
      formData.append("topCategories", selectedTopCategories);
      formData.append("midCategories", selectedMidCategories);
      formData.append("isNewArrival", isNewArrival);
      formData.append("isBestSelling", isBestSelling);
      console.log(selectedMidCategories);
      const response = await axios.patch(
        `http://localhost:8000/api/products/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      toast.success(response?.data?.msg);
      // Handle success or redirect to another page
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("something went wrong");
      // Handle error
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
              Edit Product
            </Typography>
            <Link
              to="/products"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography variant="p">
                <Home fontSize="small" sx={{ marginBottom: "0.2rem" }} />/
                Products
              </Typography>
            </Link>
          </Box>
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
          <TextField
            label="Price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Color"
            value={color}
            onChange={(event) => setColor(event.target.value)}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="top-category-label">Top Category</InputLabel>
            <Select
              labelId="top-category-label"
              value={selectedTopCategories}
              onChange={(event) => setSelectedTopCategories(event.target.value)}
              renderValue={(selected) =>
                topCategories.find((category) => category._id === selected)
                  ?.name
              }
            >
              {topCategories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  <ListItemText primary={category.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="mid-category-label">Mid Categories</InputLabel>
            <Select
              labelId="mid-category-label"
              multiple
              value={selectedMidCategories}
              onChange={(event) => setSelectedMidCategories(event.target.value)}
              renderValue={(selected) =>
                selected
                  .map(
                    (categoryId) =>
                      midCategories.find(
                        (category) => category._id === categoryId
                      )?.name
                  )
                  .join(", ")
              }
            >
              {midCategories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  <Checkbox
                    checked={selectedMidCategories.includes(category._id)}
                  />
                  <ListItemText primary={category.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="new-arrival-label">New Arrival</InputLabel>
            <Select
              labelId="new-arrival-label"
              value={isNewArrival}
              onChange={(event) => setIsNewArrival(event.target.value)}
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="best-selling-label">Best Selling</InputLabel>
            <Select
              labelId="best-selling-label"
              value={isBestSelling}
              onChange={(event) => setIsBestSelling(event.target.value)}
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ border: "1px solid #ccc", padding: 1, marginY: 2 }}>
            <FroalaEditor
              tag="textarea"
              config={{
                placeholderText: "Edit Your Content Here!",
                charCounterCount: false,
                toolbarButtons: [
                  "bold",
                  "italic",
                  "underline",
                  "strikeThrough",
                  "subscript",
                  "superscript",
                  "|",
                  "fontFamily",
                  "fontSize",
                  "color",
                  "inlineStyle",
                  "paragraphStyle",
                  "|",
                  "paragraphFormat",
                  "align",
                  "formatOL",
                  "formatUL",
                  "outdent",
                  "indent",
                  "quote",
                  "-",
                  "insertLink",
                  "insertImage",
                  "insertVideo",
                  "embedly",
                  "insertFile",
                  "insertTable",
                  "|",
                  "emoticons",
                  "specialCharacters",
                  "insertHR",
                  "selectAll",
                  "clearFormatting",
                  "|",
                  "print",
                  "spellChecker",
                  "help",
                  "html",
                  "|",
                  "undo",
                  "redo",
                ],
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
            Submit
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default Editproduct;
