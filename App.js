import React, { useState, useMemo } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  CssBaseline,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useTheme,
  useMediaQuery,
  Switch,
  Tooltip,
} from "@mui/material";
import {
  Menu as MenuIcon,
  AccountCircle as AccountCircleIcon,
  BarChart as BarChartIcon,
  ReceiptLong as ReceiptLongIcon,
  CalendarToday as CalendarTodayIcon,
  Notifications as NotificationsIcon,
  Savings as SavingsIcon,
} from "@mui/icons-material";
import Header from "./Header";
import FinancialOverview from "./FinancialOverview";
import ExpenseIncomeChart from "./ExpenseIncomeChart";
import CategorySpendPieChart from "./CategorySpendPieChart";
import RecentTransactions from "./Transactions";
import CalendarTracker from "./CalendarTracker";
import NotificationsTips from "./NotificationTips";
import BudgetingAssistant from "./BudgetingAssistant";

const drawerWidth = 260;

const financialData = {
  Monthly: {
    totalBalance: 12000,
    monthlyIncome: 5000,
    monthlyExpenses: 3200,
    savingsRatio: 36,
  },
  Quarterly: {
    totalBalance: 35000,
    monthlyIncome: 4800,
    monthlyExpenses: 3000,
    savingsRatio: 38,
  },
  YTD: {
    totalBalance: 90000,
    monthlyIncome: 5100,
    monthlyExpenses: 3100,
    savingsRatio: 40,
  },
};

const expenseIncomeData = [
  { month: "Jan", income: 4000, expense: 2400 },
  { month: "Feb", income: 3000, expense: 1398 },
  { month: "Mar", income: 5000, expense: 2800 },
  { month: "Apr", income: 4000, expense: 2900 },
];

const categorySpendingData = {
  Jan: [
    {
      name: "Food",
      value: 400,
      subcategories: [
        { name: "Groceries", value: 250 },
        { name: "Dining Out", value: 150 },
      ],
    },
    {
      name: "Utilities",
      value: 300,
      subcategories: [
        { name: "Electricity", value: 180 },
        { name: "Water", value: 120 },
      ],
    },
    {
      name: "Entertainment",
      value: 200,
      subcategories: [
        { name: "Streaming", value: 100 },
        { name: "Games", value: 100 },
      ],
    },
  ],
  Feb: [
    {
      name: "Food",
      value: 350,
      subcategories: [
        { name: "Groceries", value: 200 },
        { name: "Dining Out", value: 150 },
      ],
    },
    {
      name: "Utilities",
      value: 280,
      subcategories: [
        { name: "Electricity", value: 150 },
        { name: "Water", value: 130 },
      ],
    },
    {
      name: "Entertainment",
      value: 150,
      subcategories: [
        { name: "Streaming", value: 80 },
        { name: "Games", value: 70 },
      ],
    },
  ],
  Mar: [
    {
      name: "Food",
      value: 420,
      subcategories: [
        { name: "Groceries", value: 260 },
        { name: "Dining Out", value: 160 },
      ],
    },
    {
      name: "Utilities",
      value: 320,
      subcategories: [
        { name: "Electricity", value: 190 },
        { name: "Water", value: 130 },
      ],
    },
    {
      name: "Entertainment",
      value: 210,
      subcategories: [
        { name: "Streaming", value: 110 },
        { name: "Games", value: 100 },
      ],
    },
  ],
  Apr: [
    {
      name: "Food",
      value: 380,
      subcategories: [
        { name: "Groceries", value: 230 },
        { name: "Dining Out", value: 150 },
      ],
    },
    {
      name: "Utilities",
      value: 310,
      subcategories: [
        { name: "Electricity", value: 170 },
        { name: "Water", value: 140 },
      ],
    },
    {
      name: "Entertainment",
      value: 190,
      subcategories: [
        { name: "Streaming", value: 90 },
        { name: "Games", value: 100 },
      ],
    },
  ],
};

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

export default function App() {
  const [timeframe, setTimeframe] = useState("Monthly");
  const [selectedMonth, setSelectedMonth] = useState(
    expenseIncomeData[0].month
  );
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [view, setView] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const pieData = categorySpendingData[selectedMonth] || [];

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const menuItems = [
    { text: "Profile", icon: <AccountCircleIcon /> },
    { text: "Expenses", icon: <BarChartIcon /> },
    { text: "Transactions", icon: <ReceiptLongIcon /> },
    { text: "Calendar", icon: <CalendarTodayIcon /> },
    { text: "Notifications & Tips", icon: <NotificationsIcon /> },
    { text: "Budget Assistant", icon: <SavingsIcon /> },
  ];

  const drawer = useMemo(() => (
    <Box
      sx={{
        width: drawerWidth,
        height: "100%",
        bgcolor: darkMode ? "#1f1f1f" : "#fff",
        color: darkMode ? "#eee" : "#333",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          p: 3,
          fontWeight: "700",
          color: theme.palette.primary.main,
          borderBottom: `1px solid ${
            darkMode ? "#333" : theme.palette.divider
          }`,
        }}
      >
        Dashboard
      </Typography>
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map(({ text, icon }) => (
          <ListItem
            button
            key={text}
            selected={view === text.toLowerCase()}
            onClick={() => {
              setView(text.toLowerCase());
              if (isMobile) setMobileOpen(false);
            }}
            sx={{
              borderRadius: 1.5,
              mx: 1,
              mb: 1,
              color:
                view === text.toLowerCase()
                  ? theme.palette.primary.main
                  : "inherit",
              fontWeight: view === text.toLowerCase() ? "700" : "400",
              "&.Mui-selected": {
                bgcolor: theme.palette.action.selected,
                boxShadow: `0 2px 10px ${theme.palette.primary.main}55`,
              },
              "&:hover": { bgcolor: theme.palette.action.hover },
            }}
          >
            <Tooltip title={text} placement="right" arrow>
              <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                {icon}
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Box
        sx={{
          p: 2,
          borderTop: `1px solid ${darkMode ? "#333" : theme.palette.divider}`,
        }}
      >
        <Typography variant="caption" align="center" color="textSecondary">
          &copy; 2025 Finb Inc.
        </Typography>
      </Box>
    </Box>
  ));

  const ContentContainer = ({ children, maxWidth = "lg" }) => (
    <Container
      maxWidth={maxWidth}
      sx={{
        mb: 6,
        p: { xs: 2, md: 4 },
        borderRadius: 2,
        bgcolor: darkMode ? "#1e1e1e" : "#fff",
        boxShadow: darkMode ? "0 0 12px #0008" : "0 0 12px rgb(0 0 0 / 0.1)",
        transition: "background-color 0.3s ease",
      }}
    >
      {children}
    </Container>
  );

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={4}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: darkMode ? "#121212" : theme.palette.primary.main,
          transition: "background-color 0.3s ease",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ fontWeight: "700" }}>
            Dashboard
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body2">
              {darkMode ? "Dark" : "Light"} Mode
            </Typography>
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              color="default"
              aria-label="Toggle dark mode"
            />
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              bgcolor: darkMode ? "#1f1f1f" : "#fff",
              color: darkMode ? "#eee" : "#333",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              bgcolor: darkMode ? "#1f1f1f" : "#fff",
              color: darkMode ? "#eee" : "#333",
              boxShadow: darkMode ? "none" : "2px 0 8px rgb(0 0 0 / 0.05)",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 },
          width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
          mt: 9,
          bgcolor: darkMode ? "#121212" : theme.palette.background.default,
          color: darkMode ? "#eee" : theme.palette.text.primary,
          ml: { md: `${drawerWidth}px` },
        }}
      >
        {(view === "profile" || view === "home") && (
          <ContentContainer>
            <Header
              userName="Sanju"
              savingsGoal={financialData[timeframe].savingsRatio}
              darkMode={darkMode}
            />
            <FinancialOverview
              timeframe={timeframe}
              setTimeframe={setTimeframe}
              data={financialData}
            />
          </ContentContainer>
        )}

        {view === "expenses" && (
          <ContentContainer>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 4,
              }}
            >
              <Box flex={1}>
                <ExpenseIncomeChart
                  data={expenseIncomeData}
                  selectedMonth={selectedMonth}
                  setSelectedMonth={setSelectedMonth}
                />
              </Box>
              <Box flex={1}>
                <CategorySpendPieChart
                  data={pieData}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              </Box>
            </Box>
          </ContentContainer>
        )}

        {view === "transactions" && (
          <ContentContainer>
            <RecentTransactions />
          </ContentContainer>
        )}

        {view === "calendar" && (
          <ContentContainer>
            <CalendarTracker transactions={transactions} />
          </ContentContainer>
        )}

        {view === "notifications & tips" && (
          <ContentContainer maxWidth="md">
            <NotificationsTips />
          </ContentContainer>
        )}

        {view === "budget assistant" && (
          <ContentContainer maxWidth="md">
            <BudgetingAssistant />
          </ContentContainer>
        )}
      </Box>
    </>
  );
}
