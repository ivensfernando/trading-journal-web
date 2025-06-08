import { AppBar, TitlePortal, useGetIdentity, Logout } from 'react-admin';
import { Box, Typography } from '@mui/material';

const MyAppBar = () => {
    const { data: identity } = useGetIdentity();
    return (
        <AppBar>
            <TitlePortal />
            <Box flex="1">
                <Typography variant="h6">Trading Journal</Typography>
            </Box>
            <Typography>{identity?.fullName}</Typography>
            <Logout />
        </AppBar>
    );
};

export default MyAppBar;
