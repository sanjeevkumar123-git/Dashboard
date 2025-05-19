import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  useTheme,
} from "@mui/material";

const budgets = [
  { category: "Food", budget: 500, spent: 350 },
  { category: "Entertainment", budget: 200, spent: 180 },
  { category: "Utilities", budget: 300, spent: 100 },
  { category: "Transport", budget: 150, spent: 90 },
  { category: "Education", budget: 250, spent: 120 },
];

const BudgetingAssistant = () => {
  const theme = useTheme();

  return (
    <Box mt={6}>
      <Typography variant="h6" gutterBottom>
        Monthly Budget Overview
      </Typography>
      <Box
        display="grid"
        gap={2}
        gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr" }}
      >
        {budgets.map((item, idx) => {
          const percentage = Math.min((item.spent / item.budget) * 100, 100);

          return (
            <Card
              key={idx}
              sx={{
                backgroundColor:
                  theme.palette.mode === "dark" ? "#1e1e1e" : "#f9f9f9",
              }}
            >
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  {item.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${item.spent} / ${item.budget}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={percentage}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    mt: 1,
                    backgroundColor:
                      theme.palette.mode === "dark" ? "#333" : "#ddd",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor:
                        percentage >= 90
                          ? "#d32f2f"
                          : percentage >= 70
                          ? "#fbc02d"
                          : "#2e7d32",
                    },
                  }}
                />
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default BudgetingAssistant;
