import { Layout } from 'react-admin';
import MyAppBar from './MyAppBar';
import MyFooter from './MyFooter';

const MyLayout = (props: any) => (
    <>
        <Layout {...props} appBar={MyAppBar} />
        <MyFooter />
    </>
);

export default MyLayout;
