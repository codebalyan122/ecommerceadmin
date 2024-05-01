import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  TablePagination,
  Button,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import AdminNavbar from "../Navbar/NavbarComp";
import Sidebar from "../Sidebar/SideBar";
import menuItems from "../../utils/menu";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Slider = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loading = toast.loading("Loading Sliders...");
    const fetchSliders = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/sliders");
        setRows(response.data);
        toast.dismiss(loading);
        toast.success("Slider Fetched Sucessfully...");
      } catch (error) {
        console.error("Error fetching sliders:", error);
        toast.error("Something went Wrong...");
      }
    };

    fetchSliders();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleClickAdd = () => {
    navigate("/addslider");
  };
  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this Slider?"
      );

      if (confirmDelete) {
        const loadingToastId = toast.loading("Deleting Slider...");

        await axios.delete(`http://localhost:8000/api/sliders/${id}`);

        toast.dismiss(loadingToastId);
        toast.success("Slider deleted successfully");
        // const loading = toast.loading("Loading  Data....");
        const showLoadingToast = () => {
          const loadingToast = toast.loading("Loading Slider...");
          return loadingToast;
        };

        const loadingToastIds = showLoadingToast();

        const fetchSliders = async () => {
          try {
            const response = await axios.get(
              "http://localhost:8000/api/sliders"
            );
            setRows(response.data);
            toast.dismiss(loadingToastIds);
            toast.success("Slider Fetched Sucessfully...");
          } catch (error) {
            console.error("Error fetching sliders:", error);
            toast.error("Something went Wrong...");
          }
        };

        fetchSliders();

        // Optionally, you can fetch the updated product list
        // and update the state to reflect the changes
        // ...
      }
    } catch (error) {
      console.error("Error deleting Slider:", error);
      toast.error("Error deleting Slider");
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
        <Paper sx={{ width: "81.5%", overflow: "hidden", marginLeft: "16rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1rem",
            }}
          >
            <TextField
              label="Search Images"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearch}
              sx={{ width: "50vw" }}
            />
            <Button
              onClick={handleClickAdd}
              variant="contained"
              color="primary"
            >
              Add Slider
            </Button>
          </div>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? filteredRows.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : filteredRows
                ).map((row) => (
                  <TableRow key={row._id}>
                    <TableCell>
                      <img
                        src={`data:${
                          row.image.contentType
                        };base64,${row.image.data.toString("base64")}`}
                        alt={row.name}
                        style={{ width: 50, height: 50 }}
                      />
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => navigate(`/edit-slider/${row._id}`)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(row._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
            component="div"
            count={filteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
};

export default Slider;
