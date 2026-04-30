import React, { useEffect, useState, useCallback } from "react";
import API from "../api";
// 1. IMPORT IMAGE
import orderImage from "../assets/order-image.png";

import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Paper,
  Box,
} from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  const userId = sessionStorage.getItem("userId");

  /* FETCH ORDERS */
  const fetchOrders = useCallback(() => {
    API
      .get(`/orders/user/${userId}`)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
  }, [userId]);

  useEffect(() => {
    fetchOrders();

    const interval = setInterval(() => {
      fetchOrders();
    }, 3000);

    return () => clearInterval(interval);
  }, [fetchOrders]);

  /* STATUS STYLE */
  const statusStyle = (status) => {
    if (status === "pending") {
      return {
        background: "#fff7ed",
        color: "#f97316",
      };
    }

    if (status === "ready") {
      return {
        background: "#dcfce7",
        color: "#16a34a",
      };
    }

    if (status === "preparing") {
      return {
        background: "#dbeafe",
        color: "#2563eb",
      };
    }

    if (status === "cancelled") {
      return {
        background: "#fee2e2",
        color: "#dc2626",
      };
    }

    return {
      background: "#f3f4f6",
      color: "#444",
    };
  };

  /* GROUP BY TIME */
  const groupedOrders = {};

  orders.forEach((order) => {
    const dateObj = new Date(order.orderDate);

    const timeKey = dateObj.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const dateKey = dateObj.toLocaleDateString();

    if (!groupedOrders[timeKey]) {
      groupedOrders[timeKey] = {
        items: [],
        total: 0,
        date: dateKey,
      };
    }

    groupedOrders[timeKey].items.push(order);
    groupedOrders[timeKey].total += order.Price;
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#f8fafc",
        py: 5,
      }}
    >
      <Container maxWidth="xl">
        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: 4,
                background: "#fff7ed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AssignmentIcon
                sx={{ fontSize: 42, color: "#f97316" }}
              />
            </Box>

            <Box>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: "bold",
                  color: "#0f172a",
                  fontSize: {
                    xs: "2rem",
                    md: "3.5rem",
                  },
                }}
              >
                My Orders
              </Typography>

              <Typography
                sx={{
                  color: "#64748b",
                  fontSize: "1.2rem",
                }}
              >
                Track and manage all your recent orders.
              </Typography>
            </Box>
          </Box>


<img
  src={orderImage}
  alt="My Orders"
  style={{
    width: "350px",
    height: "auto",
    objectFit: "contain",
    display: "block",
  }}
/>
        </Box>

        {/* TABLE CARD */}
        <Paper
          sx={{
            p: 3,
            borderRadius: 6,
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "20px" }}
                >
                  Order No
                </TableCell>

                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "20px" }}
                >
                  Food Item
                </TableCell>

                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "20px" }}
                >
                  Quantity
                </TableCell>

                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "20px" }}
                >
                  Time
                </TableCell>

                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "20px" }}
                >
                  Status
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {Object.keys(groupedOrders).map((time, index) => (
                <React.Fragment key={time}>
                  {/* GROUP HEADER */}
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      sx={{
                        background:
                          index % 2 === 0
                            ? "#fff7ed"
                            : "#f0fdf4",
                        borderRadius: 3,
                        py: 2.2,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          fontSize: "18px",
                          fontWeight: 600,
                        }}
                      >
                        <CalendarMonthIcon
                          sx={{
                            color:
                              index % 2 === 0
                                ? "#f97316"
                                : "#22c55e",
                          }}
                        />

                        Date: {groupedOrders[time].date}

                        <span
                          style={{
                            marginLeft: "25px",
                            color:
                              index % 2 === 0
                                ? "#f97316"
                                : "#16a34a",
                          }}
                        >
                          Total Amount: Rs{" "}
                          {groupedOrders[time].total}
                        </span>
                      </Box>
                    </TableCell>
                  </TableRow>

                  {/* ITEMS */}
                  {groupedOrders[time].items.map((order) => (
                    <TableRow key={order._id} hover>
                      <TableCell
                        sx={{ fontSize: "18px" }}
                      >
                        {order.orderNumber || "N/A"}
                      </TableCell>

                      <TableCell
                        sx={{ fontSize: "18px" }}
                      >
                        {order.Food_Item || "N/A"}
                      </TableCell>

                      <TableCell
                        sx={{ fontSize: "18px" }}
                      >
                        {order.quantity}
                      </TableCell>

                      <TableCell
                        sx={{ fontSize: "18px" }}
                      >
                        {order.Time}
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={order.status || "pending"}
                          sx={{
                            px: 1.5,
                            py: 2.2,
                            borderRadius: 5,
                            fontWeight: "bold",
                            fontSize: "15px",
                            ...statusStyle(
                              order.status
                            ),
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}

              {orders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Typography
                      textAlign="center"
                      sx={{
                        py: 4,
                        color: "#888",
                        fontSize: "20px",
                      }}
                    >
                      No Orders Found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </Box>
  );
}

export default MyOrders;