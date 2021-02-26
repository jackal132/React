import { Component } from 'react';

class TOC extends Component{
    render(){
      var list = [];
      var data = this.props.data;
      var i = 0;
      while(i < data.length){
          // 여러 목록을 자동으로 생성할때는 key prop을 가지고 있어야 한다.
          list.push(<li key={data[i].id}><a href={"/content/"+data[i].id}>{data[i].title}</a></li>);
          i = i + 1;
      }
      return (
        <nav>
            <ul>
                {list}
            </ul>
        </nav>
      );
    }
  }

  export default TOC;