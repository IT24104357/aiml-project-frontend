import React, { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  InputAdornment,
  Divider
} from "@mui/material";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import logo from "../assets/logo.png";
import bgImage from "../assets/login.png";   // <-- add your image here

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await API.post("/auth/login", { username, password });

      const token = res.data.token;
    const user = res.data.user;

    // ✅ store token
    localStorage.setItem("token", token);

    // ✅ keep old system (important)
    sessionStorage.setItem("username", user.username);
    sessionStorage.setItem("role", user.role);
    sessionStorage.setItem("userId", user._id);

      if (user.role === "admin") {
        navigate("/menu-management");
      } else if (user.role === "kitchen") {
        navigate("/");
      } else {
        navigate("/order");
      }
    } catch (err) {
      alert("Invalid Username or Password");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingRight: "300px",
        backgroundSize: "100%", 

        /* FULL PAGE BACKGROUND IMAGE */
        backgroundImage: `url(${bgImage})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* LOGIN BOX */}
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: "520px",
          p: "42px",
          borderRadius: "28px",
          background: "rgba(217, 236, 226, 0.92)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 18px 45px rgba(0,0,0,0.12)"
        }}
      >
        {/* LOGO */}
        <Box textAlign="center">
          <Box
            component="img"
            src={logo}
            sx={{
              width: 350,
              height: 150,
              objectFit: "contain",
              mb: 0
            }}
          />

          <Typography
            sx={{
              fontSize: "52px",
              fontWeight: 300,
              color: "#064a1b"
            }}
          >
            Login
          </Typography>

          <Typography
            sx={{
              color: "#6b7280",
              mt: 1,
              mb: 4,
              fontSize: "18px"
            }}
          >
            Sign in to your Smart Canteen account
          </Typography>
        </Box>

        {/* USERNAME */}
        <TextField
          fullWidth
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              height: "62px",
              borderRadius: "14px"
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlineIcon />
              </InputAdornment>
            )
          }}
        />

        {/* PASSWORD */}
        <TextField
          fullWidth
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              height: "62px",
              borderRadius: "14px"
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon />
              </InputAdornment>
            )
          }}
        />

        {/* FORGOT PASSWORD */}
        <Box sx={{ textAlign: "right", mb: 4 }}>
          <Typography
            onClick={() => navigate("/forgot-password")}
            sx={{
              color: "#118a3d",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            Forgot Password?
          </Typography>
        </Box>

        {/* LOGIN BUTTON */}
        <Button
          fullWidth
          onClick={login}
          endIcon={<ArrowForwardIcon />}
          sx={{
            height: "62px",
            borderRadius: "14px",
            background:
              "linear-gradient(90deg,#22c55e 0%,#16a34a 100%)",
            color: "#fff",
            fontSize: "22px",
            fontWeight: 700,
            textTransform: "none",
            "&:hover": {
              background:
                "linear-gradient(90deg,#16a34a 0%,#15803d 100%)"
            }
          }}
        >
          Sign In
        </Button>

        {/* DIVIDER */}
        <Box sx={{ my: 4 }}>
          <Divider>
            <Typography sx={{ color: "#6b7280" }}>or</Typography>
          </Divider>
        </Box>

        {/* REGISTER */}
        <Link to="/register" style={{ textDecoration: "none" }}>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              height: "62px",
              borderRadius: "14px",
              borderColor: "#16a34a",
              color: "#111827",
              fontSize: "20px",
              textTransform: "none",
              fontWeight: 600
            }}
          >
            Create Account
          </Button>
        </Link>
      </Paper>
    </Box>
  );
}

export default Login;