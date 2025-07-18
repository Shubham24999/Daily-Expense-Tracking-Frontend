import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import {
    Box,
    Typography,
    TextField,
    Button,
    Select,
    MenuItem,
    Paper,
    CircularProgress,
    Pagination,
    Stack,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const ExpenseReports = ({ userLoggedIn }) => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [totalSpent, setTotalSpent] = useState(0);

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    // --- local date formatter (avoid UTC shift) ---
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    // defaults
    const now = new Date();
    const defaultFromDate = formatDate(new Date(now.getFullYear(), now.getMonth(), 1));
    const defaultToDate = formatDate(now);

    // set defaults in UI on first mount
    useEffect(() => {
        if (!fromDate) setFromDate(defaultFromDate);
        if (!toDate) setToDate(defaultToDate);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // run once

    const fetchExpenses = () => {
        setLoading(true);

        const finalFromDate = fromDate || defaultFromDate;
        const finalToDate = toDate || defaultToDate;

        axios
            .get("http://localhost:8080/api/profile/expense/get", {
                headers: { Authorization: `Bearer ${token}` },
                params: { page, size, fromDate: finalFromDate, toDate: finalToDate },
            })
            .then((res) => {
                const data = res.data.data || {};
                setExpenses(data.expenses || []);
                setTotalPages(data.totalPages ?? 0);
                setTotalSpent(data.totalSpent ?? 0);
            })
            .catch((err) => {
                console.error("Error fetching expense reports:", err);
                toast.error("Failed to load expense reports.");
            })
            .finally(() => setLoading(false));
    };

    // fetch when page/size or login changes
    useEffect(() => {
        if (userLoggedIn) {
            fetchExpenses();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, size, userLoggedIn]);

    // ---------- Export handlers ----------
    const downloadFile = async (type /* 'excel' | 'pdf' */) => {
        const finalFromDate = fromDate || defaultFromDate;
        const finalToDate = toDate || defaultToDate;

        const base =
            type === "excel"
                ? "http://localhost:8080/api/export/excel"
                : "http://localhost:8080/api/export/pdf";

        try {
            const response = await axios.get(base, {
                headers: { Authorization: `Bearer ${token}` },
                params: { userId, fromDate: finalFromDate, toDate: finalToDate },
                responseType: "blob", // important!
            });

            const blob = new Blob([response.data], {
                type: type === "excel"
                    ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    : "application/pdf",
            });

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            const safeFrom = finalFromDate.replaceAll("-", "");
            const safeTo = finalToDate.replaceAll("-", "");
            link.href = url;
            link.download = `expenses-${safeFrom}_to_${safeTo}.${type === "excel" ? "xlsx" : "pdf"}`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

            toast.success(`Downloaded ${type.toUpperCase()} report.`);
        } catch (err) {
            console.error(`Error downloading ${type} report:`, err);
            toast.error(`Failed to download ${type.toUpperCase()} report.`);
        }
    };

    if (!userLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return (
        <Box sx={{ p: 3 }}>

            {/* Filters & Download Buttons */}
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    mb: 3,
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                {/* Left Side: Date Filters & Size */}
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 2,
                        alignItems: "center",
                    }}
                >
                    <TextField
                        label="From Date"
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="To Date"
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />

                    <Select
                        value={size}
                        onChange={(e) => {
                            setSize(e.target.value);
                            setPage(0);
                        }}
                        size="small"
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                    </Select>

                    <Button
                        variant="contained"
                        onClick={() => {
                            setPage(0);
                            fetchExpenses();
                        }}
                    >
                        Fetch Expenses
                    </Button>
                </Box>

                {/* Right Side: Download Buttons */}
                <Stack
                    direction={{ xs: "row", sm: "row", md: "row" }}
                    spacing={2}
                    sx={{
                        mt: { xs: 2, md: 0 }, // margin-top on small screens
                        flexWrap: "wrap",
                        justifyContent: { xs: "flex-start", md: "flex-end" },
                    }}
                >
                    <Button
                        variant="outlined"
                        onClick={() => downloadFile("excel")}
                    >
                        Download Excel
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => downloadFile("pdf")}
                    >
                        Download PDF
                    </Button>
                </Stack>
            </Box>


            {/* Total Spent */}
            <Paper sx={{ p: 2, mb: 3, textAlign: "center", bgcolor: "#f5f5f5" }}>
                <Typography variant="h6">Total Spent</Typography>
                <Typography variant="h4" color="primary">
                    ₹ {totalSpent.toFixed(2)}
                </Typography>
            </Paper>

            {/* Expenses List */}
            {loading ? (
                <CircularProgress />
            ) : (
                <>
                    {expenses.length > 0 ? (
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            {expenses.map((exp) => (
                                <Paper
                                    key={exp.expenseId ?? exp.id}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        p: 2,
                                        borderRadius: 2,
                                    }}
                                >
                                    <Box>
                                        <Typography variant="subtitle1">{exp.spentDetails}</Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {new Date(exp.expenseCreatedTime * 1000).toLocaleString()}
                                        </Typography>
                                    </Box>
                                    <Typography variant="h6" color="primary">
                                        ₹ {exp.spentAmount}
                                    </Typography>
                                </Paper>
                            ))}
                        </Box>
                    ) : (
                        <Typography>No expenses found</Typography>
                    )}
                </>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                    <Pagination
                        count={totalPages}
                        page={page + 1}
                        onChange={(e, val) => setPage(val - 1)}
                        color="primary"
                    />
                </Box>
            )}
        </Box>
    );
};

export default ExpenseReports;
