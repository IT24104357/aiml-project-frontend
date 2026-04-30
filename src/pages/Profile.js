import React, { useEffect, useState } from "react";
import API from "../api";
import bowlImage from "../assets/bowl.png";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Divider,
  InputAdornment
} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import EditIcon from "@mui/icons-material/Edit";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";


function Profile() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [editMode, setEditMode] = useState(false);

  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    API
      .get(`/users/${userId}`)
      .then((res) => {
        setUser(res.data);
        setEmail(res.data.email);
        setPhone(res.data.phone);
      })
      .catch((err) => console.log(err));
  }, [userId]);

  const updateProfile = async () => {
    try {
      await API.put(`/users/${userId}`, {
        email,
        phone
      });

      alert("Profile updated successfully");
      setEditMode(false);
    } catch (err) {
      alert("Update failed");
    }
  };

  const cancelEdit = () => {
    setEmail(user.email);
    setPhone(user.phone);
    setEditMode(false);
  };

  if (!user) return <Typography>Loading...</Typography>;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#f4f8f4",
        p: 3
      }}
    >
      <Container maxWidth="xl">
        {/* TOP HEADER */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 4,
            flexWrap: "wrap",
            gap: 2
          }}
        >
          <Box>
            <Typography variant="h4" fontWeight="bold">
              My Profile
            </Typography>

            <Box
              sx={{
                width: 55,
                height: 4,
                bgcolor: "#16a34a",
                borderRadius: 3,
                mt: 1,
                mb: 1
              }}
            />

            <Typography color="text.secondary">
              Manage your account information and preferences
            </Typography>
          </Box>

          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 4,
              width: 340,
              display: "flex",
              alignItems: "center",
              gap: 2
            }}
          >
            <Avatar sx={{ bgcolor: "#e8f7ec", color: "#16a34a" }}>
              <VerifiedUserIcon />
            </Avatar>

            <Box>
              <Typography fontWeight="bold" color="#16a34a">
                Account Verified
              </Typography>
              <Typography fontSize="14px" color="text.secondary">
                Your account is active and in good standing.
              </Typography>
            </Box>
          </Paper>
        </Box>

        {/* MAIN CONTENT */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "300px 1fr" },
            gap: 3
          }}
        >
          {/* LEFT CARD */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 5
            }}
          >
            <Box textAlign="center">
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  margin: "auto",
                  bgcolor: "#e8f7ec",
                  color: "#065f46",
                  fontSize: "42px",
                  fontWeight: "bold"
                }}
              >
                {user.username?.substring(0, 2).toUpperCase()}
              </Avatar>

              <Typography variant="h5" fontWeight="bold" mt={3}>
                {user.username}
              </Typography>

              <Typography color="#16a34a" fontWeight="bold">
                {user.role}
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box display="flex" flexDirection="column" gap={3}>
              <Box display="flex" gap={2}>
                <EmailIcon sx={{ color: "#16a34a" }} />
                <Typography>{user.email}</Typography>
              </Box>

              <Box display="flex" gap={2}>
                <PhoneIcon sx={{ color: "#16a34a" }} />
                <Typography>{user.phone}</Typography>
              </Box>

              <Box display="flex" gap={2}>
                <CalendarMonthIcon sx={{ color: "#16a34a" }} />
                <Typography>Joined May 2024</Typography>
              </Box>
            </Box>

   <Paper
  elevation={0}
  sx={{
    mt: 4,
    p: 2.5,
    borderRadius: 4,
    bgcolor: "#eefaf0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 2,
    minHeight: "105px"
  }}
>
  {/* LEFT TEXT */}
  <Box sx={{ width: "55%" }}>
    <Typography
      sx={{
        color: "#16a34a",
        fontSize: "22px",
        fontWeight: "bold",
        lineHeight: 1
      }}
    >
      ❝
    </Typography>

    <Typography
      sx={{
        mt: 1,
        fontSize: "14px",
        color: "#111",
        lineHeight: 1.5
      }}
    >
      Good food fuels
      <br />
      great ideas.
    </Typography>
  </Box>

  {/* RIGHT IMAGE */}
  <Box
    component="img"
    src={bowlImage}
    alt="bowl"
    sx={{
      width: 80,
      height: 80,
      objectFit: "contain"
    }}
  />
</Paper>
          </Paper>

          {/* RIGHT CARD */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 5
            }}
          >
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <Avatar sx={{ bgcolor: "#e8f7ec", color: "#16a34a" }}>
                <PersonIcon />
              </Avatar>

              <Typography variant="h5" fontWeight="bold">
                Personal Information
              </Typography>
            </Box>

            <Divider sx={{ mb: 4 }} />

            {/* USERNAME */}
            <Typography mb={1}>Username</Typography>

            <TextField
              fullWidth
              disabled
              value={user.username}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: "#16a34a" }} />
                  </InputAdornment>
                )
              }}
            />

            {/* ROLE */}
            <Typography mb={1}>Role</Typography>

            <TextField
              fullWidth
              disabled
              value={user.role}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BadgeIcon sx={{ color: "#16a34a" }} />
                  </InputAdornment>
                )
              }}
            />

            {/* EMAIL */}
            <Typography mb={1}>Email</Typography>

            <TextField
              fullWidth
              value={email}
              disabled={!editMode}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: "#16a34a" }} />
                  </InputAdornment>
                )
              }}
            />

            {/* PHONE */}
            <Typography mb={1}>Phone</Typography>

            <TextField
              fullWidth
              value={phone}
              disabled={!editMode}
              onChange={(e) => setPhone(e.target.value)}
              sx={{ mb: 4 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon sx={{ color: "#16a34a" }} />
                  </InputAdornment>
                )
              }}
            />

            {!editMode ? (
              <Button
                fullWidth
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => setEditMode(true)}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  bgcolor: "#16a34a",
                  fontWeight: "bold",
                  fontSize: "17px",
                  "&:hover": {
                    bgcolor: "#15803d"
                  }
                }}
              >
                EDIT PROFILE
              </Button>
            ) : (
              <Box display="flex" gap={2}>
                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  onClick={updateProfile}
                >
                  Save
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  onClick={cancelEdit}
                >
                  Cancel
                </Button>
              </Box>
            )}
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

export default Profile;