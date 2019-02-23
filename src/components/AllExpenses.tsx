import * as React from 'react';
import ExpenseItem from './ExpenseItem'

import { observer } from 'mobx-react';

import { BudgetAppStore } from './BudgetAppStore';

import styled from '@emotion/styled'

interface AllExpensesProps {
    store: BudgetAppStore;
}

@observer
export default class AllExpenses extends React.Component<AllExpensesProps> {

    render() {
        const { expenses, handleDeleteExpenses, handleDeleteSelectedExpense, toSumExpenses, toSumExpensesEur } = this.props.store;
        return (
            <div>
                <HeadButtonContainer>
                    <ContTitle isBig>List of your expenses:</ContTitle>
                    <BigButton
                        onClick={handleDeleteExpenses}
                        disabled={expenses.length === 0}
                    >Remove All
                    </BigButton>
                </HeadButtonContainer>
                <div>
                {expenses.length === 0 && <GetStartedInfo>Please, add an expense to get started!</GetStartedInfo>}
                {
                    expenses.map((expense, idx) =>
                        <ExpenseItem
                            key={idx}
                            expenseCost={expense.expenseCost}
                            expenseName={expense.expenseName}
                            expenseObj={expense}
                            expenseCostEur={expense.toExpenseEur().toFixed(1)}
                            count={idx + 1}
                            handleDeleteSelectedExpense={handleDeleteSelectedExpense}
                        />
                    )
                }
                </div>
                <Line></Line>
                <SumsContainer>
                    <ContTitle>Sum of your expenses:</ContTitle>
                    <SumCont>{toSumExpenses.toFixed(1)} PLN</SumCont>
                    <SumCont>{toSumExpensesEur.toFixed(1)} EUR</SumCont>
                </SumsContainer>
            </div>
        )
    }
}

const HeadButtonContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    font-size: 22px;
    border-bottom: solid 5px white;
`;

const BigButton = styled.button`
        background: lightgrey;
        padding: 15px 20px;
        border-radius: 8px;
        color: black;
        font-size: 18px;
        text-decoration: none;
        vertical-align: middle;
        cursor: pointer;

    button:disabled {
        cursor: default;
        background: whitesmoke;
        color: grey;
    }

    button:hover:enabled {
        cursor: pointer;
        background: dimgrey;
        color: white;
    }
`;

const SumsContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
    align-items: center;
    padding: 15px 20px;
    margin: 0 135px 0 0;
`;
const ContTitle = styled.p`
        font-size: ${(props: {isBig?: Boolean}) => props.isBig ? '25px' : '20px'};
        font-weight: 500;
        margin-right: 80px;

`;
const SumCont = styled.div`
        background: whitesmoke;
        border: 1px solid dimgrey;
        margin: 10px 5px;
        min-width: 100px;
        text-align: right;
        padding: 15px 20px 15px 10px;
        margin: 0 5px;
`;

const GetStartedInfo = styled.p`
    background-color: green;
    color: white;
    font-size: 18px;
    text-align: center;
    font-weight: bold;
    padding: 15px 0;
`;

const Line = styled.div`
    border-top: 5px solid white;
`;