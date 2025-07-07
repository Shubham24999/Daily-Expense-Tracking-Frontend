import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { toast } from 'react-toastify';

const Profile = ({ userLoggedIn }) => {
    const [profileData, setProfileData] = useState(null);
    const [formData, setFormData] = useState({ name: '', phoneNumber: '' });
    const [loading, setLoading] = useState(false);

    // Fetch profile on load
    useEffect(() => {
        if (!userLoggedIn) return;

        const fetchProfile = async () => {
            try {
                const res = await fetch('http://localhost:8080/api/profile/', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    },
                });
                const result = await res.json();
                if (result.status === 'OK') {
                    setProfileData(result.data);
                    setFormData({
                        name: result.data.name || '',
                        phoneNumber: result.data.phoneNumber || '',
                    });
                } else {
                    toast.warn('Failed to load profile: ' + result.message);
                }
            } catch (err) {
                console.error(err);
                toast.error('Error loading profile');
            }
        };

        fetchProfile();
    }, [userLoggedIn]);

    // Handle update
    const handleUpdate = async (e) => {
        e.preventDefault();

        // Phone number validation: must be 10 digits
        const phoneStr = formData.phoneNumber?.toString().trim();
        if (phoneStr && !/^\d{10}$/.test(phoneStr)) {
            toast.warn("Phone number must be exactly 10 digits.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('http://localhost:8080/api/profile/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
                body: JSON.stringify(formData),
            });

            const result = await res.json();
            if (result.status === 'OK') {
                toast.success('Profile updated successfully');
                setProfileData(result.data);
            } else {
                toast.warn(result.message || 'No changes made');
            }
        } catch (err) {
            toast.error('Update failed');
        } finally {
            setLoading(false);
        }
    };


    if (!userLoggedIn) return <Navigate to="/" replace />;

    return (
        <Paper elevation={3} sx={{ p: 3, maxWidth: 500, mx: 'auto', mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                User Details
            </Typography>

            {profileData ? (
                <form onSubmit={handleUpdate}>
                    <TextField
                        label="Name"
                        fullWidth
                        margin="normal"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />

                    <TextField
                        label="Phone Number"
                        fullWidth
                        margin="normal"
                        type="tel"
                        inputProps={{
                            maxLength: 10,
                            pattern: "[0-9]{10}",
                            inputMode: "numeric",
                        }}
                        value={formData.phoneNumber}
                        onChange={(e) => {
                            const val = e.target.value;
                            if (/^\d*$/.test(val)) {
                                setFormData({ ...formData, phoneNumber: val });
                            }
                        }}
                        helperText="Enter 10-digit mobile number"
                        placeholder="e.g. 9876543210"
                    />


                    <Box mt={2}>
                        <Button type="submit" variant="contained" disabled={loading}>
                            {loading ? 'Updating...' : 'Update Profile'}
                        </Button>
                    </Box>
                </form>
            ) : (
                <Typography>Loading profile...</Typography>
            )}
        </Paper>
    );
};

export default Profile;

