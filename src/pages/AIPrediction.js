import React, { useState } from "react";
import API from "../api";

import {
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Box,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  MenuItem,
  Pagination
} from "@mui/material";

function AIPrediction() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [tableData, setTableData] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");

  const [page, setPage] = useState(1);
const rowsPerPage = 7;

 const predict = async () => {
  setLoading(true);

  try {
    const res = await API.post("/predict", []); // ✅ FIXED
    console.log("AI RESPONSE:", res.data); // debug

    setData(res.data);
  } catch (err) {
    console.log(err);
  }

  setLoading(false);
};

  const getDayName = (offset) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    const today = new Date();
    const future = new Date(today);
    future.setDate(today.getDate() + offset + 1);

    return days[future.getDay()];
  };

  const getDate = (offset) => {
    const today = new Date();
    const future = new Date(today);
    future.setDate(today.getDate() + offset + 1);

    return future.toISOString().split("T")[0];
  };

  const filterByDate = async () => {
    try {
      const res = await API.get(`/predict/history?date=${selectedDate}`);

      setTableData(res.data);
      setPage(1);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredData = data.filter((item) => {
    if (!filterCategory) return true;
    return item.category === filterCategory;
  });

  const totalPages = Math.ceil(tableData.length / rowsPerPage);

const startIndex = (page - 1) * rowsPerPage;
const endIndex = startIndex + rowsPerPage;

const paginatedRows = tableData.slice(startIndex, endIndex);

  return (
    <Box sx={{ minHeight: "100vh", background: "#f6f8fc", py: 4 }}>
      <Container maxWidth="xl">

        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            flexWrap: "wrap",
            gap: 2
          }}
        >
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
              🤖 AI Demand Prediction
            </Typography>

            <Typography sx={{ color: "#64748b" }}>
              Predict food demand for the next 3 days using AI
            </Typography>
          </Box>

          <Button
            variant="contained"
            onClick={predict}
            sx={{
              background: "linear-gradient(90deg,#2563eb,#3b82f6)",
              px: 4,
              py: 1.5,
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 700
            }}
          >
            Predict Next 3 Days
          </Button>
        </Box>

        {/* CATEGORY FILTER */}
        <Box sx={{ width: 220, mb: 4 }}>
          <TextField
            select
            fullWidth
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <MenuItem value="">All Categories</MenuItem>
            <MenuItem value="Fresh">Fresh</MenuItem>
            <MenuItem value="Packed">Packed</MenuItem>
          </TextField>
        </Box>

        {/* LOADING */}
        {loading && (
          <Typography sx={{ color: "#2563eb", fontWeight: 700, mb: 3 }}>
            AI is analyzing demand...
          </Typography>
        )}

        {/* TITLE */}
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
          Food Demand Prediction for Next 3 Days
        </Typography>

        {/* CARDS */}
        <Grid container spacing={3}>
          {[0, 1, 2].map((dayIndex) => (
            <Grid item xs={12} md={4} key={dayIndex}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: "18px",
                  overflow: "hidden",
                  border: "1px solid #e5e7eb",
                  background: "#fff"
                }}
              >
                <Box
                  sx={{
                    px: 3,
                    py: 2,
                    background:
                      dayIndex === 0
                        ? "#eef4ff"
                        : dayIndex === 1
                        ? "#eefbf3"
                        : "#f7f2ff"
                  }}
                >
                  <Typography fontWeight={700}>
                    {getDate(dayIndex)}
                  </Typography>

                  <Typography color="#475569">
                    {getDayName(dayIndex)}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    px: 3,
                    py: 1.5,
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: 700,
                    borderBottom: "1px solid #eef2f7"
                  }}
                >
                  <span>Food Item</span>
                  <span>Predicted Quantity</span>
                </Box>

                <Box sx={{ px: 3 }}>
                  {filteredData.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        py: 1.3,
                        display: "flex",
                        justifyContent: "space-between",
                        borderBottom: "1px solid #f1f5f9"
                      }}
                    >
                      <span>{item.food}</span>

                      <span>
                        {dayIndex === 0
                          ? item.prediction.Day1
                          : dayIndex === 1
                          ? item.prediction.Day2
                          : item.prediction.Day3}
                      </span>
                    </Box>
                  ))}
                </Box>

                <Box sx={{ p: 2 }}>
                  <Box
                    sx={{
                      py: 1,
                      textAlign: "center",
                      borderRadius: "10px",
                      background:
                        dayIndex === 0
                          ? "#eef4ff"
                          : dayIndex === 1
                          ? "#eefbf3"
                          : "#f7f2ff",
                      fontWeight: 700
                    }}
                  >
                    Total Items: {filteredData.length}
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* TABLE SECTION */}
        <Paper
          elevation={0}
          sx={{
            mt: 5,
            p: 3,
            borderRadius: "22px",
            border: "1px solid #e8edf5"
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
            📊 Past Predictions
          </Typography>

          <Typography sx={{ color: "#64748b", mb: 4 }}>
            View and analyze previously generated AI predictions.
          </Typography>

          {/* FILTERS */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
              flexWrap: "wrap",
              mb: 4
            }}
          >
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <TextField
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                sx={{ width: 220 }}
              />

              <Button
                variant="outlined"
                onClick={filterByDate}
                sx={{ px: 4, textTransform: "none", fontWeight: 700 }}
              >
                Filter by Date
              </Button>

              <TextField
                placeholder="Search food item..."
                sx={{ width: 280 }}
              />
            </Box>

          </Box>

          {/* TABLE */}
          <Table>
            <TableHead>
              <TableRow sx={{ background: "#f3f6fb" }}>
                <TableCell><b>Food Item</b></TableCell>
                <TableCell><b>Type</b></TableCell>
                <TableCell><b>Quantity</b></TableCell>
                <TableCell><b>Predicted For</b></TableCell>
                <TableCell><b>Day</b></TableCell>
                <TableCell><b>Generated On</b></TableCell>
              </TableRow>
            </TableHead>

           <TableBody>
  {tableData.length === 0 ? (
    <TableRow>
      <TableCell colSpan={6} align="center">
        No data
      </TableCell>
    </TableRow>
  ) : (
    paginatedRows.map((item, index) => {
      const createdDate = new Date(item.created_at);

      // Day1, Day2, Day3 repeating
     const dayOffset = ((startIndex + index) % 3) + 1;

      const predictedDate = new Date(createdDate);
      predictedDate.setDate(createdDate.getDate() + dayOffset);

      return (
        <TableRow key={index}>
          {/* Food */}
          <TableCell>{item.Food_Item}</TableCell>

          {/* Type */}
          <TableCell>
            <Box
              sx={{
                display: "inline-block",
                px: 2,
                py: 0.7,
                borderRadius: "10px",
                background:
                  item.Food_Type === "Non Veg"
                    ? "#fee2e2"
                    : "#dcfce7",
                color:
                  item.Food_Type === "Non Veg"
                    ? "#dc2626"
                    : "#16a34a",
                fontWeight: 700
              }}
            >
              {item.Food_Type}
            </Box>
          </TableCell>

          {/* Quantity */}
          <TableCell>{item.predicted_quantity}</TableCell>

          {/* Predicted For */}
          <TableCell>
            {predictedDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric"
            })}
          </TableCell>

          {/* Day */}
          <TableCell>
            <Box
              sx={{
                display: "inline-block",
                px: 2,
                py: 0.7,
                borderRadius: "10px",
                background: "#eaf2ff",
                color: "#2563eb",
                fontWeight: 700
              }}
            >
              {predictedDate.toLocaleDateString("en-US", {
                weekday: "long"
              })}
            </Box>
          </TableCell>

          {/* Generated On */}
          <TableCell>
            <Typography fontWeight={600}>
              {createdDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric"
              })}
            </Typography>

            <Typography
              sx={{
                fontSize: "13px",
                color: "#94a3b8"
              }}
            >
              {item.Time}
            </Typography>
          </TableCell>
        </TableRow>
      );
    })
  )}
</TableBody>
          </Table>
          {tableData.length > 0 && (
  <Box
    sx={{
      mt: 3,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 2
    }}
  >
    <Typography sx={{ color: "#64748b", fontSize: "14px" }}>
      Showing {startIndex + 1} to{" "}
      {Math.min(endIndex, tableData.length)} of {tableData.length} orders
    </Typography>

    <Pagination
      count={totalPages}
      page={page}
      onChange={(e, value) => setPage(value)}
      shape="rounded"
      color="success"
    />
  </Box>
)}
        </Paper>

        {/* FOOTER */}
        <Paper
          elevation={0}
          sx={{
            mt: 3,
            p: 2,
            borderRadius: "14px",
            background: "#eef4ff",
            color: "#475569"
          }}
        >
          Note: Predictions are generated using AI based on historical data,
          trends, and other factors.
        </Paper>

      </Container>
    </Box>
  );
}

export default AIPrediction;