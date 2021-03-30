import React, { useEffect, useState } from "react";
import "./WorkshopList.css"
import data from "../../workshopData.json"
import { Link } from "react-router-dom";
function WorkshopList(props) {
  const [mainDataSource, setMaindataSource] = useState(data); /*do not change*/
  const [dataSource, setDataSource] = useState(data);
  const [imgcss,setImgcss] = useState("topic-logo odd")
  const [regcss,setRegcss] = useState("reg-icon-odd")
  const [test,setTest] = useState(false)
  const LoadData = (props) =>{
    const check = (i) =>{
      if(i%2 === 0){
        // console.log("inside if")
        // console.log("old",imgcss)

        //   setImgcss("topic-logo even")
        //   console.log(imgcss)
        //   setRegcss("reg-icon-even")
        setTest(true)
        }
    }
    return(
      props.data.map((data,i)=>{
        console.log("old",i)
        check(i)
        console.log(i)
        
        return (
          <div className="topic-com">
            
          <div 
          // className={ test ? "topic-logo even" : "topic-logo odd"}
          className="topic-logo"
          >
            <img src={data.workshopImg} alt="" />
          </div>
          <div className="workshopTitle">
            <h1>{data.workshoptitle}</h1>
          <div className="instructor">
            <div className="instructor-img">
                <img src={data.instructorImg} alt="instructor" />
            </div>
            <div className="instructor-details">
                {data.workshopBy}<br/>
                <div className="instructorPosition">
                {data.instructorPosition}
                </div>
            </div>
           
          </div>
          <div className="workshopDesc">
            <p>{data.workshopDesc}</p>
          </div>
          <div className= "reg-icon" title="Register for Angular">
            <Link to="/Registration">
              <button className="Workshop-Reg-btn">Register Now</button>
            </Link>
          </div>
            </div>
          {/* <div className={ test ? "reg-icon-even" : "reg-icon-odd"} title="Register for Angular">
            <Link to="/Registration">
              <button className="RegisterButton">Register Now</button>
            </Link>
          </div> */}
        </div>
        )
      })
    )
  }
  return (
    <div>
      <section>
        <div className="body-1">
          <div className="nav-first">
            <div className="Workshop-Title">Workshop Station</div>
          </div>
        </div>
        <div className="Listcard"> 
        <LoadData data={dataSource}/>

        </div>
        {/* <div class="topic-com one">
          <div class="topic-logo even ">
            <img src="img/angular-2.png" alt="" />
          </div>

          <div class="reg-icon-even" title="Register for Angular">
            <Link to="/Registration">
              <img src="img/reg-icon-1.png" alt="" />
            </Link>
          </div>
        </div>
        <div class="topic-com two">
          <div class="topic-logo odd">
            <img src="img/react-1.png" alt="" />
          </div>
          <div class="reg-icon-odd" title="Register for React">
            <Link to="/Registration">
              <img src="img/reg-icon-2.png" alt="" />
            </Link>
          </div>
        </div>
        <div class="topic-com three">
          <div class="topic-logo even">
            <img src="img/vue-1.png" alt="" />
          </div>
          <div class="reg-icon-even" title="Register for Vue">
            <Link to="/Registration">
              <img src="img/reg-icon-3.png" alt="" />
            </Link>
          </div>
        </div>
        <div class="topic-com four" style={{marginBottom: "20px"}}>
          <div class="topic-logo odd">
            <img src="img/node-1.png" alt="" />
            
          </div>
          <div class="reg-icon-odd" title="Register for Node">
            <Link to="/Registration">
              <img src="img/reg-icon-4.png" alt="" />
            </Link>
          </div>
        </div> */}
      </section>
    </div>
  );
}

export default WorkshopList;
