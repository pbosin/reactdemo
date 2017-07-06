import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { AccountList } from './AccountList';
import { AccountDetail } from './AccountDetail';
import { AccountInvoiceList } from './AccountInvoiceList';
import { AccountInvoiceDetail } from './AccountInvoiceDetail';

export class Accounts extends React.Component {
    render() {
        return (
            <div style={{ marginLeft: '100px' }}>
                <h1> Accounts </h1>
                <Router history={browserHistory}>
                    <Route path="/accounts" component={AccountList} />
                    <Route path="/accounts/:id" component={AccountDetail} />
                    <Route path="/accounts/:id/invoices" component={AccountInvoiceList}/>
                    <Route path="/accounts/:id/invoices/:invoiceid" component={AccountInvoiceDetail}/>
                </Router>
            </div>
        );
    }
}
