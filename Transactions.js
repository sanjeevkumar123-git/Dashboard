import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
} from "@mui/material";

const transactions = [
  {
    date: "2025-05-01",
    description: "Salary",
    type: "Credit",
    category: "Income",
    amount: 3000,
  },
  {
    date: "2025-05-03",
    description: "Groceries",
    type: "Debit",
    category: "Food",
    amount: 120,
  },
  {
    date: "2025-01-04",
    description: "Netflix",
    type: "Debit",
    category: "Entertainment",
    amount: 15,
  },
  {
    date: "2025-01-06",
    description: "Water Bill",
    type: "Debit",
    category: "Utilities",
    amount: 45,
  },
  {
    date: "2025-02-08",
    description: "Freelance",
    type: "Credit",
    category: "Income",
    amount: 500,
  },
  {
    date: "2025-03-09",
    description: "Electricity",
    type: "Debit",
    category: "Utilities",
    amount: 90,
  },
  {
    date: "2025-04-10",
    description: "Dining Out",
    type: "Debit",
    category: "Food",
    amount: 60,
  },
  {
    date: "2025-05-12",
    description: "Book Purchase",
    type: "Debit",
    category: "Education",
    amount: 30,
  },
];

const RecentTransactions = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch = t.description
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter = filter === "All" || t.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <Box mt={6}>
      <Typography variant="h6" mb={2}>
        Recent Transactions
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={2}
        mb={2}
      >
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TextField
          select
          label="Filter by Type"
          value={filter}
          size="small"
          onChange={(e) => setFilter(e.target.value)}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Credit">Credit</MenuItem>
          <MenuItem value="Debit">Debit</MenuItem>
        </TextField>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell
                  sx={{ color: row.type === "Credit" ? "green" : "red" }}
                >
                  {row.type}
                </TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell align="right">${row.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RecentTransactions;
