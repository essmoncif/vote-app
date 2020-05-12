import * as openpgp from 'openpgp';
import sha256 from 'crypto-js/sha256';

export default class Cryptomonous {
    constructor(name, email, keyLengh){
        
        this.name = name;
        this.email = email;
        this.keyLengh = keyLengh;

        this.PUBLIC_KEY = "my_public_key"+this.hashId();
        this.PRIVATE_KEY = "my_private_key"+this.hashId();
        
    }

    /**
     * This function get hash code of join name field and email
     * @return String
     */
    hashId(){
        return  sha256(this.name + this.email).toString();
    }

    /**
     * This function get from localStorage of a browser public of 
     * user which identified by "my_public_key"+hash code of data
     * if doesn't exist then we create new one and put it in 
     * localStorge with id is "my_public_key"+hash code of data
     * @return public_key
     */
    async getPublicKey(){
        // check if is already exist with this id
        const public_key = localStorage.getItem(this.PUBLIC_KEY);
        if(public_key){
            //then return it 
            return public_key;
        }else{
            // if not we should be generate new one by using 
            // openpgp library, and make the private key encrypt 
            // by hash code of user data 
            const keys = await openpgp.generateKey({
                userIds: [{ name: this.name, email: this.email }],
                rsaBits: this.keyLengh,
                // to encrypt private key
                passphrase: this.hashId()
            });
            // store the public key first
            localStorage.setItem(this.PUBLIC_KEY, keys.publicKeyArmored.toString());
            // and check private key is already exist  
            if(!localStorage.getItem(this.PRIVATE_KEY)){
                
                localStorage.setItem(this.PRIVATE_KEY, keys.privateKeyArmored.toString());
            }
            
            return keys.publicKeyArmored.toString();

        }
    }

    /**
     * This function get from localStorage of a browser private of 
     * user which identified by "my_private_key"+hash code of data
     * if doesn't exist then we create new one and put it in 
     * localStorge with id is "my_private_key"+hash code of data
     * @return public_key
     */
    async getPrivateKey(){

        //check if is already exist with this id 
        const private_key = localStorage.getItem(this.PRIVATE_KEY);
        if(private_key){
            //then get it
            return private_key;
        }else{
            // if not we should be generate new one by using 
            // openpgp library, and make the private key encrypt 
            // by hash code of user data 
            const keys = await openpgp.generateKey({
                userIds: [{ name: this.name, email: this.email }],
                rsaBits: this.keyLengh,
                // to encrypt private key
                passphrase: this.hashId()
            });

            localStorage.setItem(this.PRIVATE_KEY, keys.privateKeyArmored.toString());
            if(!localStorage.getItem(this.PUBLIC_KEY)){
                localStorage.setItem(this.PUBLIC_KEY, keys.publicKeyArmored.toString());
            }

            return keys.privateKeyArmored.toString();
        }
    }


    /**
     * This function is responsible for encryption, take as
     * parameters public key of destination and message
     * @param {String} publickey public key of destination
     * @param {String} clairText the message you want to encrypt
     * @return  encrypt message as a string  
     */
    async encrypt(publickey, clairText){
        // Change public key from string to openpgp public key objet 
        const publicKeys = (await openpgp.key.readArmored(publickey)).keys;
        
        const encrypt = await openpgp.encrypt({
            message :  openpgp.message.fromText(clairText),
            publicKeys : publicKeys
        });

        return encrypt.data;
    }


    /**
     * This function is responsible for decryption,
     * take as parameter cipher message to decrypt it.
     * @param {String} cipherText encrypt message
     */
    async decrypt(cipherText){
        
        const myPrivateKey = await this.getPrivateKey();
        // Change private key from string to openpgp private key object
        const loadPrivateKey =  (await openpgp.key.readArmored([myPrivateKey])).keys[0];
        // Decrypt private key by hash id of user 
        await loadPrivateKey.decrypt(this.hashId());

        
        const clair = await openpgp.decrypt({
            message: await openpgp.message.readArmored(cipherText),
            privateKeys : [loadPrivateKey]
        })

        
        
        return clair.data;
    }

}


