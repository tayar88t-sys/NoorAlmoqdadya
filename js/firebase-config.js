// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", // استبدل هذا بمفتاح API الخاص بك
    authDomain: "your-project-id.firebaseapp.com", // استبدل هذا بمعرف مشروعك
    projectId: "your-project-id", // استبدل هذا بمعرف مشروعك
    storageBucket: "your-project-id.appspot.com", // استبدل هذا بمعرف مشروعك
    messagingSenderId: "664732072951", // استبدل هذا برقم المرسل الخاص بك
    appId: "1:664732072951:web:5ce55ccb339a26fe7c8cf2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// Initialize Storage
const storage = firebase.storage();
