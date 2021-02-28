import React, { Component } from "react";
import "../css/form_style.css";
class Form extends Component {
  render() {
    return (
      <div>
        <div>
          {/* <div id="edit_mode_lable">{this.state.edit_lable}</div> */}

          <div id="form">
            {/* <form onSubmit={this.handleClick.bind(this)} > */}
            <div class="align_form">
              <label>Employee Name</label>
              <input
                required
                name=""
                type="text"
              />
            </div>
            <label>Email</label>
            <input
              required
              name=""
              type="email"
            />
            <label>Total years of experience</label>
            <input
              required
              name=""
              type="number"
            />
            <label>Previous Company</label>
            <input
              required
              name=""
              type="text"
            />
            <label>Last Salary</label>
            <input
              name=""
              type="number"
            />

            <br></br>
            <div style={{ display: "flex" }}>
              <button >
                add
              </button>
              <button>
                add at top
              </button>
              {/* <input type="submit" id="btn_submit" value={this.state.button_submit}/>
            <input type="button" id="btn_top" value={this.state.button_filter}/> */}
            </div>
            {/* </form> */}
          </div>

          <hr />
          <div id="table_data">
            <table className="">
              <thead>
                <tr>
                  <th id="thead_data">Employee Name</th>
                  <th id="thead_data">Email</th>
                  <th id="thead_data">Total years of experience</th>
                  <th id="thead_data">Previous Company</th>
                  <th id="thead_data">Last Salary</th>
                  <th id="thead_data">Action</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
