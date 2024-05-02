import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import FroalaEditorConfig from "froala-editor/js/plugins.pkgd.min.js";
import axios from "axios";
import { useParams } from "react-router-dom";
import AdminNavbar from "../Navbar/NavbarComp";
import Sidebar from "../Sidebar/SideBar";
import menuItems from "../../utils/menu";
import toast from "react-hot-toast";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const EditSlider = () => {
  const [name, setName] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const { id } = useParams();

  useEffect(() => {
    // Fetch slider data from the API
    const fetchSliderData = async () => {
      const loading = toast.loading("Loading data....");
      try {
        const response = await axios.get(`${BASE_URL}sliders/${id}`);
        console.log(response.data);
        const { name, content, image } = response.data;
        setName(name);
        setEditorContent(content);
        setImageUrl(
          `data:${image.contentType};base64,${image.data.toString("base64")}`
        );
        toast.dismiss(loading);
        toast.success("Data fetched Succesfully");
      } catch (error) {
        console.error("Error fetching slider data:", error);
        toast.error("Something went Wrong");
      }
    };

    fetchSliderData();
  }, [id]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  const [open, setOpen] = useState({});
  const handleClick = (text) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [text]: !prevOpen[text],
    }));
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

      const response = await axios.patch(`${BASE_URL}sliders/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status >= 200 && response.status < 300) {
        console.log("Data updated successfully");
        toast.success("Slider Update Sucessfully");
        // Handle the successful response
      } else {
        console.error("Error updating data");
        toast.error("Error updating data");
        // Handle the error
      }
    } catch (error) {
      console.error("Error updating data:", error);
      // Handle the error
      toast.error("Something went Wrong...");
    }
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
          <Typography variant="h6" gutterBottom>
            Edit Slider
          </Typography>
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
            Update
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default EditSlider;
