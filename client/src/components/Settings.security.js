import React from 'react';
import { getUser } from './linking.com';
import UserSettings from './pages/settings.security.user';
import Navbar from './Navbar';

class Settings extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            user : {}
        } ;
        
    }

    componentDidMount() {
        const userid = localStorage.getItem("user");
        
        getUser(userid).then(user=>{
            this.setState({user});
        });
        
        

    }

    render(){
        
        
        return (
            <div className="container">
                <Navbar user={this.state.user_data}/>
                <div className="jumbotron mt-5">
                    <UserSettings user={this.state.user} /> 
                </div>
                
            </div>
        )
    }

}

export default Settings;