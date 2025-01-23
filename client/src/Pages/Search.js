import React from "react";
import { Header } from "./Header";
import { HeaderLoggedIn } from "./HeaderLoggedIn";
import { SearchInput } from "./../components/SearchInput";
import { SearchInput2 } from "../components/SearchInput2";

export class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: {},
      audio2: {},
      searchTxt: "",
      searchTxt3: "",
      searchTxt4: "",
      searchTxt2: "",
      searchTxt5: "",
      searchTxt6: "",
      selectFlag: false,
      url: "",
      play: false,
      play2: false,
      msg: "",
      loading: false,
      loading2: false,
      replayFlag: false,
      apiUrl: "/api/get/",
      apiUrl2: "/api/get2/",
      dropdownValue: "none",
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearch2 = this.handleSearch2.bind(this);
    this.handleSearch3 = this.handleSearch3.bind(this);
    this.handleSearch4 = this.handleSearch4.bind(this);

    this.handleSearch5 = this.handleSearch5.bind(this);
    this.handleSearch6 = this.handleSearch6.bind(this);
    this.handleDropDown = this.handleDropDown.bind(this);
    this.replayAudio = this.replayAudio.bind(this);
    this.replayAudio2 = this.replayAudio2.bind(this);
  }

  handleSearch(event) {
    this.setState({ searchTxt: event.target.value });
  }
  handleSearch2(event) {
    this.setState({ searchTxt2: event.target.value });
  }

  handleSearch3(event) {
    this.setState({ searchTxt3: event.target.value });
  }
  handleSearch4(event) {
    this.setState({ searchTxt4: event.target.value });
  }
  handleSearch5(event) {
    this.setState({ searchTxt5: event.target.value });
  }
  handleSearch6(event) {
    this.setState({ searchTxt6: event.target.value });
  }

  replayAudio(e) {
    e.preventDefault();
    var maudio = new Audio("mainaudio.mp3");
    var audio = new Audio(this.state.audio.file);
    maudio.play();
    audio.play();
  }
  replayAudio2(e) {
    e.preventDefault();
    var maudio = new Audio("mainaudio.mp3");
    var audio = new Audio(this.state.audio2.doc[0].file);
    var audio1 = new Audio(this.state.audio2.doc1[0].file);
    maudio.play();
    audio.play();
    audio1.play();
  }

  handleDropDown(event) {
    // let flagSelect = event.target.value
    this.setState({ dropdownValue: event.target.value });
    console.log(this.state.dropdownValue);
  }

  render() {
    return (
      <div>
        {(() => {
          if (this.state.dropdownValue === "none") {
            return (
              <div>
                {this.props.data ? <HeaderLoggedIn /> : <Header />}
                <div className="search-bg">
                  <div className=" Seach_container py-5 ">
                    <h1 className="m-5">Search your favorite Story here</h1>
                    <h2>Please Select Searches Type: </h2>

                    <select
                      name="SelectTable"
                      id="SelectTable"
                      className="selectTable"
                      value={this.state.dropdownValue}
                      onChange={this.handleDropDown}
                    >
                      <option value="none">Select Audio Search</option>
                      <option value="oneAudio">One Audio Search</option>
                      <option value="twoAudio">Two Audio Search</option>
                    </select>
                  </div>
                </div>
              </div>
            );
          } else if (this.state.dropdownValue === "oneAudio") {
            return (
              <div>
                {" "}
                {this.props.data ? <HeaderLoggedIn /> : <Header />}
                <select
                  name="SelectTable"
                  id="SelectTable"
                  className="selectTable"
                  value={this.state.dropdownValue}
                  onChange={this.handleDropDown}
                >
                  <option value="none">Select Audio Search</option>
                  <option value="oneAudio">One Audio Search</option>
                  <option value="twoAudio">Two Audio Search</option>
                </select>
                <div>
                  <div className="search-bg">
                    <div className=" Seach_container py-5 ">
                      <h1 className="m-5">Search your favorite Story here</h1>

                      <h3 className="m-5">Search From Table1</h3>

                      <SearchInput />
                    </div>

                    <div className=" Seach_container py-5 "></div>
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div>
                {" "}
                {this.props.data ? <HeaderLoggedIn /> : <Header />}
                <select
                  name="SelectTable"
                  id="SelectTable"
                  className="selectTable"
                  value={this.state.dropdownValue}
                  onChange={this.handleDropDown}
                >
                  <option value="none">Select Audio Search</option>
                  <option value="oneAudio">One Audio Search</option>
                  <option value="twoAudio">Two Audio Search</option>
                </select>
                <div>
                  <div className="search-bg">
                    <div className=" Seach_container py-5 ">
                      <h1 className="m-5">Search your favorite Story here</h1>

                      <h3 className="m-5">Search From Table1 and Table2</h3>
                      <SearchInput2 />
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        })()}
      </div>
    );
  }
}
