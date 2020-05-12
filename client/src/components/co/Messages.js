import React from 'react';
import { getAllMessagesCo } from '../linking.com';
import SoloMessage from './SoloMessage';

class MessageCo extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            messages : []
        }
    }

    async componentDidMount(){
        const mssgs = await getAllMessagesCo();
        this.setState({messages : mssgs});
        
    }

    render(){

        return(
            <div className="container">
                <div className="row">{ this.state.messages.map((c)=> { return <SoloMessage message={c}/> } ) }</div>
            </div>
        )
    }
}

export default MessageCo;