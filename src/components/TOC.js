import { Component } from 'react';

class TOC extends Component{
    render(){
      var list = [];
      var data = this.props.data;
      var i = 0;
      while(i < data.length){
          // 여러 목록을 자동으로 생성할때는 key prop을 가지고 있어야 한다.
          list.push(
            <li key={data[i].id}>
                <a 
                    href={"/content/"+data[i].id} 
                    data-id={data[i].id}
                    onClick={function(e){
                        e.preventDefault();
                        this.props.onChangePage(e.target.dataset.id);    
                }.bind(this)}>{data[i].title}</a>
                {/* }.bind(this), data[i].id}>{data[i].title}</a> 
                    바인드 부분에 인자값을 넘겨주면  onClick={function(id, e){
                    온클릭 함수의 첫번째 인자로 받을수 있음
                */}
            </li>);
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