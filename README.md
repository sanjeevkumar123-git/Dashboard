Description:

A responsive personal finance dashboard built using React.js, Material UI, and Recharts, visualizing income, expenses, transactions and savings in a user-friendly and interactive layout.

Features:

-> Responsive UI for mobile and desktop.
-> Expense vs Income line chart with interactive month selection.
-> Category-wise spending pie chart with drill-down to subcategories.
-> Financial overview cards with timeframe toggle (Monthly, Quarterly, YTD).
-> User greeting with savings goal progress.

Setup & Dependencies Installed:

Installed React version: 19.1.0
Installed MUI version: 7.1.0
Installed dayjs version: 1.11.13
Installed axios version: 1.9.0
Installed framer-motion: 12.12.1
Installed recharts version: 2.15.3

          Task                             Estimated Time

Project setup & structure 0.5 hr  
Header & savings progress bar 0.5 hr  
Financial overview cards 1 hr  
Timeframe toggle & logic 0.5 hr  
Expense vs Income line chart 1 hr  
Category pie chart + drill-down 1 hr
Transactions 0.5 hr  
Notifications 0.5 hr
Calendar Tracker 1 hr
Budgetiong Assistant 0.5 hr  
Responsiveness & testing 1.5 hr  
Polish, cleanup, README 0.5 hr

         Total                                 9 hours

Assumptions:

No real API integration; data is mocked for demo purposes.
Dark mode support is optional and partially scaffolded.
Savings goal and user name are hardcoded for simplicity.
Chart interactions (click to drill-down/select) are handled via local state only.

Decisions:

Material UI (MUI) was used for rapid styling, grid layout, and responsiveness.
Recharts was chosen for simplicity and built-in responsive support.
Mobile-first approach: All layouts adapt smoothly to small screens.
Component modularity: All major UI blocks (Header, Charts, Overview) are componentized for reuse and maintenance.
State lifting: Shared state like selectedMonth, selectedCategory, and timeframe is maintained in the parent to allow inter-component communication.

Technologies Used:

React (18+)
Material UI (v5)
Recharts
JavaScript (ES6+)
CSS-in-JS (via MUI sx prop)

Extensions:

Prettier for code formatter.
