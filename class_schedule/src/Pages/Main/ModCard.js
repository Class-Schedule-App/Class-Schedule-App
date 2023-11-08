import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const cardStyle = {
  border: "1px solid #ccc",
  borderRadius: "10px",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
  backgroundColor: "#fff",
  marginBottom: "20px",
  marginRight: '20px',
  padding: "20px"
};
const titleStyle = {
  fontSize: "24px",
  fontWeight: "bold",
};

const subtitleStyle = {
  fontSize: "18px",
  color: "#0077b6", // Change the color to your preference
};

const infoStyle = {
  fontSize: "16px",
};


function ModCard({ module }) {
  const { id, module_name, date, time, invite_link } = module;

  return (
    <Card style={cardStyle} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div" style={titleStyle}>
          Module {id}
        </Typography>
        <Typography variant="h6" component="div" style={subtitleStyle}>
          {module_name}
        </Typography>
        <Typography color="textSecondary" gutterBottom style={infoStyle}>
          Time: {time}
        </Typography>
        <Typography color="textSecondary" gutterBottom style={infoStyle}>
          Date: {date}
        </Typography>
        <Typography color="textSecondary" gutterBottom style={infoStyle}>
          Invite Link: {invite_link}
        </Typography>
        <Typography color="textSecondary" gutterBottom style={infoStyle}>
          TM incharge: Mr Nobody
        </Typography>
        <Link to={`/mod/${id}`}>
          <Button variant="contained" color="primary">
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export default ModCard;
