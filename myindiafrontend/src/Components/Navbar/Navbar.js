import React from 'react';
import './Navbar.css';
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
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Link, useNavigate } from 'react-router-dom';
const Navbar = (props) => {
  const { children, activeUserDetails } = props;
  const {
    name,
  } = activeUserDetails;
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate()

  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link to="/Dashboard" style={{ color: "white" }}>
              <ShoppingBagIcon sx={{ fontSize: "50px", display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuItem key={"Home"} onClick={() => navigate('/Dashboard')}>
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
                <MenuItem key={"Your Cart"} onClick={() => navigate("/yourCart")}>
                  <Typography textAlign="center">Your Cart</Typography>
                </MenuItem>

              </Menu>
            </Box>
            <Link to="/Dashboard" style={{ color: "white" }}>
              <ShoppingBagIcon sx={{ fontSize: "50px", display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                key={"Home"}
                onClick={() => navigate('/Dashboard')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Home
              </Button>
              <Button
                key={"Your Cart"}
                onClick={() => navigate('/yourCart')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Your Cart
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={name} src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              
                <MenuItem key={"logout"} onClick={() => {
                  localStorage.clear();
                  navigate('/signin')
                }}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
      <div>
        {children}
      </div>
    </div>
  );

}

export default Navbar;