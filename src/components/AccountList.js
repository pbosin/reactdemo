import React from 'react';
import Button from 'react-bootstrap/lib/Button'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import { browserHistory } from 'react-router';
import AccountService from '../AccountService';

export class AccountList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: []
        };
    }

    componentDidMount() {
        AccountService.getAccounts().then(result => {
            this.setState({accounts: result});
        });
    }

    addNew() {
        browserHistory.push(`/accounts/:0`);
    }
    edit(account) {
        browserHistory.push(`/accounts/:${account.id}`);
    }
    deleteAccount(account) {
        AccountService.deleteAccount(account.id).then(() => {
            this.componentDidMount();
        });
    }
    invoices(account) {
        browserHistory.push(`/accounts/:${account.id}/invoices`);
    }
    render() {
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th><Button bsSize="xsmall" onClick={this.addNew}>Add New Account</Button></th>
                        </tr>
                        {this.state.accounts.map(account => (
                            <tr key={account.id}>
                                <td>{account.name}</td>
                                <td>
                                  <Button bsSize="xsmall" onClick={() => this.edit(account)}>
                                    <Glyphicon glyph="pencil"/>
                                  </Button>
                                  <Button bsSize="xsmall" onClick={() => this.deleteAccount(account)}>
                                    <Glyphicon glyph="trash"/>
                                  </Button>
                                  <Button bsSize="xsmall" onClick={() => this.invoices(account)}>View Invoices</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
