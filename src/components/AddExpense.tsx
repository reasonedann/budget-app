import * as React from 'react';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';


import styled from '@emotion/styled'

class InputState {
    @observable value: string;

    constructor() {
        this.value = '';
    }

    @action setValue = (value: string) => {
        this.value = value;
    }
}

interface InputElementPropsType {
    label: string,
    state: InputState,
    version: 'name' | 'cost'
}

@observer
class InputElement extends React.Component<InputElementPropsType> {
    render() {

        const { label } = this.props;

        return (
            <React.Fragment>
                <InputTitle>{label}:</InputTitle>
                { this.renderInput() }
            </React.Fragment>
        );
    }

    renderInput() {

        const { version } = this.props;
        const { value } = this.props.state;

        if (version === 'name') {
            return <InputName type="text" value={value} onInput={this.onInput} />
        } else {
            return <InputCost type="text" value={value} onInput={this.onInput} />;
        }
    }

    onInput = (event: React.FormEvent<HTMLInputElement>) => {
        const { setValue } = this.props.state;
        setValue(event.currentTarget.value);
    }
}

interface AddExpenseProps {
    handleAddExpense(expenseName: string, expenseCost: number): string | undefined;
};

@observer
export default class AddExpense extends React.Component<AddExpenseProps> {
    @observable error: string | undefined = undefined
    readonly expenseNameInputState = new InputState();
    readonly expenseCostInputState = new InputState();

    addExpenseClick = (event: any) => {
        event.preventDefault();

        const valueName = this.expenseNameInputState.value;
        const valueCost = this.expenseCostInputState.value;

        const expenseNameXs = valueName.trim();
        const expenseNameTxt = expenseNameXs.charAt(0).toUpperCase() + expenseNameXs.slice(1);
        const expenseCostTxt = parseFloat(valueCost);

        this.error = this.props.handleAddExpense(expenseNameTxt, expenseCostTxt);

        if (!this.error) {
            this.expenseNameInputState.setValue('');
            this.expenseCostInputState.setValue('');
        }
    };

    render() {
        return (
            <div>
                {this.error && <Error>{this.error}</Error>}
                <AddExpenseBox onSubmit={this.addExpenseClick}>
                        <InputsContainer>
                            <InputElement version="name" label="Expense name" state={this.expenseNameInputState} />
                            <InputElement version="cost" label="Value in PLN" state={this.expenseCostInputState} />
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

    input {
        padding: 10px 0;
        border: 1px solid dimgrey;
        font-size: 18px;
        padding-left: 20px;
    }
`;
const InputTitle = styled.p`
    padding: 10px 5px;
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