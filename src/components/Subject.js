import { Component } from 'react';

class Subject extends Component{
    render(){
      return (
        //컴포넌트를 만들때는 반드시 하나의 최상위 태그만 있어야한다.
        <header>
            <h1>{this.props.title}</h1>
            {this.props.sub}
        </header>
      );
    }
  }
  
  export default Subject;