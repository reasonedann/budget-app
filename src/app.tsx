import * as React from 'react';
import ReactDOM from 'react-dom';

import BudgetApp from './components/BudgetApp';
import BudgetAppContext from './components/BudgetAppStore';

ReactDOM.render(
    <BudgetAppContext.Consumer>
        {(store) => <BudgetApp store={store}/>}
    </BudgetAppContext.Consumer>,
    document.getElementById('app')
);