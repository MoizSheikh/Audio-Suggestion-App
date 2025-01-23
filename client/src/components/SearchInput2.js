import React from "react";

export class SearchInput2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audioData: [],
      searchTxt: "",
      searchTxt2: "",
      searchTxt11: "",
      searchTxt22: "",
      msg: "",
      flag: false,
      audio: new Audio(),
      audio2: new Audio(),
      mainAudio: new Audio("mainaudio.mp3"),
      response: {},
      success: false,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearch2 = this.handleSearch2.bind(this);
    this.handleSearch3 = this.handleSearch3.bind(this);
    this.handleSearch4 = this.handleSearch4.bind(this);
    this.SubmitSearch = this.SubmitSearch.bind(this);

    this.handleAudio = this.handleAudio.bind(this);

    this.handleAudio2 = this.handleAudio2.bind(this);
  }
  handleAudio(url) {
    this.setState({ audio: new Audio(url) });
  }
  handleAudio2(url) {
    this.setState({ audio2: new Audio(url) });
  }

  playAudio() {
    this.state.mainAudio.play();
    this.state.audio2.play();
    this.state.audio.play();
  }

  handleSearch(event) {
    this.setState({ searchTxt: event.target.value });
  }

  handleSearch2(event) {
    this.setState({ searchTxt2: event.target.value });
  }
  handleSearch3(event) {
    this.setState({ searchTxt11: event.target.value });
  }

  handleSearch4(event) {
    this.setState({ searchTxt22: event.target.value });
  }

  SubmitSearch(e) {
    e.preventDefault();
    this.setState({ msg: "" });
    if (this.validateFields()) {
      this.getAudioResponse(this.state.searchTxt, this.state.searchTxt11).then(
        (callback) => {
          console.log(callback);
          if (
            callback.succes &&
            callback.data &&
            callback.data.doc.length !== 0 &&
            callback.data.doc1.length !== 0
          ) {
            if (callback.data.doc[0].file && callback.data.doc1[0].file) {
              this.setState({ audioData: callback.data });
              this.handleAudio(callback.data.doc[0].file);
              this.handleAudio2(callback.data.doc1[0].file);
              this.playAudio();
              console.log("found in first search");
            }
          } else {
            this.getAudioResponse(
              this.state.searchTxt2,
              this.state.searchTxt22,
            ).then((callback2) => {
              console.log(callback2);
              if (
                callback2.succes &&
                callback2.data &&
                callback2.data.doc.length !== 0 &&
                callback2.data.doc1.length !== 0
              ) {
                this.setState({ audioData: callback2.data });
                this.handleAudio(callback2.data.doc[0].file);
                this.handleAudio2(callback2.data.doc1[0].file);
                this.playAudio();
                console.log("found in second search");
              } else {
                for (let i = 0; i < this.state.searchTxt.length - 1; i++) {
                  var splitText1 = this.state.searchTxt.slice(
                    0,
                    this.state.searchTxt.length - (i + 1),
                  );
                  this.getAudioResponseTable1(splitText1).then((callback3) => {
                    if (callback3.succes && callback3.data) {
                      this.setState({ flag: true });
                      this.setState({ msg: "" });
                      this.setState({ audioData: callback3.data });
                      this.handleAudio(callback3.data.file);
                      for (
                        let i = 0;
                        i < this.state.searchTxt11.length - 1;
                        i++
                      ) {
                        var splitText2 = this.state.searchTxt11.slice(
                          0,
                          this.state.searchTxt11.length - (i + 1),
                        );
                        this.getAudioResponseTable2(splitText2).then(
                          (callback4) => {
                            if (callback4.succes && callback4.data) {
                              this.setState({ flag: true });
                              this.setState({ msg: "" });
                              this.setState({ audioData: callback4.data });
                              this.handleAudio2(callback4.data.file);
                              this.playAudio();
                              console.log("Audio found during drilling");
                              return false;
                            } else {
                              this.setState({ msg: "Audio Not Found" });
                              this.setState({ flag: false });
                            }
                          },
                        );
                      }
                      console.log("Audio found during drilling");
                      return false;
                    } else {
                      this.setState({ msg: "Audio Not Found" });
                      this.setState({ flag: false });
                    }
                  });
                }
              }
            });
          }
        },
      );
    } else {
      alert("primary search cannot be empty");
    }
  }

  getAudioResponse(name1, name2) {
    return fetch(`/api/get2/?name1=${name1}&name2=${name2}`).then((response) =>
      response.json(),
    );
  }
  getAudioResponseTable2(name) {
    return fetch(`/api/table2/get/?name=${name}`).then((response) =>
      response.json(),
    );
  }
  getAudioResponseTable1(name) {
    return fetch(`/api/get/?name=${name}`).then((response) => response.json());
  }

  validateFields() {
    if (this.state.searchTxt !== "" && this.state.searchTxt11 !== "")
      return true;
    else return false;
  }

  render() {
    return (
      <div>
        <form className="">
          <span
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <span style={{ display: "flex", flexDirection: "column" }}>
              {/* table one inputs */}
              <label htmlFor="">Table one Inputs</label>
              <input
                className="searchInput"
                value={this.state.searchTxt}
                onChange={this.handleSearch}
                type="text"
                htmlFor="searchWavInput"
                id="searchWavInput"
                placeholder="Search here"
              />
              <input
                className="searchInput"
                value={this.state.searchTxt2}
                onChange={this.handleSearch2}
                type="text"
                htmlFor="searchWavInput2"
                id="searchWavInput2"
                placeholder="Search here secondary"
              />
            </span>
            <span style={{ display: "flex", flexDirection: "column" }}>
              {/* table two inputs */}
              <label htmlFor="">Table two Inputs</label>
              <input
                className="searchInput"
                value={this.state.searchTxt11}
                onChange={this.handleSearch3}
                type="text"
                htmlFor="searchWavInput"
                id="searchWavInput5"
                placeholder="Search here"
              />
              <input
                className="searchInput"
                value={this.state.searchTxt22}
                onChange={this.handleSearch4}
                type="text"
                htmlFor="searchWavInput2"
                id="searchWavInput6"
                placeholder="Search here secondary"
              />
            </span>
          </span>
          <button
            onClick={(e) => this.SubmitSearch(e)}
            type="submit"
            className=" mx-2 searchBtn"
          >
            Search Audio
          </button>
        </form>
        <div>{this.state.msg}</div>
      </div>
    );
  }
}
