import * as React from 'react';

/** @jsx jsx */
import styled from '@emotion/styled'

const Header = () => (
    <Title>
        <h1>Budget App</h1>
        <h2>Take Care of Your Expenses</h2>
    </Title>
);

export default Header;


const Title = styled.div`
    background: black;
    color: white;
    text-align: center;
    border-bottom: 5px solid white;

    h1 {
        padding: 15px 0 0;
    }

    h2 {
        padding: 15px 0 15px;
    }
`;