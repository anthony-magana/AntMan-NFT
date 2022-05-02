import React, {useState} from 'react'
import {ethers, BigNumber} from 'ethers'
import antManNFT from '../AntManNFT.json'
import {Box, Button, Flex, Input, Text} from '@chakra-ui/react'

const antManNFTAddress = "0x8E4F9261E75e0D0F7af6adCE37D3d51669181c85"

const MainMint = ({accounts, setAccounts}) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if(window.ethereum){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(antManNFTAddress, antManNFT.abi, signer);
            try {
                const minted = await contract.mint(BigNumber.from(mintAmount), {
                    value: ethers.utils.parseEther((0.02 * mintAmount).toString())
                });
                console.log(minted);
    
                alert("Minted!");
            } catch (error) {
                console.log(error);
                alert("Error minting!");
            }
        }
    }

    const handleDecrement = () => {
        if(mintAmount < 1)
            return;
        setMintAmount((Amount) => Amount - 1);
    }
    const handleIncrement = () => {
        if(mintAmount >= 3)
            return;
        setMintAmount((Amount) => Amount + 1);
    }

    return (
        <Flex justify='center' height='100vh' paddingBottom='150px' flex='flex-wrap'>
            <Box width='520px'>
                <div>
                    <Text fontSize='48px' textShadow='0 5px #000000'>AntMan</Text>
                    <Text fontSize='38px' fontFamily='VT323' textShadow='0 2px 2px #000000'>
                        It's 2078. <br /> My days of breaking in places and stealing stuff are over, 
                        can AntMan NFT save humans from destructive rampant NFT speculation?
                        <br />
                        <span style={{paddingTop: '5px'}}>Mint AntMan to find out.</span>
                    </Text>
                </div>
                {isConnected ? (
                    <div>
                        <Flex align='center' justify='center'>
                            <Button
                             backgroundColor="#D6517D" 
                             borderRadius='5px'
                             boxShadow='0 2px 2px 1px #0F0F0F'
                             color='white'
                             cursor='pointer'
                             fontFamily='inherit'
                             padding='10px'
                             marginTop='10px'
                             onClick={handleDecrement}
                            >
                                -
                            </Button>
                            <Input 
                             fontFamily='inherit'
                             width='100px'
                             height='35px'
                             textAlign='center'
                             paddingLeft='19px'
                             marginTop='8px'
                             type='number' 
                             value={mintAmount} 
                             readOnly
                             />
                            <Button
                             backgroundColor="#D6517D" 
                             borderRadius='5px'
                             boxShadow='0 2px 2px 1px #0F0F0F'
                             color='white'
                             cursor='pointer'
                             fontFamily='inherit'
                             padding='10px'
                             marginTop='10px'
                             marginLeft='2px'
                             onClick={handleIncrement}
                            >
                                +
                            </Button>
                        </Flex>
                        <Button
                         backgroundColor="#D6517D" 
                         borderRadius='5px'
                         boxShadow='0 2px 2px 1px #0F0F0F'
                         color='white'
                         cursor='pointer'
                         fontFamily='inherit'
                         padding='15px'
                         marginTop='10px'
                         onClick={handleMint}
                        >
                            Mint
                        </Button>
                    </div>
                ) : (
                    <Text
                     marginTop='70px'
                     fontSize='30px'
                     letterSpacing='-5.5%'
                     fontFamily='VT323'
                     textShadow='0 3px #000000'
                     color='#D6517D'
                    >
                        Connect your wallet to mint an AntMan NFT
                    </Text>
                )}
            </Box>
        </Flex>
    )
}

export default MainMint;