import React, { useRef, useState } from "react";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import {  useHistory } from "react-router-dom";
import axios from "../../axios-order";
function Admin (props){
  const [alertCss, setAlertCss] = useState("danger");
  const [data,setData] = useState(null)
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg,setMsg] = useState('')
  const userID = useRef();
  const courseId = useRef()
  const history = useHistory();
  const fetchData = (id) =>{

    return new Promise((resolve,reject)=>{
        if(id){
            axios.get(`/CourseData/${id}.json`)
            .then((res)=>{
                console.log(res.data);
                // setData(res.data)
                resolve(res.data)
            })
            .catch((error)=>{
                setError(error)
                reject(error)
            })
        }
      })
}
       
   function handleSubmit(e) {
    e.preventDefault();
    fetchData(courseId.current.value).then((data)=>{
        console.log(data);
        console.log(userID.current.value);
        props.giftCourse(data,userID.current.value);
        setMsg('Course has been gifted')
        setAlertCss("success")
        setTimeout(()=>{
            setMsg("")
            userID.current.value=""
            courseId.current.value=""
            setError("");
        },3000)
    }).catch((error)=>{
        console.log(error);
    })
    // try {
    //   setError("");
    //   setLoading(true);
    //   await fetchData(courseId.current.value);
    //     props.giftCourse(data,userID.current.value);
    //   setMsg('Course has been gifted')
    //   setAlertCss("success")
    //   setTimeout(()=>{
    //     setMsg("")
    //     userID.current.value=""
    //     courseId.current.value=""
    //     setError("");
    //   },3000)
    
    // } catch {
    //   setError("Failed to Gift Course");
    // }
    setLoading(false);
  }
//   async function fetchData  (id) {
//       axios.get(`/CourseData/${id}.json`)
//       .then((res)=>{
//           console.log(res.data);
//           setData(res.data)
//       })
//       .catch((error)=>{
//           setError(error)
//       })
//   }
    return (
      <div>
        <div className="Admin">
          <div className="title">
            <h2>
              <strong className="white">Admin</strong>
            </h2>
            <hr className="line" />
          </div>
          {msg &&  <div className={alertCss}>{msg}</div>}
          {error && <div className={alertCss}>{error}</div>}
          <div className="form-details">
          <form>
            <div className="container">
              <label className="container-label">
                <img src="../img/user.png" alt="first name" />
              </label>
              <input
              ref={userID}
                required
                type="text"
                className="container-input"
                placeholder="Enter User Id"
              />
              </div>
              <div>
              <label className="container-label">
                <img src="../img/course.png" alt="first name" />
              </label>
              <input
              ref={courseId}
                required
                type="text"
                className="container-input"
                placeholder="Enter Course Id"
              />
            </div>
            <div className="container">
            <button disabled={loading} className="gift-btn" onClick={handleSubmit} >
                Gift Course
              </button>
              
            </div>
            </form>
          </div>
        </div>
      </div>
    );
  
}
const mapStateToProps = (state) => {
    return {

    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
        giftCourse:(data,id)=>dispatch(actions.giftCourse(data,id))
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(Admin);
  