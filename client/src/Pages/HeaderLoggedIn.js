import React from "react";
import {
  Button,
  Navbar,
  Nav,
  Dropdown,
  Form,
  FormControl,
} from "react-bootstrap";
import SearchInput from "../components/SearchInput";

export class HeaderLoggedIn extends React.Component {
  constructor(props) {
    super(props);

    this.SubmitSearch = this.SubmitSearch.bind(this);
    this.logout = this.logout.bind(this);
  }

  SubmitSearch(childData) {
    this.props.parentCallback(childData);
  }

  logout() {
    localStorage.clear();
    window.location.href = "/login";
  }
  render() {
    return (
      <Navbar bg="light" expand="lg" className="container-fluid px-lg-4">
        <Navbar.Brand className="nav_logo fw-bolder" href="#">
          HOME
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse
          id="navbarScroll"
          className="lg-d-flex justify-content-between"
        >
          <Nav
            className="mr-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          ></Nav>

          <div className="nav_btns mt-lg-0 d-flex justify-content-center mx-5">
            <Dropdown>
              <Dropdown.Toggle
                variant="primary"
                id="dropdown-basic"
                className="px-4 "
              >
                Profile
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/">Home</Dropdown.Item>
                {this.props.isAdmin ? (
                  <div />
                ) : (
                  <Dropdown.Item href="/editprofile">My Audios</Dropdown.Item>
                )}

                <Dropdown.Item href="/changepassword">
                  Change Password
                </Dropdown.Item>
                <Dropdown.Item onClick={this.logout}>Log Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
