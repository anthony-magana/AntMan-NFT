import React from 'react'
import {Box, Button, Flex, Image, Link, Spacer} from '@chakra-ui/react'
import Facebook from '../assets/social-media-icons/facebook_32x32.png'
import Twitter from '../assets/social-media-icons/twitter_32x32.png'
import Email from '../assets/social-media-icons/email_32x32.png'

const Navbar = ({accounts, setAccounts}) => {
    const isConnected = Boolean(accounts[0]);

    async function connectAccount() {
        if(window.ethereum){
            const newaccounts = await window.ethereum.request({method: 'eth_requestAccounts'});
            setAccounts(newaccounts);
        }
    }

    return (
        <Flex justify="space-between" align='center' padding='30px' flex='flex-wrap'>
            {/* left side of navbar */}
            <Flex justify='space-around' width='40%' padding='0 75px'>
                <Link href='https://www.facebook.com'>
                    <Image src={Facebook} alt='Facebook logo' boxSize='42px' margin='0 15px' />
                </Link>
                <Link href='https://www.twitter.com'>
                    <Image src={Twitter} alt='Facebook logo' boxSize='42px' margin='0 15px' />
                </Link>
                <Link href='mailto:test@gmail.com'>
                    <Image src={Email} alt='Facebook logo' boxSize='42px' margin='0 15px' />
                </Link>
            </Flex>

            {/* right side of navbar */}
            <Flex justify="space-around" align='center' width='40%' padding='30px' >
                <Box margin='0 15px'>About</Box>
                <Box margin='0 15px'>Mint</Box>
                <Box margin='0 15px'>Team</Box>
                <Spacer />

                {/* connect account button */}
            {!isConnected ? 
                (
                    <Button 
                        backgroundColor="#D6517D" 
                        borderRadius='5px'
                        boxShadow='0 2px 2px 1px #0F0F0F'
                        color='white'
                        cursor='pointer'
                        fontFamily='inherit'
                        padding='10px'
                        margin='0 15px'
                        onClick={connectAccount}
                    >Connect</Button>
                ) : (
                        <Box margin='0 15px' color='#D6517D'>Connected</Box>
                    )
            }
            </Flex>
        </Flex>
    )
}

export default Navbar;
