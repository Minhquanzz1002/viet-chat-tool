import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-json-view-lite/dist/index.css';
import App from './App';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Chat from "./Chat";
import ChatTool from "./ChatTool";
import UnsendTool from "./UnsendTool";
import Demo from "./Demo";
import UploadS3 from "./UploadS3";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>}/>
            <Route path="/chat" element={<Chat/>}/>
            <Route path="/chat-tool" element={<ChatTool/>}/>
            <Route path="/unsend-tool" element={<UnsendTool/>}/>
            <Route path="/demo" element={<Demo/>}/>
            <Route path="/upload-s3" element={<UploadS3/>}/>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


