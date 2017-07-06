import React from 'react';
import Button from 'react-bootstrap/lib/Button'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import { browserHistory } from 'react-router';
import AccountService from '../AccountService';

export class AccountInvoiceList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: {invoices: []}
        };
        this.accountId = this.getAccountIdFromUrl(props.params.id);
    }

    getAccountIdFromUrl(id) {
        let s = id.replace(':','');
        return parseInt(s);
    }

    componentDidMount() {
        if (isNaN(this.accountId)) {
            this.accountId = this.getAccountIdFromUrl(this.props.params.id);
        }
        AccountService.getAccount(this.accountId).then(result => {
            if (!result.invoices) {
                result.invoices = [];
            }
            this.setState({account: result});
        });
    }

    back() {
        browserHistory.push('/accounts');
    }
    addNew(account) {
        browserHistory.push(`/accounts/:${account.id}/invoices/:0`);
    }
    edit(account, invoice) {
        browserHistory.push(`/accounts/:${account.id}/invoices/:${invoice.id}`);
    }
    deleteInvoice(invoice) {
        AccountService.deleteInvoice(this.state.account.id, invoice.id).then(() => {
            AccountService.getAccount(this.state.account.id).then(result => {
                this.setState({account: result})
            })
        });
    }
    render() {
        return (
            <div>
                <h4>
                    Account "{this.state.account.name}" Invoices
                </h4>
                <Button bsSize="xsmall" onClick={this.back}>Back To Account List</Button>
                <table>
                    <tbody>
                        <tr>
                            <th>Invoice ID</th>
                            <th>Invoice Name</th>
                            <th>Invoice Amount</th>
                            <th>Amount Due</th>
                            <th><Button bsSize="xsmall" onClick={() => this.addNew(this.state.account)}>Add New Invoice</Button></th>
                        </tr>
                    {this.state.account.invoices.map(invoice => (
                        <tr key={invoice.id}>
                            <td>{invoice.id}</td>
                            <td>{invoice.name}</td>
                            <td>{invoice.amount}</td>
                            <td>{invoice.due}</td>
                            <td>
                              <Button bsSize="xsmall" onClick={() => this.edit(this.state.account,invoice)}>
                                <Glyphicon glyph="pencil"/>
                              </Button>
                              <Button bsSize="xsmall" onClick={() => this.deleteInvoice(invoice)}>
                                <Glyphicon glyph="trash"/>
                              </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
