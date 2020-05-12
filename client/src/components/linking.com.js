import Axios from 'axios';

export const login=(user)=>{
    return Axios.post('/auth/login', {
        email: user.email,
        password: user.password
    }).then(res=>{
        localStorage.setItem('user', res.data._id);
        console.log(res.data)
        return res.data
    }).catch(err=>{
        console.log('error data for login : ', err);
    })
}


export const getUser =(id)=>{


    return Axios.get('/auth/'+id)
    .then(res=>{
        console.log(res.data);
        return res.data;
    })
    .catch(err=>console.log('user not found error', err))

}


export const getElectById = (id) => {

    return Axios.get(`/elect/${id}`).then(res => {
        return res.data;
    }).catch(err=>{
        return err;
    })
}


export const getAllElect=()=>{
    return Axios.get('/elect/all')
    .then(res=>{
        console.log(res.data);
        return res.data;
    }).catch(err=>console.log("error",err))
}


export const voteAction = (id, idVoter) => {
    return Axios.post('/elect/vote', {
        id: id,
        idVoter : idVoter
    }).then(res=>{
        return res.data;
    }).catch(err=>{
        console.log("error voting action error : ", err)
    })
}

export const shareActionVoteWithCo=(encryptMessage, receiveFrom)=>{
    return Axios.post('/voting/co', {
        encryptMessage: encryptMessage,
        receiveFrom : receiveFrom
    }).then(res=>{
        return res.data;
    }).catch(err=>{
        console.log("error to send message to co service error: ", err);
    })
}


export const shareActionVoteWithDe=(encryptMessage, receiveFrom)=>{
    return Axios.post('/voting/de', {
        encryptMessage: encryptMessage,
        receiveFrom : receiveFrom
    }).then(res=>{
        return res.data;
    }).catch(err=>{
        console.log("error to send message to de service error: ", err);
    })
}

export const getAllMessagesCo = () => {
    return Axios.get('/voting/co').then(res=>{
        return res.data ;
    }).catch(err=>{
        console.log("error to get CO messages ", err);
    })
}


export const getAllMessagesDe = ()=> {
    return Axios.get('/voting/de').then(res=>{
        return res.data;
    })
}


export const notifyDEToVerify = (messageEncrypt, idVoter)=>{
    return Axios.post('/voting/notifyde', {

        receiveEncryptMessageFromCO : messageEncrypt,
        receiveFrom : idVoter

    }).then(res=>{
        return res.data;
    }).catch(err=>{
        console.log(err);
    })
}

export const makeMessageAsVerified = (idMessage) => {
    return Axios.post('/voting/co/verify', {
        idMessage : idMessage
    }).then(res=>{
        return res.data;
    }).catch(err=>{
        console.log(err);
    })
}

export const makeMessageDeAsVerified = (idMessage) => {
    return Axios.post('/voting/de/verify', {
        idMessage : idMessage
    }).then(res => {
        return res.data;
    }).catch(err=>{
        console.log(err);
    })
}