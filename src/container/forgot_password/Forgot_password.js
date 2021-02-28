import React, { Component } from "react";
class Forgot_Password extends Component {
  render() {
    return (
      <div>
        <div className="Signup">
          <div className="title">
            <h2>
              <strong>Forgot Password</strong>
            </h2>
            <hr className="line" />
          </div>
          <div className="form-details">
          <form>
            <div className="container">
              <label className="container-label">
                <img src="../img/email_1.png" alt="first name" />
              </label>
              <input
                required
                type="email"
                className="container-input"
                placeholder="Enter Email"
              />
            </div>
            <div className="container">
              <button className="reset-btn" onClick={this.clickHandler}>
                Reset
              </button>
            </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Forgot_Password;
