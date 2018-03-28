import React from 'react';

const styleForm = 'f5 center w-90 w-75-m w-60-ns br3 shadow-5';
const styleLabel = 'db fw6 lh-copy f6';
const styleInput = 'pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100';
const styleSignIn = 'b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib';

class SignIn extends React.Component {
  render = () => {
    return (
      <div className={styleForm} style={{backgroundColor:'rgb(112, 176, 255)'}}>
        <main className={'pa4 black-80'}>
          <div className={'measure center'}>
            <fieldset id='sign_up' className={'ba b--transparent ph0 mh0'}>
              <legend className={'f3 fw6 ph0 mh0'}>Sign In</legend>
              <div className={'mt3'}>
                <label className={styleLabel} htmlFor='email-address'>Email</label>
                <input className={styleInput} type='email' name='email-address'  id='email-address' />
              </div>
              <div className={'mv3'}>
                <label className={styleLabel} htmlFor='password'>Password</label>
                <input className={styleInput} type='password' name='password'  id='password' />
              </div>
            </fieldset>
            <div className={''}>
              <input className={styleSignIn} type='button' value='Sign In' onClick={() => this.props.onRouteChange('home')} />
            </div>
            <div className={'lh-copy mt2'}>
              <span className={'f6 link dim black db pointer w-20 dib'} onClick={() =>this.props.onRouteChange('register')}>Register</span>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default SignIn;
