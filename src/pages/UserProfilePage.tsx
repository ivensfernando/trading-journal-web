import { Card, CardContent, TextField } from '@mui/material';

const UserProfilePage = () => (
    <Card>
        <CardContent>
            <h2>User Profile</h2>
            {/* Replace with actual user data */}
            <TextField label="Username" defaultValue="john_doe" fullWidth margin="normal" />
            <TextField label="Email" defaultValue="john@example.com" fullWidth margin="normal" />
        </CardContent>
    </Card>
);

export default UserProfilePage;
