import { useEffect, useState } from 'react';
import { useNotify, useRedirect, useGetIdentity } from 'react-admin';
import { API_URL } from '../config/api';
import { UserIdentity } from '../types/user';
import { Box, Button, Card, CardContent, Grid, Stack, TextField, Typography } from '@mui/material';

type UpdateUserForm = {
    email: string;
    firstName: string;
    lastName: string;
    // phoneNumber: string;
    // timezone: string;
};

const defaultForm: UpdateUserForm = {
    email: '',
    firstName: '',
    lastName: '',
    // phoneNumber: '',
    // timezone: '',
};

const UpdateUserPage = () => {
    const notify = useNotify();
    const redirect = useRedirect();
    const { data } = useGetIdentity(); // ❌ removido <UserIdentity>
    const identity = data as UserIdentity | undefined; // ✅ tipa os dados
    const [form, setForm] = useState<UpdateUserForm>(defaultForm);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (identity) {
            setForm({
                email: identity.email ?? '',
                firstName: identity.firstName ?? '',
                lastName: identity.lastName ?? '',
                // phoneNumber: identity.phoneNumber ?? '',
                // timezone: identity.timezone ?? '',
            });
        }
    }, [identity]);

    const handleChange = (field: keyof UpdateUserForm) =>
        (event: React.ChangeEvent<HTMLInputElement>) =>
            setForm(prev => ({ ...prev, [field]: event.target.value }));

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch(`${API_URL}/me`, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error('Failed to update profile');
            notify('Profile updated successfully');
            redirect('/profile');
        } catch (error) {
            console.error('Error updating profile', error);
            notify('Failed to update profile');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" px={2}>
            <Card sx={{ maxWidth: 640, width: '100%' }}>
                <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Update Profile
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Keep your contact details up to date so we can personalize your experience.
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit}>

                            <TextField label="Email" name="email" type="email" value={form.email} onChange={handleChange('email')} required fullWidth />


                                    <TextField label="First Name" name="firstName" value={form.firstName} onChange={handleChange('firstName')} fullWidth />

                                    <TextField label="Last Name" name="lastName" value={form.lastName} onChange={handleChange('lastName')} fullWidth />

                            {/*<TextField label="Phone Number" name="phoneNumber" value={form.phoneNumber} onChange={handleChange('phoneNumber')} fullWidth />*/}
                            {/*<TextField label="Timezone" name="timezone" placeholder="e.g. America/New_York" value={form.timezone} onChange={handleChange('timezone')} fullWidth />*/}
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="flex-end">
                                <Button variant="outlined" color="secondary" onClick={() => redirect('/profile')} disabled={submitting}>Cancel</Button>
                                <Button type="submit" variant="contained" color="primary" disabled={submitting}>
                                    {submitting ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </Stack>
                        </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default UpdateUserPage;
