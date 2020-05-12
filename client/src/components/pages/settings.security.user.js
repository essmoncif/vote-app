import React from 'react';
import Cryptomonous from '../../Cryptomonous';
import { getUser } from '../linking.com';
import AddSettings from '../settings.security.add';

class UserSettings extends React.Component{


    constructor(props){
        super(props);
        this.state = {
            user : {},
            keys : {}
        };

        
    }

    
    async componentDidMount(){

        const userId = localStorage.getItem("user");
        const user = await getUser(userId);

        this.setState({user});

        var keys = {};
        const cryptos = new Cryptomonous(this.state.user.prenom, this.state.user.email, 2048);
            keys.private_key = await cryptos.getPrivateKey();
            keys.public_key = await cryptos.getPublicKey();
            this.setState({keys});
       

    }

    render(){

        console.log(this.state)
        
        return (
            <div className="row">
                <AddSettings/>
                <div className="card mx-md-n5">
                <div className="card-header">
                    public key
                </div>
                <div className="card-body small">
                    <blockquote className="blockquote mb-0 small">
                    <p className="small font-weight-light"> { this.state.keys.public_key } </p>
                    <footer className="badge badge-primary blockquote-footer"> you can chare this key</footer>
                    </blockquote>
                </div>
                </div>

                <div className="card mx-md-n5">
                <div className="card-header">
                    private key
                </div>
                <div className="card-body small">
                    <blockquote className="blockquote mb-0 small">
                    <p className="small font-weight-light text-wrap"> { this.state.keys.private_key } </p>
                    <footer className="badge badge-danger blockquote-footer"> you can't chare this key</footer>
                    </blockquote>
                </div>
                </div>

            </div>
        )
    }


}

export default UserSettings;