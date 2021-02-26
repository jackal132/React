import './App.css';
import { Component } from 'react';
import TOC from './components/TOC';
import Content from './components/Content';
import Subject from './components/Subject';

class App extends Component{
  // 컴포넌트가 실행될때 랜더함수보다 먼저 실행되면서
  // 콤포넌트를 초기화시켜주고 싶은 코드는 constructor 안에 작성한다.
  constructor(props){
    super(props);
    this.state = {
      mode:'read',
      welcome:{title:'Welcome', desc:'Hello React'},
      subject:{title : 'WEB', sub:'World Wide Web'},
      contents:[
        {id:1, title:'HTML', desc:'HTML is HyperText ...'},
        {id:2, title:'CSS', desc:'CSS is for Design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'}
      ]
    }
  }

  // 리액트에서 props 값이나 state 값이 바뀌면 해당되는 component의 render() 함수가 호출되도록 되어있다.
  render() {
    
    var _title, _desc = null;
    
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } else if( this.state.mode === 'read'){
      _title = this.state.contents[0].title;
      _desc = this.state.contents[0].desc;
    }

    return (
      <div className="App">
        
        {/* <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}>
        </Subject>         */}
        <header>
            <h1><a href="/" onClick={function(e){
              console.log(e);
              e.preventDefault();
            }}>{this.state.subject.title}</a></h1>
            {this.state.subject.sub}
        </header>
        <TOC data={this.state.contents}></TOC>
        <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }
}

export default App;
