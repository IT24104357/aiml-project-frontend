import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  IconButton,
  Pagination
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RefreshIcon from "@mui/icons-material/Refresh";

function KitchenDashboard() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const rowsPerPage = 7;

  const fetchOrders = () => {
    API
      .get("/orders")
      .then((res) => {
        setOrders(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const role = sessionStorage.getItem("role");

    if (role !== "kitchen") {
      navigate("/login");
      return;
    }

    fetchOrders();

    const interval = setInterval(fetchOrders, 3000);
    return () => clearInterval(interval);
  }, [navigate]);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/orders/${id}`, { status });
      fetchOrders();
    } catch (err) {
      console.log(err);
    }
  };

  const totalOrders = orders.length;
  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const preparingCount = orders.filter((o) => o.status === "preparing").length;
  const readyCount = orders.filter((o) => o.status === "ready").length;
  const cancelledCount = orders.filter(
    (o) => o.status === "cancelled"
  ).length;

  let filteredOrders =
    tab === "all"
      ? orders
      : orders.filter((item) => item.status === tab);

  filteredOrders = filteredOrders.filter(
    (item) =>
      item.orderNumber?.toLowerCase().includes(search.toLowerCase()) ||
      item.username?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pageOrders = filteredOrders.slice(start, end);

  const chipStyle = (status) => {
    if (status === "pending")
      return { label: "Pending", bg: "#fff7e6", color: "#d97706" };

    if (status === "preparing")
      return { label: "Preparing", bg: "#eff6ff", color: "#2563eb" };

    if (status === "ready")
      return { label: "Ready", bg: "#ecfdf5", color: "#16a34a" };

    return { label: "Cancelled", bg: "#fef2f2", color: "#dc2626" };
  };

  const cardStyle = {
    p: 2.5,
    borderRadius: "18px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
    border: "1px solid #edf0f4",
    background: "#ffffff"
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 3,
        backgroundColor: "#f8fafc",
        backgroundImage: 'url("./assets/order-dashboard.png")',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right top",
        backgroundSize: "700px auto"
      }}
    >
      {/* TOP */}
<Box
  sx={{
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: 3,
    alignItems: "start",
    mb: 2
  }}
>
  {/* LEFT SIDE */}
  <Box>

    <Typography sx={{ fontSize: "42px", fontWeight: 800 }}>
      Order Control Dashboard
    </Typography>

    <Typography sx={{ color: "#64748b", mb: 2 }}>
      Manage and monitor all incoming orders
    </Typography>

  
  
  </Box>

  {/* RIGHT SIDE */}
  <Box
    sx={{
      display: "flex",
      gap: 2,
      alignItems: "center",
      pt: 5
    }}
  >
    <Chip
      label="● Live"
      sx={{
        background: "#f0fdf4",
        color: "#16a34a",
        fontWeight: 700
      }}
    />

    <Typography sx={{ color: "#475569", fontWeight: 600 }}>
      Last updated: {new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })}
    </Typography>

    <IconButton
      onClick={fetchOrders}
      sx={{ border: "1px solid #e5e7eb" }}
    >
      <RefreshIcon />
    </IconButton>
  </Box>
</Box>

      {/* SUMMARY */}
      <Grid container spacing={2}>
        {[
          ["Total Orders ", totalOrders, "Today", "#16a34a", <CheckCircleOutlineIcon sx={{ fontSize: 40 }} />],
          ["Pending Orders", pendingCount, "To be prepared", "#f59e0b", <PendingActionsIcon sx={{ fontSize: 40 }} />],
          ["Preparing Orders", preparingCount, "In Progress", "#2563eb", <RestaurantIcon sx={{ fontSize: 40 }} />],
          ["Completed Orders", readyCount, "Today", "#7c3aed", <AccessTimeIcon sx={{ fontSize: 40 }} />]
          ].map((item, i) => (
    <Grid
  item
  xs={12}
  sm={6}
  md={3}
  key={i}
  sx={{
    display: "flex"
  }}
  
  
>
      <Paper
  sx={{
    ...cardStyle,
    height: "230px",
    width: "200%",
    minWidth: "100%",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  }}
>
        <Box sx={{ color: item[3] }}>{item[4]}</Box>

        <Typography sx={{ mt: 1, fontSize: "15px" }}>
          {item[0]}
        </Typography>

        <Typography sx={{ fontSize: 52, fontWeight: 800 }}>
          {item[1]}
        </Typography>

        <Typography sx={{ color: "#64748b" }}>
          {item[2]}
        </Typography>
      </Paper>
    </Grid>

        ))}

         <Grid item xs={12} sm={12} md={3}>
    <Box
      component="img"
      src={require("../assets/top-fill.png")}
      alt="dashboard"
      sx={{
        width: "200%",
        height: "230px",
        objectFit: "cover",
        borderRadius: "18px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)"
      }}
    />
  </Grid>
      </Grid>

      {/* MAIN */}
      <Grid
        container
        spacing={2}
        sx={{
          mt: 1,
          alignItems: "flex-start"
        }}
      >
        {/* LEFT */}
        <Grid item xs={12} md={9}>
          <Paper sx={{ ...cardStyle, height: "100%" }}>
            <Typography sx={{ fontWeight: 800, fontSize: 32, mb: 2 }}>
              ● Live Orders
            </Typography>

            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
              {[
                ["all", "All Orders"],
                ["pending", "Pending"],
                ["preparing", "Preparing"],
                ["ready", "Completed"],
                ["cancelled", "Cancelled"]
              ].map((btn) => (
                <Button
                  key={btn[0]}
                  onClick={() => {
                    setTab(btn[0]);
                    setPage(1);
                  }}
                  sx={{
                    borderRadius: "30px",
                    px: 3,
                    textTransform: "none",
                    background:
                      tab === btn[0] ? "#ecfdf5" : "#f8fafc",
                    color:
                      tab === btn[0] ? "#16a34a" : "#475569",
                    border:
                      tab === btn[0]
                        ? "1px solid #86efac"
                        : "1px solid transparent"
                  }}
                >
                  {btn[1]}
                </Button>
              ))}
            </Box>

            <TextField
              fullWidth
              size="small"
              placeholder="Search order ID / customer..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1 }} />
              }}
              sx={{ mb: 2 }}
            />

            <Table>
              <TableHead>
                <TableRow sx={{ background: "#f8fafc" }}>
                  {[
                    "Order ID",
                    "Customer",
                    "Items Name",
                    "Qty",
                    "Total",
                    "Status",
                    "Time",
                    "Action",
                    ""
                  ].map((head) => (
                    <TableCell key={head} sx={{ fontWeight: 800 }}>
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {pageOrders.map((order) => {
                  const chip = chipStyle(order.status);

                  return (
                    <TableRow key={order._id}>
                      <TableCell sx={{ fontWeight: 700 }}>
                        {order.orderNumber}
                      </TableCell>

                      <TableCell>{order.username}</TableCell>

                      <TableCell sx={{ fontWeight: 600 }}>
                        {order.Food_Item}
                      </TableCell>

                      <TableCell>{order.quantity}</TableCell>

                      <TableCell sx={{ fontWeight: 700 }}>
                        Rs{" "}
                        {(
                          Number(order.Price || 0) *
                          Number(order.quantity || 1)
                        ).toFixed(2)}
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={chip.label}
                          sx={{
                            background: chip.bg,
                            color: chip.color,
                            fontWeight: 700
                          }}
                        />
                      </TableCell>

                      <TableCell>{order.Time}</TableCell>

                      <TableCell>
                        {order.status === "pending" && (
                          <>
                            <Button
                              variant="contained"
                              onClick={() =>
                                updateStatus(order._id, "preparing")
                              }
                              sx={{
                                mr: 1,
                                background: "#16a34a",
                                textTransform: "none"
                              }}
                            >
                              Accept
                            </Button>

                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() =>
                                updateStatus(order._id, "cancelled")
                              }
                              sx={{ textTransform: "none" }}
                            >
                              Cancel
                            </Button>
                          </>
                        )}

                        {order.status === "preparing" && (
                          <Button
                            variant="contained"
                            onClick={() =>
                              updateStatus(order._id, "ready")
                            }
                            sx={{
                              background: "#2563eb",
                              textTransform: "none"
                            }}
                          >
                            Ready
                          </Button>
                        )}

                        {order.status === "ready" && (
                          <Chip
                            label="Completed"
                            sx={{
                              background: "#ecfdf5",
                              color: "#16a34a",
                              fontWeight: 700
                            }}
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            <Box
              sx={{
                mt: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap"
              }}
            >
              <Typography sx={{ color: "#64748b" }}>
                Showing {pageOrders.length} of {filteredOrders.length} orders
              </Typography>

              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, val) => setPage(val)}
                shape="rounded"
                color="success"
              />
            </Box>
          </Paper>
        </Grid>

        {/* RIGHT */}
        <Grid item xs={10} md={3}>
          {/* TOP IMAGE */}
         <Box
  component="img"
  src={require("../assets/order-dashboard.png")}
  alt="dashboard"
  sx={{
    width: "100%",
    height: "215px",
    objectFit: "cover",
    borderRadius: "18px",
    mb: 2,
    display: "block"
  }}
/>

          <Paper sx={{ ...cardStyle, mb: 2 }}>
            <Typography sx={{ fontWeight: 800, fontSize: 20, mb: 2 }}>
              Order Status Overview
            </Typography>

            <Typography sx={{ mb: 1 }}>🟡 Pending - {pendingCount}</Typography>
            <Typography sx={{ mb: 1 }}>🔵 Preparing - {preparingCount}</Typography>
            <Typography sx={{ mb: 1 }}>🟢 Ready - {readyCount}</Typography>
            <Typography>🔴 Cancelled - {cancelledCount}</Typography>
          </Paper>

          <Paper sx={cardStyle}>
            <Typography sx={{ fontWeight: 800, fontSize: 28, mb: 2 }}>
              Recent Activity
            </Typography>

            {orders.slice(0, 4).map((o, i) => (
              <Box
                key={i}
                sx={{
                  py: 1.2,
                  borderBottom: "4px solid #f1f5f9"
                }}
              >
                <Typography sx={{ fontWeight: 600 }}>
                  {o.orderNumber}
                </Typography>
                <Typography sx={{ color: "#64748b", fontSize: 14 }}>
                  {o.status}
                </Typography>
              </Box>
            ))}

            
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default KitchenDashboard;