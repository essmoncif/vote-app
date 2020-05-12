import React, { Component } from 'react';
import { getUser, voteAction, shareActionVoteWithCo, shareActionVoteWithDe } from './linking.com';
import Cryptomonous from '../Cryptomonous';

class SoloCandidat extends Component{

    constructor(props){
        super(props);

        this.state ={
            user :{},
            
        }
        
    }


    async componentDidMount(){
        const use = localStorage.getItem('user');
        if(use){
            const user = await getUser(use);
            console.log("userProfile", user);
            this.setState({user});
        }
    }

    async voteActionOnClick(id, idVoter){
        
        
        try {
            const cryptos = new Cryptomonous(this.state.user.prenom, this.state.user.email, 2048);
            // must to be public key of de
            const public_key_de = localStorage.getItem("public_key_de");
            console.log( public_key_de )
            const cipher = await cryptos.encrypt(public_key_de, id);

            const resco = await shareActionVoteWithCo(cipher, idVoter);
            const resde = await shareActionVoteWithDe(cipher, idVoter);
            const response = await voteAction(id, idVoter);
            if(response && resco && resde){
                alert('Success ');
                window.location.reload();
            }
        } catch (error) {
            console.log(error)
        }
    }

    render(){

        let jjs ;
        console.log("user action", this.state.user.action)
        if (this.state.user.action){
            jjs = <p className="badge badge-success" >You aready vote</p>
        }else{
            if(!(localStorage.getItem("public_key_co") && localStorage.getItem("public_key_de"))){
                jjs = <p className="badge badge-warning">check security settings</p>
            }else{
                jjs = <button className="btn btn-primary" onClick={this.voteActionOnClick.bind(this,this.props.candidat._id, this.state.user._id)}>vote</button>
            }   
        }

        return(
            
            <div className="col-sm-6 mt-3">
                <div className="card">
                <h5 className="card-header">{this.props.candidat.nom} {this.props.candidat.prenom} </h5>
                <div className="card-body">
                    <h5 className="card-title">Statut</h5>
                    <p className="card-text"> {this.props.candidat.statut} </p>
                    {jjs}
                </div>
                </div>
            </div>
            
        )
    }

}

export default SoloCandidat;