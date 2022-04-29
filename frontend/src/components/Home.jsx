/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import WalletBalance from './WalletBalance';
import { useEffect, useState } from 'react';

import { ethers } from 'ethers';
import Nft from '../artifacts/contracts/Nft.sol/Nft.json';

const contractAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

const provider = new ethers.providers.Web3Provider(window.ethereum);

//Get the end user
const signer = provider.getSigner();

//Get the smart contract
const contract = new ethers.Contract(contractAddress, Nft.abi, signer);

function Home() {
  const [totalMinted, setTotalMinted] = useState(0);
  useEffect(() => {
    getCount();
  }, []);

  const getCount = async () => {
    const count = await contract.count();
    console.log(parseInt(count));
    setTotalMinted(parseInt(count));
  };

  return (
    <div>
      <WalletBalance />

      <h1>NFT Collection</h1>
      <div className='container'>
        <div className='row'>
          {Array(totalMinted + 1)
            .fill(0)
            .map((_, i) => (
              <div key={i} className='col-sm'>
                <NFTImage tokenId={i} getCount={getCount} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

function NFTImage({ tokenId, getCount }) {
  const contentId = 'QmZJ6ghvcaTmv7CocqFcUHH4SiAZJEfooJnqpRvxpEcZD8';
  const metadataURI = `${contentId}/${tokenId}.json`;
  // const imageURI = `https://gateway.pinata.cloud/ipfs/${img-id}`;
  const imageURI = `./assets/${tokenId}.png`;

  const [isMinted, setIsMinted] = useState(false);
  useEffect(() => {
    getMintedStatus();
  }, [isMinted]);

  const getMintedStatus = async () => {
    const result = await contract.isContentOwned(metadataURI);
    console.log(result);
    setIsMinted(result);
  };

  const mintToken = async () => {
    const connection = contract.connect(signer);
    const addr = connection.address;
    const result = await contract.payToMint(addr, metadataURI, {
      value: ethers.utils.parseEther('0.05'),
    });

    await result.wait();
    getMintedStatus();
    getCount();
  };

  async function getURI() {
    const uri = await contract.tokenURI(tokenId);
    alert(uri);
  }

  return (
    <div>
      <img
        
        src={isMinted ? imageURI : '../assets/test.png'}
        style={{ width: '20rem' }}></img>
      <div>
        <h5>ID #{tokenId}</h5>
        {!isMinted ? (
          <button onClick={mintToken}>
            Mint
          </button>
        ) : (
          <button onClick={getURI}>
            Not available! Check URI
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;
