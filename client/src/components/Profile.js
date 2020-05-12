import React, { Component } from 'react';
import { getUser } from './linking.com';
import Navbar from './Navbar';
import Candidat from './Candidat'
import MessageCo from './co/Messages';
import MessageDE from './de/Messages.de';


class Profile extends Component {
  
    constructor(){
        super()

        this.state = {
            id:'',
            nom:'',
            prenom:'',
            dateNai:'',
            email:'',
            CO : false,
            DE : false,
            action: false
        };



        

    }

    componentDidMount(){
        const user = localStorage.getItem('user');
        if(user){
            getUser(user).then(res=>{
                this.setState({
                    id: user,
                    nom : res.nom,
                    prenom : res.prenom,
                    dateNai : res.dateNai,
                    email : res.email,
                    CO : res.CO,
                    DE : res.DE,
                    action: res.action
                })
            })
        }
       

    }

    
  
    render(){

      let content;
      if(this.state.CO === false && this.state.DE === false){
        content = <Candidat/>
      }else{
        if(this.state.CO === true && this.state.DE === false){
          content = <MessageCo/>
        }else{
          if(this.state.CO === false && this.state.DE === true){
            content = <MessageDE/>
          }else{
            content = <p className="alert alert-danger">Are you sur ?</p>
          }
        }
      }

        return (
           
           <div className="container">
            <Navbar user={this.state} />
            <div className="jumbotron mt-5">
              <div className="col-sm-8 mx-auto">
                <h1 className="text-center">PROFILE</h1>
              </div>
              <table className="table col-md-6 mx-auto">
                <tbody>
                  <tr>
                    <td>nom</td>
                    <td>{this.state.nom}</td>
                  </tr>
                  <tr>
                    <td>prenom</td>
                    <td>{this.state.prenom}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{this.state.email}</td>
                  </tr>
                  <tr>
                    <td>date naissance</td>
                    <td>{this.state.dateNai}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {content}
          </div>
        );
    }
}

export default Profile;
