import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  InputAdornment,
  Divider
} from "@mui/material";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import forImage from "../assets/forgotpassword.png";   
import forgotLogo from "../assets/forgotpassword_logo.png";                 // top logo

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const sendLink = async () => {
    try {
      const res = await API.post("/auth/forgot-password", { email });
      alert(res.data);
    } catch (err) {
      alert(err.response?.data || "Error sending email");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${forImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: 430,
          p: 4,
          borderRadius: "22px",
          textAlign: "center",
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)"
        }}
      >
        {/* Logo */}
        <Box
          component="img"
          src={forgotLogo}
          alt="forgot logo"
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
          Forgot{" "}
          <Box component="span" sx={{ color: "#148a43" }}>
            Password?
          </Box>
        </Typography>

        {/* Subtitle */}
        <Typography
          sx={{
            mt: 1.5,
            color: "#6b7280",
            fontSize: "15px",
            lineHeight: 1.6
          }}
        >
          No worries! Enter your email address and we’ll
          <br />
          send you a link to reset your password.
        </Typography>

        {/* Email Field */}
        <TextField
          fullWidth
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            mt: 4,
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              height: 60,
              fontSize: "18px"
            },
            "& fieldset": {
              borderColor: "#78c394"
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlinedIcon sx={{ color: "#148a43" }} />
              </InputAdornment>
            )
          }}
        />

        {/* Send Button */}
        <Button
          fullWidth
          onClick={sendLink}
          startIcon={<SendIcon />}
          sx={{
            mt: 3,
            height: 56,
            borderRadius: "8px",
            background:
              "linear-gradient(90deg,#0f8b43 0%, #159447 100%)",
            color: "#fff",
            fontWeight: 700,
            fontSize: "18px",
            "&:hover": {
              background:
                "linear-gradient(90deg,#0d7b3b 0%, #12823e 100%)"
            }
          }}
        >
          SEND RESET LINK
        </Button>

        {/* Divider */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            my: 3
          }}
        >
          <Divider sx={{ flex: 1 }} />
          <Typography sx={{ color: "#777", fontWeight: 600 }}>
            OR
          </Typography>
          <Divider sx={{ flex: 1 }} />
        </Box>

        {/* Back Button */}
        <Button
          fullWidth
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/login")}
          sx={{
            height: 56,
            borderRadius: "8px",
            borderColor: "#78c394",
            color: "#148a43",
            fontWeight: 700,
            fontSize: "18px",
            "&:hover": {
              borderColor: "#148a43",
              background: "#f0fff5"
            }
          }}
        >
          BACK TO LOGIN
        </Button>
      </Paper>
    </Box>
  );
}

export default ForgotPassword;