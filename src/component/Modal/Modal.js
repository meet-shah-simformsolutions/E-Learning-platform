import React,{useEffect, useState} from 'react';

function Modal(props) {
    const [modalDisplay, setModalDisplay] = useState("block");
    useEffect(() => {
      console.log("Modal rendered");
      console.log(props.url);
      console.log(props.title);
    }, [])
    const myModalClickHandler = () =>{
      setModalDisplay("none")
      props.resetModal()
    }
    return (
        <div>
            <div
                id="myModal"
                className="modal"
                style={{ display: modalDisplay}}
                onClick={() => myModalClickHandler()}
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <span className="close">&times;</span>
                    <h6> {props.title}</h6>
                  </div>
                  <div className="modal-body">
                    <div className="videoContainer">
                      <video controls>
                        <source
                          src={props.url}
                          type="video/mp4"
                        />
                        <source
                          src={props.url}
                          type="video/ogg"
                        />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                </div>
              </div>
        </div>
    );
}

export default Modal;