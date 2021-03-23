import React,{useEffect, useState} from 'react';

function Modal(props) {
    const [modalDisplay, setModalDisplay] = useState("block");
    useEffect(() => {
        console.log("Modal rendered");
        console.log(props.url);
        console.log(props.title);
        // setTimeout(() => {
        //     props.setModal()
        // }, 1000);
    }, [])
    
    return (
        <div>
            <div
                id="myModal"
                class="modal"
                style={{ display: modalDisplay}}
                onClick={() => setModalDisplay("none")}
              >
                <div class="modal-content">
                  <div class="modal-header">
                    <span class="close">&times;</span>
                    <h6> {props.title}</h6>
                  </div>
                  <div class="modal-body">
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