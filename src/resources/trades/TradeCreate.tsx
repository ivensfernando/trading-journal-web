import {
    Create,
    SimpleForm,
    TextInput,
    NumberInput,
    DateInput,
    SelectInput,
    required,
} from 'react-admin';

const typeChoices = [
    { id: 'spot', name: 'Spot' },
    { id: 'futures', name: 'Futures' },
];

const TradeFormFields = () => (
    <>
        <TextInput source="symbol" validate={[required()]} />
        <SelectInput source="type" choices={typeChoices} />
        <NumberInput source="leverage" />
        <NumberInput source="entry_price" />
        <NumberInput source="exit_price" />
        <NumberInput source="fee" />
        <TextInput source="indicators" />
        <TextInput source="sentiment" />
        <NumberInput source="stop_loss" />
        <NumberInput source="take_profit" />
        <TextInput source="exchange" />
        <DateInput source="trade_date" />
    </>
);

const TradeCreate = () => (
    <Create>
        <SimpleForm>
            <TradeFormFields />
        </SimpleForm>
    </Create>
);

export default TradeCreate;

