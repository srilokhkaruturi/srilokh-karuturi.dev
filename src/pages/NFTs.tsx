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


const NFTs: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [NFTsData, setNFTsData] = useState([]);
  useEffect(() => {

    getNFTsData().then(data => { setNFTsData(data.assets) }).then(() => { setLoading(false) });

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
                style={{ width: 225, height: 350, margin: '0 10px 10px 0', backgroundColor: "#e2ded7" }}
                cover={<Image key={index} src={NFTs.image_preview_url} style={{ width: 225, height: 225 }} />}
              >
                <Card.Meta title={<a href={NFTs.permalink}> More </a>} description={NFTs.name} />
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
  var config = {
    method: 'get',
    url: 'https://api.opensea.io/api/v1/assets?owner=0xd8f89ed994d61bd8bb602cbe76c48a1092269689',
    headers: {
      'X-API-KEY': 'a84fe116dff7488ba92f5c4667283090',
      'Content-Type': 'application/json'
    }
  };


  const response = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return response;
}

export default NFTs;
