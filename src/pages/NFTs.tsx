import type { NextPage } from 'next'
import styles from "../styles/NFTs.module.scss"

import axios from 'axios'
import { useEffect, useState } from 'react';
import SkeletonNFTs from './components/SkeletonNFTs'
import { Image, Space, Card } from 'antd';
import FadeIn from 'react-fade-in';
import SkeletonEverything from './components/SkeletonEverything';

type asset = {
  name: string,
  permalink: string,
  image_preview_url: string,
}

type API_RESPONSE = {
  assets: asset[]
}


const NFTs: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [NFTsData, setNFTsData] = useState<asset[]>([]);
  useEffect(() => {

    getNFTsData().then(
      (response: API_RESPONSE) => {
        //@ts-ignore
        if (response) {
          setNFTsData(response.assets)
        }
      })

      .then(() => {
        setLoading(false)
      });


  }, []);

  if (loading) {
    return (<SkeletonEverything />)
  }
  return (
    <>
      <FadeIn>
        <div className={styles.nftCardWrapper}>

          {NFTsData && NFTsData.map((NFTs: asset, index: number) => {
            return (
              <Card
                // className={"nftCard" + index}
                className={styles.nftCard}
                hoverable
                key={index}
                // style={{ width: 250, height: 375, backgroundColor: "#e2ded7", marginBottom: "24px" }}
                cover={<Image key={index} src={NFTs.image_preview_url} alt={"..."} style={{ width: 250, height: 250 }} />}
              >
                <Card.Meta key={index} title={<a href={NFTs.permalink} target="_blank" rel={"noopener noreferrer"}> View on OpenSea </a>} description={NFTs.name} />
              </Card>

            )
          }
          )}

        </div>

      </FadeIn>
    </>

  )
}

const getNFTsData = async () => {
  var redirectOption: RequestRedirect = "follow"

  var requestOptions = {
    method: 'GET',
    redirect: redirectOption
  };

  const response = await fetch("/api/getNFTData", requestOptions)
  const responseObject = await response.json()
  return responseObject
}

export default NFTs;
