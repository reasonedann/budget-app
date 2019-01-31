import React from 'react';

/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled'

const ExpenseItem = (props) => (
    <ExpenseContainer>
        <p>{props.count}. {props.expenseName}</p>
        <Costs>
            <div>{props.expenseCost} PLN</div>
            <div>{props.expenseCostEur} EUR</div>
        </Costs>
        <button onClick={(event) => {
            props.handleDeleteSelectedExpense(props.expenseObj)
        }}
        >Remove
        </button>
    </ExpenseContainer>
)

export default ExpenseItem;

const ExpenseContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;

    p {
        background: whitesmoke;
        padding: 10px;
        min-width: 50%;
        border: 1px solid dimgrey;

    }

    button {
        background: dimgrey;
        padding: 10px 15px;
        border-radius: 8px;
        color: white;
        font-size: 15px;
        text-decoration: none;
        vertical-align: middle;
        cursor: pointer;
    }

    button:hover {
        background: grey;
        color: white;
    }
`;

const Costs = styled.div`
    display: flex;
    flex-flow: row wrap;

    div {
        text-align: right;
        padding: 10px 20px 10px 10px;
        background: whitesmoke;
        margin: 0 5px;
        min-width: 100px;
        border: 1px solid dimgrey;
    }
`;

