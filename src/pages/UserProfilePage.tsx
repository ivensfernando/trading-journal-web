import { Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import { useGetIdentity } from 'react-admin';
import { UserIdentity } from '../types/user';
import { Link as RouterLink } from 'react-router-dom';

const getDisplayName = (identity?: UserIdentity) => {
    if (!identity) {
        return '';
    }
    if (identity.fullName && identity.fullName.trim().length > 0) {
        return identity.fullName;
    }
    return [identity.firstName, identity.lastName].filter(Boolean).join(' ');
};

const UserProfilePage = () => {
    const { data: identity, isLoading } = useGetIdentity<UserIdentity>();

    const fullName = getDisplayName(identity);

    return (
        <Card>
            <CardContent>
                <Grid container spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                    <Grid item xs={12} sm={8}>
                        <Typography variant="h5">User Profile</Typography>
                        <Typography variant="body2" color="text.secondary">
                            Manage the information associated with your account.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm="auto">
                        <Button
                            variant="contained"
                            component={RouterLink}
                            to="/profile/edit"
                            disabled={isLoading}
                        >
                            Update Profile
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Full Name"
                            value={fullName}
                            InputProps={{ readOnly: true }}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Username"
                            value={identity?.username ?? ''}
                            InputProps={{ readOnly: true }}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Email"
                            value={identity?.email ?? ''}
                            InputProps={{ readOnly: true }}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Phone Number"
                            value={identity?.phoneNumber ?? ''}
                            InputProps={{ readOnly: true }}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Timezone"
                            value={identity?.timezone ?? ''}
                            InputProps={{ readOnly: true }}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="First Name"
                            value={identity?.firstName ?? ''}
                            InputProps={{ readOnly: true }}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Last Name"
                            value={identity?.lastName ?? ''}
                            InputProps={{ readOnly: true }}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default UserProfilePage;
