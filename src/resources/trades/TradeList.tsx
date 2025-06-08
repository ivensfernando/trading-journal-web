import {
    List,
    Datagrid,
    TextField,
    NumberField,
    DateField,
    TextInput,
    DateInput,
    Filter,
} from 'react-admin';

const TradeFilter = [
    <TextInput label="Search by Asset" source="asset" alwaysOn />,
    <DateInput label="From Date" source="date_gte" />,
    <DateInput label="To Date" source="date_lte" />,
];

const TradeList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="symbol" />
            <TextField source="type" />
            <NumberField source="entry_price" />
            <NumberField source="exit_price" />
            <NumberField source="leverage" />
            <TextField source="exchange" />
            <DateField source="trade_date" />
        </Datagrid>
    </List>
);

export default TradeList;
