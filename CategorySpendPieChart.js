import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

const CategorySpendPieChart = ({
  data,
  selectedCategory,
  setSelectedCategory,
  darkMode = false,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const displayData = selectedCategory
    ? data.find((item) => item.name === selectedCategory)?.subcategories || []
    : data;

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
        {selectedCategory
          ? `${selectedCategory} Spending`
          : "Category-Wise Spending"}
      </Typography>

      <ResponsiveContainer width="100%" height={isSmallScreen ? 250 : 350}>
        <PieChart>
          <Pie
            data={displayData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={isSmallScreen ? 80 : 100}
            fill="#8884d8"
            label
            onClick={(data) => {
              if (!selectedCategory && data && data.name)
                setSelectedCategory(data.name);
            }}
            cursor={selectedCategory ? "default" : "pointer"}
          >
            {displayData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: darkMode ? "#333" : "#fff",
              borderColor: darkMode ? "#444" : "#ccc",
              borderRadius: 8,
            }}
          />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ paddingTop: 20 }}
          />
        </PieChart>
      </ResponsiveContainer>

      {selectedCategory && (
        <Box mt={3} textAlign="center">
          <Button
            variant="outlined"
            onClick={() => setSelectedCategory(null)}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              px: 3,
              py: 1,
            }}
          >
            Back to Categories
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CategorySpendPieChart;
