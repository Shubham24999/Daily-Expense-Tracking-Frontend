import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Snackbar, Alert
} from '@mui/material';

import axios from 'axios';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ExpenseForm = ({ open, onClose, onSuccess }) => {

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  var userId = localStorage.getItem('userId');


  var expenseDetails = {
    userId: userId,
    spentDetails: '',
    spentAmount: '',
    date: Math.floor(Date.now() / 1000),
  };

  const [formData, setFormData] = useState(expenseDetails);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

  };

  const handleSubmit = () => {

    if (Number(formData.spentAmount) < 0) {
      toast.warn("Please Use Valid Number.");
      formData.spentAmount = '';

    }
    else if (!formData.spentAmount || Number(formData.spentAmount) === 0) {
      setErrorMessage("Please Add Spent Amount for Expense.");
      setShowError(true);
    } else {
      const payload = {
        ...formData,
        spentAmount: Number(formData.spentAmount),
      };

      axios.post('http://localhost:8080/api/expense/add', payload)
        .then(() => {
          onSuccess();
          onClose();
          setFormData(expenseDetails);
        })
        .catch((err) => console.error('Submit error', err));
    }
  };


  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"       // 'xs', 'sm', 'md', etc.
      fullWidth={true}   // limits width but doesn’t go full screen
      PaperProps={{
        sx: {
          p: 2,
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle>Add Expense</DialogTitle>
      <DialogContent>
        <TextField
          label="Spent Details"
          name="spentDetails"
          value={formData.spentDetails}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Spent Amount"
          name="spentAmount"
          type="number"
          value={formData.spentAmount}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
      </DialogActions>
      {/* to show alert message */}
      <Snackbar
        open={showError}
        autoHideDuration={2000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowError(false)} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>

    </Dialog>
  );
};

export default ExpenseForm;
