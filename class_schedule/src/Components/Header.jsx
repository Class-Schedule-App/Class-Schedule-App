import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  InputBase,
  MenuItem,
  Menu,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import Grid from "@mui/material/Grid";

const Header = ({ user, onLogin, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      // style={{ backgroundColor: "grey", display: "flex" }}
      style={{
        width: "100%",
        backgroundImage: `url(${process.env.PUBLIC_URL}/Images/header.jpg`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Toolbar style={{ width: "100%" }}>
        <Typography variant="h6" component="div">
          <img
            src={process.env.PUBLIC_URL + "/Images/moringalogo.png"}
            alt="logo"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
            }}
          />
        </Typography>
        <div
          className="search-bar"
          style={{
            display: "flex",
            alignItems: "center",
            border: "2px solid black",
            borderRadius: "10px",
            margin: "0 10px",
            marginLeft: "auto",
          }}
        >
          <div className="search-icon" style={{ margin: "0 15px" }}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search..."
            inputProps={{ "aria-label": "search" }}
            style={{ flex: 1, padding: "10px" }}
          />
        </div>
        {user ? (
          <>
            <IconButton
              aria-label="account of current user"
              aria-controls="profile-menu"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              style={{ marginLeft: "auto" }}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="profile-menu"
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={open}
              onClose={handleProfileMenuClose}
            >
              <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleProfileMenuClose}>My Modules</MenuItem>
              <MenuItem onClick={onLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Button
            color="inherit"
            onClick={onLogin}
            style={{
              marginLeft: "auto",
              color: "white",
              backgroundColor: "lightgreen",
            }}
          >
            Login/Signup
          </Button>
        )}
      </Toolbar>
      <Toolbar style={{ display: "flex", width: "100%", marginLeft: "auto" }}>
        <div>
          <Grid
            container
            justifyContent="space-between"
            style={{ display: "flex", marginLeft: "auto" }}
          >
            <Grid item style={{ margin: "0 10px " }}>
              <span style={{ color: "limegreen" }}>Monday</span>
            </Grid>
            <Grid item style={{ margin: "0 10px" }}>
              <span style={{ color: "limegreen" }}>Tuesday</span>
            </Grid>
            <Grid item style={{ margin: "0 10px" }}>
              <span style={{ color: "limegreen" }}>Wednesday</span>
            </Grid>
            <Grid item style={{ margin: "0 10px" }}>
              <span style={{ color: "limegreen" }}>Thursday</span>
            </Grid>
            <Grid item style={{ margin: "0 10px" }}>
              <span style={{ color: "limegreen" }}>Friday</span>
            </Grid>
          </Grid>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
