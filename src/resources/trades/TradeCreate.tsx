import {
    Create,
    SimpleForm,
    TextInput,
    NumberInput,
    DateInput,
    required,
    useNotify,
    useRedirect,
    useCreate,
    SelectInput,
    BooleanInput
} from 'react-admin';
import { useFormContext } from 'react-hook-form';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';

const ToggleButton = ({ label, value, onChange, options }: {
    label: string;
    value: string;
    onChange: (val: string) => void;
    options: string[];
}) => (
    <Box sx={{ mb: 1 }}>
        <Typography variant="body2" sx={{ mb: 0.5 }}>{label}</Typography>
        <Button
            variant="contained"
            onClick={() => {
                const currentIndex = options.indexOf(value);
                const nextValue = options[(currentIndex + 1) % options.length];
                onChange(nextValue);
            }}
            size="small"
        >
            {value.toUpperCase()}
        </Button>
    </Box>
);

const OrderTypeTabs = ({ value, onChange }: {
    value: string;
    onChange: (val: string) => void;
}) => {
    const options = ['Limit', 'Market', 'Stop Limit'];

    return (
        <Box>
            <Typography variant="body2" sx={{ mb: 0.5 }}>Order Type</Typography>
            <Box display="flex" gap={1} position="relative">
                {options.map((option) => (
                    <Button
                        key={option}
                        onClick={() => onChange(option)}
                        sx={{
                            minWidth: 72,
                            height: 32,
                            px: 1,
                            bgcolor: value === option ? 'primary.main' : 'grey.800',
                            color: value === option ? 'common.white' : 'grey.300',
                            '&:hover': { bgcolor: 'primary.dark' }
                        }}
                        size="small"
                    >
                        {option}
                    </Button>
                ))}
            </Box>
            <Box
                sx={{
                    height: 2,
                    width: 72,
                    bgcolor: 'warning.main',
                    mt: '-2px',
                    ml: `${options.indexOf(value) * 80}px`,
                    transition: 'margin-left 0.2s ease'
                }}
            />
        </Box>
    );
};

const OrderFields = ({ type, size, setSize }: { type: string; size: number; setSize: (val: number) => void }) => {
    const handleSliderChange = (_event: Event, newValue: number | number[]) => {
        setSize(typeof newValue === 'number' ? newValue : newValue[0]);
    };

    return (
        <>
            {type === 'Stop Limit' && <TextInput source="stopPrice" fullWidth label="Stop Price" />}
            {type === 'Limit' && <NumberInput source="price" fullWidth label="Price" />}
            <Box sx={{ mb: 2 }}>
                <Typography variant="body2">Size</Typography>
                <Slider
                    value={size}
                    onChange={handleSliderChange}
                    aria-labelledby="input-slider"
                    valueLabelDisplay="auto"
                    valueLabelFormat={(val) => `${val}%`}
                    min={0}
                    max={100}
                />
            </Box>
            <TextInput source="size" fullWidth label="" defaultValue={size.toString()} sx={{ display: 'none' }} />
        </>
    );
};

const BinanceTradePanel = () => {
    const theme = useTheme();
    const [marginMode, setMarginMode] = useState('Cross');
    const [assetMode, setAssetMode] = useState('Single-Asset');
    const [orderType, setOrderType] = useState('Stop Limit');
    const [size, setSize] = useState(0);
    const [reduceOnly, setReduceOnly] = useState(false);
    const [takeProfitEnabled, setTakeProfitEnabled] = useState(false);

    const handleReduceOnlyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReduceOnly(event.target.checked);
        if (event.target.checked) setTakeProfitEnabled(false);
    };

    const handleTakeProfitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTakeProfitEnabled(event.target.checked);
        if (event.target.checked) setReduceOnly(false);
    };

    return (
        <Box sx={{ bgcolor: theme.palette.background.paper, p: 1.5, borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" gutterBottom>Binance Trade</Typography>

            <Box display="flex" gap={2} mb={1.5} alignItems="flex-end">
                <ToggleButton label="Margin Mode" value={marginMode} onChange={setMarginMode} options={["Cross", "Isolated"]} />
                <Box>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>Leverage</Typography>
                    <NumberInput source="leverage" label={false} min={1} sx={{ width: '64px' }} />
                </Box>
                <ToggleButton label="Asset Mode" value={assetMode} onChange={setAssetMode} options={["Single-Asset", "Multi-Assets"]} />
            </Box>

            <Box mb={1.5}>
                <OrderTypeTabs value={orderType} onChange={setOrderType} />
            </Box>

            <OrderFields type={orderType} size={size} setSize={setSize} />

            <Box display="flex" alignItems="center" gap={2} mt={1.5}>
                <BooleanInput source="takeProfitEnabled" label="TP/SL" onChange={handleTakeProfitChange} checked={takeProfitEnabled} />
                <BooleanInput source="reduceOnly" label="Reduce-Only" onChange={handleReduceOnlyChange} checked={reduceOnly} />
            </Box>

            {takeProfitEnabled && (
                <>
                    <TextInput source="takeProfit" fullWidth label="Take Profit" />
                    <TextInput source="stopLoss" fullWidth label="Stop Loss" />
                </>
            )}

            <Box display="flex" gap={2} mt={2}>
                <Button variant="contained" color="success" fullWidth>Buy/Long</Button>
                <Button variant="contained" color="error" fullWidth>Sell/Short</Button>
            </Box>
        </Box>
    );
};

const SpotKucoinForm = () => (
    <Box>
        <Typography variant="body2" sx={{ mb: 1 }}>Available: 27.59397553 USDT</Typography>
        <NumberInput source="price" fullWidth label="Price" />
        <NumberInput source="amount" fullWidth label="Amount" />
        <Box display="flex" justifyContent="space-between" gap={1} my={2}>
            {[25, 50, 75, 100].map(percent => (
                <Button key={percent} size="small" variant="outlined" sx={{ flex: 1 }}>
                    {percent}%
                </Button>
            ))}
        </Box>
        <NumberInput source="volume" fullWidth label="Volume" />
        <Typography variant="body2" sx={{ mt: 1 }}>Advanced:--</Typography>
    </Box>
);


const CrossMarginKucoinForm = () => (
    <Box>
        <Typography variant="body2" sx={{ mb: 1 }}>Available: 78.90587272 USDT</Typography>
        <SelectInput source="borrowMode" label="Borrow Mode" choices={[
            { id: 'Standard', name: 'Standard' },
            { id: 'Auto-Borrow', name: 'Auto-Borrow' },
            { id: 'Auto-Repay', name: 'Auto-Repay' },
            { id: 'Auto-Borrow and Repay', name: 'Auto-Borrow and Repay' },
        ]} fullWidth />
        <NumberInput source="price" fullWidth label="Price" />
        <NumberInput source="amount" fullWidth label="Amount" />
        <Box display="flex" justifyContent="space-between" gap={1} my={2}>
            {[25, 50, 75, 100].map(percent => (
                <Button key={percent} size="small" variant="outlined" sx={{ flex: 1 }}>
                    {percent}%
                </Button>
            ))}
        </Box>
        <NumberInput source="volume" fullWidth label="Volume" />
        <Typography variant="body2" sx={{ mt: 1 }}>Advanced:--</Typography>
    </Box>
);

const FuturesKucoinForm = () => {
    return (
        <Box>
            <Typography variant="body2" sx={{ mb: 1 }}>Assets: 70.32 USDT</Typography>

            <Box display="flex" gap={1} mb={2}>
                <SelectInput source="marginType" label="Margin Type" choices={[
                    { id: 'Isolated', name: 'Isolated' },
                    { id: 'Cross', name: 'Cross' }
                ]} sx={{ flex: 1 }} />

                <NumberInput source="leverage" label="Leverage" min={1} sx={{ flex: 1 }} />
            </Box>

            <NumberInput source="price" fullWidth label="Price" />
            <NumberInput source="amount" fullWidth label="Amount" />

            <Box display="flex" justifyContent="space-between" gap={1} my={2}>
                {[25, 50, 75, 100].map(percent => (
                    <Button key={percent} size="small" variant="outlined" sx={{ flex: 1 }}>
                        {percent}%
                    </Button>
                ))}
            </Box>

            <Typography variant="body2" sx={{ mt: 1, mb: 0.5 }}>Assets</Typography>
            <Box display="flex" justifyContent="space-between">
                <Typography variant="body2">Max Long 0.016 BTC</Typography>
                <Typography variant="body2">Max Short 0.016 BTC</Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={2} my={2}>
                <BooleanInput source="takeProfitEnabled" label="TP/SL" />
                <BooleanInput source="reduceOnly" label="Reduce Only" />
            </Box>

            <Box display="flex" gap={2} mt={2}>
                <Button variant="contained" color="success" fullWidth>Buy/Long</Button>
                <Button variant="contained" color="error" fullWidth>Sell/Short</Button>
            </Box>

            <Box display="flex" justifyContent="space-between" mt={2}>
                <Box>
                    <Typography variant="body2">Margin 0.00 USDT</Typography>
                    <Typography variant="body2">Est. Liquidation Price --</Typography>
                </Box>
                <Box>
                    <Typography variant="body2">Margin 0.00 USDT</Typography>
                    <Typography variant="body2">Est. Liquidation Price --</Typography>
                </Box>
            </Box>
        </Box>
    );
};


const KucoinTradePanel = () => {
    const theme = useTheme();
    const [contractType, setContractType] = useState('Spot');
    const [side, setSide] = useState('Buy');
    const contractForms: Record<string, React.ReactElement> = {
        'Spot': <SpotKucoinForm />,
        'Cross Margin': <CrossMarginKucoinForm />,
        'Futures': <FuturesKucoinForm />
    };

    return (
        <Box display="flex" flexDirection="column" gap={2} sx={{ bgcolor: theme.palette.background.paper, p: 1.5, borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" gutterBottom>Kucoin Trade</Typography>
            <Box>
                <Typography variant="body2" sx={{ mb: 0.5 }}>Contract Type</Typography>
                <Box display="flex" gap={1}>
                    {['Spot', 'Cross Margin', 'Futures'].map(opt => (
                        <Button
                            key={opt}
                            variant={contractType === opt ? 'contained' : 'outlined'}
                            onClick={() => setContractType(opt)}
                        >
                            {opt.toUpperCase()}
                        </Button>
                    ))}
                </Box>
            </Box>
            <Box>
                <Typography variant="body2" sx={{ mb: 0.5 }}>Side</Typography>
                <Box display="flex" gap={1}>
                    <Button
                        variant={side === 'Buy' ? 'contained' : 'outlined'}
                        color="success"
                        onClick={() => setSide('Buy')}
                    >
                        BUY
                    </Button>
                    <Button
                        variant={side === 'Sell' ? 'contained' : 'outlined'}
                        color="error"
                        onClick={() => setSide('Sell')}
                    >
                        SELL
                    </Button>
                </Box>
            </Box>
            {contractForms[contractType]}
        </Box>
    );
};

const TopFormPanel = () => (
    <Box display="flex" gap={2} mb={2}>
        <TextInput source="symbol" label="Symbol" validate={required()} fullWidth />
        <SelectInput
            source="exchange"
            label="Exchange"
            choices={[
                { id: 'Binance', name: 'Binance' },
                { id: 'Kucoin', name: 'Kucoin' },
                { id: 'Mexc', name: 'Mexc' }
            ]}
            defaultValue="Binance"
            fullWidth
        />
        <DateInput source="tradeDate" label="Trade Date" fullWidth />
    </Box>
);

const TradeDetailsPanel = () => (
    <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 2, boxShadow: 1 }}>
        <Typography variant="h6" gutterBottom>Trade Details</Typography>
        <NumberInput source="fee" fullWidth label="Fee" />
        <NumberInput source="entryPrice" fullWidth label="Entry Price" />
        <NumberInput source="exitPrice" fullWidth label="Exit Price" />
        <TextInput source="indicators" fullWidth label="Indicators" />
        <TextInput source="sentiment" fullWidth label="Sentiment" />
        <NumberInput source="stopLoss" fullWidth label="Stop Loss" />
        <TextInput source="notes" fullWidth label="Notes" multiline />
    </Box>
);

const TradePanelBody = () => {
    const { watch } = useFormContext();
    const exchange = watch('exchange') || 'Binance';
    return (
        <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '5fr 7fr' }} gap={2}>
            {exchange === 'Kucoin' ? <KucoinTradePanel /> : <BinanceTradePanel />}
            <TradeDetailsPanel />
        </Box>
    );
};

const TradeCreate = () => {
    const notify = useNotify();
    const redirect = useRedirect();
    const [create] = useCreate();

    const onSave = (data: any) => {
        create('trades', { data }, {
            onSuccess: () => {
                notify('Trade created successfully');
                redirect('/trades');
            }
        });
    };

    return (
        <Create>
            <SimpleForm onSubmit={onSave}>
                <TopFormPanel />
                <TradePanelBody />
            </SimpleForm>
        </Create>
    );
};

export default TradeCreate
