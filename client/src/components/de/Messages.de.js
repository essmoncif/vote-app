import React from 'react';
import { getAllMessagesDe } from '../linking.com';
import SoloMessageDe from './SoloMessage.de';


class MessageDE extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            messages : []
        }
    }

    async componentDidMount(){
        const messages = await getAllMessagesDe();
        this.setState({
            messages : messages
        });
        
        
    }

    render(){

        return(
            <div className="container">
                <div className="row">{ this.state.messages.map((c)=> { return <SoloMessageDe message={c}/> } ) }</div>
            </div>
        )
    }
}

export default MessageDE;