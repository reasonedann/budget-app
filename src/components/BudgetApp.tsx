import * as React from 'react';
import { observer } from 'mobx-react';
import { BudgetAppStore } from './BudgetAppStore';

import Header from './Header';
import AddExpense from './AddExpense';
import AllExpenses from './AllExpenses';

import styled from '@emotion/styled';
import { Global, css } from '@emotion/core';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px auto;
    min-width: 460px;
    max-width: 1000px;
    background: gainsboro;
`;

interface BudgetAppProps {
    store: BudgetAppStore;
};

@observer
export default class BudgetApp extends React.Component<BudgetAppProps> {
    render = () => {
        const { handleAddExpense } = this.props.store;
        return (
            <Container>
                <Global styles={css`
                    body {
                        margin: 0;
                        font-family: 'Montserrat';
                    }
                `}/>
                <Header />
                <div>
                    <AllExpenses
                        store={this.props.store}
                    />
                    <AddExpense
                        handleAddExpense={handleAddExpense}
                    />
                </div>
            </Container>
        );
    }
};

