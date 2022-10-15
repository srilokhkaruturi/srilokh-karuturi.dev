import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { collection, doc, getDoc, getFirestore } from 'firebase/firestore';
import { request } from 'http';
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function getSkillData(req: NextApiRequest, res: NextApiResponse) {
    
    const firebaseConfig = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID
    };
    
    
    // Initialize Firebase
    const Firebase = initializeApp(firebaseConfig);

    // Inititalize Firestore
    const Firestore = getFirestore(Firebase);

    // Define Collection Reference
    const dataCollection = collection(Firestore, 'data')

    // Define skills Data Document Reference
    const skillsDocumentReference = doc(dataCollection, "skills")

    // Define & Retrieve skillsDocumentSnapshot
    const skillsDocumentSnapshot = await getDoc(skillsDocumentReference)

    // CHECK IF THE DOCUMENT EXISTS AND RETURN skills DOCUMENT SNAPSHOT
    if(skillsDocumentSnapshot.exists()){

        var skillsDocumentData = skillsDocumentSnapshot.data()

        return res.status(200).send(skillsDocumentData)

    }

    return res.status(400).send({"data":"Could not get skills data"})


    
}