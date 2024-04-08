import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function getNFTData(req: NextApiRequest, res: NextApiResponse) {
    console.log("[server] - getting NFT Data");

    // Environment variables for API key and Ethereum wallet address
    const OPENSEA_API_KEY = process.env.OPENSEA_API_KEY;
    const ETH_WALLET_ADDRESS = process.env.ETH_WALLET_ADDRESS;

    // Check if environment variables are set
    if (!OPENSEA_API_KEY || !ETH_WALLET_ADDRESS) {
        return res.status(400).send({ "error": "API key or wallet address not set" });
    }

    // API endpoint for fetching NFTs by account on Ethereum
    const url = `https://api.opensea.io/api/v2/chain/ethereum/account/${ETH_WALLET_ADDRESS}/nfts`;

    try {
        console.log("Fetching NFT Data");
        const response = await axios.get(url, {
            headers: {
                'X-API-KEY': OPENSEA_API_KEY,
                'Accept': 'application/json'
            },
            params: {
                // Additional query parameters can be added here if needed
                limit: 50  // Example: limiting the number of returned NFTs
            }
        });

        // Check if the response is successful
        if (response.status === 200) {
            console.log("NFT Data Retrieved Successfully");
            return res.status(200).json(response.data);
        } else {
            console.log("Error Fetching NFT Data", response.data);
            return res.status(response.status).send(response.data);
        }
    } catch (error) {
        console.error("Error during NFT Data Fetch", error);
        return res.status(500).send({ "error": "Internal Server Error" });
    }
}
