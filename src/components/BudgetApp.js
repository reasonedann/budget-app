import React from 'react';
import Header from './Header.js';
import AddExpense from './AddExpense.js';
import Expenses from './Expenses.js';

/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled'

export default class BudgetApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expenses: [
                { expenseName: 'Shoes', expenseCost: 250.0 },
                { expenseName: 'Cinema', expenseCost: 56.0 },
                { expenseName: 'Grocery shopping', expenseCost: 127.5}
            ],
        }
    };

    handleAddExpense = (expenseName, expenseCost) => {
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

    handleDeleteSelectedExpense = (expenseToDelete) => {
        this.setState((prevState) => ({
            expenses: prevState.expenses.filter((expense) => expense !== expenseToDelete)
        }));
    }

    render = () => {
        const values = []
        this.state.expenses.map((expense) => values.push(expense.expenseCost));
        console.log(values);
        return (
            <Container>
                <Header />
                <div>
                    <Expenses
                        expenses={this.state.expenses}
                        selectedExpense={this.selectedExpense}
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
        )
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


