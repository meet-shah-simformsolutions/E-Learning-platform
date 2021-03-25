import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import "./Notification.css";
function Notification(props) {
  useEffect(() => {
    console.log("notification rendered");
    // alert()
  }, []);
  const handleClicked = (e) => {
    e.stopPropagation();
    props.showNotification();
    console.log("notification function");
  };
  const clearNotification = (e) => {
    e.stopPropagation();
    props.ClearNotificationList();
    console.log("notification function");
  };

  return (
    <div>
      <div className="NotificationContainer white bottom">
        <div className="NotificationTitle">
          <h3>Notifications</h3>
          <hr />
        </div>
        {props.notificationItems.length > 0 ? props.notificationItems.map((data) => (
          <div className="NotificationItem white">
            <div className="ItemTitle">{data.msg}</div>
            {data.time ? <div className="ItemTime">{data.time}</div> :null}
          </div>
        )) : (
            <div className="NotificationItem white">
            <div className="noActivity">No Activity Found</div>
          </div>
        ) }
        {props.notificationItems.length > 0 ? (
          <div
            className="ClearNotification"
            onClick={(e) => clearNotification(e)}
          >
            Clear Notification
          </div>
        ) : null}

        <div className="closeNotofication" onClick={(e) => handleClicked(e)}>
          Close
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    notificationItems: state.cartDetails.notificationItems,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    showNotification: () => dispatch(actions.showNotification()),
    ClearNotificationList: () => dispatch(actions.ClearNotificationList()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Notification);
