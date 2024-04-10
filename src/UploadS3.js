import React, {useState} from 'react';
import axios from "axios";
import {allExpanded, defaultStyles, JsonView} from "react-json-view-lite";
import {type} from "@testing-library/user-event/dist/type";

const UploadS3 = () => {
    const [data, setData] = useState({
        token: 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MTI3NjcyMzMsInN1YiI6IjAzNTQ5Mjc0MDQiLCJpYXQiOjE3MTI3NjU0MzMsInR5cGUiOiJBQ0NFU1NfVE9LRU4ifQ.H0rszmI7bAgN5TmLEliOZ4yoYu4yJQuGWXBk1r8Bhl0',
        connected: false,
        url: '',
        success: false,
    });
    const [bodyMsg, setBodyMsg] = useState({})


    const connect = async () => {
        setData({...data, connected: true});
    }

    const uploadToS3 = async (e) => {
        const formData = new FormData(e.target);
        const file = formData.get('file');
        if (!file) {
            return null;
        }

        await axios.post("http://localhost:8080/api/v1/files", {
            filename: file.name,
            type: "MESSAGE"
        }, {headers: {Authorization: `Bearer ${data.token}`}})
            .then(async (res) => {
                console.log(res);
                console.log(data);
                // setData({...data, url: res.data});
                const resUpload = await axios.put(res.data, file).catch(e => console.log(e));
                if (resUpload.status === 200) {
                    setData({...data, success: true, url: res.data})
                    const newUrl = res.data.substring(0, res.data.indexOf('?'));
                    setBodyMsg({
                        sender: 'id của người gửi',
                        replyMessageId: 'id',
                        content: 'nội dung tin nhắn nếu có',
                        attachments: [
                            {
                                type: 'IMAGE hoặc VIDEO',
                                url: newUrl,
                                filename: newUrl.split('/')[newUrl.split('/').length - 1]
                            }
                        ]
                    })
                } else {
                    setData({...data, success: false})
                }
            })
            .catch(err => console.log(err))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await uploadToS3(e);
    }


    return (
        <div className="container my-3">
            {
                data.connected ?
                    (
                        <div>
                            <h4>Demo upload file to s3</h4>
                            <form onSubmit={handleSubmit}>
                                <div className="row border border-1 p-3 rounded-3 pb-4">
                                    <div className="col-10">
                                        <label className="form-label">Chọn ảnh</label>
                                        <input type="file" name="file" accept="image/jpeg image/png"
                                               className="form-control"/>
                                    </div>
                                    <div className="col-2 d-flex align-items-end">
                                        <button type="submit" className="btn btn-primary w-100">Upload</button>
                                    </div>
                                </div>
                            </form>

                            {
                                data.success === true && (
                                    <>
                                        <div>Upload lên S3 thành công</div>
                                        <div>Response từ /v1/files</div>
                                        <JsonView data={data.url} shouldExpandNode={allExpanded} style={defaultStyles}/>
                                        <div>Mẫu data gửi tin nhắn có file</div>
                                        <JsonView data={bodyMsg} shouldExpandNode={allExpanded} style={defaultStyles}/>
                                    </>
                                )
                            }
                        </div>
                    ) :
                    (
                        <div className="d-flex align-items-center" style={{minHeight: "500px"}}>
                            <div className="w-100 border border-1 border-dark p-4 rounded-3">
                                <div className="row">
                                    <div className="col-10">
                                        <label className="form-label">Nhập access token</label>
                                        <input type="text" name="username" className="form-control"
                                               value={data.token}
                                               onChange={(event) => setData({...data, token: event.target.value})}/>
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

export default UploadS3;