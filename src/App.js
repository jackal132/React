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
      subject:{title : 'WEB', sub:'World Wide Web'}
    }
  }

  render() {
    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}>
        </Subject>        
        <TOC></TOC>
        <Content title="HTML" desc="HTML is HyperText Markup Language."></Content>
      </div>
    );
  }
}

export default App;
