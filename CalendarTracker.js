import React, { useState } from "react";
import {
  Box,
  Typography,
  Modal,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const CalendarTracker = ({ transactions }) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const today = dayjs();
  const [selectedDate, setSelectedDate] = useState(null);
  const [month, setMonth] = useState(today.month());
  const [year, setYear] = useState(today.year());

  const startOfMonth = dayjs(`${year}-${month + 1}-01`);
  const daysInMonth = startOfMonth.daysInMonth();

  const getTransactionsByDay = (day) => {
    const date = startOfMonth.date(day).format("YYYY-MM-DD");
    return (
      transactions?.filter(
        (txn) => dayjs(txn.date).format("YYYY-MM-DD") === date
      ) || []
    );
  };

  const handleOpen = (day) => setSelectedDate(day);
  const handleClose = () => setSelectedDate(null);

  const changeMonth = (offset) => {
    const newDate = dayjs(`${year}-${month + 1}-01`).add(offset, "month");
    setMonth(newDate.month());
    setYear(newDate.year());
  };

  const getColumns = () => {
    if (isXs) return 3;
    if (isSm) return 5;
    return 7;
  };

  return (
    <Box mt={5}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
        mb={3}
      >
        <IconButton onClick={() => changeMonth(-1)}>
          <ChevronLeft />
        </IconButton>

        <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
          <Select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            size="small"
            variant="outlined"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <MenuItem key={i} value={i}>
                {dayjs().month(i).format("MMMM")}
              </MenuItem>
            ))}
          </Select>

          <Select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            size="small"
            variant="outlined"
          >
            {Array.from({ length: 10 }, (_, i) => {
              const y = today.year() - 5 + i;
              return (
                <MenuItem key={y} value={y}>
                  {y}
                </MenuItem>
              );
            })}
          </Select>
        </Box>

        <IconButton onClick={() => changeMonth(1)}>
          <ChevronRight />
        </IconButton>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns={`repeat(${getColumns()}, 1fr)`}
        gap={2}
      >
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const dailyTransactions = getTransactionsByDay(day);
          const total = dailyTransactions.reduce(
            (sum, txn) => sum + txn.amount,
            0
          );
          const hasTransactions = total > 0;

          return (
            <Box
              key={day}
              onClick={() => handleOpen(day)}
              sx={{
                p: 2,
                textAlign: "center",
                borderRadius: 2,
                cursor: hasTransactions ? "pointer" : "default",
                transition: "all 0.3s ease",
                bgcolor: hasTransactions
                  ? theme.palette.mode === "dark"
                    ? "primary.dark"
                    : "#e3f2fd"
                  : theme.palette.background.paper,
                color: theme.palette.text.primary,
                boxShadow: hasTransactions ? 3 : 1,
                "&:hover": {
                  transform: hasTransactions ? "scale(1.02)" : "none",
                  bgcolor: hasTransactions
                    ? theme.palette.action.hover
                    : undefined,
                },
              }}
            >
              <Typography variant="subtitle2" fontWeight="bold">
                {day}
              </Typography>
              {hasTransactions && (
                <Typography variant="caption" color="text.secondary">
                  ${total}
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>

      <Modal open={!!selectedDate} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 400 },
            maxHeight: "80vh",
            bgcolor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            p: 4,
            borderRadius: 3,
            boxShadow: 24,
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" mb={2}>
            Transactions on{" "}
            {startOfMonth.date(selectedDate).format("MMMM D, YYYY")}
          </Typography>
          <List>
            {getTransactionsByDay(selectedDate).map((txn, index) => (
              <ListItem key={index} divider>
                <ListItemText
                  primary={txn.description}
                  secondary={`$${txn.amount} • ${txn.category}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Modal>
    </Box>
  );
};

export default CalendarTracker;
