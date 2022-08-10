import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import "./NavBar.css";
import { useNavigate, } from "react-router-dom";
import AuthContext from "../../utils/Auth"
import { useState,  useContext } from 'react';







const ResponsiveAppBar = () => {
  
  const { setAuth, auth} = useContext(AuthContext);
  
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget.value);
    console.log(event.currentTarget)
  
    /* navigate(anchorElNav) */
  };

  const handleCloseNavMenu = (e) => {
    setAnchorElUser(e.currentTarget);
    setAnchorElNav(null);
  };  
  /* Handle click in profile */
  const handleProfile=()=>{
    console.log("hello")
    navigate("/profile")
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    
  };

const styleNavbar = {
    background: 'rgba(0, 47, 255, 0.726)',
    width:1500,   
    borderRadius: 25, 
};
console.log(auth)
const token=localStorage.getItem('myToken');
const user=localStorage.getItem('user');

const checkuser=(user)=>{
if(user===undefined||user===null){

return true}
else return false
}


console.log(user, token)


  return (
    <AppBar sx= {{m:5}} style={styleNavbar} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>       
        <img onClick={() => navigate("/home")} alt="our logo" className="logo" src="https://freesvg.org/img/sweet_home.png"></img>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>  
              {<Button                
                onClick={()=>navigate("/login")}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                
                {checkuser(user)?"Login":"HELLO  '" +user+"'" } 

              </Button>}
          </Box>

          <Box sx={{ flexGrow: 0 }}>

          <div className='profileDiv'>
          
            <Tooltip title="Open settings">
              <IconButton className="avatarProfile" onClick={handleProfile} sx={{ p: 0 }}>                           
                <h3 className='profileh'>PROFILE</h3>
              
              <Avatar  src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Remy Sharp"/>
              </IconButton>
            </Tooltip>
            <img  onClick={ ()=>{setAuth();localStorage.clear();window.location="/"}} alt="our logo" className="logoExit" src="https://cdn.vectorstock.com/i/1000x1000/53/26/exit-sign-green-vector-7885326.webp"></img>
            </div>  
         
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
