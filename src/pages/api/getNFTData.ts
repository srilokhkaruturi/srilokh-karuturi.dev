import axios from 'axios';
import { request } from 'http';
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function getNFTData(req: NextApiRequest, res: NextApiResponse) {
    console.log("[server] - getting NFT Data")
    
    if(process.env.OPENSEA_API_KEY && process.env.ETH_WALLET_ADDRESS){
        // DEFINE OPENSEA_API_KEY
        var OPENSEA_API_KEY: string = process.env.OPENSEA_API_KEY

        // DEFINE ETH_WALLET_ADDRESS
        var ETH_WALLET_ADDRESS: string = process.env.ETH_WALLET_ADDRESS

        // DEFINE HEADERS
        var myHeaders = new Headers();

        // DEFINE THE API KEY OF OPENSEA IN THE HEADERS
        myHeaders.append("X-API-KEY", OPENSEA_API_KEY)

        var redirectOption: RequestRedirect = "follow"
    
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: redirectOption
        };

        

        console.log("Fetching NFT Data")

        await fetch("https://api.opensea.io/api/v1/assets?owner="+ETH_WALLET_ADDRESS, requestOptions)
        .then(response => response.json())
        .then(result => {return res.status(200).json(result)})
        .catch(error => {return res.status(405).send(error)})
        
    }else{

        return res.status(400).send({"data":"Could not get NFT data"})

    }

    
}