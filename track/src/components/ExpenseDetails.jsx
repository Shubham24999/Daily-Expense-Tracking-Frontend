import React, { useState } from 'react';
import {
  Box, Typography, Paper, CircularProgress, IconButton,
  Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

export default function ExpenseDetails({ expenseData, isLoading, onUpdate, onDelete }) {
  const [editExpense, setEditExpense] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [formState, setFormState] = useState({ spentAmount: '', spentDetails: '' });

  const handleEditOpen = (expense) => {
    setEditExpense(expense);
    setFormState({
      spentAmount: expense.spentAmount,
      spentDetails: expense.spentDetails,
    });
  };

  const handleEditClose = () => {
    setEditExpense(null);
    setFormState({ spentAmount: '', spentDetails: '' });
  };

  const handleEditSave = () => {
    if (
      formState.spentAmount !== editExpense.spentAmount ||
      formState.spentDetails !== editExpense.spentDetails
    ) {
      onUpdate(editExpense.id, formState); // Call update only if changed
    }
    handleEditClose();
  };

  const handleDelete = () => {
    onDelete(deleteConfirm.id);
    setDeleteConfirm(null);
  };

  if (isLoading) return <CircularProgress sx={{ mt: 4 }} />;

  if (!expenseData || expenseData.length === 0) {
    return (
      <Typography variant="h6" sx={{ mt: 4 }}>
        No expenses recorded yet.
      </Typography>
    );
  }

  return (
    <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6">Expense Details</Typography>

      {expenseData.map((expense) => (
        <Paper
          key={expense.id}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          <Box>
            <Typography variant="subtitle1">
              ₹ {expense.spentAmount.toFixed(2)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {expense.spentDetails}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {new Date(expense.expenseCreatedTimeEpoch * 1000).toLocaleString()}
            </Typography>
          </Box>

          <Box>
            <IconButton onClick={() => handleEditOpen(expense)} color="primary">
              <Edit />
            </IconButton>
            <IconButton onClick={() => setDeleteConfirm(expense)} color="error">
              <Delete />
            </IconButton>
          </Box>
        </Paper>
      ))}

      {/* Edit Dialog */}
      <Dialog open={!!editExpense} onClose={handleEditClose}>
        <DialogTitle>Edit Expense</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Spent Amount"
            type="number"
            fullWidth
            value={formState.spentAmount}
            onChange={(e) =>
              setFormState({ ...formState, spentAmount: parseFloat(e.target.value) || 0 })
            }
          />
          <TextField
            margin="dense"
            label="Spent Details"
            type="text"
            fullWidth
            value={formState.spentDetails}
            onChange={(e) => setFormState({ ...formState, spentDetails: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this expense: <strong>{deleteConfirm?.spentDetails}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm(null)}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}





// import { styled } from '@mui/material/styles';
// import {
//   Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, Paper, Typography, CircularProgress, Box
// } from '@mui/material';

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${TableCell.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${TableCell.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));

// export default function ExpenseDetails({ expenseData, isLoading }) {

//   var index = 1;

//   if (!expenseData || expenseData.length === 0) {
//     return (
//       <TableContainer component={Paper} sx={{ mt: 4, p: { xs: 1, sm: 2, md: 3 } }}>
//         <Typography variant="h6" sx={{ m: 2 }}>
//           Expense Details
//         </Typography>

//         {isLoading ? (
//           <CircularProgress sx={{ m: 2 }} />
//         ) : (
//           <Box sx={{ overflowX: 'auto' }}>
//             <Table sx={{ minWidth: 500 }} aria-label="customized table">
//               <TableHead>
//                 <TableRow>
//                   <StyledTableCell>ID</StyledTableCell>
//                   <StyledTableCell align="right">Amount (₹)</StyledTableCell>
//                   <StyledTableCell align="right">Details</StyledTableCell>
//                   <StyledTableCell align="right">Spent Time</StyledTableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 <StyledTableRow>
//                   <StyledTableCell colSpan={4} align="center">
//                     No expenses recorded yet.
//                   </StyledTableCell>
//                 </StyledTableRow>
//               </ TableBody>
//             </Table>
//           </Box>
//         )}
//       </TableContainer>
//     );
//   }

//   return (
//     <TableContainer component={Paper} sx={{ mt: 4, p: { xs: 1, sm: 2, md: 3 } }}>
//       <Typography variant="h6" sx={{ m: 2 }}>
//         Expense Details
//       </Typography>

//       {isLoading ? (
//         <CircularProgress sx={{ m: 2 }} />
//       ) : (
//         <Box sx={{ overflowX: 'auto' }}>
//           <Table sx={{ minWidth: 500 }} aria-label="customized table">
//             <TableHead>
//               <TableRow>
//                 <StyledTableCell>ID</StyledTableCell>
//                 <StyledTableCell align="right">Amount (₹)</StyledTableCell>
//                 <StyledTableCell align="right">Details</StyledTableCell>
//                 <StyledTableCell align="right">Spent Time</StyledTableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {expenseData.map((expense) => (
//                 <StyledTableRow key={expense.id}>
//                   <StyledTableCell component="th" scope="row">
//                     {index++}
//                   </StyledTableCell>
//                   <StyledTableCell align="right">
//                     {expense.spentAmount.toFixed(2)}
//                   </StyledTableCell>
//                   <StyledTableCell align="right">{expense.spentDetails}</StyledTableCell>
//                   <StyledTableCell align="right">
//                     {new Date(expense.expenseCreatedTimeEpoch * 1000).toLocaleString()}
//                   </StyledTableCell>
//                 </StyledTableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </Box>
//       )}
//     </TableContainer>
//   );
// }
