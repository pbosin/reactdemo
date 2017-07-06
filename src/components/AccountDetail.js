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



export class AccountDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: {}
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
            this.setState({account: result});
            this.setState({newName: result.name});
        });
    }

    save() {
        let account = {id: this.state.account.id, name: this.state.newName};
        AccountService.saveAccount(account).then(() => {
            browserHistory.push('/accounts');
        });
    }
    cancel() {
        browserHistory.push('/accounts');
    }
    handleOnChange(name, event) {
        this.setState({ newName: event.target.value });
    }

    render() {
        return (
            <div>
                <Form horizontal>
                    <FormGroup>
                        <Col sm={2}>
                            <ControlLabel>
                                Account Name
                            </ControlLabel>
                        </Col>
                        <Col sm={5}>
                            <FormControl
                                type="text"
                                value={this.state.newName}
                                onChange={this.handleOnChange.bind(this, 'name')}
                                placeholder="Enter name"
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <ButtonToolbar>
                                <Button bsSize="sm" bsStyle="primary" onClick={this.save.bind(this, null)}>Save</Button>
                                <Button bsSize="sm" onClick={this.cancel}>Cancel</Button>
                            </ButtonToolbar>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}
