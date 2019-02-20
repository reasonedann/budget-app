import * as React from 'react';
import {observable, action, computed, autorun} from 'mobx';

const eurPln: number = 4.284;

interface ExpObj {
    expenseName: string;
    expenseCost: number;
};

export class Expense {
    expenseName: string;
    expenseCost: number;

    constructor(expenseName: string, expenseCost: number) {
        this.expenseName = expenseName;
        this.expenseCost = expenseCost;
    }

    toExpenseEur = () => {
        return this.expenseCost / eurPln;
    }
};

export class BudgetAppStore {
    @observable expenses: Array<Expense>;
    @observable error: any;

    constructor() {
        this.expenses = [];
        this.error = undefined;
        try {
            const json = localStorage.getItem('expenses');
            if(json) {
                const expensesAsObjects: Array<ExpObj> = JSON.parse(json);
                if(expensesAsObjects) {
                    this.expenses = expensesAsObjects.map(exp => new Expense(exp.expenseName, exp.expenseCost));
                }
            }
        }
        catch (e) {
        }

        autorun(() => {
            const json = JSON.stringify(this.expenses);
            localStorage.setItem('expenses', json)
        });
    }

    @action handleAddExpense = (expenseName: string, expenseCost: number) => {
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

        this.expenses.push(new Expense(expenseName, expenseCost));
    };

    @action handleDeleteExpenses = () => {
        this.expenses = [];
    };

    @action handleDeleteSelectedExpense = (expenseToDelete: Expense) => {
        this.expenses.filter((expense: {}) => expense !== expenseToDelete);
    };

    @computed get toSumExpenses() {
        const reducer = (acc: number, curValue: number) => acc + curValue;
        return this.expenses.map(expense => expense.expenseCost).reduce(reducer, 0);
    };
    @computed get toSumExpensesEur() {
        const reducer = (acc: number, curValue: number) => acc + curValue;
        const expensesEur = this.expenses.map(expense => expense.expenseCost).reduce(reducer, 0);
        return expensesEur / eurPln
    };

};

export default React.createContext(
    new BudgetAppStore()
)