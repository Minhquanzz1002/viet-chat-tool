import React, {useState} from 'react';
import {allExpanded, defaultStyles, JsonView} from "react-json-view-lite";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const Demo = () => {
    const [chat, setChat] = useState({
        chatId: '660a9faec04d0532fa8d34ab',
        content: '',
        sender: '6602209387c1ef000f268f77',
        connected: false,
    });

    const [messages, setMessages] = useState([]);
    // const client = new Client({
    //     brokerURL: 'ws://localhost:8080/api/ws',
    //     onConnect: () => {
    //         client.subscribe('/chatroom/' + chat.chatId, message =>
    //             console.log(`Received: ${message.body}`)
    //         );
    //     },
    // });
    // Stomp.client('ws://localhost:8080/api/ws').connect({}, () => {});
    // const ws = new SockJS(;
    Stomp.overWS('http://localhost:8080/api/ws');
    // client.activate();

    const connect = async () => {
        setChat({...chat, connected: true});

    }

    const sendMessage = () => {
        const data = {
            sender: chat.sender,
            content:chat.content
        }
        // client.publish({ destination: "/app/chat/" + chat.chatId, body: JSON.stringify(data)});
    }


    return (
        <div className="container my-3">
            {
                chat.connected ?
                    (
                        <div>
                            <h4>Bạn đang kết nối và nhận thông báo từ chat ID: {chat.chatId}</h4>
                            <div>
                                <div className="row border border-1 p-3 rounded-3 pb-4">
                                    <div className="col-10">
                                        <label className="form-label">Nhập ID người gửi</label>
                                        <input type="text" name="sender" className="form-control"
                                               value={chat.sender}
                                               onChange={(event) => setChat({...chat, sender: event.target.value})}/>
                                    </div>
                                    <div className="col-10">
                                        <label className="form-label">Nhập nội dung tin nhắn</label>
                                        <input type="text" name="content" className="form-control"
                                               value={chat.content}
                                               onChange={(event) => setChat({...chat, content: event.target.value})}/>
                                    </div>
                                    <div className="col-2 d-flex align-items-end">
                                        <button type="button" className="btn btn-primary w-100"
                                                onClick={sendMessage}>Gửi
                                        </button>
                                    </div>
                                </div>
                            </div>
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
};

export default Demo;