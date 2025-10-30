import { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Checkbox,
    CircularProgress,
    FormControlLabel,
    InputAdornment,
    TextField,
    Typography,
    IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useGetList } from 'react-admin';

type FieldName = 'apiKey' | 'apiSecret' | 'apiPassphrase';

type VisibilityState = Record<string, Partial<Record<FieldName, boolean>>>;

const ExchangeKeysPage = () => {
    const { data: exchanges, isLoading: exchangesLoading } = useGetList('lookup/exchanges');
    const [fieldVisibility, setFieldVisibility] = useState<VisibilityState>({});

    const toggleVisibility = (exchangeKey: string, field: FieldName) => {
        setFieldVisibility((prev) => ({
            ...prev,
            [exchangeKey]: {
                ...prev[exchangeKey],
                [field]: !prev[exchangeKey]?.[field]
            }
        }));
    };

    const exchangeList = exchanges ?? [];

    if (exchangesLoading) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (!exchangeList.length) {
        return (
            <Box mt={4}>
                <Typography align="center">No exchanges available.</Typography>
            </Box>
        );
    }

    const renderTextField = (exchangeKey: string, field: FieldName, label: string) => {
        const isVisible = fieldVisibility[exchangeKey]?.[field] ?? false;

        return (
            <TextField
                label={label}
                fullWidth
                margin="normal"
                type={isVisible ? 'text' : 'password'}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                edge="end"
                                onClick={() => toggleVisibility(exchangeKey, field)}
                                aria-label={`Toggle visibility for ${label}`}
                            >
                                {isVisible ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
        );
    };

    return (
        <Box
            display="grid"
            gap={2}
            gridTemplateColumns={{ xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' }}
        >
            {exchangeList.map((exchange: any, index: number) => {
                const exchangeKey = String(exchange.id ?? exchange.name ?? index);
                return (
                    <Box key={exchangeKey}>
                        <Card>
                            <CardHeader title={exchange?.name || 'Exchange'} />
                            <CardContent>
                                <FormControlLabel
                                    control={<Checkbox color="primary" />}
                                    label="Show in trade"
                                />
                                {renderTextField(exchangeKey, 'apiKey', 'API Key')}
                                {renderTextField(exchangeKey, 'apiSecret', 'API Secret')}
                                {renderTextField(exchangeKey, 'apiPassphrase', 'API Passphrase')}
                            </CardContent>
                        </Card>
                    </Box>
                );
            })}
        </Box>
    );
};

export default ExchangeKeysPage;
