import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Col from 'react-bootstrap/lib/Col';
import { browserHistory } from 'react-router';
import AccountService from '../AccountService';

export class AccountInvoiceDetail extends React.Component {
    constructor(props) {
        super(props);
        this.accountId = parseInt(props.params.id.substr(1),10);
        this.invoiceId = parseInt(props.params.invoiceid.substr(1),10);
        this.state = {
            account: {invoices: []},
            invoice: {},
            editObj: {}
        };
    }

    componentDidMount() {
        AccountService.getAccount(this.accountId).then(result => {
            this.setInitState(result);
        });
    }

    setInitState(obj) {
        if (!obj.invoices) {
            obj.invoices = [];
        }
        this.setState({account: obj});
        let invoice = obj.invoices.filter(invoice => invoice.id === this.invoiceId)[0] || { accountId: obj.id };
        this.setState({invoice: invoice});
        let editObj = Object.assign({}, invoice);
        this.setState({editObj: editObj});
    }

    handleOnChange(propName, event) {
        let updatedEditObj = Object.assign(this.state.editObj, {[propName]: event.target.value});
        this.setState({ editObj: updatedEditObj });
    }

    save(editInvoice) {
        AccountService.saveInvoice(editInvoice).then(() => {
            browserHistory.push(`/accounts/${editInvoice.accountId}/invoices`);
        });
    }
    cancel(account) {
        browserHistory.push(`/accounts/:${this.accountId}/invoices`);
    }
    render() {
        return (
            <div>
                <h4> Account "{this.state.account.name}" Invoice </h4>
                <Form horizontal>
                    <FormGroup>
                        <Col sm={2}>
                            <ControlLabel>
                                Invoice Name
                            </ControlLabel>
                        </Col>
                        <Col sm={5}>
                            <FormControl
                                type="text"
                                value={this.state.editObj.name}
                                onChange={this.handleOnChange.bind(this,'name')}
                                placeholder="Enter name"
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={2}>
                            <ControlLabel>
                                Invoice Amount
                            </ControlLabel>
                        </Col>
                        <Col sm={5}>
                            <FormControl
                                type="text"
                                value={this.state.editObj.amount}
                                onChange={this.handleOnChange.bind(this,'amount')}
                                placeholder="Enter amount"
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={2}>
                            <ControlLabel>
                                Balance Due
                            </ControlLabel>
                        </Col>
                        <Col sm={5}>
                            <FormControl
                                type="text"
                                value={this.state.editObj.due}
                                onChange={this.handleOnChange.bind(this,'due')}
                                placeholder="Enter balance due"
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <ButtonToolbar>
                                <Button bsSize="sm" bsStyle="primary" onClick={() => this.save(this.state.editObj)}>Save</Button>
                                <Button bsSize="sm" onClick={() => this.cancel(this.state.account)}>Cancel</Button>
                            </ButtonToolbar>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}
