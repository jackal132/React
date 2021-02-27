import './App.css';
import { Component } from 'react';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import Subject from './components/Subject';
import Control from './components/Control';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';

class App extends Component{
  // 컴포넌트가 실행될때 랜더함수보다 먼저 실행되면서
  // 콤포넌트를 초기화시켜주고 싶은 코드는 constructor 안에 작성한다.
  constructor(props){
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode:'welcome',
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

  getReadContent(){
    var i = 0;
    while(i < this.state.contents.length){
      var data = this.state.contents[i];
      if(data.id === this.state.selected_content_id){
        return data;
        break;
      }
      i = i + 1;
    }
  }

  getContent(){
    var _title, _desc, _article = null;
    
    if(this.state.mode === 'welcome'){

      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>

    } else if( this.state.mode === 'read'){

      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>

    } else if( this.state.mode === 'create'){

      _article = <CreateContent onSubmit={function(_title, _desc){
        // add content to this.state.contents
        this.max_content_id = this.max_content_id + 1;
        // this.state.contents.push(
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // );

        // var _contents = this.state.contents.concat({id:this.max_content_id, title:_title, desc:_desc});
        
        // 배열을 복제할 경우사용하고, 객체를 복제할때는 Object.assign 을 사용한다.
        var newContents = Array.from(this.state.contents);
        newContents.push({id:this.max_content_id, title:_title, desc:_desc});
        this.setState({
          contents: newContents,
          mode:'read',
          selected_content_id:this.max_content_id
        });

      }.bind(this)}></CreateContent>

    } else if( this.state.mode === 'update'){

      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={function(_id, _title, _desc){
        
        var _contents = Array.from(this.state.contents);
        var i = 0;
        while(i < _contents.length){
          if(_contents[i].id === _id){
            _contents[i] = {id:_id, title:_title, desc:_desc};
            break;
          }
          i = i + 1;
        }

        this.setState({
          contents: _contents,
          mode:'read'
        });

      }.bind(this)}></UpdateContent>

    }

    return _article;
  }
  
  // 리액트에서 props 값이나 state 값이 바뀌면 해당되는 component의 render() 함수가 호출되도록 되어있다.
  render() {
    
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
          if(_mode === 'delete'){
            if(window.confirm('real?')){
              var i = 0;
              var _contents = Array.from(this.state.contents);
              while(i < _contents.length){
                if(_contents[i].id === this.state.selected_content_id){
                  _contents.splice(i,1);
                  break;
                }
                i = i + 1;
              }

              this.setState({
                mode:'welcome',
                contents:_contents
              });

              alert('delete');
            }
          } else {
            this.setState({
              mode:_mode
            });

          }
          
        }.bind(this)}></Control>
        
        {this.getContent()}
      </div>
    );
  }
}

export default App;
