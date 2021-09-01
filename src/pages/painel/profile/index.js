import {
    Avatar,
    Flex,
    FormControl,
    FormLabel,
    Img,
    Text,
    Input,
    Button
} from '@chakra-ui/react'

import { useEffect, useState } from 'react'

import cookie from 'cookie'

import Content from '../../../components/Content'


const Profile = () => {
    return (
        <Content pageTitle="Dashboard">
            <Flex 
                bgGradient="linear(to-b, #f1f1f1, #fff)"
                position="relative"
                w="100%"
                h="100%"
                p="24px" 
            >
                <Flex
                    justifyContent="flex-start" 
                    alignItems="flex-start" 
                    flexDir="column"
                    p="24px" 
                    w="100%"
                    bg="white"
                    borderRadius="md"
                    boxShadow="md"
                >
                    <Flex w="100%" justifyContent="center" alignItems="center">
                        <Avatar cursor="pointer" size="xl" src="https://postaltrack.com.br/img/avatars/avatar1592514063706.png"/>
                    </Flex>
                    <Flex flexDir="column" w="100%">
                        <FormControl id="name">
                            <FormLabel>Seu nome</FormLabel>
                            <Input type="text" />
                        </FormControl>

                        <FormControl id="email" mt="1rem">
                            <FormLabel>Seu email</FormLabel>
                            <Input type="email" />
                        </FormControl>

                        <FormControl id="password" mt="1rem">
                            <FormLabel>Nova senha</FormLabel>
                            <Input type="password" placeholder="Caso não queira trocar, deixe em branco" />
                        </FormControl>

                        <FormControl id="re-password" mt="1rem">
                            <FormLabel>Confirmar senha</FormLabel>
                            <Input type="password" placeholder="Caso não queira trocar, deixe em branco" />
                        </FormControl>

                        <FormControl id="whatsapp" mt="1rem">
                            <FormLabel>Whatsapp</FormLabel>
                            <Input type="phone" />
                        </FormControl>

                        <FormControl mt="1rem">
                            <Button colorScheme="yellow" color="white" size="lg">Salvar informações</Button>
                        </FormControl>
                    </Flex>
                </Flex>
            </Flex>
        </Content>
    )
}

export const getServerSideProps = async (context) => {
    let cookies = ''
  
    cookies = context.req.headers.cookie

    try {
        cookies = cookie.parse(cookies)
    } catch (error) {
        return {
            redirect: {
                permanent: false,
                destination: '/auth/signin'
              }
          }
    }
    
    
    if(!cookies.token){
      return {
          redirect: {
              permanent: false,
              destination: '/auth/signin'
            }
        }
    }

    
    // const info = await fetch(config.base_api+'/user/info', {
    //    headers: {
    //        'Authorization': `Bearer ${cookies.token}`
    //    }
    // })
    
    // const json = await info.json()


    // if(json.ok == false) {
    //  return {
    //    redirect: {
    //      permanent: false,
    //      destination: '/auth/signin'
    //    }
    //  }
    // }
  
    return {props: { ok: true }}
}

export default Profile
