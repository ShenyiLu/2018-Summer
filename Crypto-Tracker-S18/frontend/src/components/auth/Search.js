import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { FormGroup, FormControl, Button, ControlLabel } from 'react-bootstrap';
import { bootstrapUtils } from 'react-bootstrap/lib/utils';
import cryptoSearch from '../../cryto-search/search';

import '../static/css/signin.css';
import '../static/css/components.css';
bootstrapUtils.addStyle(Button, 'custom');

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchResult: {
        "sr": []
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setState = this.setState.bind(this)

  }

  onSubmit = formProps => {
    console.log(formProps.searchItem);
    cryptoSearch.searchNames(formProps.searchItem)
      .then((names) =>
        console.log(names)
      ) // [ 'BTC Lite', 'BTCMoon' ]
      .catch(err => console.log(err))

  };


  handleChange(e) {
    this.setState({ errorMessage: '' });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div id="bg">
        console.log(this.state.sr);
        <div id="bgoverlay">
          <center>
            <form className="form" onSubmit={handleSubmit(this.onSubmit)}>

              <div>
                <FormGroup>
                  <Field name="searchItem" component="FormControl">
                    <ControlLabel>Search</ControlLabel>
                    <FormControl
                      type="text"
                      onChange={this.handleChange}
                    />
                  </Field>

                </FormGroup>
              </div>
              <div id="errorStyle">{this.props.errorMessage}</div>
              <div>
                <Button bsStyle="primary" type="submit" bsSize="medium" block> Search </Button>
              </div>
            </form>
          </center>
          <div>
            <p>{this.state.sr}</p>
          </div>
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
  reduxForm({ form: 'search' })
)(Search);
