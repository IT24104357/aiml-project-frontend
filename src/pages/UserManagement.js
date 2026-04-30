import React, { useState, useEffect } from "react";
import API from "../api";

import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  MenuItem,
  InputAdornment,
  Chip,
  Avatar,
  Select
} from "@mui/material";

import {
  Search,
  FilterList,
  Person,
  Email,
  Phone,
  Lock,
  Delete,
  Edit,
  KeyboardArrowLeft,
  KeyboardArrowRight
} from "@mui/icons-material";

function UserManagement() {
  const [users, setUsers] = useState([]);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("");

  const currentUserRole = sessionStorage.getItem("role");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    API.get("/users").then((res) => {
      setUsers(res.data);
    });
  };

  const addUser = async () => {
    const usernameRegex = /^[A-Za-z]{2,}\d{4,}$/;

    if (!usernameRegex.test(username.toUpperCase())) {
      alert("Username must be like IT24104357");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email");
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(phone)) {
      alert("Phone number must contain 10 digits");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z\d@$!%*?&.#]{8,}$/;

    if (!passwordRegex.test(password)) {
      alert(
        "Password must contain uppercase, lowercase, number and special character"
      );
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (role === "") {
      alert("Please select a role");
      return;
    }

    try {
      const currentRole = sessionStorage.getItem("role");

      await API.post("/users", {
        username: username.toUpperCase(),
        email,
        phone,
        password,
        role,
        currentRole
      });

      alert("User Added Successfully!");

      resetForm();
      fetchUsers();
    } catch (err) {
      if (err.response && err.response.data) {
        alert(err.response.data);
      } else {
        alert("Failed to add user");
      }
    }
  };

  const deleteUser = async (id) => {
    await API.delete(`/users/${id}`);
    fetchUsers();
  };

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setPhone("");
    setPassword("");
    setConfirmPassword("");
    setRole("");
  };

  const filteredUsers = users.filter((user) => {
    const matchSearch =
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase());

    const matchRole = filterRole === "" || user.role === filterRole;

    return matchSearch && matchRole;
  });

  const roleColor = (role) => {
    if (role === "admin") return "#dff3de";
    if (role === "student") return "#dbeafe";
    if (role === "kitchen") return "#fff0cc";
    if (role === "manager") return "#efe2ff";
    return "#eee";
  };

  if (currentUserRole !== "admin") {
    return (
      <Box sx={{ p: 5 }}>
        <Typography variant="h5">Access Denied</Typography>
        <Typography>Only Admin can manage users.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ background: "#f5f7fb", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="xl">
        <Typography sx={{ fontSize: 42, fontWeight: 800, color: "#103b20" }}>
          User Management
        </Typography>

        <Typography sx={{ color: "#6b7280", mb: 3 }}>
          Manage system users, roles and permissions.
        </Typography>

        {/* FORM */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: "14px",
            border: "1px solid #e5e7eb",
            mb: 3
          }}
        >
          <Typography
            sx={{ fontSize: 28, fontWeight: 700, color: "#14532d", mb: 3 }}
          >
            Add New User
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 2
            }}
          >
            <TextField
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                )
              }}
            />

            <TextField
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                )
              }}
            />

            <TextField
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone />
                  </InputAdornment>
                )
              }}
            />

            <TextField
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                )
              }}
            />

            <TextField
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                )
              }}
            />

            <TextField
              select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              SelectProps={{ displayEmpty: true }}
            >
              <MenuItem value="">Select role</MenuItem>
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="lecturer">Lecturer</MenuItem>
              <MenuItem value="kitchen">Kitchen</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </TextField>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              mt: 4
            }}
          >
            <Button
              variant="outlined"
              sx={{
                px: 4,
                borderColor: "#ddd",
                color: "#333"
              }}
              onClick={resetForm}
            >
              Reset
            </Button>

            <Button
              variant="contained"
              onClick={addUser}
              sx={{
                px: 4,
                background: "#16a34a",
                "&:hover": { background: "#15803d" }
              }}
            >
              Add User
            </Button>
          </Box>
        </Paper>

        {/* TABLE */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: "14px",
            border: "1px solid #e5e7eb"
          }}
        >
          <Typography
            sx={{ fontSize: 28, fontWeight: 700, color: "#14532d", mb: 3 }}
          >
            Existing Users
          </Typography>

          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <TextField
              fullWidth
              placeholder="Search by username, email or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                )
              }}
            />

            <TextField
              select
              sx={{ width: 220 }}
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              SelectProps={{ displayEmpty: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FilterList />
                  </InputAdornment>
                )
              }}
            >
              <MenuItem value="">All Roles</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="lecturer">Lecturer</MenuItem>
              <MenuItem value="kitchen">Kitchen</MenuItem>
            </TextField>

            <Button
              variant="outlined"
              sx={{
                color: "#15803d",
                borderColor: "#16a34a",
                px: 4
              }}
            >
              Export
            </Button>
          </Box>

          <Table>
            <TableHead>
              <TableRow sx={{ background: "#f0f7f0" }}>
                <TableCell>#</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Role</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredUsers.map((user, index) => (
                <TableRow key={user._id}>
                  <TableCell>{index + 1}</TableCell>

                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                      <Avatar sx={{ width: 32, height: 32 }}>
                        {user.username[0]}
                      </Avatar>
                      {user.username}
                    </Box>
                  </TableCell>

                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>

                  <TableCell>
                    <Chip
                      label={user.role}
                      sx={{
                        background: roleColor(user.role),
                        textTransform: "capitalize"
                      }}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        variant="outlined"
                        sx={{ minWidth: 40, color: "#16a34a" }}
                      >
                        <Edit fontSize="small" />
                      </Button>

                      <Button
                        variant="outlined"
                        color="error"
                        sx={{ minWidth: 40 }}
                        onClick={() => deleteUser(user._id)}
                      >
                        <Delete fontSize="small" />
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 3,
              alignItems: "center"
            }}
          >
            <Typography color="text.secondary">
              Showing 1 to {filteredUsers.length} of {filteredUsers.length} users
            </Typography>

            <Box sx={{ display: "flex", gap: 1 }}>
              <Button variant="outlined">
                <KeyboardArrowLeft />
              </Button>

              <Button
                variant="contained"
                sx={{ minWidth: 40, background: "#16a34a" }}
              >
                1
              </Button>

              <Button variant="outlined">
                <KeyboardArrowRight />
              </Button>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography color="text.secondary">Rows per page:</Typography>
              <Select size="small" value={10}>
                <MenuItem value={10}>10</MenuItem>
              </Select>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default UserManagement;