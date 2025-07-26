import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Snackbar, Alert, Box
} from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateBudgetForm = ({ open, onClose, onSuccess }) => {
  const userId = localStorage.getItem('userId');

  const defaultFormData = {
    userId: userId,
    budgetAmount: '',
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const amount = Number(formData.budgetAmount);

    if (isNaN(amount) || amount <= 0) {
      setErrorMessage("Please enter a valid budget amount.");
      setShowError(true);
      return;
    }

    const payload = {
      ...formData,
      budgetAmount: amount,
    };

    const token = localStorage.getItem('token');

    try {
      await axios.post('http://localhost:8080/api/expense/update/budget', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Budget updated successfully!");
      onSuccess();
      onClose();
      setFormData(defaultFormData);
    } catch (err) {
      console.error('Update error', err);
      toast.error("Failed to update budget.");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          p: 3,
          borderRadius: 4,
        },
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        Update Your Budget
      </DialogTitle>

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            name="budgetAmount"
            label="Enter Budget Amount"
            type="number"
            value={formData.budgetAmount}
            onChange={handleChange}
            fullWidth
            InputProps={{
              sx: { borderRadius: 2 },
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'space-between', px: 3 }}>
        <Button onClick={onClose} color="secondary" variant="outlined" sx={{ borderRadius: 2 }}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ borderRadius: 2 }}>
          Update
        </Button>
      </DialogActions>

      <Snackbar
        open={showError}
        autoHideDuration={3000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowError(false)}
          severity="error"
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default UpdateBudgetForm;
