import React from "react";
import { TextField, InputAdornment, Paper, IconButton } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

function Search({ searchTerm, onSearchChange }) {
  return (
    <Paper elevation={3} className="searchbar">
      <TextField
        label="Search Module"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Paper>
  );
}

export default Search;
