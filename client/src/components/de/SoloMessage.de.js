import React from 'react';
import { getUser, getElectById, makeMessageDeAsVerified } from '../linking.com';
import Cryptomonous from '../../Cryptomonous';

class SoloMessageDe extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            user : {},
            message : {
                _id : '',
                receiveFrom : '',
                encryptMessage : '',
                receiveEncryptMessageFromCO : '',
                vu : false
            },
            messageClair : '',
            elect : {
                _id :'',
                nom : '',
                prenom : '',
                numberVote : '',
                statut : ''
            },
            error : ''
        }
    }






    async componentDidMount(){

        const userId = localStorage.getItem('user');
        if(userId){
            const user = await getUser(userId);
            this.setState({user : user});
        }

        const message = this.props.message ;
        this.setState({
            message : {
                _id : message._id,
                receiveFrom : message.receiveFrom,
                encryptMessage : message.encryptMessage,
                receiveEncryptMessageFromCO : message.receiveEncryptMessageFromCO,
                vu : message.vu
            }
        })

        try {
            const cryptos = new Cryptomonous(this.state.user.prenom, this.state.user.email, 2048);
            console.log(await cryptos.getPublicKey())
            
            
            const messageClair = await cryptos.decrypt(this.state.message.encryptMessage);
            
            this.setState({
                messageClair : messageClair
            })
            
            const candidat = await getElectById(messageClair);

            this.setState({elect : candidat});

            

        } catch (error) {
            console.log(error)
            this.setState({error : "cannot decrypt message may error in security settings "})
        }
       
    }



    async validateActionOnclick(idMessage, messageFromCo, originalMessage){

        
        const de = String(originalMessage).replace(/\s/g, '');
        const co = String(messageFromCo).replace(/\s/g, '')
        console.log(de)
        console.log(co)
        if(de === co){
            const verified = await makeMessageDeAsVerified(idMessage);
            if(verified._id !== undefined){
                alert('verified with success');
            }
            
        }else{
            alert('Error original message not the same message which come from co')
            
        }

    }


    render(){

        console.log(this.state)

        let content = {
            elect : <p className="badge-danger"> Not found </p>,
            validate : <p className="badge badge-danger small"> Cannot validate </p>
        } ;
        if(this.state.elect._id !== undefined){
            content.elect = this.state.elect.nom+" "+this.state.elect.prenom;
            if(!this.state.message.vu){
                content.validate = <button className="btn btn-success" onClick={this.validateActionOnclick.bind(this, this.state.message._id, this.state.message.receiveEncryptMessageFromCO, this.state.message.encryptMessage)}>Validate</button>
            }else{
                content.validate = <p className="badge badge-success"> Already validated </p>
            }
        }


        return (
        
            <div className="col-sm-6 mt-3 ">
                <div className="card">
                    <h5 className="card-header small"> {content.elect} </h5>
                    <div className="card-body">
                        <h5 className="card-title small"> Score </h5>
                        <p className="card-text small"> { this.state.elect.numberVote} </p>
                        { content.validate }
                    </div>
                </div>
            </div>
        
        )
    }

}

export default SoloMessageDe;