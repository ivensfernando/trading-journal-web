import { Box, Typography } from '@mui/material';

const MyFooter = () => (
    <Box textAlign="center" p={2} sx={{ borderTop: '1px solid #ccc' }}>
        <Typography variant="body2">© {new Date().getFullYear()} Trading Journal</Typography>
    </Box>
);

export default MyFooter;
