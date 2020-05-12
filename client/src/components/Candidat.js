import React, { Component } from 'react';
import { getAllElect } from './linking.com';
import SoloCandidat from './SoloCandidat';



class Candidat extends Component{

    constructor(props){
        super(props);
        this.s = [];
        
    }

    componentDidMount(){
        getAllElect().then(res=>{
            this.s = res ;
            
        })

    }

    

    render(){

        
        return (
            <div className="container">
                <div className="row">{ this.s.map((c)=> { return <SoloCandidat candidat={c}/> } ) }</div>
            </div>
        )
    }
}

export default Candidat;