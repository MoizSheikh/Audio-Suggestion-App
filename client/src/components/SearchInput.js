import React from "react";

export class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audioData: [],
      searchTxt: "",
      searchTxt2: "",
      msg: "",
      audio: new Audio(),
      mainAudio: new Audio("mainaudio.mp3"),
      response: {},
      success: false,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearch2 = this.handleSearch2.bind(this);
    this.SubmitSearch = this.SubmitSearch.bind(this);
    this.handleAudio = this.handleAudio.bind(this);
  }
  handleAudio(url) {
    this.setState({ audio: new Audio(url) });
  }

  playAudio() {
    this.state.mainAudio.play();
    this.state.audio.play();
  }

  handleSearch(event) {
    this.setState({ searchTxt: event.target.value });
  }

  handleSearch2(event) {
    this.setState({ searchTxt2: event.target.value });
  }

  SubmitSearch(e) {
    e.preventDefault();
    this.setState({ msg: "" });
    if (this.validateFields()) {
      this.getAudioResponse(this.state.searchTxt).then((callback) => {
        console.log(callback);
        if (callback.succes && callback.data) {
          this.setState({ audioData: callback.data });
          this.handleAudio(this.state.audioData.file);
          this.playAudio();
          console.log("found in first search");
          console.log(this.state.searchTxt);
        } else {
          //if(this.state.searchTxt2!==""){
          this.getAudioResponse(this.state.searchTxt2).then((callback2) => {
            console.log(callback2);
            if (callback2.succes && callback2.data) {
              this.setState({ audioData: callback2.data });
              this.handleAudio(this.state.audioData.file);
              this.playAudio();
              console.log("found in second search");
              console.log(this.state.searchTxt2);
            } else {
              for (let i = 0; i < this.state.searchTxt.length - 1; i++) {
                var splitText = this.state.searchTxt.slice(
                  0,
                  this.state.searchTxt.length - (i + 1),
                );
                console.log(splitText);
                this.getAudioResponse(splitText).then((callback3) => {
                  if (callback3.succes && callback3.data) {
                    this.setState({ msg: "" });
                    this.setState({ audioData: callback3.data });
                    this.handleAudio(this.state.audioData.file);
                    this.playAudio();
                    console.log("Audio found during drilling");
                    return false;
                  } else {
                    this.setState({ msg: "Audio Not Found" });
                  }
                });
              }
            }
          });
        }
      });
    } else {
      alert("primary search cannot be empty");
    }
  }

  getAudioResponse(name) {
    return fetch(`/api/get/?name=${name}`).then((response) => response.json());
  }

  validateFields() {
    if (this.state.searchTxt === "") return false;
    else return true;
  }

  render() {
    return (
      <div>
        <form action="" className="">
          <input
            className="searchInputt1"
            value={this.state.searchTxt}
            onChange={this.handleSearch}
            type="text"
            htmlFor="searchWavInput"
            id="searchWavInput"
            placeholder="Search here"
          />
          <input
            className="searchInputt1"
            value={this.state.searchTxt2}
            onChange={this.handleSearch2}
            type="text"
            htmlFor="searchWavInput2"
            id="searchWavInput2"
            placeholder="Search here secondary"
          />
          <div>
            <button
              onClick={(e) => this.SubmitSearch(e)}
              type="submit"
              className=" mx-2 searchBtn"
            >
              Search Audio
            </button>
          </div>
        </form>
        <div>{this.state.msg}</div>
      </div>
    );
  }
}
