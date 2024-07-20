import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf"

export class AuthService {   //creating an object out of this class and export that object
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client) //create an acccount by passing the context
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if(userAccount){
                return this.login({email, password})
            } else{
                return userAccount
            }
        } catch (error) {
            
        }
    }
    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            throw error
        }
    }
    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser() :: ", error)
        }
        return null
    }
    async logout() {
        try {
            await this.account.deleteSessions() //delete every session we have
        } catch (error) {
            console.log("Appwrite service :: logout() :: ", error)
        }
    }
}



//object so that the constructor is invoked
const authService = new AuthService()

export default authService