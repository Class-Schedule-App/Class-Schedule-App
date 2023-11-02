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
      style={{ backgroundColor: "grey", display: "flex" }}
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
            // border: "2px solid black",
            borderRadius: "10px",
            margin: "0 10px",
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
              <MenuItem onClick={handleProfileMenuClose}>My account</MenuItem>
              <MenuItem onClick={onLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Button color="inherit" onClick={onLogin}>
            Login/Signup
          </Button>
        )}
      </Toolbar>
      <Toolbar style={{ display: "flex", width: "100%" }}>
        <div>
          <Grid
            container
            justifyContent="space-between"
            style={{ display: "flex" }}
          >
            <Grid item style={{ margin: "0 10px " }} md={2} lg={3}>
              <span>Monday</span>
            </Grid>
            <Grid item style={{ margin: "0 10px" }} md={2} lg={3}>
              <span>Tuesday</span>
            </Grid>
            <Grid item style={{ margin: "0 10px" }} md={2} lg={3}>
              <span>Wednesday</span>
            </Grid>
            <Grid item style={{ margin: "0 10px" }} md={2} lg={3}>
              <span>Thursday</span>
            </Grid>
            <Grid item style={{ margin: "0 10px" }} md={2} lg={3}>
              <span>Friday</span>
            </Grid>
          </Grid>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
