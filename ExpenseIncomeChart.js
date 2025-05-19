import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

const ExpenseIncomeChart = ({
  data,
  selectedMonth,
  setSelectedMonth,
  darkMode = false,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClick = (e) => {
    if (e && e.activeLabel) {
      setSelectedMonth(e.activeLabel);
    }
  };

  return (
    <Box
      mt={5}
      p={3}
      borderRadius={3}
      boxShadow={darkMode ? 1 : 3}
      sx={{
        backgroundColor: darkMode ? "#1e1e1e" : "#fff",
        color: darkMode ? theme.palette.grey[300] : "text.primary",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <Typography
        variant={isSmallScreen ? "h6" : "h5"}
        fontWeight="bold"
        gutterBottom
        textAlign="center"
      >
        Expense vs Income
      </Typography>

      <ResponsiveContainer width="100%" height={isSmallScreen ? 250 : 350}>
        <LineChart
          data={data}
          onClick={handleClick}
          margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={darkMode ? "#444" : "#ccc"}
          />
          <XAxis
            dataKey="month"
            stroke={darkMode ? "#aaa" : "#333"}
            tick={{ fontSize: 12 }}
          />
          <YAxis stroke={darkMode ? "#aaa" : "#333"} tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: darkMode ? "#333" : "#fff",
              borderColor: darkMode ? "#555" : "#ccc",
              borderRadius: 8,
              color: darkMode ? "#eee" : "#000",
              fontSize: 13,
            }}
          />
          <Legend wrapperStyle={{ paddingTop: 10 }} />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#82ca9d"
            strokeWidth={2}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#f44336"
            strokeWidth={2}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ExpenseIncomeChart;
