import './App.css';
import { Component } from 'react';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import Subject from './components/Subject';
import Control from './components/Control';
import CreateContent from './components/CreateContent';

class App extends Component{
  // 컴포넌트가 실행될때 랜더함수보다 먼저 실행되면서
  // 콤포넌트를 초기화시켜주고 싶은 코드는 constructor 안에 작성한다.
  constructor(props){
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode:'create',
      selected_content_id:2,
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
    
    var _title, _desc, _article = null;
    
    if(this.state.mode === 'welcome'){

      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>

    } else if( this.state.mode === 'read'){

      var i = 0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id){
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i = i + 1;
      }
      
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>

    } else if( this.state.mode === 'create'){

      _article = <CreateContent onSubmit={function(_title, _desc){
        // add content to this.state.contents
        this.max_content_id = this.max_content_id + 1;
        // this.state.contents.push(
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // );
        var _contents = this.state.contents.concat({id:this.max_content_id, title:_title, desc:_desc});
        this.setState({
          contents: _contents
        });

      }.bind(this)}></CreateContent>

    }

    return (
      <div className="App">
        
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage={function(){
            this.setState({mode:'welcome'});
          }.bind(this)}>
        </Subject>        
        
        <TOC onChangePage={function(id){
            this.setState({
              mode:'read',
              selected_content_id:Number(id)
            });
          }.bind(this)} 
          data={this.state.contents}>
        </TOC>
        
        <Control onChangeMode={function(_mode){
          this.setState({
            mode:_mode
          });
        }.bind(this)}></Control>
        
        {_article}
      </div>
    );
  }
}

export default App;
