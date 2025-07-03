import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Alert, Snackbar
} from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateBudgetForm = ({ open, onClose, onSuccess }) => {
  var userId = localStorage.getItem('userId');
  var userDetails = {
    userId: userId,
    // spentDetails: '',
    budgetAmount: '',
    // spentAmount: '',
    // remainingAmount: '',
    // date: Math.floor(Date.now() / 1000),
  };

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState(userDetails);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = ['budgetAmount', 'spentAmount', 'remainingAmount'].includes(name)
      ? value
      : value;

    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue
    }));
  };

  const handleSubmit = () => {

    if (Number(formData.budgetAmount) < 0) {
      toast.warn("Please Use Valid Number.");
      formData.spentAmount = '';

    } else if (formData.budgetAmount === 0) {
      setErrorMessage("Please add Budget Amount to Update");
      setShowError(true);
    } else {
      const payload = {
        ...formData,
        budgetAmount: Number(formData.budgetAmount),
      };
      axios.post('http://localhost:8080/api/expense/update/budget', payload)
        .then(() => {
          onSuccess();
          onClose();

          setFormData(userDetails);
        })
        .catch((err) => console.error('Update error', err));
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          p: 2,
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle>Update Budget</DialogTitle>
      <DialogContent>
        <TextField
          label="Budget Amount"
          name="budgetAmount"
          type="number"
          value={formData.budgetAmount}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">Update</Button>
      </DialogActions>
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

export default UpdateBudgetForm;
