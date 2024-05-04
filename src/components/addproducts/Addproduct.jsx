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
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Addproduct = () => {
  const [name, setName] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [model, setModel] = useState("");

  const [colors, setColors] = useState([
    { id: Date.now(), name: "", hexCode: "" },
  ]);
  const [topCategories, setTopCategories] = useState([]);
  const [midCategories, setMidCategories] = useState([]);
  const [selectedTopCategories, setSelectedTopCategories] = useState("");
  const [selectedMidCategories, setSelectedMidCategories] = useState([]);
  const [isNewArrival, setIsNewArrival] = useState("No");
  const [isBestSelling, setIsBestSelling] = useState("No");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const [productColors, setProductColors] = useState([]);
  const [allowProductCondition, setAllowProductCondition] = useState(false);
  const [productCondition, setProductCondition] = useState("new");
  const [allowMinimumQuantity, setAllowMinimumQuantity] = useState(false);
  const [minimumQuantity, setMinimumQuantity] = useState(1);
  const [allowEstimatedShippingTime, setAllowEstimatedShippingTime] =
    useState(false);
  const [estimatedShippingTime, setEstimatedShippingTime] = useState("");
  const [allowProductSize, setAllowProductSize] = useState(false);
  const [productSize, setProductSize] = useState("");
  const [allowProductWholesale, setAllowProductWholesale] = useState(false);
  const [allowProductColors, setAllowProductColors] = useState(false);
  const [wholesaleQuantity, setWholesaleQuantity] = useState(1);
  const [wholesalePrice, setWholesalePrice] = useState("");
  const [allowProductMeasurement, setAllowProductMeasurement] = useState(false);
  const [productMeasurement, setProductMeasurement] = useState("");
  const [manageStock, setManageStock] = useState(false);
  const [sizeNames, setSizeNames] = useState([]);
  const [sizeQuantities, setSizeQuantities] = useState([]);
  const [sizePrices, setSizePrices] = useState([]);
  const [sizeColors, setSizeColors] = useState([]);

  const handleAddColor = () => {
    setColors([...colors, { id: Date.now(), name: "", hexCode: "" }]);
  };
  const handleColorNameChange = (id, value) => {
    const updatedColors = colors.map((color) =>
      color.id === id ? { ...color, name: value } : color
    );
    setColors(updatedColors);
  };
  const handleModel = (event) => {
    setModel(event.target.value);
  };

  const handleAddProductColor = () => {
    setProductColors([
      ...productColors,
      { id: Date.now(), name: "", hexCode: "" },
    ]);
  };

  const handleProductColorNameChange = (id, value) => {
    const updatedColors = productColors.map((color) =>
      color.id === id ? { ...color, name: value } : color
    );
    setProductColors(updatedColors);
  };

  const handleProductColorHexCodeChange = (id, value) => {
    const updatedColors = productColors.map((color) =>
      color.id === id ? { ...color, hexCode: value } : color
    );
    setProductColors(updatedColors);
  };

  const handleDeleteProductColor = (id) => {
    const updatedColors = productColors.filter((color) => color.id !== id);
    setProductColors(updatedColors);
  };

  const handleSizePriceChange = () => {
    console.log(
      "hello world                                                                                                                                                                                                                                                                                                                                                        "
    );
  };

  const handleSizeColorChange = () => {
    console.log("hello");
  };
  const handleHexCodeChange = (id, value) => {
    const updatedColors = colors.map((color) =>
      color.id === id ? { ...color, hexCode: value } : color
    );
    setColors(updatedColors);
  };
  const handleDeleteColor = (id) => {
    const updatedColors = colors.filter((color) => color.id !== id);
    setColors(updatedColors);
  };

  const handleAddSize = () => {
    console.log("hello");
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
      }
    };

    fetchCategories();
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleYoutube = (event) => {
    setYoutubeUrl(event.target.value);
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
      formData.append("model", model);
      formData.append("price", price);
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
      if (manageStock) {
        formData.append("sizeNames", JSON.stringify(sizeNames));
        formData.append("sizeQuantities", JSON.stringify(sizeQuantities));
        formData.append("sizePrices", JSON.stringify(sizePrices));
        formData.append("sizeColors", JSON.stringify(sizeColors));
      }

      const response = await axios.post(`${BASE_URL}products`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
      setImageUrl("");
      setPrice("");
      setColors([]);
      setModel("");
      setSelectedTopCategories("");
      setSelectedMidCategories([]);
      setIsNewArrival("No");
      setIsBestSelling("No");
      setYoutubeUrl("");
      setAllowProductCondition(false);
      setProductCondition("new");
      setAllowMinimumQuantity(false);
      setMinimumQuantity(1);
      setAllowEstimatedShippingTime(false);
      setEstimatedShippingTime("");
      setAllowProductSize(false);
      setProductSize("");
      setAllowProductWholesale(false);
      setWholesaleQuantity(1);
      setWholesalePrice("");
      setAllowProductMeasurement(false);
      setProductMeasurement("");
      setManageStock(false);
      setSizeNames([]);
      setSizeQuantities([]);
      setSizePrices([]);
      setSizeColors([]);

      toast.success(response?.data?.msg);
      // Handle success or redirect to another page
    } catch (error) {
      console.error("Error creating product:", error);
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
              Add Product
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
            onChange={handleModel}
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
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <Box sx={{ marginRight: 2 }}>
              <Typography variant="subtitle1">Colors:</Typography>
              {colors.map((color) => (
                <Box
                  key={color.id}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <input
                    type="color"
                    value={color.hexCode}
                    onChange={(e) =>
                      handleHexCodeChange(color.id, e.target.value)
                    }
                    style={{ marginRight: 8 }}
                  />
                  <TextField
                    label="Color Name"
                    value={color.name}
                    onChange={(e) =>
                      handleColorNameChange(color.id, e.target.value)
                    }
                    margin="normal"
                    sx={{ marginRight: 2 }}
                  />
                  <TextField
                    label="Hex Code"
                    value={color.hexCode}
                    onChange={(e) =>
                      handleHexCodeChange(color.id, e.target.value)
                    }
                    margin="normal"
                    sx={{ marginRight: 2 }}
                  />
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteColor(color.id)}
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
          {/* <TextField
            label="Color"
            value={color}
            onChange={(event) => setColor(event.target.value)}
            fullWidth
            margin="normal"
          /> */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="top-category-label">Top Category</InputLabel>
            <Select
              labelId="top-category-label"
              value={selectedTopCategories}
              onChange={(event) => setSelectedTopCategories(event.target.value)}
            >
              {topCategories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
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
          <TextField
            label="youtubeurl"
            value={youtubeUrl}
            onChange={handleYoutube}
            fullWidth
            margin="normal"
          />

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
                  checked={allowProductColors}
                  onChange={(e) => setAllowProductColors(e.target.checked)}
                />
              }
              label="Allow Product Colors"
            />
            {allowProductColors && (
              <Box sx={{ marginTop: 2 }}>
                {productColors.map((color) => (
                  <Box
                    key={color.id}
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
                        handleProductColorHexCodeChange(
                          color.id,
                          e.target.value
                        )
                      }
                      style={{ marginRight: 8 }}
                    />
                    <TextField
                      label="Color Name"
                      value={color.name}
                      onChange={(e) =>
                        handleProductColorNameChange(color.id, e.target.value)
                      }
                      margin="normal"
                      sx={{ marginRight: 2 }}
                    />
                    <TextField
                      label="Hex Code"
                      value={color.hexCode}
                      onChange={(e) =>
                        handleProductColorHexCodeChange(
                          color.id,
                          e.target.value
                        )
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

          {/* <Box sx={{ marginY: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={manageStock}
                  onChange={(e) => setManageStock(e.target.checked)}
                />
              }
              label="Manage Stock"
            />
            {manageStock ? (
              <Box>
                {sizeNames.map((sizeName, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 2,
                    }}
                  >
                    <FormControl sx={{ minWidth: 80, marginRight: 2 }}>
                      <InputLabel id={`size-name-label-${index}`}>
                        Size
                      </InputLabel>
                      <Select
                        labelId={`size-name-label-${index}`}
                        value={sizeName}
                        onChange={(e) =>
                          handleSizeNameChange(index, e.target.value)
                        }
                      >
                        <MenuItem value="S">S</MenuItem>
                        <MenuItem value="M">M</MenuItem>
                        <MenuItem value="L">L</MenuItem>
                        <MenuItem value="XL">XL</MenuItem>
                        <MenuItem value="2XL">2XL</MenuItem>
                        <MenuItem value="3XL">3XL</MenuItem>
                        <MenuItem value="4XL">4XL</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      label="Size Quantity"
                      type="number"
                      value={sizeQuantities[index]}
                      onChange={(e) =>
                        handleSizeQuantityChange(index, e.target.value)
                      }
                      margin="normal"
                      sx={{ marginRight: 2 }}
                    />
                    <TextField
                      label="Size Price"
                      value={sizePrices[index]}
                      onChange={(e) =>
                        handleSizePriceChange(index, e.target.value)
                      }
                      margin="normal"
                      sx={{ marginRight: 2 }}
                    />
                    <input
                      type="color"
                      value={sizeColors[index]}
                      onChange={(e) =>
                        handleSizeColorChange(index, e.target.value)
                      }
                      style={{ marginRight: 8 }}
                    />
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteSize(index)}
                    >
                      Delete
                    </Button>
                  </Box>
                ))}
                <Button variant="contained" onClick={handleAddSize}>
                  Add Size
                </Button>
              </Box>
            ) : null}
          </Box> */}
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

export default Addproduct;
