import React, { Component } from "react";
import "./Display.css"
class Display extends Component {
  display = () => {
    var params = new URLSearchParams(window.location.search),
      data = JSON.parse(params.get("personal"));
    console.log(data);
    return (
      <div id="display-data">
        <h1>Data you entered</h1>
        <ul>
          {Object.keys(data).map((e) => {
            return <li>{e+" : "+data[e]}</li>;
          })}
        </ul>
      </div>
    );
  };
  render() {
    return <React.Fragment>{this.display()}</React.Fragment>;
  }
}

export default Display;
