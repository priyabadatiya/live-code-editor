import React from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/theme/neat.css";
import "codemirror/mode/xml/xml.js";
import "codemirror/mode/javascript/javascript.js";
import { UnControlled as CodeMirror } from "react-codemirror2";

export default class LiveCodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlCode: `<center>
  <img src="https://cutt.ly/JbMvJKT" />
  <h1>Hello World!</h1>
</center>`,
      cssCode: `h1 {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
img {
  width: 200px;
  height: auto;
  border-radius: 20px;
} `,
    };
    this.iframeRef = React.createRef();
  }

renderHtml() {
    this.iframeRef.current.src = this.state.htmlCode;
  }

  render() {
    const options = {
      mode: "xml",
      theme: "material",
      lineNumbers: true,
    };
    return (
      <div className="flex">
        <div className="editor-container">
          <div className="p-8">
            <CodeMirror
              value={this.state.htmlCode}
              options={{ ...options }}
              onChange={(editor, data, value) => {
                console.log(editor, value);
                this.setState({ htmlCode: value });
              }}
            />
          </div>
          <div className="p-8">
            <CodeMirror
              value={this.state.cssCode}
              options={{ ...options, mode: "css" }}
              onChange={(editor, data, value) => {
                console.log(editor,data, value);
                this.setState({ cssCode: value });
              }}
            />
          </div>
        </div>
        <div className="iframe-container">
          <iframe
            title="Live Code Preview"
            ref={this.iframeRef}
            srcDoc={`${this.state.htmlCode} <style>${this.state.cssCode}</style>`}
          ></iframe>
        </div>
      </div>
    );
  }
}