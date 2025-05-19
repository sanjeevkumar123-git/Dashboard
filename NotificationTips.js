import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  useTheme,
} from "@mui/material";

const alerts = [
  { type: "alert", message: "Overspending on food this month!" },
  { type: "alert", message: "Salary not received yet." },
];

const tips = [
  { type: "tip", message: "Try preparing meals at home to cut food costs." },
  { type: "tip", message: "Set up an emergency savings account." },
];

const NotificationsTips = () => {
  const theme = useTheme();

  return (
    <Box>
      <Typography
        variant="h6"
        gutterBottom
        fontWeight="bold"
        color={theme.palette.primary.main}
      >
        Smart Alerts
      </Typography>
      <Paper
        elevation={3}
        sx={{
          mb: 3,
          p: 2,
          bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#fff",
        }}
      >
        <List>
          {alerts.map((item, idx) => (
            <ListItem
              key={idx}
              sx={{
                borderLeft: `4px solid ${theme.palette.error.main}`,
                mb: 1,
                bgcolor: theme.palette.action.hover,
                borderRadius: 1,
              }}
            >
              <ListItemText
                primary={item.message}
                primaryTypographyProps={{ fontWeight: "medium" }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Typography
        variant="h6"
        gutterBottom
        fontWeight="bold"
        color={theme.palette.primary.main}
      >
        Budget Tips & Insights
      </Typography>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#fff",
        }}
      >
        <List>
          {tips.map((item, idx) => (
            <ListItem
              key={idx}
              sx={{
                borderLeft: `4px solid ${theme.palette.success.main}`,
                mb: 1,
                bgcolor: theme.palette.action.hover,
                borderRadius: 1,
              }}
            >
              <ListItemText primary={item.message} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default NotificationsTips;
