import { Component } from 'react';

class TOC extends Component{
    /*
    shouldComponentUpdate 함수
    1. render 이전에 shouldComponentUpdate 가 실행된다.
    2. shouldComponentUpdate 의 return 값이 true면 render가 호출되고 
       false면 render는 호출되지 않도록 약속되어 있다.
    3. shouldComponentUpdate는 새롭게 바뀐값과 이전값에 접근할 수 있다.
    
    ※ state 의 값을 수정할때는 원본을 수정하지 말고 복제본을 수정하여 대입해야 한다.
    
    */
    shouldComponentUpdate(newProps, newState){
      if(this.props.data === newProps.data){
        return false;
      }

      return true;
    }

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