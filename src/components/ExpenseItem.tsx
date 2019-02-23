import * as React from 'react';
import { Expense } from './BudgetAppStore';

import styled from '@emotion/styled'

interface ExpenseItemProps {
    count: number;
    expenseCostEur: string;
    expenseName: string;
    expenseCost: number;
    expenseObj: Expense;
    handleDeleteSelectedExpense: (expenseToDelete: Expense) => void;
}

const ExpenseItem = (props: ExpenseItemProps) => {
    return (
        <ExpenseContainer>
            <ExpName>{props.count}. {props.expenseName}</ExpName>
            <Costs>
                <CostCont>{props.expenseCost.toFixed(1)} PLN</CostCont>
                <CostCont>{props.expenseCostEur} EUR</CostCont>
            </Costs>
            <DeleteButton onClick={() => {
                props.handleDeleteSelectedExpense(props.expenseObj)
            }}
            >Remove
            </DeleteButton>
        </ExpenseContainer>
    )
};

export default ExpenseItem;

const ExpenseContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    padding: 10px 20px;
`;
const ExpName = styled.p`
    font-size: 18px;
    background: whitesmoke;
    padding: 10px;
    min-width: 50%;
    border: 1px solid dimgrey;
`;

const DeleteButton = styled.button`
    background: dimgrey;
    padding: 10px 15px;
    margin: 15px 5px;
    border-radius: 8px;
    color: white;
    font-size: 15px;
    text-decoration: none;
    vertical-align: middle;
    cursor: pointer;

    button:hover {
        background: grey;
        color: white;
    }
`;

const Costs = styled.div`
    display: flex;
    flex-flow: row wrap;
`;

const CostCont = styled.div`
    padding: 15px 20px 15px 10px;
    margin: 15px 5px;
    background: whitesmoke;
    border: 1px solid dimgrey;
    min-width: 100px;
    text-align: right;
    vertical-align: middle;
`;