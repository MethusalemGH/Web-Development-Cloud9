import React from 'react';
import fetch from 'isomorphic-fetch';

const styleForm = 'f5 center w-90 w-75-m w-60-ns br3 shadow-5';
const styleLabel = 'db fw6 lh-copy f6';
const styleInput = 'pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100';
const styleSignIn = 'b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInName: '',
      signInEmail: '',
      signInPassword: ''
    };
  }

  render = () => {
    return (
      <div className={styleForm} style={{backgroundColor:'rgb(112, 176, 255)'}}>
        <main className={'pa4 black-80'}>
          <div className={'measure center'}>
            <fieldset id='sign_up' className={'ba b--transparent ph0 mh0'}>
              <legend className={'f3 fw6 ph0 mh0'}>Register</legend>
              <div className={'mt3'}>
                <label className={styleLabel} htmlFor='user-name'>User Name</label>
                <input className={styleInput} type='text' name='user-name'  id='user-name' onChange={this.onNameChange} />
              </div>
              <div className={'mt3'}>
                <label className={styleLabel} htmlFor='email-address'>Email</label>
                <input className={styleInput} type='email' name='email-address'  id='email-address' onChange={this.onEmailChange} />
              </div>
              <div className={'mv3'}>
                <label className={styleLabel} htmlFor='password'>Password</label>
                <input className={styleInput} type='password' name='password'  id='password' onChange={this.onPasswordChange} />
              </div>
            </fieldset>
            <div className={''}>
              <input className={styleSignIn} type='button' value='Register' onClick={this.onSubmitRegister} />
            </div>
          </div>
        </main>
      </div>
    );
  }

  onNameChange = (event) => {
    this.setState({ signInName: event.target.value });
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  }

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  }

  onSubmitRegister = () => {
    const connection = this.props.connection;
    fetch(`${connection.url}:${connection.port}/register`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: this.state.signInName,
          email: this.state.signInEmail,
          password: this.state.signInPassword
        })
      })
      .then((response) => response.json())
      .then((user) => {
        console.log(user);
        this.props.loadUser(user);
        this.props.onRouteChange('home');
      });
  }
}

export default Register;
