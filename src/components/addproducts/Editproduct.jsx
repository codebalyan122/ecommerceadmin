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
  FormControlLabel,
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
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Editproduct = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [model, setModel] = useState("");
  const [colors, setColors] = useState([]);
  const [topCategories, setTopCategories] = useState([]);
  const [midCategories, setMidCategories] = useState([]);
  const [selectedTopCategories, setSelectedTopCategories] = useState("");
  const [selectedMidCategories, setSelectedMidCategories] = useState([]);
  const [isNewArrival, setIsNewArrival] = useState("No");
  const [isBestSelling, setIsBestSelling] = useState("No");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [productColors, setProductColors] = useState([]);
  const [allowProductCondition, setAllowProductCondition] = useState(false);
  const [allowProductColors, setAllowProductColors] = useState(false);
  const [productCondition, setProductCondition] = useState("new");
  const [allowMinimumQuantity, setAllowMinimumQuantity] = useState(false);
  const [minimumQuantity, setMinimumQuantity] = useState(1);
  const [allowEstimatedShippingTime, setAllowEstimatedShippingTime] =
    useState(false);
  const [estimatedShippingTime, setEstimatedShippingTime] = useState("");
  const [allowProductSize, setAllowProductSize] = useState(false);
  const [productSize, setProductSize] = useState("");
  const [allowProductWholesale, setAllowProductWholesale] = useState(false);
  const [wholesaleQuantity, setWholesaleQuantity] = useState(1);
  const [wholesalePrice, setWholesalePrice] = useState("");
  const [allowProductMeasurement, setAllowProductMeasurement] = useState(false);
  const [productMeasurement, setProductMeasurement] = useState("");

  // const [colors, setColors] = useState([]);
  const handleAddProductColor = () => {
    const newColor = {
      id: Date.now(), // Generate a unique id (you can use a more robust method if needed)
      name: "",
      hexCode: "#000000", // Default hex code (black)
    };

    setProductColors([...productColors, newColor]);
  };
  const handleColorChange = (index, value) => {
    const newColors = [...colors];
    newColors[index] = value;
    setColors(newColors);
  };

  const handleDeleteColor = (index) => {
    const newColors = [...colors];
    newColors.splice(index, 1);
    setColors(newColors);
  };

  const handleAddColor = () => {
    setColors([...colors, ""]);
  };
  const handleDeleteProductColor = (colorId) => {
    const updatedProductColors = productColors.filter(
      (color) => color.id !== colorId
    );
    setProductColors(updatedProductColors);
  };
  useEffect(() => {
    // Fetch product data from the server
    const fetchProductData = async () => {
      const loadingToastId = toast.loading("Loading Product Data...");
      try {
        const response = await axios.get(`${BASE_URL}products/${id}`);

        const productData = response.data;
        console.log(productData);
        setName(productData.name);
        setEditorContent(productData.content);
        setImageUrl(productData.image?.contentType); // Assuming you have an 'image' field in the product data
        setPrice(productData.price.toString());
        setModel(productData.model);
        setColors(productData.colors);
        setAllowProductColors(productData.productColors ? true : false);
        // Update the selected top and mid categories
        const selectedTopCategoryId = productData.categories[0].topCategory._id;
        setSelectedTopCategories(selectedTopCategoryId);

        const selectedMidCategoryIds =
          productData.categories[0].midCategory.map((category) => category._id);
        setSelectedMidCategories(selectedMidCategoryIds);

        setIsNewArrival(productData.isNewArrival);
        setIsBestSelling(productData.isBestSelling);
        setYoutubeUrl(productData.youtubeUrl);
        setProductColors(productData.productColors);
        setAllowProductCondition(true);
        setProductCondition(productData.productCondition);
        setAllowMinimumQuantity(true);
        setMinimumQuantity(productData.minimumQuantity);
        setAllowEstimatedShippingTime(true);
        setEstimatedShippingTime(productData.estimatedShippingTime);
        setAllowProductSize(true);
        setProductSize(productData.productSize);
        setAllowProductWholesale(true);
        setWholesaleQuantity(productData.wholesaleQuantity);
        setWholesalePrice(productData.wholesalePrice.toString());
        setAllowProductMeasurement(true);
        setProductMeasurement(productData.productMeasurement);

        toast.dismiss(loadingToastId);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [id]);
  const handleColorNameChange = (index, value) => {
    const newColors = [...colors];
    newColors[index] = { ...newColors[index], name: value };
    setColors(newColors);
  };

  const handleHexCodeChange = (index, value) => {
    const newColors = [...colors];
    newColors[index] = { ...newColors[index], hexCode: value };
    setColors(newColors);
  };
  const handleProductColorNameChange = (index, value) => {
    const newProductColors = [...productColors];
    newProductColors[index] = { ...newProductColors[index], name: value };
    setProductColors(newProductColors);
  };

  const handleProductColorHexCodeChange = (index, value) => {
    const newProductColors = [...productColors];
    newProductColors[index] = { ...newProductColors[index], hexCode: value };
    setProductColors(newProductColors);
  };
  useEffect(() => {
    // Fetch top categories and mid categories from the server
    const fetchCategories = async () => {
      try {
        const topCategoriesResponse = await axios.get(
          `${BASE_URL}topcategories`
        );
        const midCategoriesResponse = await axios.get(
          `${BASE_URL}midcategories`
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

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleYoutubeUrl = (event) => {
    setYoutubeUrl(event.target.value);
  };
  const handleModelChange = (event) => {
    setModel(event.target.value);
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
      formData.append("model", model);
      formData.append("colors", JSON.stringify(colors));
      formData.append("topCategory", selectedTopCategories);
      formData.append("midCategories", selectedMidCategories);
      formData.append("isNewArrival", isNewArrival);
      formData.append("isBestSelling", isBestSelling);
      formData.append("youtubeUrl", youtubeUrl);
      formData.append("productColors", JSON.stringify(productColors));

      if (allowProductCondition) {
        formData.append("productCondition", productCondition);
      }
      if (allowMinimumQuantity) {
        formData.append("minimumQuantity", minimumQuantity);
      }
      if (allowEstimatedShippingTime) {
        formData.append("estimatedShippingTime", estimatedShippingTime);
      }
      if (allowProductSize) {
        formData.append("productSize", productSize);
      }
      if (allowProductWholesale) {
        formData.append("wholesaleQuantity", wholesaleQuantity);
        formData.append("wholesalePrice", wholesalePrice);
      }
      if (allowProductMeasurement) {
        formData.append("productMeasurement", productMeasurement);
      }

      const response = await axios.patch(
        `${BASE_URL}products/${id}`,
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
            label="Model"
            value={model}
            onChange={handleModelChange}
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
          {/* // Inside the form */}
          {/* // Inside the form */}
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <Box sx={{ marginRight: 2 }}>
              <Typography variant="subtitle1">Colors:</Typography>
              {colors.map((color, index) => (
                <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="color"
                    value={color.hexCode}
                    onChange={(e) => handleHexCodeChange(index, e.target.value)}
                    style={{ marginRight: 8 }}
                  />
                  <TextField
                    label="Color Name"
                    value={color.name}
                    onChange={(e) =>
                      handleColorNameChange(index, e.target.value)
                    }
                    margin="normal"
                    sx={{ marginRight: 2 }}
                  />
                  <TextField
                    label="Hex Code"
                    value={color.hexCode}
                    onChange={(e) => handleHexCodeChange(index, e.target.value)}
                    margin="normal"
                    sx={{ marginRight: 2 }}
                  />
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteColor(index)}
                  >
                    Delete
                  </Button>
                </Box>
              ))}
              <Button variant="contained" onClick={handleAddColor}>
                Add Color
              </Button>
            </Box>
          </Box>
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
            <TextField
              label="Youtubeurl"
              value={youtubeUrl}
              onChange={handleYoutubeUrl}
              fullWidth
              margin="normal"
            />
          </Box>
          {/* // Inside the return statement */}
          <Box sx={{ marginY: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={allowProductCondition}
                  onChange={(e) => setAllowProductCondition(e.target.checked)}
                />
              }
              label="Allow Product Condition"
            />
            {allowProductCondition && (
              <FormControl fullWidth margin="normal">
                <InputLabel id="product-condition-label">
                  Product Condition
                </InputLabel>
                <Select
                  labelId="product-condition-label"
                  value={productCondition}
                  onChange={(e) => setProductCondition(e.target.value)}
                >
                  <MenuItem value="used">Used</MenuItem>
                  <MenuItem value="new">New</MenuItem>
                </Select>
              </FormControl>
            )}
          </Box>
          <Box sx={{ marginY: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={allowMinimumQuantity}
                  onChange={(e) => setAllowMinimumQuantity(e.target.checked)}
                />
              }
              label="Allow Minimum Quantity"
            />
            {allowMinimumQuantity && (
              <TextField
                label="Minimum Quantity"
                type="number"
                value={minimumQuantity}
                onChange={(e) => setMinimumQuantity(e.target.value)}
                fullWidth
                margin="normal"
              />
            )}
          </Box>
          <Box sx={{ marginY: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={allowEstimatedShippingTime}
                  onChange={(e) =>
                    setAllowEstimatedShippingTime(e.target.checked)
                  }
                />
              }
              label="Allow Estimated Shipping Time"
            />
            {allowEstimatedShippingTime && (
              <TextField
                label="Estimated Shipping Time"
                value={estimatedShippingTime}
                onChange={(e) => setEstimatedShippingTime(e.target.value)}
                fullWidth
                margin="normal"
              />
            )}
          </Box>
          <Box sx={{ marginY: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={productColors}
                  onChange={(e) => setProductColors(e.target.checked)}
                />
              }
              label="Allow Product Colors"
            />
            {allowProductColors && (
              <Box sx={{ marginTop: 2 }}>
                {productColors.map((color, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 2,
                    }}
                  >
                    <input
                      type="color"
                      value={color.hexCode}
                      onChange={(e) =>
                        handleProductColorHexCodeChange(index, e.target.value)
                      }
                      style={{ marginRight: 8 }}
                    />
                    <TextField
                      label="Color Name"
                      value={color.name}
                      onChange={(e) =>
                        handleProductColorNameChange(index, e.target.value)
                      }
                      margin="normal"
                      sx={{ marginRight: 2 }}
                    />
                    <TextField
                      label="Hex Code"
                      value={color.hexCode}
                      onChange={(e) =>
                        handleProductColorHexCodeChange(index, e.target.value)
                      }
                      margin="normal"
                      sx={{ marginRight: 2 }}
                    />
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteProductColor(color.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                ))}
                <Button variant="contained" onClick={handleAddProductColor}>
                  Add Color
                </Button>
              </Box>
            )}
          </Box>
          <Box sx={{ marginY: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={allowProductSize}
                  onChange={(e) => setAllowProductSize(e.target.checked)}
                />
              }
              label="Allow Product Size"
            />
            {allowProductSize && (
              <TextField
                label="Product Size"
                value={productSize}
                onChange={(e) => setProductSize(e.target.value)}
                fullWidth
                margin="normal"
              />
            )}
          </Box>
          <Box sx={{ marginY: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={allowProductWholesale}
                  onChange={(e) => setAllowProductWholesale(e.target.checked)}
                />
              }
              label="Allow Product Wholesale"
            />
            {allowProductWholesale && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                  label="Wholesale Quantity"
                  type="number"
                  value={wholesaleQuantity}
                  onChange={(e) => setWholesaleQuantity(e.target.value)}
                  margin="normal"
                  sx={{ marginRight: 2 }}
                />
                <TextField
                  label="Wholesale Price"
                  value={wholesalePrice}
                  onChange={(e) => setWholesalePrice(e.target.value)}
                  margin="normal"
                />
              </Box>
            )}
          </Box>
          <Box sx={{ marginY: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={allowProductMeasurement}
                  onChange={(e) => setAllowProductMeasurement(e.target.checked)}
                />
              }
              label="Allow Product Measurement"
            />
            {allowProductMeasurement && (
              <FormControl fullWidth margin="normal">
                <InputLabel id="product-measurement-label">
                  Product Measurement
                </InputLabel>
                <Select
                  labelId="product-measurement-label"
                  value={productMeasurement}
                  onChange={(e) => setProductMeasurement(e.target.value)}
                >
                  <MenuItem value="kilogram">Kilogram</MenuItem>
                  <MenuItem value="pound">Pound</MenuItem>
                  {/* Add more measurement options here */}
                </Select>
              </FormControl>
            )}
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
