import React from "react";
import {
  Box,
  Typography,
  Avatar,
  LinearProgress,
  useTheme,
  Paper,
  useMediaQuery,
  Fade,
} from "@mui/material";

const Header = ({ userName = "Sanju", savingsGoal = 70 }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Fade in timeout={500}>
      <Paper
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: 3,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "center" },
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box>
          <Typography variant={isMobile ? "h6" : "h5"} fontWeight="bold">
            Hello, {userName} 👋
          </Typography>
          <Typography variant="body2">My Dashboard</Typography>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={1}
          mt={{ xs: 2, md: 0 }}
        >
          <Avatar
            alt={`${userName}'s avatar`}
            src="https://i.pravatar.cc/100"
            sx={{
              width: 64,
              height: 64,
            }}
          />
          <Box width={100}>
            <Typography variant="caption" fontWeight={500} mb={0.5}>
              Savings Goal
            </Typography>
            <LinearProgress
              variant="determinate"
              value={savingsGoal}
              sx={{
                height: 10,
                borderRadius: 5,
              }}
            />
          </Box>
        </Box>
      </Paper>
    </Fade>
  );
};

export default Header;
