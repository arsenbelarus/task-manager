import React, {FormEvent, useState} from "react";

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({email, password, firstName, lastName})
  }

  return (
    <div className={'container'}>
      <form onSubmit={handleSubmit} className={'white'}>
        <h4 className={'grey-text text-darken-3 center'}> SIGN UP </h4>
        <div className={'row'}>
          <div className={'col s12 m6'}>
            <div className={'input-field'}>
              <label htmlFor="firstName"> First Name </label>
              <input type={"text"} id={'firstName'} value={firstName} onChange={e => setFirstName(e.target.value)}/>
            </div>
          </div>
          <div className={'col s12 m6'}>
            <div className={'input-field'}>
              <label htmlFor="lastName"> Last Name </label>
              <input type={"text"} id={'lastName'} value={lastName} onChange={e => setLastName(e.target.value)}/>
            </div>
          </div>
        </div>
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
              <button className={'btn green lighten-2 btnSignUP'}> Sign Up</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignUp