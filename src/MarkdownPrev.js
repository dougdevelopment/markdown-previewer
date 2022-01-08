import React from 'react';
import {marked} from 'marked'
import './styles.css'
import icon from "./assets/icon.png"




class Editor extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <textarea
          id="editor"
          value={this.props.input}
          onChange={this.props.handleChange}
          autoFocus="false"
        >
          {this.props.defaultMarkdown}
        </textarea>
      );
    }
  }
  
  class Preview extends React.Component {
    constructor(props) {
      super(props);
    }
    componentDidMount() {
      document.getElementById("preview").innerHTML = marked(this.props.input, {
        gfm: true,
        breaks: true
      });
      console.log("mounted");
    }
    render() {
      return <div id="preview"></div>;
    }
  }
  
  class PrevApp extends React.Component {
    constructor(props) {
      super(props);
  
      const md = `# Welcome to my React Markdown Previewer!
  
  ## This is a sub-heading...
  ### And here's some other cool stuff:
    
  Heres some code, \`<div></div>\`, between 2 backticks.
  
  \`\`\`
  // this is multi-line code:
  
  function anotherExample(firstLine, lastLine) {
    if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
      return multiLineCode;
    }
  }
  \`\`\`
    
  You can also make text **bold**... whoa!
  Or _italic_.
  Or... wait for it... **_both!_**
  And feel free to go crazy ~~crossing stuff out~~.
  
  There's also [links](https://www.freecodecamp.com), and
  > Block Quotes!
  
  And if you want to get really crazy, even tables:
  
  Wild Header | Crazy Header | Another Header?
  ------------ | ------------- | ------------- 
  Your content can | be here, and it | can be here....
  And here. | Okay. | I think we get it.
  
  - And of course there are lists.
    - Some are bulleted.
       - With different indentation levels.
          - That look like this.
  
  
  1. And there are numbererd lists too.
  1. Use just 1s if you want! 
  1. But the list goes on...
  - Even if you use dashes or asterisks.
  * And last but not least, let's not forget embedded images:
  
  ![React Logo w/ Text](https://goo.gl/Umyytc)
  `;
      this.state = {
        defaultMarkdown: md,
        input: md,
        leftSize: '',
        rightSize: ''
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handlePush = this.handlePush.bind(this);
    }

    handlePush(event){
        
        this.setState({
            leftSize: "" ? "full" : "colapsed",
            rightSize: "" ? "full" : "colapsed"
        })
    }
  
    handleChange(event) {
      const x = event.target.value;
      this.setState(
        {
          input: x
        },
        function () {
          document.getElementById("preview").innerHTML = marked(
            this.state.input,
            { gfm: true, breaks: true }
          );
        }
      );
    }
    render() {
      return (

        <div className="container">

            <div className={`left ${this.state.leftSize}`}>
                <div className = 'menu-bar'>
                    <button onClick={()=> {
                        if(this.state.leftSize == "" && this.state.rightSize == ""){
                            this.setState({leftSize: "colapsed", rightSize: 'full'})
                        }else if (this.state.leftSize == "colapsed"){
                            this.setState({leftSize: "", rightSize: ""})
                        }else if(this.state.leftSize == "full" && this.state.rightSize == "colapsed"){
                            this.setState({rightSize: "", leftSize: ""})
                        }

                    }} className='collapse-button'><img src={icon}/></button>
                    <h2>Markdown</h2>
                </div>
            <Editor
                    value={this.state.input}
                    defaultMarkdown={this.state.defaultMarkdown}
                    handleChange={this.handleChange}
            />
            </div>

            <div className={`right ${this.state.rightSize}`}>
                <div className = 'menu-bar'>
                    <button onClick={()=> {
                        if(this.state.rightSize == "" && this.state.leftSize == ""){
                            this.setState({rightSize: "colapsed", leftSize: 'full'})
                        }else if (this.state.rightSize == "colapsed"){
                            this.setState({rightSize: "", leftSize: ""})
                        }else if(this.state.rightSize == "full" && this.state.leftSize == "colapsed"){
                            this.setState({rightSize: "", leftSize: ""})
                        }

                    }} className='collapse-button'><img src={icon}/></button>
                    <h2>Preveiw</h2>
                </div>
                <Preview input={this.state.input} />
            </div>

        </div>

      );
    }
  }
  
export default PrevApp  