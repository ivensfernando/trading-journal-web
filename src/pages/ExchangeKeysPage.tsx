import { Card, CardContent, TextField, Button } from '@mui/material';

const ExchangeKeysPage = () => (
    <Card>
        <CardContent>
            <h2>Save Exchange API Keys</h2>
            <TextField label="API Key" fullWidth margin="normal" />
            <TextField label="Secret Key" fullWidth margin="normal" />
            <Button variant="contained" color="primary">Save</Button>
        </CardContent>
    </Card>
);

export default ExchangeKeysPage;
