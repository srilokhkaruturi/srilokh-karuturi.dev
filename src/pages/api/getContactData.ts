import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { collection, doc, getDoc, getFirestore } from 'firebase/firestore';
import { request } from 'http';
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function getContactsData(req: NextApiRequest, res: NextApiResponse) {
    
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

    // Define Contact Data Document Reference
    const contactDocumentReference = doc(dataCollection, "contacts")

    // Define & Retrieve contactDocumentSnapshot
    const contactDocumentSnapshot = await getDoc(contactDocumentReference)

    // CHECK IF THE DOCUMENT EXISTS AND RETURN CONTACT DOCUMENT SNAPSHOT
    if(contactDocumentSnapshot.exists()){

        var contactDocumentData = contactDocumentSnapshot.data()

        return res.status(200).send(contactDocumentData)

    }

    return res.status(400).send({"data":"Could not get contact data"})


    
}