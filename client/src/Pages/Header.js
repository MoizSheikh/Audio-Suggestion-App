import React,{ useState, useEffect } from 'react'
import { Button,Navbar,Nav ,NavDropdown,Form, FormControl,Container } from 'react-bootstrap'
import $ from 'jquery';
import SearchInput from '../components/SearchInput';


export class Header extends React.Component {

    login(){
        
        window.location.href="/login";
    }
    render(){

       
    return (
        <Navbar bg="light" expand="lg" className="container-fluid px-lg-4">
        <Navbar.Brand className="nav_logo fw-bolder" href="/admin">HOME</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="lg-d-flex justify-content-between">
            <Nav
            className="mr-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
            >
           
            </Nav>
            <div className="nav_btns mt-lg-0 d-flex float-right justify-content-center mx-5">
              
                                <button onClick={this.login} className="btn btn-success px-4">LOGIN</button>
            </div> 
        </Navbar.Collapse>
       
    </Navbar>
    )
                }
}