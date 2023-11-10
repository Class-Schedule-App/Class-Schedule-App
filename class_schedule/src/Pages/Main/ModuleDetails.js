import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Typography, Button, Divider, Box, Paper, Grid } from "@mui/material";
import Header from "./Header";

function ModuleDetails() {
  let { modId } = useParams();
  const [module, setModule] = useState({});

  useEffect(() => {
    fetch(`/modules/${modId}`)
      .then((r) => r.json())
      .then((module) => {
        setModule(module);
        console.log(module);
      });

    return () => setModule({});
  }, [modId]);

  const { module_name, date, time, invite_link } = module;

  const [live, setLive] = useState(true);

  function handleToggleStock() {
    setLive((live) => !live);
  }

  return (
    <div>
      <Header />
      <Box p={2}>
        <Typography variant="h4" gutterBottom fontFamily="Quicksand">
          Module Details
        </Typography>
        <Divider />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: "20px", fontFamily: "Quicksand" }}>
              <Typography variant="h5">Module ID: {modId}</Typography>
              <Typography variant="h6" style={{ marginBottom: "10px" }}>
                {module_name}
              </Typography>
              <Typography variant="body1">Time: {time}</Typography>
              <Typography variant="body1">Date: {date}</Typography>
              <Typography variant="body1">
                Invite Link:{" "}
                <a
                  href={invite_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#007BFF", textDecoration: "none" }}
                >
                  {invite_link}
                </a>
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            {live ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleToggleStock}
                style={{ marginTop: "10px", fontFamily: "Quicksand" }}
              >
                In Session
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleToggleStock}
                style={{ marginTop: "10px", fontFamily: "Quicksand" }}
              >
                Postponed
              </Button>
            )}
          </Grid>
        </Grid>
        <Box mt={2}>
          <Link to="/mod" style={{ textDecoration: "none" }}>
            <Button variant="outlined" fontFamily="Quicksand">
              Back to Modules Page
            </Button>
          </Link>
        </Box>
      </Box>
    </div>
  );
}

export default ModuleDetails;


