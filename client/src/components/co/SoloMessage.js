import React from 'react';
import { getUser, notifyDEToVerify, makeMessageAsVerified } from '../linking.com';


class SoloMessage extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            user : {},
            message : {
                receiveFrom : {
                    nom : '',
                    prenom : '',
                    email : ''
                },
                mssg : ''
            }
        }
    }

    async componentDidMount(){
        const userId = localStorage.getItem("user");
        const user = await getUser(userId);
        this.setState({user : user});

        const message = this.props.message;
        const { nom, prenom, email } = await getUser(message.receiveFrom);
        
        const messagePut = {
            receiveFrom : {
                nom : nom,
                prenom : prenom,
                email : email
            },
            mssg : message
        }

        this.setState({
            message : messagePut
        })

    }


    async verifyActionOnClick(idMessage, messageCipher, idVoter){

        const resNotification = await notifyDEToVerify(String(messageCipher), idVoter);
        let resMakeMessageAsVerified;
        if(resNotification){
            resMakeMessageAsVerified = await makeMessageAsVerified(idMessage);
        }else{
            alert('Error to notify de service');
        }
        

        console.log(idMessage, messageCipher, idVoter)


        if(resNotification && resMakeMessageAsVerified){
            alert('message is redirected to DE serivce with success');
            window.location.reload();
        }

    }



    render(){

        console.log(this.state.message.mssg.receiveFrom)

        let content ;
        if(this.state.message.mssg.vu){
            content = <p className="badge badge-success" >This message is already verified</p>
        }else{
            content = <button className="btn btn-success" onClick={this.verifyActionOnClick.bind(this, this.state.message.mssg._id, this.state.message.mssg.encryptMessage, this.state.message.mssg.receiveFrom)} >Verify</button>
        }

        return(
            <div className="col-sm-6 mt-3">
                <div className="card">
                <h5 className="card-header"> {this.state.message.receiveFrom.email} </h5>
                <div className="card-body">
                    <h5 className="card-title">message</h5>
                    <p className="card-text small"> {this.state.message.mssg.encryptMessage}  </p>
                    {content}
                </div>
                </div>
            </div>
        )
    }
    

}

export default SoloMessage;