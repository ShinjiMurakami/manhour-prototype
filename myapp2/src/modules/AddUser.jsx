import React from "react";
// import axios from 'axios';

const style = {
  backgroundColor: "#cccccc",
  width: "800px",
  height: "30px",
  borderRadius: "8p",
  padding: "8px",
  margin: "8px"
};

// axios を require してインスタンスを生成する
const axiosBase = require('axios');
const axios = axiosBase.create({
  baseURL: process.env.REACT_APP_BASEURL  // バックエンドのURL:PORT を指定
});

export default class InputUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      posts: []
      , userText: ""
      , departmentid: ""
    };

  this.onChangeUser = this.onChangeUser.bind(this);
  this.handleChange = this.handleChange.bind(this);

  axios.post('/getDepartment')
  .then(response => response.data)
  .then((result) => {this.setState({posts: result})})            
  .catch(function (error) {
      console.log("error", error);
  })
  
  };
  
  onClick (user_name, depertment_id) {
    const params = new URLSearchParams();
    params.append('user_name', user_name);
    params.append('depertment_id', depertment_id);
    axios.post('/add', params)
    .then(response => response.data)
    .catch(function (error) {
        console.log("error", error);
    })
  };

  onChangeUser = (event) => this.setState({userText: event.target.value});
  handleChange = (event) => this.setState({departmentid: event.target.value});

render() {

  return (
    <div style={style}>
      <label>社員名: </label>
      <input
        placeholder="社員名"
        value={this.state.userText}
        onChange={this.onChangeUser}
      />
      <label>部署名：</label>
      <select value={this.state.departmentid} onChange={this.handleChange}>
        <option value="">選択してください</option>
      {this.state.posts.map(post => 
        <option value={post.id}>{post.department_name}</option>
      )}
      </select>
      <button onClick={() => this.onClick(this.state.userText, this.state.departmentid)}>追加</button>
    </div>
  );
}};