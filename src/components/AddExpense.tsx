import * as React from 'react';
import { observer } from 'mobx-react';


import styled from '@emotion/styled'

interface AddExpenseProps {
    handleAddExpense(expenseName: string, expenseCost: number): any;
};
interface AddExpenseState {
    error: any;
}
@observer
export default class AddExpense extends React.Component<AddExpenseProps, AddExpenseState> {
    state: AddExpenseState;

    constructor(props: AddExpenseProps) {
        super(props)
        this.addExpenseClick = this.addExpenseClick.bind(this);
        this.state = {
            error: undefined
        }
    };

    addExpenseClick(event: any) {
        event.preventDefault();

        const expenseNameXs = event.target.elements.expenseNameInput.value.trim();
        const expenseNameTxt = expenseNameXs.charAt(0).toUpperCase() + expenseNameXs.slice(1);
        const expenseCostTxt = parseFloat(event.target.elements.expenseCostInput.value);

        const error = this.props.handleAddExpense(expenseNameTxt, expenseCostTxt);

        this.setState(() => ( {error} ));
        if (!error) {
            event.target.elements.expenseNameInput.value = '';
            event.target.elements.expenseCostInput.value = '';
        }
    };

    render() {
        return (
            <div>
                {this.state.error && <Error>{this.state.error}</Error>}
                <AddExpenseBox onSubmit={this.addExpenseClick}>
                        <InputsContainer>
                            <div>
                                <p>Expense name:</p>
                                <InputName type="text" name="expenseNameInput"/>
                            </div>
                            <div>
                                <p>Value in PLN:</p>
                                <InputCost type="text" name="expenseCostInput"/>
                            </div>
                        </InputsContainer>
                        <button>Add Expense</button>
                </AddExpenseBox>
            </div>
        );
    }
};

const AddExpenseBox = styled.form`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    font-size: 18px;
    border-top: solid 6px white;
    background: whitesmoke;

    button {
        background: lightgrey;
        padding: 10px 15px;
        border-radius: 8px;
        color: black;
        font-size: 15px;
        text-decoration: none;
        vertical-align: middle;
        cursor: pointer;
    }

    button:hover {
        background: dimgrey;
        color: white;
    }

`;

    const InputsContainer = styled.div`
        display: flex;
        flex-flow: row wrap;
        align-items: center;

        div {
            display: flex;
            justify-content: space-between;
        }

        input {
            padding: 10px 0;
            border: 1px solid dimgrey;
            font-size: 18px;
            padding-left: 20px;
        }

        p {
            padding: 10px 5px;
        }
    `;

const InputName = styled.input`
    width: 280px;
    margin-right: 40px;
`;

const InputCost = styled.input`
    width: 120px;
    &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    }
    &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    }
    -moz-appearance: textfield;
`;

const Error = styled.p`
    background-color: crimson;
    color: white;
    font-size: 18px;
    text-align: center;
    font-weight: bold;
    padding: 15px 0;
    border-top: 5px solid white;
`;