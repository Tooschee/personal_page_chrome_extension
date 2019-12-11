import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import config from 'config'

const firebaseApp = firebase.initializeApp(config.firebase);

const signIn = () => firebase.auth().signInWithEmailAndPassword(config.user.email, config.user.pass);

export { firebaseApp, signIn };
