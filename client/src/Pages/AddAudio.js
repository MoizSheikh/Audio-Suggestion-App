import React from "react";
import { Form } from "react-bootstrap";
import { HeaderLoggedIn } from "./HeaderLoggedIn";

export class AddAudio extends React.Component {
  constructor(props) {
    super(props);
    if (!props.data) {
      window.location.href = "/login";
    }
    if (!props.isAdmin) {
      window.location.href = "/";
    }
    this.state = { name1: "", name: [], file: "" };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({ name1: event.target.value });
  }
  handleFileChange(event) {
    this.setState({ file: event.target.files[0] });
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", this.state.file);
    formData.append("name", this.state.name1);

    const requestOptions = {
      method: "POST",
      body: formData,
    };
    fetch("/api/add", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.succes) {
          alert(data.message);
          window.location.href = "/admin";
        } else {
          alert(data.message);
        }
        console.log(data);
      });
  }

  render() {
    //}

    // function AddAudio(props) {
    //   const {isAdmin,data} = props;
    //   const [audioArray, setInputList] = useState([{ file: "", name: "" }]);

    //   const handleInputChange = (e, index) => {
    //     const { name, value } = e.target;
    //     const list = [...audioArray];
    //     list[index][name] = value;
    //     setInputList(list);
    //   };

    //   const gotologin=()=>{
    //     if(!localStorage.id){
    //       // window.location.href="/login";
    //   }
    //   }
    //   gotologin()
    //   const handleFileChange=(e,index)=>{
    //       const list=[...audioArray];
    //       list[index]["file"]=e.target.files[0];
    //       setInputList(list)
    //   }

    //   // handle click event of the Remove button
    //   const handleRemoveClick = index => {
    //     const list = [...audioArray];
    //     list.splice(index, 1);
    //     setInputList(list);
    //   };

    //   // handle click event of the Add button
    //   const handleAddClick = () => {
    //     setInputList([...audioArray, { file: "", name: "" }]);
    //   };

    //   const handleSubmit=()=>{
    //     const formData = new FormData();
    //     console.log(audioArray);
    //     audioArray.map(i=>{
    //       var arr=i.name.split(',');
    //       i.name=arr;

    //       formData.append("file",i.file);
    //     });
    //     console.log(audioArray);
    //     let audioData=JSON.stringify({
    //       audioArray
    //     });
    //     var myHeaders = new Headers();
    //     myHeaders.append("Content-Type","application/json")
    //     const requestOptions = {
    //       method: 'POST',
    //       headers:myHeaders,
    //       body: audioData
    //     };
    //     fetch(`/api/add`,requestOptions)
    //     .then(response=>response.json())
    //     .then(data=>{
    //       if(data.succes){
    //         alert(data.message);
    //         window.location.href="/admin"
    //       }
    //       else{
    //         alert(data.message)
    //       }
    //       console.log(data);
    //     })
    //   }
    return (
      <>
        <HeaderLoggedIn isAdmin={this.props.isAdmin} />

        <h3 className="AddAudiosHeading">Add Audio Wav Files</h3>

        <hr />
        <div className="AddAudiosContainer">
          {/* {this.audioArray.map((x, i) => {
        return ( */}
          <div className="AddAudio_box">
            {/* <input type="file" /> */}
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Choose The Audio File</Form.Label>
              <Form.Control
                onChange={(e) => this.handleFileChange(e)}
                type="file"
              />
            </Form.Group>
            {/* <input
                      name="file"
          placeholder="Enter First Name"
                      value={x.file}
                      onChange={e => handleInputChange(e, i)}
                    /> */}
            {/* <SimpleFileUpload
            apiKey="db7e4ec99ca79d77e24367867422a7a1"
            onSuccess={e => handleFileChange(e, i)}
          /> */}
            <input
              className="ml10 my-2"
              name="name"
              placeholder="Enter Audio Name"
              value={this.state.name1}
              onChange={(e) => this.handleInputChange(e)}
            />
            {/* <div className="btn-box">
                      {this.audioArray.length !== 1 && <button
                        className="mr10 btn btn-danger"
                        onClick={() => this.handleRemoveClick(i)}>Remove</button>}
                      {this.audioArray.length - 1 === i && <button class="btn btn-primary mx-3" onClick={this.handleAddClick}>Add</button>}
            </div> */}
          </div>

          {/* <div style={{ marginTop: 20 }}>{JSON.stringify(audioArray)}</div> */}
        </div>
        <hr />
        <div className="AddAudioSubmit fw-bolder my-3">
          <button
            onClick={(e) => this.handleSubmit(e)}
            className="btn btn-primary"
          >
            Submit all Audios
          </button>
        </div>
      </>
    );
  }
}

//export default AddAudio;
