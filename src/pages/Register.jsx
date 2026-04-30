import React, {useState} from "react";
import API from "../api";
import { Container, TextField, Button, MenuItem, Typography, Paper, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Register(){

 const navigate = useNavigate();

 const [user,setUser] = useState({
  username:"",
  email:"",
  phone:"",
  password:"",
  role:"student"
 });

 const handleChange = (e)=>{
  setUser({...user,[e.target.name]:e.target.value});
 };

 const registerUser = async () => {



  // EMAIL VALIDATION
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(!emailRegex.test(user.email)){
    alert("Please enter a valid email address");
    return;
  }

  // PHONE VALIDATION (10 digits)
  const phoneRegex = /^[0-9]{10}$/;

  if(!phoneRegex.test(user.phone)){
    alert("Phone number must contain exactly 10 digits");
    return;
  }

  // PASSWORD VALIDATION
    // Minimum 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z\d@$!%*?&.#]{8,}$/;

    if (!passwordRegex.test(user.password)) {
      alert(
        "Password must contain minimum 8 characters, including uppercase, lowercase, number and special character"
      );
      return;
    }

  try {

    await API.post("/auth/register", {
      ...user,
      username: user.username // ✅ IMPORTANT
    });

    alert("User Registered Successfully!");
    navigate("/login");

  } catch(err) {

    // ✅ SHOW BACKEND ERROR (duplicate, invalid, etc.)
    if (err.response && err.response.data) {
      alert(err.response.data);
    } else {
      alert("Registration failed");
    }

    console.log(err);

  }

};

 return(

<Box
sx={{
minHeight:"100vh",
display:"flex",
alignItems:"center",
justifyContent:"center",
background:"linear-gradient(135deg,#eef2f7,#d9e4f5)"
}}
>

<Container maxWidth="xs">

<Paper
elevation={6}
sx={{
padding:5,
borderRadius:4
}}
>

<Typography
variant="h4"
align="center"
sx={{
fontWeight:"bold",
marginBottom:3
}}
>
Create Account
</Typography>

<Typography
align="center"
sx={{
marginBottom:3,
color:"#666"
}}
>
Register new user
</Typography>

<Box display="flex" flexDirection="column" gap={2}>

<TextField
fullWidth
label="Username"
name="username"
onChange={handleChange}
/>

<TextField
fullWidth
label="Email"
name="email"
type="email"
onChange={handleChange}
/>

<TextField
fullWidth
label="Phone"
name="phone"
type="tel"
inputProps={{ maxLength:10 }}
onChange={handleChange}
/>

<TextField
fullWidth
label="Password"
name="password"
type="password"
onChange={handleChange}
/>

<TextField
select
fullWidth
label="Role"
name="role"
value={user.role}
onChange={handleChange}
>

<MenuItem value="lecturer">Lecturer</MenuItem>
<MenuItem value="student">Student</MenuItem>

</TextField>

<Button
variant="contained"
size="large"
sx={{
borderRadius:2,
textTransform:"none",
fontSize:"16px"
}}
onClick={registerUser}
>
Register
</Button>

<Button
variant="outlined"
size="large"
sx={{
borderRadius:2,
textTransform:"none"
}}
onClick={()=>navigate("/login")}
>
Back to Login
</Button>

</Box>

</Paper>

</Container>

</Box>

 );

}

export default Register;