import React, { useState } from "react";
import API from "../api";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  InputAdornment,
  IconButton
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import resetImage from "../assets/resetbackground.png"; // background
import resetLogo from "../assets/forgotpassword_logo.png"; // top logo

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const resetPassword = async () => {
    try {
      const res = await API.post(
        `/auth/reset-password/${token}`,
        { password }
      );

      alert(res.data);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data || "Error resetting password");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${resetImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: 430,
          p: 4,
          borderRadius: "24px",
          textAlign: "center",
          background: "rgba(255,255,255,0.93)",
          backdropFilter: "blur(12px)"
        }}
      >
        {/* Logo */}
        <Box
          component="img"
          src={resetLogo}
          alt="reset logo"
          sx={{
            width: 130,
            height: 130,
            objectFit: "contain",
            mb: 2
          }}
        />

        {/* Title */}
        <Typography
          sx={{
            fontSize: "40px",
            fontWeight: 300,
            lineHeight: 1.1
          }}
        >
          Reset{" "}
          <Box component="span" sx={{ color: "#15803d" }}>
            Password
          </Box>
        </Typography>

        {/* Subtitle */}
        <Typography
          sx={{
            mt: 1.5,
            color: "#8a8f98",
            fontSize: "20px",
            lineHeight: 1.6
          }}
        >
          Enter your new password below
          <br />
          to reset your account password.
        </Typography>

        {/* Password Field */}
        <TextField
          fullWidth
          placeholder="New Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            mt: 4,
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              height: 60,
              fontSize: "18px"
            },
            "& fieldset": {
              borderColor: "#73c48d"
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon sx={{ color: "#15803d" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <VisibilityOffOutlinedIcon />
                  ) : (
                    <VisibilityOutlinedIcon />
                  )}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        {/* Button */}
        <Button
          fullWidth
          onClick={resetPassword}
          sx={{
            mt: 4,
            height: 56,
            borderRadius: "8px",
            background:
              "linear-gradient(90deg,#0f8a42 0%, #178c46 100%)",
            color: "#fff",
            fontWeight: 700,
            fontSize: "20px",
            "&:hover": {
              background:
                "linear-gradient(90deg,#0c7838 0%, #137a3d 100%)"
            }
          }}
        >
          UPDATE PASSWORD
        </Button>
      </Paper>
    </Box>
  );
}

export default ResetPassword;