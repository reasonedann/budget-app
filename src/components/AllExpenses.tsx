import * as React from 'react';
import ExpenseItem, {ExpenseType} from './ExpenseItem'

/** @jsx jsx */
import styled from '@emotion/styled'

const eurPln: number = 4.284;

interface IExpensesProps {
    values: Array<number>;
    handleDeleteExpenses: () => void;
    hasExpenses: boolean;
    expenses: Array<{expenseName: string, expenseCost: number}>;
    handleDeleteSelectedExpense: (selectedExpense: ExpenseType) => void;
}

export default class AllExpenses extends React.Component<IExpensesProps> {

    toSumExpenses = (v: Array<number>) => {
        const reducer = (acc: number, curValue: number) => acc + curValue;
        return v.reduce(reducer, 0);
    }
    toConvertExpenseToEur = (expensePln: number) => {
        return expensePln / eurPln;
    }

    render() {
        const eurValues = this.props.values.map((value) => this.toConvertExpenseToEur(value));
        return (
            <div>
                <HeadButtonContainer>
                    <p>List of your expenses:</p>
                    <button
                        onClick={this.props.handleDeleteExpenses}
                        disabled={!this.props.hasExpenses}
                    >Remove All
                    </button>
                </HeadButtonContainer>
                <div>
                {this.props.expenses.length === 0 && <GetStartedInfo>Please, add an expense to get started!</GetStartedInfo>}
                {
                    this.props.expenses.map((expense, idx) =>
                        <ExpenseItem
                            key={idx}
                            expenseObj={expense}
                            expenseCost={expense.expenseCost.toFixed(1)}
                            expenseName={expense.expenseName}
                            expenseCostEur={this.toConvertExpenseToEur(expense.expenseCost).toFixed(1)}
                            count={idx + 1}
                            handleDeleteSelectedExpense={this.props.handleDeleteSelectedExpense}
                        />
                    )
                }
                </div>
                <Line></Line>
                <SumsContainer>
                    <p>Sum of your expenses:</p>
                    <div>{this.toSumExpenses(this.props.values).toFixed(1)} PLN</div>
                    <div>{this.toSumExpenses(eurValues).toFixed(1)} EUR</div>
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

    button {
        background: lightgrey;
        padding: 15px 20px;
        border-radius: 8px;
        color: black;
        font-size: 18px;
        text-decoration: none;
        vertical-align: middle;
        cursor: pointer;
    }

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

    p {
        font-size: 20px;
        font-weight: 500;
        margin-right: 80px;
    }

    div {
        background: whitesmoke;
        border: 1px solid dimgrey;
        margin: 10px 5px;
        min-width: 100px;
        text-align: right;
        padding: 15px 20px 15px 10px;
        margin: 0 5px;
    }
`;

const GetStartedInfo = styled.p`
    background-color: crimson;
    color: white;
    font-size: 18px;
    text-align: center;
    font-weight: bold;
    padding: 15px 0;
`;

const Line = styled.div`
    border-top: 5px solid white;
`;