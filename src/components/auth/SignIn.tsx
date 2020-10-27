import React, {FormEvent, useState} from "react";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password)
  }

  return (
    <div className={'container'}>
      <form onSubmit={handleSubmit} className={'white'}>
        <h4 className={'grey-text text-darken-3 center'}> Sign In </h4>
        <div className={'row'}>
          <div className={'col s12'}>
            <div className={'input-field'}>
              <label htmlFor="email"> Email </label>
              <input type={"email"} id={'email'} value={email} onChange={e => setEmail(e.target.value)}/>
            </div>
          </div>
        </div>
        <div className={'row'}>
          <div className={'col s12'}>
            <div className={'input-field'}>
              <label htmlFor="password"> Password </label>
              <input type={"password"} id={'password'} value={password} onChange={e => setPassword(e.target.value)}/>
            </div>
          </div>
        </div>
        <div className={'row'}>
          <div className={'col s12'}>
            <div className={'input-field center'}>
              <button className={'btn green lighten-2 btnSignUP'}> Log In </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignIn