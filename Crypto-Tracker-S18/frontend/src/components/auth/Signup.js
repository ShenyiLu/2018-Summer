import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
//import Button from '@material-ui/core/Button';
import{FormGroup, FormControl, Button, ControlLabel} from 'react-bootstrap';
import{bootstrapUtils} from 'react-bootstrap/lib/utils';

import '../static/css/signup.css';
import '../static/css/components.css';
bootstrapUtils.addStyle(Button, 'custom');


class Signup extends Component {
  onSubmit = formProps => {
    this.props.signup(formProps, () => {
      this.props.history.push('/feature');
    });
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="up">
      <div className="col-md-6 col-md-offset-3 signup">
        <h2 className="title"> CREATE ACCOUNT</h2>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <FormGroup>
            <Field name="email" component="FormControl" componentClass="select">
              <ControlLabel className="control-label">Email</ControlLabel>
              <FormControl
                type="text"
                placeholder="Type in your email"
                onChange={this.handleChange}
              />
            </Field>
          </FormGroup>
          <FormGroup>
            <Field name="username" component="FormControl" componentClass="select">
              <ControlLabel className="control-label">Username</ControlLabel>
              <FormControl
                type="text"
                placeholder="Type in your username (length 6-30, no space)"
                onChange={this.handleChange}
              />
            </Field>
          </FormGroup>
          <FormGroup>
            <Field name="password" component="FormControl" componentClass="select">
              <ControlLabel className="control-label">Password</ControlLabel>
              <FormControl
                type="password"
                placeholder="Type in your password (length 8-20, must have upper, lower case and digits, no space)"
                onChange={this.handleChange}
              />
            </Field>
          </FormGroup>
          <FormGroup>
            <Field name="firstname" component="FormControl" componentClass="select">
              <FormControl
                type="text"
                placeholder="First Name"
                onChange={this.handleChange}
              />
            </Field>
          </FormGroup>
          <FormGroup>
            <Field name="lastname" component="FormControl" componentClass="select">
              <FormControl
                type="text"
                placeholder="Last Name"
                onChange={this.handleChange}
                />
            </Field>
          </FormGroup>
          <div><ControlLabel className="control-label">{this.props.errorMessage}</ControlLabel></div>
          <Button bsStyle="custom" type = "submit"  bsSize="large" block>
            Sign Up
          </Button>
        </form>
      </div>
    </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signup' })
)(Signup);
