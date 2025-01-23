
import React from 'react'
import { Card } from '../components/Card'

export class TutorPanel extends React.Component {

    constructor(props){
        super(props);
        console.log(props);
      this.state={courses:[],students:[],img:'./uploads/'}
      this.getCourses=this.getCourses.bind(this);
      
      this.getStudentCourse=this.getStudentCourse.bind(this);
    //   if(!props.data){
    //       window.location.href="/logintutor";
    //   }
      this.getCourses();
      this.getStudentCourse();
}



getCourses(){
    const id=localStorage.getItem("tutor_id");
    
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
fetch(`/api/tutor/getCourse/${id}`,{headers:myHeaders})
.then(response => response.json())
.then(data => {
    console.log(data);
    this.setState({ courses:data.data});
    
    console.log(this.state);
}
    )
}

getStudentCourse(){
    const id=localStorage.getItem("tutor_id");
    
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
    fetch(`/api/tutor/getEnrolled/${id}`,{headers:myHeaders})
    .then(response => response.json())
    .then(data => {
        console.log(data);
       this.setState({ students:data});
        
       
        console.log(this.state);
    }
        )

}

EachCoursePage(id){
    localStorage.setItem("course_id",id);
    window.location.href="/eachcourse";
}

AddCourse(){
    window.location.href="/addcourse";
}

    render(){
        
        
    return (
        <div>
            
            <div className="tutorHeading mt-3">
                <h1>Welcome Admin</h1>
            </div>
            <div className="tutorMain">
                
                <hr/>
            <button className="btn btn-success">Add Audio Wav file</button>
                </div>
                
            </div>
    )
    }
}
