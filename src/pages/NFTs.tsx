import { NextPage } from 'next'
import styles from "../styles/NFTs.module.scss"

import { useEffect, useState } from 'react';
import { Card } from 'antd';
import FadeIn from 'react-fade-in';

import SkeletonEverything from './components/SkeletonEverything';

// Define the structure of each NFT item based on the API response
type NFT = {
  identifier: string,
  name: string,
  description: string,
  opensea_url: string
}

// Define the structure of the API response
type APIResponse = {
  nfts: NFT[]
}

const NFTs: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [nftsData, setNftsData] = useState<NFT[]>([]);

  useEffect(() => {
    const getNFTsData = async () => {
      try {
        const response = await fetch("/api/getNFTData");
        const data: APIResponse = await response.json();
        setNftsData(data.nfts);
      } catch (error) {
        console.error("Failed to fetch NFT data:", error);
      }
      setLoading(false);
    };

    getNFTsData();
  }, []);

  if (loading) {
    return <SkeletonEverything />;
  }

  return (
    <FadeIn>
      <div className={styles.nftCardWrapper}>
        {nftsData.map((nft, index) => (
          <Card
            className={styles.nftCard}
            hoverable
            key={nft.identifier}
          >
            <Card.Meta
              title={<a href={nft.opensea_url} target="_blank" rel="noopener noreferrer">{nft.name}</a>}
            />
          </Card>
        ))}
      </div>
    </FadeIn>
  );
}

export default NFTs;
