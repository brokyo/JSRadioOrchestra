import Vue from 'vue'
import VueFire from 'vuefire'
import Firebase from 'firebase'

Vue.use(VueFire)

const firebaseApp = Firebase.initializeApp({
    apiKey: 'AIzaSyAd1smP63cEltRztI1z4BU4G9Ua8lN0M50',
    authDomain: 'jsradioorchestra.firebaseapp.com',
    databaseURL: 'https://jsradioorchestra.firebaseio.com',
    projectId: 'jsradioorchestra',
    storageBucket: 'jsradioorchestra.appspot.com',
    messagingSenderId: '1096876541278'
})

Vue.prototype.$db = firebaseApp.database()
export const db = firebaseApp.database()
