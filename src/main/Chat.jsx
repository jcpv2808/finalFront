import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "./Chat.css";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(null);
  const [closed, setClosed] = useState(false)

  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:3000");

    socketRef.current.on("connect", () => {
      setUserId(socketRef.current.id);
    });

    socketRef.current.on("chat", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // Enviar mensaje al servidor
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socketRef.current.emit("chat", message);
      setMessage("");
    }
  };

  return (
    <div id="bodychat" className="container-fluid h-100" style={closed ? {display: "none"} : {display: "block"}}>
      <div id="chatContainer" className="row justify-content-center h-100">
        <div className="col-md-8 col-xl-6 chat">
          <div className="card chat-card d-flex flex-column h-100">
            <div className="card-header msg_head">

              <div className="d-flex bd-highlight align-items-center" style={{ height: "50%" }}>
                <div className="user_info ms-3">
                  <span>Chat Empresa</span>
                  <p>1767 Messages</p>
                </div>
                <div className="ms-auto video_cam">
                  <span className="me-2">
                    <i className="fas fa-video"></i>
                  </span>
                  <span>
                    <i className="fas fa-phone"></i>
                  </span>
                </div>
              </div>
              <div className="closeChat" onClick={(e) =>setClosed(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                </svg>
              </div>
            </div>

            <div className="card-body msg_card_body flex-grow-1" id="mensajes">
              {messages.map((msg, index) => {
                const isUserMessage = msg.userId === userId; // Verifica si el mensaje es del usuario
                return (
                  <div
                    key={index}
                    className={`d-flex justify-content-${isUserMessage ? "end" : "start"} mb-4`} // Alineación a la derecha o izquierda
                  >
                    {isUserMessage ? (
                      <>
                        <div className="msg_container_send">{msg.text}</div>
                      </>
                    ) : (
                      <>
                        <div className="msg_container">{msg.text}</div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            <form id="form-mensaje" onSubmit={handleSubmit} className="p-3">
              <div className="input-group">
                <input
                  id="valor-INPUT"
                  type="text"
                  className="form-control type_msg"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button className="btn btn-primary send_btn" type="submit">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Chat;
