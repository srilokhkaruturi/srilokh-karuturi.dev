import type { NextPage } from 'next'
import axios from 'axios'
import { useEffect, useState } from 'react';
import SkeletonNFTs from './components/SkeletonNFTs'
import { Image, Space, Card } from 'antd';
import FadeIn from 'react-fade-in';

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
    return (<SkeletonNFTs />)
  }
  return (
    <>
      <FadeIn>
        <Space wrap>

          {NFTsData && NFTsData.map((NFTs: asset, index: number) => {
            return (
              <Card
                hoverable
                key={index}
                style={{ width: 225, height: 350, margin: '0 10px 10px 0', backgroundColor: "#e2ded7" }}
                cover={<Image key={index} src={NFTs.image_preview_url} alt={"..."} style={{ width: 225, height: 225 }} />}
              >
                <Card.Meta key={index} title={<a href={NFTs.permalink} target="_blank" rel={"noopener noreferrer"}> View on OpenSea </a>} description={NFTs.name} />
              </Card>

            )
          }
          )}

        </Space>

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

  const response = await fetch("http://" + window.location.hostname + ":3000/api/getNFTData", requestOptions)
  const responseObject = await response.json()
  return responseObject
}

export default NFTs;
