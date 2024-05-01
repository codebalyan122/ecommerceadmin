import React, { useState, useRef } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import FroalaEditorConfig from "froala-editor/js/plugins.pkgd.min.js";
import menuItems from "../../utils/menu";
import AdminNavbar from "../Navbar/NavbarComp";
import Sidebar from "../Sidebar/SideBar";
import { Link } from "react-router-dom";
import { Home } from "@mui/icons-material";
import axios from "axios";
import toast from "react-hot-toast";

const AddTopCategory = () => {
  const [name, setName] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const fileInputRef = useRef(null);

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

      const response = await axios.post(
        "http://localhost:8000/api/topcategories",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Top category saved:", response.data);
      toast.success(response.data.msg);
      setName("");
      setEditorContent("");
      setImage(null);
      setImageUrl("");
      fileInputRef.current.value = ""; // Reset the file input element
    } catch (error) {
      console.error("Error saving top category:", error);
      toast.error("Something went Wrong");
      // Handle the error (e.g., show an error message)
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
              Add Top Category
            </Typography>
            <Link
              to="/topcategory"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography variant="p">
                <Home fontSize="small" sx={{ marginBottom: "0.2rem" }} />/ Top
                Category
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
            inputRef={fileInputRef} // Assign the ref
          />
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

export default AddTopCategory;
