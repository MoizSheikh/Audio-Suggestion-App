import React from "react";

export class MyCourseCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
  }
  render() {
    return (
      <div className="myCourseCard d-flex">
        <div className="myCourseCard_pic">
          <img src={"/uploads/" + this.props.course_id.img} alt="card_pic" />
        </div>
        <div className="myCourseCard_details">
          <h3>Course: {this.props.course_id.title}</h3>
          <h4>
            Tutor:{" "}
            {this.props.tutor_id.first_name +
              " " +
              this.props.tutor_id.last_name}
          </h4>
        </div>
        <button className="myCourseCard_btn bg-primary fw-bolder text-white btn">
          View Course
        </button>
      </div>
    );
  }
}
