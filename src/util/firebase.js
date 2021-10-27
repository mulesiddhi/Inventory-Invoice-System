import {getAuth} from 'firebase/auth'
import { getDatabase } from "firebase/database";
import {initializeApp} from 'firebase/app'; //for realtime database

const firebaseConfig = initializeApp({
	// Your Credentials
    apiKey: "AIzaSyDtyPzz9Oe5mIjVv6Csk5eNLaQ_C0mzmJw",
    authDomain: "inventory-cd83f.firebaseapp.com",
    projectId: "inventory-cd83f",
    storageBucket: "inventory-cd83f.appspot.com",
    messagingSenderId: "381423251930",
    appId: "1:381423251930:web:0b1a2e33d0d938456210e3",
    measurementId: "G-DBW9MZR17K",
    databaseURL:'https://inventory-cd83f-default-rtdb.firebaseio.com/'
});
	
const auth=getAuth(firebaseConfig)
const database = getDatabase(firebaseConfig);

export default database;
