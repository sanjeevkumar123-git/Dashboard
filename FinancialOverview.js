import React from "react";
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Grid,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const FinancialOverview = ({ timeframe, setTimeframe }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const cardTitles = [
    "Total Balance",
    "Monthly Income",
    "Monthly Expenses",
    "Savings Ratio",
  ];

  const handleTimeframeChange = (event, newTimeframe) => {
    if (newTimeframe !== null) setTimeframe(newTimeframe);
  };

  return (
    <Box mt={5} width="100%">
      <Box
        display="flex"
        justifyContent={isSmallScreen ? "center" : "flex-start"}
        mb={3}
      >
        <ToggleButtonGroup
          value={timeframe}
          exclusive
          onChange={handleTimeframeChange}
          aria-label="timeframe toggle"
          size="small"
          sx={{
            borderRadius: 2,
            p: 0.5,
          }}
        >
          {["Monthly", "Quarterly", "YTD"].map((label) => (
            <ToggleButton
              key={label}
              value={label}
              sx={{
                fontWeight: 600,
                textTransform: "none",
                "&.Mui-selected": {
                  bgcolor: theme.palette.primary.main,
                  color: "#fff",
                },
              }}
            >
              {label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      <Grid container spacing={3}>
        {cardTitles.map((title, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              sx={{
                p: 3,
                height: "100%",
                borderRadius: 3,
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 6,
                },
              }}
            >
              <Typography variant="subtitle2">{title}</Typography>
              <Typography variant="h6" fontWeight="bold" mt={0.5}>
                {title === "Savings Ratio"
                  ? `${Math.floor(Math.random() * 50) + 10}%`
                  : `$${Math.floor(Math.random() * 5000 + 1000)}`}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FinancialOverview;
