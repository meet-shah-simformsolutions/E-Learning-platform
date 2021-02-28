import React from "react";
import "../css/Registration.css"
function Registration(props) {
  return (
    <div>
      <div className="main-registration">
        <div className="sub-registration">
          <img src="./img/reg-logo.png" className="reg-logo" alt="reg-logo" />
        </div>
        <div className="main-data">
          <form action="" name="myform">
            <div className="reg-name-email">
              <div className="reg-flex-container">
                <div className="reg-name">
                  <label for="Name" className="l1">
                    Name
                  </label>
                  <input
                    className="i1"
                    name="sname"
                    type="text"
                    maxlength="50"
                    size="50"
                    required
                    placeholder="Enter Your Name"
                  />
                </div>
                <div
                  className="reg-email"
                >
                  <label for="email" className="l2">
                    Email
                  </label>
                  <input
                    autocomplete=""
                    name="email"
                    type="email"
                    className="i2"
                    maxlength="50"
                    size="50"
                    required
                    placeholder="Enter Your Email"
                  />
                </div>
              </div>
            </div>
            <div className="reg-tel-drop">
              <div className="reg-flex-container">
                <div className="reg-tel">
                  <label for="tel" className="l3">
                    Phone
                  </label>
                  <input
                    className="i3"
                    type="tel"
                    name="phone"
                    maxlength="50"
                    size="50"
                    required
                    placeholder="Enter Your Phone-Number"
                  />
                </div>
                <div
                  className="reg-topic"
                >
                  <label for="Name" className="l4">
                    Topic
                  </label>
                  <select className="i4" name="cars">
                      <option value="Angular">Angular</option>
                      <option value="React">React</option>
                      <option value="Vue">Vue</option>
                      <option value="Node">Node</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="reg-future-goal">
              <div className="reg-flex-container">
                <div
                  className="reg-goal"
                >
                  <label for="future-goal" className="l5">
                    Future Goal
                  </label>
                  <input
                    className="i5"
                    type="text"
                    maxlength="50"
                    size="50"
                    required
                    placeholder="Enter your Future Goal"
                  />
                </div>
                <div
                  className="reg-date"
                >
                  <label for="date" className="l6">
                    Date
                  </label>
                  <input type="date" className="i6" required />
                </div>
              </div>
            </div>
            <div className="reg-submit">
              <div
                className="reg-flex-container"
              >
                <div className="submit-button" >
                  <a href="registration.html">
                    {" "}
                    <input type="submit" className="button1" value="Submit" style={{width:"150px"}}/>
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;
