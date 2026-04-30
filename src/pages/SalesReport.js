import React, { useEffect, useState } from "react";
import API from "../api";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Pagination,
  InputAdornment,
  Divider
} from "@mui/material";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import EqualizerOutlinedIcon from "@mui/icons-material/EqualizerOutlined";

function SalesReport() {
  const [data, setData] = useState(null);
  const [searchFood, setSearchFood] = useState("");
  const [filterType, setFilterType] = useState("");
  const [page, setPage] = useState(1);

{/* REPLACE handleExport WITH THIS FINAL WORKING VERSION */}

const handleExport = () => {
  const headers = [
    "Food",
    "Type",
    "Qty",
    "Price",
    "Date",
    "Time",
    "Order ID"
  ];

  const rowsData = sorted.map((row) => {
    const dt = new Date(row.orderDate);

    const date = dt.toLocaleDateString("en-GB");

    const time = dt.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    });

    return [
      `"${row.Food_Item}"`,
      `"${row.Food_Type}"`,
      row.quantity,
      row.totalPrice,
      `"${date}"`,
      `"${time}"`,
      `"${row.orderNumber || row.orderId || row.Order_ID}"`
    ];
  });

  const csv = [
    headers.join(","),
    ...rowsData.map((row) => row.join(","))
  ].join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;"
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "sales-report.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};

  const rowsPerPage = 5;

  useEffect(() => {
  API
    .get("/orders")
    .then((res) =>
      setData({
        allSales: res.data
      })
    )
    .catch(() =>
      setData({
        allSales: []
      })
    );
}, []);;

  if (!data) return <Typography sx={{ p: 4 }}>Loading...</Typography>;

  const sales = (data.allSales || []).filter(
  (item) => item.status?.toLowerCase() === "ready"
);

  const filtered = sales.filter((item) => {
    const food = item.Food_Item.toLowerCase().includes(
      searchFood.toLowerCase()
    );

    const type = filterType ? item.Food_Type === filterType : true;

    return food && type;
  });

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
  );

  const totalOrders = sorted.length;

  const itemsSold = sorted.reduce((a, b) => a + Number(b.quantity), 0);

  const totalRevenue = sorted.reduce(
    (a,b) => a + Number(b.Price || 0),
    0
  );

  const avg =
    totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : 0;

  const topMap = {};

  sorted.forEach((x) => {
    topMap[x.Food_Item] =
      (topMap[x.Food_Item] || 0) + Number(x.quantity);
  });

  const topItem =
    Object.entries(topMap).sort((a, b) => b[1] - a[1])[0] || [
      "-",
      0
    ];

  const lineMap = {};

  sorted.forEach((x) => {
    const d = new Date(x.orderDate).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });

    lineMap[d] = (lineMap[d] || 0) + Number(x.quantity);
  });

  const lineData = Object.keys(lineMap).map((k) => ({
    day: k,
    qty: lineMap[k]
  }));

  const rows = sorted.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const pages = Math.ceil(sorted.length / rowsPerPage);


  const vegCount = sorted
  .filter((item) => item.Food_Type === "Veg")
  .reduce((sum, item) => sum + Number(item.quantity), 0);

const nonVegCount = sorted
  .filter((item) => item.Food_Type === "NonVeg")
  .reduce((sum, item) => sum + Number(item.quantity), 0);

const pieData = [
  { name: "Veg", value: vegCount },
  { name: "Non-Veg", value: nonVegCount }
];

const COLORS = ["#22c55e", "#f97316"];

  return (
    <Box
      sx={{
        width: "100%",
        flex: 1,
        p: 2,
        m: 0,
        minHeight: "100vh",
        background: "#f8fafc",
        overflowX: "hidden"
      }}
    >

      
      {/* TOP CARDS */}
      {/* REPLACE YOUR TOP CARDS SECTION WITH THIS */}

<Box sx={{ mb: 3 }}>

  {/* DATE TOP RIGHT CORNER */}

  {/* 3 CARDS ONLY */}
  {/* REPLACE YOUR TOP CARDS SECTION WITH THIS EXACT UI */}

{/* EXACT TOP SECTION WITHOUT GRID */}

<Box
  sx={{
    display: "flex",
    gap: "14px",
    width: "100%",
    mb: 3,
    flexWrap: "nowrap"
  }}
>

  {/* CARD 1 */}
  <Paper
    sx={{
      width: "25%",
      height: 120,
      borderRadius: "10px",
      px: 2.2,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "0 1px 8px rgba(0,0,0,0.05)"
    }}
  >
    <Box display="flex" alignItems="center" gap={1.5}>
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "#ecfdf3",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <ShoppingBagOutlinedIcon sx={{ fontSize: 35, color: "#16a34a", alignItems: "top" }} />
      </Box>

      <Box>
        <Typography fontSize={20} color="#64748b" fontWeight={600}>
          Total Items Sold
        </Typography>

        <Typography fontSize={25} fontWeight={800} lineHeight={1.2}>
          {itemsSold}
        </Typography>

        <Typography fontSize={11} color="#94a3b8">
          Across all orders
        </Typography>
      </Box>
    </Box>

    <Box textAlign="right">
      <Box
        sx={{
          px: 1,
          py: "2px",
          borderRadius: "20px",
          background: "#ecfdf3",
          color: "#16a34a",
          fontSize: 25,
          fontWeight: 700
        }}
      >
        ↗ 15%
      </Box>

      <Typography fontSize={10} color="#94a3b8" mt={1}>
        vs last 7 days
      </Typography>
    </Box>
  </Paper>

  {/* CARD 2 */}
  <Paper
    sx={{
      width: "25%",
      height: 120,
      borderRadius: "10px",
      px: 2.2,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "0 1px 8px rgba(0,0,0,0.05)"
    }}
  >
    <Box display="flex" alignItems="center" gap={1.5}>
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "#ecfdf3",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <CurrencyRupeeOutlinedIcon sx={{ fontSize: 35, color: "#16a34a" }} />
      </Box>

      <Box>
        <Typography fontSize={20} color="#64748b" fontWeight={600}>
          Total Revenue
        </Typography>

        <Typography fontSize={25} fontWeight={800}>
          Rs {totalRevenue}
        </Typography>

        <Typography fontSize={11} color="#94a3b8">
          Total sales
        </Typography>
      </Box>
    </Box>

    <Box textAlign="right">
      <Box
        sx={{
          px: 1,
          py: "2px",
          borderRadius: "20px",
          background: "#ecfdf3",
          color: "#16a34a",
          fontSize: 25,
          fontWeight: 700
        }}
      >
        ↗ 18%
      </Box>

      <Typography fontSize={10} color="#94a3b8" mt={1}>
        vs last 7 days
      </Typography>
    </Box>
  </Paper>

  {/* CARD 3 */}
  <Paper
    sx={{
      width: "25%",
      height: 120,
      borderRadius: "10px",
      px: 2.2,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "0 1px 8px rgba(0,0,0,0.05)"
    }}
  >
    <Box display="flex" alignItems="center" gap={1.5}>
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "#ecfdf3",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <StarBorderRoundedIcon sx={{ fontSize: 35, color: "#16a34a" }} />
      </Box>

      <Box>
        <Typography fontSize={20} color="#64748b" fontWeight={600}>
          Top Item
        </Typography>

        <Typography fontSize={25} fontWeight={800}>
          {topItem[0]}
        </Typography>

        <Typography fontSize={11} color="#94a3b8">
          {topItem[1]} sold
        </Typography>
      </Box>
    </Box>

    <Box textAlign="right">
      <Box
        sx={{
          px: 1,
          py: "2px",
          borderRadius: "20px",
          background: "#ecfdf3",
          color: "#16a34a",
          fontSize: 25,
          fontWeight: 700
        }}
      >
        ↗ 20%
      </Box>

      <Typography fontSize={10} color="#94a3b8" mt={1}>
        vs last 7 days
      </Typography>
    </Box>
  </Paper>

  {/* DATE */}
  <Paper
    sx={{
      width: "25%",
      height: 40,
      borderRadius: "10px",
      px: 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "0 1px 8px rgba(0,0,0,0.05)"
    }}
  >
    <Box display="flex" alignItems="center" gap={1}>
      <CalendarTodayOutlinedIcon sx={{ fontSize: 18, color: "#64748b" }} />

      <Typography fontSize={13} fontWeight={600} color="#64748b" alignSelf="right" >
        Apr 22, 2026 - Apr 29, 2026
      </Typography>

      <KeyboardArrowDownIcon sx={{ fontSize: 18, color: "#64748b" }} />
    </Box>

    <AutorenewRoundedIcon sx={{ fontSize: 18, color: "#64748b" }} />
  </Paper>

</Box>

</Box>
      {/* CHARTS */}
      {/* REPLACE YOUR CHART SECTION WITH THIS (BOX ONLY, NO GRID) */}

<Box
  sx={{
    display: "flex",
    gap: "14px",
    width: "100%",
    mb: 3,
    flexWrap: "nowrap"
  }}
>

  {/* DAILY SALES TREND */}
  <Paper
    sx={{
      width: "45%",
      height: 470,
      borderRadius: "14px",
      p: 3,
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
    }}
  >
    <Typography fontSize={24} fontWeight={800} mb={2} align="center">
      Daily Sales Trend
    </Typography>

    <ResponsiveContainer width="100%" height="88%">
      <AreaChart data={lineData}>
        <defs>
          <linearGradient id="sales" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#16a34a" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#16a34a" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />

        <Area
          type="monotone"
          dataKey="qty"
          stroke="#16a34a"
          fill="url(#sales)"
        />
      </AreaChart>
    </ResponsiveContainer>
  </Paper>

  {/* PIE CHART */}
  <Paper
    sx={{
      width: "25%",
      height: 470,
      borderRadius: "14px",
      p: 3,
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
    }}
  >
    <Typography fontSize={24} fontWeight={800} mb={2} align="center">
      Top Selling Items
    </Typography>

     <ResponsiveContainer width="100%" height="88%">
    <PieChart>
      <Pie
        data={pieData}
        dataKey="value"
        innerRadius={75}
        outerRadius={120}
        paddingAngle={3}
      >
        {pieData.map((entry, i) => (
          <Cell
            key={i}
            fill={COLORS[i]}
          />
        ))}
      </Pie>

      <Legend
        verticalAlign="bottom"
        height={36}
        iconType="circle"
      />
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
  </Paper>

  {/* SUMMARY */}
  <Paper
    sx={{
      width: "25%",
      height: 470,
      borderRadius: "14px",
      p: 3,
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
    }}
  >
    <Typography fontSize={24} fontWeight={800} mb={3} align="center">
      Sales Summary
    </Typography>

     <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      py: 2
    }}
  >
    <Box display="flex" alignItems="center" gap={1.5}>
      <Box
        sx={{
          width: 38,
          height: 38,
          borderRadius: "50%",
          background: "#eaf8ef",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <ShoppingCartOutlinedIcon
          sx={{ fontSize: 20, color: "#16a34a" }}
        />
      </Box>

      <Typography fontSize={16}>Total Orders</Typography>
    </Box>

    <Typography fontSize={18} fontWeight={700}>
      {totalOrders}
    </Typography>
  </Box>

  <Divider />

  {/* ROW 2 */}
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      py: 2
    }}
  >
    <Box display="flex" alignItems="center" gap={1.5}>
      <Box
        sx={{
          width: 38,
          height: 38,
          borderRadius: "50%",
          background: "#eaf8ef",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Inventory2OutlinedIcon
          sx={{ fontSize: 20, color: "#16a34a" }}
        />
      </Box>

      <Typography fontSize={16}>Items Sold</Typography>
    </Box>

    <Typography fontSize={18} fontWeight={700}>
      {itemsSold}
    </Typography>
  </Box>

  <Divider />

  {/* ROW 3 */}
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      py: 2
    }}
  >
    <Box display="flex" alignItems="center" gap={1.5}>
      <Box
        sx={{
          width: 38,
          height: 38,
          borderRadius: "50%",
          background: "#eaf8ef",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <CurrencyRupeeOutlinedIcon
          sx={{ fontSize: 20, color: "#16a34a" }}
        />
      </Box>

      <Typography fontSize={16}>Total Revenue</Typography>
    </Box>

    <Typography fontSize={18} fontWeight={700}>
      Rs {totalRevenue}
    </Typography>
  </Box>

  <Divider />

  {/* ROW 4 */}
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      py: 2
    }}
  >
    <Box display="flex" alignItems="center" gap={1.5}>
      <Box
        sx={{
          width: 38,
          height: 38,
          borderRadius: "50%",
          background: "#fff7e6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <EqualizerOutlinedIcon
          sx={{ fontSize: 20, color: "#f59e0b" }}
        />
      </Box>

      <Typography fontSize={16}>Average Order</Typography>
    </Box>

    <Typography fontSize={18} fontWeight={700}>
      Rs {avg}
    </Typography>
  </Box>
  </Paper>

</Box>

      {/* FILTER */}
<Paper
  sx={{
    p: 2.5,
    borderRadius: "18px",
    mb: 3,
    boxShadow: "0 4px 18px rgba(0,0,0,0.05)",
    border: "1px solid #eef2f7"
  }}
>
  <Grid container spacing={2}>
    <Grid item xs={12} md={4}>
      <TextField
        fullWidth
        placeholder="Search Food"
        value={searchFood}
        onChange={(e) => setSearchFood(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#64748b" }} />
            </InputAdornment>
          )
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            background: "#fff"
          }
        }}
      />
    </Grid>

    <Grid item xs={12} md={3}>
      <TextField
        select
        fullWidth
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        SelectProps={{
          displayEmpty: true
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            background: "#fff",
            height: "56px"
          }
        }}
        
      >
        <MenuItem value="">All Types</MenuItem>
        <MenuItem value="Veg">Veg</MenuItem>
        <MenuItem value="NonVeg">NonVeg</MenuItem>
      </TextField>
    </Grid>

    <Grid item xs={12} md={2}>
      <TextField
        fullWidth
        type="date"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            background: "#fff"
          }
        }}
      />
    </Grid>

    <Grid item xs={12} md={3}>
      <Button
        fullWidth
        onClick={handleExport}
        startIcon={<FileDownloadIcon />}
        sx={{
          height: "56px",
          borderRadius: "12px",
          background: "#16a34a",
          color: "#fff",
          fontWeight: 700,
          boxShadow: "0 6px 14px rgba(22,163,74,0.25)",
          "&:hover": {
            background: "#15803d"
          }
        }}
      >
        EXPORT
      </Button>
    </Grid>
  </Grid>
</Paper>

{/* TABLE */}
<Paper
  sx={{
    p: 0,
    borderRadius: "18px",
    overflow: "hidden",
    boxShadow: "0 4px 18px rgba(0,0,0,0.05)",
    border: "1px solid #eef2f7"
  }}
>
  <Box sx={{ px: 3, py: 2.5 }}>
    <Typography fontSize={28} fontWeight={800}>
      All Sales Records
    </Typography>
  </Box>

  <Box sx={{ overflowX: "auto" }}>
    <Table>
      <TableHead>
        <TableRow
          sx={{
            background:
              "linear-gradient(90deg,#eef8f3 0%,#e8f5ef 100%)"
          }}
        >
          {[
            "Food",
            "Type",
            "Quantity",
            "Total Price",
            "Date",
            "Time",
            "Order ID"
          ].map((head) => (
            <TableCell
              key={head}
              sx={{
                fontWeight: 800,
                color: "#334155",
                py: 2,
                borderBottom: "none"
              }}
            >
              {head}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {rows.map((row, i) => (
          <TableRow
            key={i}
            hover
            sx={{
              "& td": {
                py: 2,
                borderBottom: "1px solid #f1f5f9"
              },
              "&:hover": {
                background: "#f8fafc"
              }
            }}
          >
            <TableCell sx={{ fontWeight: 700 }}>
              {row.Food_Item}
            </TableCell>

            <TableCell>{row.Food_Type}</TableCell>

            <TableCell>{row.quantity}</TableCell>

            <TableCell sx={{ fontWeight: 700 }}>
              Rs {row.Price}
            </TableCell>

            <TableCell>
              {new Date(row.orderDate).toLocaleDateString()}
            </TableCell>

            <TableCell>{row.Time}</TableCell>

            <TableCell
              sx={{
                fontWeight: 700,
                color: "#64748b"
              }}
            >
              {row.orderNumber}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Box>

  <Box
    sx={{
      px: 3,
      py: 2.5,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 2
    }}
  >
    <Typography sx={{ color: "#64748b" }}>
      Showing {(page - 1) * rowsPerPage + 1} to{" "}
      {Math.min(page * rowsPerPage, sorted.length)} of{" "}
      {sorted.length} records
    </Typography>

    <Pagination
      count={pages}
      page={page}
      onChange={(e, val) => setPage(val)}
      color="success"
      shape="rounded"
    />
  </Box>
</Paper>
    </Box>
  );
}

export default SalesReport;