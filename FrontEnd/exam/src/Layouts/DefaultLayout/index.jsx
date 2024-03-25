import React from 'react';
import Main from '../Main';
import Navbar from '../../components/Navbar/Navbar';

const DefaultLayout = ({children}) => {
    return (
        <>
            <Navbar />
            <Main >
                {children}
            </Main>
        </>
    );
};

export default DefaultLayout;