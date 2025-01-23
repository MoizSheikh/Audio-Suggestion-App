import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import { Header } from './Header';
import { HeaderLoggedIn } from './HeaderLoggedIn';

export class AdminPanel extends React.Component {

    constructor(props){
        super(props);
        if(!props.data){
             window.location.href="/login";
        }
        if(!props.isAdmin){
            
             window.location.href="/";
        }
        this.state={audios:[],audios2:[]};
        this.getAllAudios=this.getAllAudios.bind(this);
    }
    getAllAudios(){
        fetch("/api/getAll")
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            this.setState({audios:data.data});
        })
    }
    getAllAudios2(){
        fetch("/api/getAll2")
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            this.setState({audios2:data.data});
        })
    }
    componentDidMount(){
        this.getAllAudios();
        this.getAllAudios2();
    }
    deleteAudio(id){
        if(window.confirm("Are you sure you want to delete?")){
            fetch(`/api/delete/${id}`,{method:'DELETE'})
            .then(response=>response.json())
            .then(data=>{
                if(data.succes){
                    alert(data.message);
                    window.location.href="/admin";
                }
            })
        }

    }
    deleteAudio2(id){
        if(window.confirm("Are you sure you want to delete?")){
            fetch(`/api/delete2/${id}`,{method:'DELETE'})
            .then(response=>response.json())
            .then(data=>{
                if(data.succes){
                    alert(data.message);
                    window.location.href="/admin";
                }
            })
        }

    }

    render() {
        
        return (
          <>
          <HeaderLoggedIn isAdmin={this.props.isAdmin}/>
            <div className="admin_container">
                <div className="tutorHeading mt-3">
                <h1>Welcome Admin</h1>
                </div>
                <div className="tutorMain">
                    
                    <hr/>
                    <div className="d-flex addAudiosBtn justify-content-around">

                     <a href="/addaudio" className="btn btn-success">Add Audio file DATABASE 1</a>
                     <a href="/addaudio2" className="btn btn-success">Add Audio file DATABASE 2</a>
                    </div>
                    <hr/>
                    {/* <div className="vl"></div> */}
                    <div className="AudioHeadingList d-flex justify-content-around">
                        <h3>Database1 Files</h3>
                        <h3>Database2 Files</h3>
                    </div>
                   <div className="audioLists">
                   <h3>Database1 Files</h3>
                   <div className="AudioList1">
                       {
                           this.state.audios.map((eachAudio,i)=>{
                               return(
                                   <div>
  <Card className="admin_AudioList p-2 mx-1 mb-2">
                            {/* Index Number */}
                            <span>{i}</span>

                            <div className="title fw-bolder">
                                {eachAudio.name.map(eachName=>{
                                    return(
                                        <div>
                                            {eachName}
                                        </div>
                                    )
                                })}
                            </div>
                            <audio controls>
                                    <source src={eachAudio.file} autoPlay type="audio/mp3"/>
                            </audio>
                            <div className="AdminBtns">
                                <button className="btn btn-warning mx-2 ">
                                    Edit
                                </button>
                                <button onClick={()=>this.deleteAudio(eachAudio._id)} className="btn btn-danger">
                                    Delete
                                </button>
                            </div>
                        </Card>
                      
                                   </div>
                               )
                           })
                       }
                        
                      
                   </div>
                   <h3>Database2 Files</h3>
                   <div className="AudioList2">
                       {
                           this.state.audios2.map((eachAudio,i)=>{
                               return(
                                   <div>
                                <Card className="admin_AudioList p-2 mx-1 mb-2">
                            {/* Index Number */}
                            <span>{i}</span>

                            <div className="title fw-bolder">
                                {eachAudio.name.map(eachName=>{
                                    return(
                                        <div>
                                            {eachName}
                                        </div>
                                    )
                                })}
                            </div>
                            <audio controls>
                                    <source src={eachAudio.file} autoPlay type="audio/mp3"/>
                            </audio>
                            <div className="AdminBtns">
                                <button className="btn btn-warning mx-2 ">
                                    Edit
                                </button>
                                <button onClick={()=>this.deleteAudio2(eachAudio._id)} className="btn btn-danger">
                                    Delete
                                </button>
                            </div>
                        </Card>
                      
                                   </div>
                               )
                           })
                       }
                        
                      
                   </div>
                   </div>
                </div>
                    
            </div>   
          </>             
        )
    }
}
