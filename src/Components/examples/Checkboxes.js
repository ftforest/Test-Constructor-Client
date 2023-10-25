import React from 'react';
import CreateTest from "../bootstrap/PagesMyTest/CreateTest";

class Reservation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.childs = [{checked:false},{checked:false},]

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(val,index) {
        this.childs.forEach((data)=>{
            data.checked = false;
        })
        this.childs[index].checked=val;
        this.setState({})
    }

    render() {
        console.log(this.childs,"this.childs")

        return (
            <div>
                {
                    this.childs.map((val,i)=>{
                        return  <Child key ={i} index={i} checked={val.checked} handleChange={this.handleInputChange}/>

                    })
                }

            </div>
        );
    }
}

class Child extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        var value = event.target.value;
        if(this.props.checked=='on'){
            value = false;
        }
        
        this.props.handleChange(value,this.props.index)
    }

    render() {
        return (
            <div>
                <input
                    name="test"
                    type="radio"
                    checked={this.props.checked}
                    onChange={this.handleChange} />
            </div>
        )
    }
}

export default Reservation;