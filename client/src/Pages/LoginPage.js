import React from 'react'
import { Header } from './Header';

import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//export const LoginPage = () => {
export class LoginPage extends React.Component{
  constructor(props) {
    super(props);
    if(props.data){
      window.location.href="/";
    }
    this.state = {username: '',password:''};

    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.GotoSignup=this.GotoSignup.bind(this);
  }

  handleEmail(event) {
    this.setState({username: event.target.value});
  }
  handlePassword(event){
    this.setState({password:event.target.value});
  
  }

  handleSubmit(event) {
    event.preventDefault();
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email:this.state.username,password:this.state.password })
  };

  const loading = toast.loading("Please wait...");
    toast.update(loading,{render: "Loading...", type: "info", isLoading: true,theme: "colored"})
  fetch('/api/login', requestOptions)
      .then(response => response.json())
      .then(data => 
          {
              if(data.success){
                if(data.msg.is_admin){
                  toast.update(loading, { render: data.message, type: "success", isLoading: false,theme: "colored" });
              
                  localStorage.setItem("is_admin",data.msg.is_admin);
                  localStorage.setItem("token",data.token);
                  localStorage.setItem("_id",data.msg._id);
                  window.location.href="/admin";
                }
                else{
                toast.update(loading, { render: data.message, type: "success", isLoading: false,theme: "colored" });
              localStorage.setItem("token",data.token);
              localStorage.setItem("_id",data.msg._id);
              window.location.href="/";
                }
              }
              else{
                toast.update(loading, { render: data.message, type: "error", isLoading: false,theme: "colored" });
              }
          });
}

  GotoSignup(event){
    event.preventDefault();
    window.location.href="/signup";
}


  render(){
      // if(localStorage.getItem("token")){
      //     window.location.href="/";
      // }
      return(
        <>

        <Header/>


        <div id="main-login">
          <h1 id="form-heading fw-bolder">LOGIN </h1>
          <form id="main-form">
          <input className="formInput" value={this.state.username} onChange={this.handleEmail} type="text"  placeholder="Email" id ="email" htmlFor="email" />
          <input className="formInput" value={this.state.password} onChange={this.handlePassword} type="password"  placeholder="Password" id ="password" htmlFor="password" />
          <div className="btn-r text-center">
            <button type="submit" onClick={this.handleSubmit}  id="btn" >LOGIN</button>
            <p className="my-2">Don't have an account? <span><a href="/signup">Sign Up</a></span></p>       
          </div>
              
          </form>
            
        </div>
        </>
    






        
      );
  }
}

// export const LoginPage = () => {

     

//}
//     return (
//         <div id="main-login">
//             <h3 id="form-heading">Login</h3>
//                 <form id="main-form">
//                         <label className="formLabel">Email</label>
//                         <input className="formInput" id ="email" htmlFor="email" />

//                         <label className="formLabel">Password</label>
//                         <input className="formInput" id ="password" htmlFor="password" />

//                         <button id="btn">login</button>
                   
//                 </form>
            
//         </div>
//     )
// }
