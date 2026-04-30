import React, { useEffect, useState } from "react";
import SpaIcon from "@mui/icons-material/Spa";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import GrassIcon from "@mui/icons-material/Grass";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import CakeIcon from "@mui/icons-material/Cake";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import ClearIcon from "@mui/icons-material/Clear";
import API from "../api";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Paper,
  Divider,
  Grid,
  TextField,
  IconButton,
  Chip,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import bigimage from "../assets/bigimage.png"; // put your image here

function OrderDashboard() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");

  const [mainCategory, setMainCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [typeSelected, setTypeSelected] = useState(null);

  const navigate = useNavigate();

useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
  }
}, []);

  const fetchMenu = () => {
    API
      .get("/menu-management")
      .then((res) => setMenu(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const addToCart = (item) => {
    const exist = cart.find((c) => c._id === item._id);

    if (exist) {
      if (exist.quantity >= exist.stock) {
        alert("Maximum stock reached");
        return;
      }

      setCart(
        cart.map((c) =>
          c._id === item._id ? { ...c, quantity: c.quantity + 1 } : c
        )
      );
    } else {
      if (item.quantity <= 0) {
        alert("Not Available");
        return;
      }

      setCart([
        ...cart,
        {
          ...item,
          quantity: 1,
          stock: item.quantity,
        },
      ]);
    }
  };

  const increase = (id) => {
    setCart(
      cart.map((c) => {
        if (c._id === id) {
          if (c.quantity + 1 > c.stock) return c;
          return { ...c, quantity: c.quantity + 1 };
        }
        return c;
      })
    );
  };

  const decrease = (id) => {
    setCart(
      cart.map((c) =>
        c._id === id && c.quantity > 1
          ? { ...c, quantity: c.quantity - 1 }
          : c
      )
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((c) => c._id !== id));
  };

  const placeOrder = async () => {
    try {
      for (const item of cart) {
        await API.post("/orders", {
          menuId: item._id,
          userId: sessionStorage.getItem("userId"),
          Food_Item: item.Food_Item,
          Food_Type: item.Food_Type,
          Food_Category: item.Food_Category,
          Food_SubType: item.Food_SubType,
          Price: item.Price,
          quantity: item.quantity,
        });
      }

      alert("Order Placed Successfully");
      setCart([]);
      fetchMenu();
    } catch (err) {
      alert("Order Failed");
    }
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.Price * item.quantity,
    0
  );

  const filteredMenu = menu.filter((item) => {
    if (
      search &&
      !item.Food_Item.toLowerCase().includes(search.toLowerCase())
    )
      return false;

    if (mainCategory && item.Food_Category !== mainCategory) return false;
    if (typeSelected && item.Food_Type !== typeSelected) return false;
    if (subCategory && item.Food_SubType !== subCategory) return false;

    return true;
  });

  return (
    <Box sx={{ background: "#f4f6f8", minHeight: "100vh", py: 3 }}>
      <Container maxWidth="xl">
        <Box sx={{ display: "flex", gap: 3 }}>
          {/* LEFT SIDE */}
          <Box sx={{ flex: 3 }}>
            {/* SEARCH */}
            <Paper
              sx={{
                p: 2,
                mb: 3,
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
              }}
            >
              <SearchIcon sx={{ color: "#999", mr: 1 }} />

              <TextField
                fullWidth
                placeholder="Search for food..."
                variant="standard"
                InputProps={{ disableUnderline: true }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Paper>

            {/* HERO SECTION UPDATED */}
            <Paper
              sx={{
                mb: 3,
                borderRadius: 5,
                overflow: "hidden",
                background:
                  "linear-gradient(to right,rgb(247,255,248),rgb(237,255,241))",
              }}
            >
              <Box
                component="img"
                src={bigimage}
                alt="Banner"
                sx={{
                  width: "100%",
                  height: { xs: "220px", md: "320px" },
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </Paper>


{/* REPLACE ONLY FILTER SECTION WITH THIS */}

<Box sx={{ mb: 3 }}>

  {/* ROW 1 */}
  <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2 }}>

    <Chip
      icon={<ClearIcon />}
      label="All"
      clickable
      onClick={() => {
        setMainCategory(null);
        setTypeSelected(null);
        setSubCategory(null);
      }}
      sx={{
        height: 52,
        px: 2,
        fontSize: "17px",
        fontWeight: "bold",
        borderRadius: 4,
        background: "#e8fff0",
        color: "#16a34a",
        border: "1px solid #bbf7d0",
        "& .MuiChip-icon": { color: "#16a34a", fontSize: 24 }
      }}
    />

    <Chip
      icon={<SpaIcon />}
      label="Fresh"
      clickable
      onClick={() => {
        setMainCategory("Fresh");
        setTypeSelected(null);
        setSubCategory(null);
      }}
      sx={{
        height: 52,
        px: 2,
        fontSize: "17px",
        fontWeight: "bold",
        borderRadius: 4,
        background:
          mainCategory === "Fresh" ? "#dcfce7" : "#fff",
        color:
          mainCategory === "Fresh" ? "#16a34a" : "#333",
        border: "1px solid #d1d5db",
        "& .MuiChip-icon": { color: "#16a34a", fontSize: 24 }
      }}
    />

    <Chip
      icon={<Inventory2Icon />}
      label="Packed"
      clickable
      onClick={() => {
        setMainCategory("Packed");
        setTypeSelected(null);
        setSubCategory(null);
      }}
      sx={{
        height: 52,
        px: 2,
        fontSize: "17px",
        fontWeight: "bold",
        borderRadius: 4,
        background:
          mainCategory === "Packed" ? "#dbeafe" : "#fff",
        color:
          mainCategory === "Packed" ? "#2563eb" : "#333",
        border: "1px solid #d1d5db",
        "& .MuiChip-icon": { color: "#2563eb", fontSize: 24 }
      }}
    />
  </Box>

  {/* ROW 2 */}
  {mainCategory && (
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2 }}>

      <Chip
        icon={<GrassIcon />}
        label="Veg"
        clickable
        onClick={() => {
          setTypeSelected("Veg");
          setSubCategory(null);
        }}
        sx={{
          height: 52,
          px: 2,
          fontSize: "17px",
          fontWeight: "bold",
          borderRadius: 4,
          background:
            typeSelected === "Veg" ? "#dcfce7" : "#fff",
          color:
            typeSelected === "Veg" ? "#16a34a" : "#333",
          border: "1px solid #d1d5db",
          "& .MuiChip-icon": { color: "#16a34a", fontSize: 24 }
        }}
      />

      <Chip
        icon={<LunchDiningIcon />}
        label="Non-Veg"
        clickable
        onClick={() => {
          setTypeSelected("Non-Veg");
          setSubCategory(null);
        }}
        sx={{
          height: 52,
          px: 2,
          fontSize: "17px",
          fontWeight: "bold",
          borderRadius: 4,
          background:
            typeSelected === "Non-Veg" ? "#fee2e2" : "#fff",
          color:
            typeSelected === "Non-Veg" ? "#dc2626" : "#333",
          border: "1px solid #d1d5db",
          "& .MuiChip-icon": { color: "#dc2626", fontSize: 24 }
        }}
      />
    </Box>
  )}

  {/* ROW 3 */}
  {typeSelected && (
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>

      <Chip
        icon={<RestaurantIcon />}
        label="Meal"
        clickable
        onClick={() => setSubCategory("Meal")}
        sx={{
          height: 52,
          px: 2,
          fontSize: "17px",
          fontWeight: "bold",
          borderRadius: 4,
          background:
            subCategory === "Meal" ? "#fef3c7" : "#fff",
          color:
            subCategory === "Meal" ? "#d97706" : "#333",
          border: "1px solid #d1d5db",
          "& .MuiChip-icon": { color: "#d97706", fontSize: 24 }
        }}
      />

      <Chip
        icon={<FastfoodIcon />}
        label="Snack"
        clickable
        onClick={() => setSubCategory("Snack")}
        sx={{
          height: 52,
          px: 2,
          fontSize: "17px",
          fontWeight: "bold",
          borderRadius: 4,
          background:
            subCategory === "Snack" ? "#ffedd5" : "#fff",
          color:
            subCategory === "Snack" ? "#ea580c" : "#333",
          border: "1px solid #d1d5db",
          "& .MuiChip-icon": { color: "#ea580c", fontSize: 24 }
        }}
      />

      <Chip
        icon={<LocalCafeIcon />}
        label="Drink"
        clickable
        onClick={() => setSubCategory("Drink")}
        sx={{
          height: 52,
          px: 2,
          fontSize: "17px",
          fontWeight: "bold",
          borderRadius: 4,
          background:
            subCategory === "Drink" ? "#e0f2fe" : "#fff",
          color:
            subCategory === "Drink" ? "#0284c7" : "#333",
          border: "1px solid #d1d5db",
          "& .MuiChip-icon": { color: "#0284c7", fontSize: 24 }
        }}
      />

      <Chip
        icon={<CakeIcon />}
        label="Dessert"
        clickable
        onClick={() => setSubCategory("Dessert")}
        sx={{
          height: 52,
          px: 2,
          fontSize: "17px",
          fontWeight: "bold",
          borderRadius: 4,
          background:
            subCategory === "Dessert" ? "#fce7f3" : "#fff",
          color:
            subCategory === "Dessert" ? "#db2777" : "#333",
          border: "1px solid #d1d5db",
          "& .MuiChip-icon": { color: "#db2777", fontSize: 24 }
        }}
      />
    </Box>
  )}
</Box>


{/* REPLACE ONLY PRODUCTS GRID SECTION */}

<Grid container spacing={3}>
  {filteredMenu.map((item) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
      <Card
        sx={{
         borderRadius: 4,
          height: "100%",
          display: "flex",
          flexDirection: "column"
          
        }}
      >
        {/* FIXED SAME IMAGE WIDTH + HEIGHT */}
        <Box
          sx={{
            width: "100%",
            height: 210,
            overflow: "hidden"
          }}
        >
          <CardMedia
            component="img"
    image={
  item.image
    ? `https://smart-canteen-backend-kumf.onrender.com/uploads/${item.image}`
    : "https://via.placeholder.com/400x300"
}
            sx={{
              width: "100%",
              height: 230,
              objectFit: "cover",
              display: "block"
            }}
          />
        </Box>

        {/* CONTENT */}
        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: 2
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 700,
               minHeight: 28,
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis"
              }}
            >
              {item.Food_Item}
            </Typography>

            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 700,
                color: "#16a34a",
                mb: 2
              }}
            >
              Rs. {item.Price}
            </Typography>
          </Box>

          <Button
            fullWidth
            variant="outlined"
            color="success"
            disabled={item.quantity === 0}
            onClick={() => addToCart(item)}
            sx={{
              py: 1,
  
              fontWeight: 700,
              borderRadius: 2.5
            }}
          >
            {item.quantity === 0 ? "Unavailable" : "ADD"}
          </Button>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>
              
          </Box>

{/* REPLACE ONLY RIGHT CART SECTION WITH THIS */}

<Box sx={{ flex: 1 }}>
  <Paper
    sx={{
      p: 3,
      borderRadius: 5,
      position: "sticky",
      top: 20,
      boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    }}
  >
    {/* HEADER */}
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <ShoppingCartIcon sx={{ color: "#222" }} />
        <Typography fontWeight="bold" fontSize="24px">
          Your Cart
        </Typography>
      </Box>

      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: "#22c55e",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
        }}
      >
        {cart.length}
      </Box>
    </Box>

    <Divider sx={{ mb: 2 }} />

    {/* EMPTY CART */}
    {cart.length === 0 && (
      <Typography color="text.secondary">
        Cart is empty
      </Typography>
    )}

    {/* CART ITEMS */}
    <Box sx={{ maxHeight: "420px", overflowY: "auto" }}>
      {cart.map((item) => (
        <Paper
          key={item._id}
          sx={{
            p: 2,
            mb: 2,
            borderRadius: 4,
            border: "1px solid #f0f0f0",
            boxShadow: "none",
          }}
        >
          <Typography fontWeight="bold" fontSize="18px">
            {item.Food_Item}
          </Typography>

          <Typography
            sx={{
              color: "#22c55e",
              fontWeight: "bold",
              mt: 0.5,
            }}
          >
            Rs. {item.Price}
          </Typography>

          <Box
            sx={{
              mt: 1.5,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* QTY */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                size="small"
                onClick={() => decrease(item._id)}
                sx={{
                  border: "1px solid #ddd",
                  width: 32,
                  height: 32,
                }}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>

              <Typography fontWeight="bold">
                {item.quantity}
              </Typography>

              <IconButton
                size="small"
                onClick={() => increase(item._id)}
                sx={{
                  border: "1px solid #ddd",
                  width: 32,
                  height: 32,
                }}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* DELETE */}
            <IconButton
              onClick={() => removeItem(item._id)}
              sx={{ color: "#444" }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Paper>
      ))}
    </Box>

    {/* TOTAL SECTION */}
    {cart.length > 0 && (
      <>
        <Divider sx={{ my: 2, borderStyle: "dashed" }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Typography color="text.secondary">
            Subtotal
          </Typography>

          <Typography>
            Rs. {totalPrice}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography color="text.secondary">
            Delivery Fee
          </Typography>

          <Typography>
            Rs. 0
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Typography
            fontWeight="bold"
            fontSize="26px"
          >
            Total
          </Typography>

          <Typography
            fontWeight="bold"
            fontSize="30px"
            color="#22c55e"
          >
            Rs. {totalPrice}
          </Typography>
        </Box>

        {/* BUTTON */}
        <Button
          fullWidth
          variant="contained"
          onClick={placeOrder}
          sx={{
            py: 1.8,
            borderRadius: 3,
            fontSize: "20px",
            fontWeight: "bold",
            background:
              "linear-gradient(to right,#22c55e,#16a34a)",
          }}
        >
          Place Order →
        </Button>
      </>
    )}
  </Paper>
</Box>
        </Box>
      </Container>
    </Box>
  );
}

export default OrderDashboard;