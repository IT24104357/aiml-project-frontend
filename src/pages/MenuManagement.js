import React, { useState, useEffect } from "react";
import API from "../api";

import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  InputAdornment,
  MenuItem
} from "@mui/material";

import {
  FaUtensils,
  FaPlus,
  FaSearch,
  FaRedo,
  FaImage
} from "react-icons/fa";

function MenuManagement() {
  const [menus, setMenus] = useState([]);

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterSubType, setFilterSubType] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [Food_Item, setFoodItem] = useState("");
  const [Food_Type, setFoodType] = useState("");
  const [Food_Category, setFoodCategory] = useState("");
  const [Food_SubType, setFoodSubType] = useState("");
  const [Price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = () => {
    API.get("/menu-management")
      .then((res) => setMenus(res.data));
  };

  const addMenu = async () => {
    const formData = new FormData();

formData.append("Food_Item", Food_Item);
formData.append("Food_Type", Food_Type);
formData.append("Food_Category", Food_Category);
formData.append("Food_SubType", Food_SubType);
formData.append("Price", Price);
formData.append("quantity", quantity);
formData.append("image", image);


    if (editingId) {
      await API.put(`/menu-management/${editingId}`, formData);
      setEditingId(null);
    } else {
      await API.post("/menu-management", formData);
    }

    setFoodItem("");
    setFoodType("");
    setFoodCategory("");
    setFoodSubType("");
    setPrice("");
    setQuantity("");
    setImage("");

    fetchMenus();
  };

  const editMenu = (menu) => {
    setEditingId(menu._id);
    setFoodItem(menu.Food_Item);
    setFoodType(menu.Food_Type);
    setFoodCategory(menu.Food_Category);
    setFoodSubType(menu.Food_SubType);
    setPrice(menu.Price);
    setQuantity(menu.quantity);
    setImage(menu.image);
  };

  const deleteMenu = async (id) => {
    await API.delete(`/menu-management/${id}`);
    fetchMenus();
  };

  const increaseQuantity = async (id) => {
    await API.put(`/menu-management/increase/${id}`);
    fetchMenus();
  };

  const decreaseQuantity = async (id) => {
    await API.put(`/menu-management/decrease/${id}`);
    fetchMenus();
  };

  const resetFilters = () => {
    setSearch("");
    setFilterType("");
    setFilterCategory("");
    setFilterSubType("");
  };

  const filteredMenus = menus.filter((menu) => {
    const matchesSearch = menu.Food_Item.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType ? menu.Food_Type === filterType : true;
    const matchesCategory = filterCategory ? menu.Food_Category === filterCategory : true;
    const matchesSubType = filterSubType ? menu.Food_SubType === filterSubType : true;

    return matchesSearch && matchesType && matchesCategory && matchesSubType;
  });

  return (
    <Box sx={{ background: "#f4f7fb", minHeight: "100vh", p: 4 }}>
      <Container maxWidth="xl">

        {/* HEADER */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              bgcolor: "#0f8a43",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "22px"
            }}
          >
            <FaUtensils />
          </Box>

          <Box>
            <Typography variant="h4" fontWeight="bold">
              Menu Management
            </Typography>
            <Typography sx={{ color: "#64748b" }}>
              Add, update and manage menu items
            </Typography>
          </Box>
        </Box>

        {/* ADD FORM */}
        <Paper sx={{ p: 4, borderRadius: 4, mb: 4 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            color="#15803d"
            sx={{ mb: 4, display: "flex", alignItems: "center", gap: 1 }}
          >
            <FaPlus /> Add New Menu Item
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <TextField fullWidth label="Food Item" placeholder="Enter food item name"
                value={Food_Item}
                onChange={(e) => setFoodItem(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField fullWidth label="Price (Rs.)" placeholder="Enter price"
                value={Price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField fullWidth label="Quantity" placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Button
  variant="outlined"
  component="label"
  fullWidth
  sx={{
    height: "56px",
    borderRadius: "10px",
    textTransform: "none",
    justifyContent: "flex-start",
    color: "#475569",
    borderColor: "#cbd5e1"
  }}
>
  <FaImage style={{ marginRight: "10px" }} />
  {image ? image.name : "Upload Food Image"}

  <input
    type="file"
    hidden
    onChange={(e) => setImage(e.target.files[0])}
  />
</Button>
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                select
                fullWidth
                label="Food Category"
                value={Food_Category}
                onChange={(e) => setFoodCategory(e.target.value)}
                  InputProps={{
    sx: {
      height: "56px",
      display: "flex",
      alignItems: "center"
    }
  }}
                sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  height: "56px",
                }
              }}
              >
                <MenuItem value="">Select category</MenuItem>
                <MenuItem value="Fresh">Fresh</MenuItem>
                <MenuItem value="Packed">Packed</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                select
                fullWidth
                label="Food Type"
                value={Food_Type}
                onChange={(e) => setFoodType(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px"
                  }
                }}
              >
              <MenuItem value="">Select type</MenuItem>
              <MenuItem value="Veg">Veg</MenuItem>
              <MenuItem value="NonVeg">NonVeg</MenuItem>
            </TextField>
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                select
                fullWidth
                label="Food Sub Type"
                value={Food_SubType}
                onChange={(e) => setFoodSubType(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px"
                  }
                }}
              >
                <MenuItem value="">Select sub type</MenuItem>
                <MenuItem value="Meal">Meal</MenuItem>
                <MenuItem value="Snack">Snack</MenuItem>
                <MenuItem value="Dessert">Dessert</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={3}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<FaPlus />}
                onClick={addMenu}
                sx={{
                  height: "56px",
                  bgcolor: "#208f49",
                  fontWeight: "bold"
                }}
              >
                {editingId ? "UPDATE MENU" : "ADD MENU"}
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* FILTER */}
        <Paper sx={{ p: 3, borderRadius: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Search by Name"
                placeholder="Search by food name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <FaSearch />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            <Grid item xs={12} md={2.5}>
              <TextField select fullWidth 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                SelectProps={{ native: true }}
              >
                <option value="">All Types</option>
                <option value="Veg">Veg</option>
                <option value="NonVeg">NonVeg</option>
              </TextField>
            </Grid>

            <Grid item xs={12} md={2.5}>
              <TextField select fullWidth
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                SelectProps={{ native: true }}
              >
                <option value="">All Categories</option>
                <option value="Fresh">Fresh</option>
                <option value="Packed">Packed</option>
              </TextField>
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField select fullWidth 
                value={filterSubType}
                onChange={(e) => setFilterSubType(e.target.value)}
                SelectProps={{ native: true }}
              >
                <option value="">All Sub Types</option>
                <option value="Meal">Meal</option>
                <option value="Snack">Snack</option>
                <option value="Dessert">Dessert</option>
              </TextField>
            </Grid>

            <Grid item xs={12} md={1}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FaRedo />}
                onClick={resetFilters}
                sx={{ height: "56px" , color: "#f8f9f6", borderColor: "#15803d" ,bgcolor: "#208f49",fontWeight: "bold"  }}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* CARDS */}
        <Grid container spacing={3}>
          {filteredMenus.map((menu) => (
            <Grid item xs={12} sm={6} md={3} key={menu._id}>
              <Card sx={{ borderRadius: 4 }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={
  menu.image
    ? `https://smart-canteen-backend-kumf.onrender.com/uploads/${menu.image}`
    : "https://via.placeholder.com/400x300"
}
                />

                <CardContent>
                  <Typography variant="h5">{menu.Food_Item}</Typography>

                  <Typography color="#16a34a" fontWeight="bold" mt={1}>
                    Rs {menu.Price}
                  </Typography>

                  <Typography mt={1}>
                    Stock: {menu.quantity}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Button variant="outlined" size="small"
                      onClick={() => increaseQuantity(menu._id)}
                    >
                      +
                    </Button>

                    <Button variant="outlined" size="small"
                      onClick={() => decreaseQuantity(menu._id)}
                    >
                      -
                    </Button>

                    <Button variant="outlined" size="small"
                      onClick={() => editMenu(menu)}
                    >
                      EDIT
                    </Button>

                    <Button color="error" size="small"
                      onClick={() => deleteMenu(menu._id)}
                    >
                      DELETE
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
}

export default MenuManagement;