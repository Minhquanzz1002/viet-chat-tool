import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import React, {useState} from "react";
import {allExpanded, defaultStyles, JsonView} from "react-json-view-lite";

let stompClient = null;

function App() {
    const [chat, setChat] = useState({
        chatId: '',
        connected: false,
    });
    const [messages, setMessages] = useState([]);
    const connect = async () => {
        let Sock = new SockJS('http://localhost:8080/api/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, (error) => console.log(error));
    }

    const onConnected = () => {
        setChat({...chat, connected: true});
        stompClient.subscribe('/chatroom/' + chat.chatId, onPrivateMessageReceived);
        // const data = {
        //     sender: "6602209387c1ef000f268f77",
        //     content: "Hello",
        //     attachments: [
        //         {
        //             type: "IMAGE",
        //             url: "https://viet-chat-avatars.s3.ap-southeast-1.amazonaws.com/chats/65fbc98ddcf6c00d7a76ac6f/among-us.png",
        //             filename: "among-us.png"
        //         }
        //
        //     ]
        // }
        // stompClient.send("/app/chat/660ab974f65446249dcc8e83", {}, JSON.stringify(data));

        // const data = {
        //     senderId: "6602209387c1ef000f268f77",
        //     messageId: "660a9faec04d0532fa8d34aa"
        // }
        // stompClient.send("/app/chat/660a9faec04d0532fa8d34ab/delete", {}, JSON.stringify(data));
    }

    const onPrivateMessageReceived = (payload) => {
        console.log(JSON.parse(payload.body))
        setMessages(prevMessages => [...prevMessages, JSON.parse(payload.body)]);
    }

    return (
        <div className="container my-3">
            {
                chat.connected ?
                    (
                        <div>
                            <h4>Bạn đang nhận thông báo từ chat ID: {chat.chatId}</h4>
                            {
                                messages.map((message, index) => (
                                    <div key={message.messageId} className="p-2">
                                        <JsonView data={message} shouldExpandNode={allExpanded} style={defaultStyles}/>
                                    </div>
                                ))
                            }
                        </div>
                    ) :
                    (
                        <div className="d-flex align-items-center" style={{minHeight: "500px"}}>
                            <div className="w-100 border border-1 border-dark p-4 rounded-3">
                                <div className="row">
                                    <div className="col-10">
                                        <label className="form-label">Nhập ID phòng chat</label>
                                        <input type="text" name="username" className="form-control"
                                               value={chat.chatId}
                                               onChange={(event) => setChat({...chat, token: event.target.value})}/>
                                    </div>
                                    <div className="col-2 d-flex align-items-end">
                                        <button type="button" className="btn btn-primary w-100"
                                                onClick={connect}>Connect
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
            }
        </div>
    );
}

export default App;
