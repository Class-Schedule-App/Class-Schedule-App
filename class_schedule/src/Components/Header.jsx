import React, { useState, useEffect } from "react";
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
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

const Header = ({ user, onLogout, searchQuery, onSearchChange, setSearchResults }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  // const location = useLocation();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const getDayOfWeek = () => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDate = new Date();
    const currentDayIndex = currentDate.getDay();
    return daysOfWeek[currentDayIndex];
  };

  const currentDayOfWeek = getDayOfWeek();

  
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from your API and set it to the 'data' state
    const apiUrl = "https://class-schedule-pp4h.onrender.com/sessions";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    onSearchChange(query);

    if (Array.isArray(data)) {
      const filteredResults = data.filter((session) =>
        session.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      console.error("Data is not in the expected format");
      setSearchResults([]); // Clear the search results
    }
  };

  return (
    <AppBar style={{ backgroundColor: "grey", display: "flex" }}>
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
            border: "2px solid white",
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
            value={searchQuery}
            onChange={handleSearchChange}
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
              <MenuItem
                onClick={() => {
                  handleProfileMenuClose();
                  navigate("/profile");
                }}
              >
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleProfileMenuClose();
                  navigate("/modules");
                }}
              >
                My Modules
              </MenuItem>
              <MenuItem onClick={onLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Button
            color="inherit"
            onClick={() => navigate("/login")}
            style={{
              marginLeft: "auto",
              color: "grey",
              backgroundColor: "white",
            }}
          >
            Login
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
            {[
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ].map((day) => (
              <Grid item key={day} style={{ margin: "0 10px" }}>
                <span
                  className={day === currentDayOfWeek ? "text-red-500" : ""}
                >
                  {day}
                </span>
              </Grid>
            ))}
          </Grid>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
