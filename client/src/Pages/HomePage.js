import React, { Component } from "react";
import { HeaderLoggedIn } from "./HeaderLoggedIn";
import { Header } from "./Header";
export class HomePage extends React.Component {
  // handleClicked(){
  //     window.location.href="/searchResult"
  // }
  render() {
    return (
      <>
        {this.props.data ? <HeaderLoggedIn /> : <Header />}
        <div className="search-bg">
          <div className="p-2 ">
            <h2 className="fw-bolder my-2">Welcome to BlueDot</h2>
          </div>
          <div>
            <a href="/search" className="btn btn-warning">
              Search your favorite story from 1 Audio
            </a>
            <a href="#" className="btn btn-warning">
              Search your favorite story from 2 Audios
            </a>

            {/* <audio src={''}></audio> */}
          </div>
        </div>
      </>
    );
  }
}
