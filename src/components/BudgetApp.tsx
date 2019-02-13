import * as React from 'react';
import Header from './Header';
import AddExpense from './AddExpense';
import AllExpenses from './AllExpenses';

/** @jsx jsx */
import {jsx} from '@emotion/core';
import styled from '@emotion/styled';

import {ExpenseType} from './ExpenseItem';

interface IBudgetAppState {
    expenses: Array<ExpenseType>;
};

interface IBudgetAppProps {};

export default class BudgetApp extends React.Component<IBudgetAppProps, IBudgetAppState> {
    state: IBudgetAppState;

    constructor(props: IBudgetAppProps) {
        super(props);
        this.state = {
            expenses: [
                { expenseName: 'Shoes', expenseCost: 250.0 },
                { expenseName: 'Cinema', expenseCost: 56.0 },
                { expenseName: 'Grocery shopping', expenseCost: 127.5}
            ],
        }
    };

    handleAddExpense = (expenseName: string, expenseCost: number) => {
        if (!expenseName && isNaN(expenseCost)) {
            return 'Please, enter valid values to add an expense to the list!';
        }
        if (!expenseName && expenseCost <= 0) {
            return 'Please, enter the name of your expense and the cost greater than 0.'
        }
        if (!expenseName) {
            return 'Please, enter the name of your expense!'
        }
        if (expenseCost <= 0) {
            return 'Expense cost must be greater than 0.';
        }
        if (isNaN(expenseCost)) {
            return 'Please, enter also the cost of your expense to add it to the list!'
        }

        this.setState((prevState) => ({ expenses: prevState.expenses.concat( {expenseName, expenseCost} ) }));
    }

    handleDeleteExpenses = () => {
        this.setState(() => ({ expenses: [] }))
    }

    handleDeleteSelectedExpense = (expenseToDelete: ExpenseType) => {
        this.setState((prevState) => ({
            expenses: prevState.expenses.filter((expense: {}) => expense !== expenseToDelete)
        }));
    }

    componentDidMount = () => {
        try {
            const json = localStorage.getItem('expenses');
            if(json) {
                const expenses = JSON.parse(json);
                if(expenses) {
                    this.setState(() => ({ expenses }));
                }
            }
        }
        catch (e) {
        }
    }
    componentDidUpdate = (prevState: IBudgetAppState) => {
        if (prevState.expenses.length !== this.state.expenses.length) {
            const json = JSON.stringify(this.state.expenses);
            localStorage.setItem('expenses', json)
        }
    }

    render = () => {
        const values: Array<number> = []
        this.state.expenses.map((expense) => values.push(expense.expenseCost));
        return (
            <Container>
                <Header />
                <div>
                    <AllExpenses
                        expenses={this.state.expenses}
                        values={values}
                        handleDeleteExpenses={this.handleDeleteExpenses}
                        handleDeleteSelectedExpense={this.handleDeleteSelectedExpense}
                        hasExpenses={this.state.expenses.length > 0}
                    />
                    <AddExpense
                        handleAddExpense={this.handleAddExpense}
                    />
                </div>
            </Container>
        );
    }
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px auto;
    min-width: 460px;
    max-width: 1000px;
    background: gainsboro;
`;


