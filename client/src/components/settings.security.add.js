import React from 'react';

class AddSettings extends React.Component {


    constructor(props){
        super(props);

        this.state={
            public_key_co : "",
            public_key_de : ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeDE = this.handleChangeDE.bind(this);
    }



    handleSave = (e)=>{
        e.preventDefault();

        if(this.state.public_key_co !== ""){
            localStorage.setItem("public_key_co", this.state.public_key_co);
        }else{
            alert("public key of co must to be not empty");
        }
        
    }


    handleSaveDE = (e)=>{
        e.preventDefault();

        if(this.state.public_key_de !== ""){
            localStorage.setItem("public_key_de", this.state.public_key_de);
        }else{
            alert("public key of de must to be not empty");
        }

    }

    handleChange(e){
        const target = e.target ;
        
        this.setState({public_key_co : target.value});
    }

    handleChangeDE(e){
        const target = e.target;
        this.setState({public_key_de : target.value});
    }

    render(){

        let content = {} ;



        if(localStorage.getItem("public_key_co")){
            
            content.co =  <p className="small font-weight-light"> {localStorage.getItem("public_key_co")} </p>
        
        }else{
            
            content.co =<form onSubmit={this.handleSave}> 
                            <div class="input-group"> 
                                <div class="input-group-prepend"> 
                                    <span class="input-group-text">public key of CO</span> 
                                </div> 
                                <textarea  aria-label="With textarea" value={this.state.public_key_co} name="public_key_co" onChange={this.handleChange} ></textarea> 
                            </div> 
                            <input type="submit" value="save"></input> 
                        </form> 
        
        }


        if(localStorage.getItem("public_key_de")){
            
            content.de =  <p className="small font-weight-light"> {localStorage.getItem("public_key_de")}</p>
        
        }else {

            content.de =  <form onSubmit={this.handleSaveDE}>
                            <div className="input-group"> 
                                <div className="input-group-prepend"> 
                                    <span className="input-group-text">public key of DE</span> 
                                </div> 
                                <textarea  aria-label="With textarea" value={this.state.public_key_de} name="public_key_de" onChange={this.handleChangeDE} > </textarea> 
                            </div>
                            <input type="submit" value="save"></input>
                          </form>
        
        }

        
        return (
            <div className="card mx-md-n5">
                <div className="card-header">
                    Settings 
                </div>
                <div className="card-body">

                    { content.co }

                </div>
                <div className="card-body">
                    
                    { content.de }
                    
                </div>
                </div>
        )
    }
}

export default AddSettings;