import {
    Flex,
    Button,
    Text,
    chakra,
    FormControl,
    FormLabel,
    Input,
    InputLeftAddon,
    InputGroup
} from '@chakra-ui/react'

import cookie from 'cookie'

import { 
    AiOutlineClear, 
    AiOutlinePlusSquare, 
    AiOutlineUser, 
    AiOutlineWhatsApp 
} from 'react-icons/ai'

import { BiPackage } from 'react-icons/bi'

import Header from '../../../../components/Header'
import Content from '../../../../components/Content'
import Topbar from '../../../../components/Topbar'
import Sidebar from '../../../../components/Sidebar'

const AddPackage = () => {
    return (
        <Content>
            <Header pageTitle="Adicionar Pacote"/>
            <Sidebar/>
            <Topbar/>
            <Flex 
                bgGradient="linear(to-b, #f1f1f1, #fff)"
                position="absolute"
                w="100%"
                h="100%"
                paddingLeft="320px"
                top="90px"
                justifyContent="center"
            >
                <Flex 
                    justifyContent="center"  
                    alignItems="flex-start" 
                    flexDir="row" 
                    p="24px" 
                    w="100%" 
                    maxH="400px"
                    maxW="1200px"
                >
                    <Flex background="#fff" w="100%" boxShadow="md" borderRadius="md" flexDir="column">
                        <Flex w="100%" bgColor="gray.200" p="12px" >
                            <Text fontSize="18px">Adicionar Pacote</Text>
                        </Flex>
                        <Flex w="100%" m="2rem 0" p="12px 24px" flexDir="column">
                            <chakra.form method="POST" w="100%" display="flex" flexDir="column">
                                <Flex w="100%" flexDir="row">
                                    <FormControl mr="0.5rem" id="code">
                                        <FormLabel>Nome</FormLabel>
                                        <InputGroup size="lg">
                                            <InputLeftAddon children={<AiOutlineUser/>} />
                                            <Input placeholder="Nome do cliente" type="text" />
                                        </InputGroup>
                                    </FormControl>

                                    <FormControl ml="0.5rem" mr="0.5rem" id="channel">
                                        <FormLabel>Whatsapp</FormLabel>
                                        <InputGroup size="lg">
                                            <InputLeftAddon children={<AiOutlineWhatsApp/>} />
                                            <Input size="lg" placeholder="Whatsapp" type="text" />
                                        </InputGroup>
                                    </FormControl>

                                    <FormControl ml="0.5rem" id="channel">
                                        <FormLabel>Código de rastreio</FormLabel>
                                        <InputGroup size="lg">
                                            <InputLeftAddon children={<BiPackage/>} />
                                            <Input size="lg" placeholder="Código de rastreio" type="text" />
                                        </InputGroup>
    
                                    </FormControl>
                                </Flex>

                                <FormControl mt="2rem">
                                    <Button type="submit" leftIcon={<AiOutlinePlusSquare/>} colorScheme="green" size="lg" color="white">Adicionar</Button>
                                    <Button  ml="0.5rem" leftIcon={<AiOutlineClear/>} colorScheme="red" size="lg" color="white">Limpar</Button>
                                </FormControl>
                            </chakra.form>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Content>
    )
}

export const getServerSideProps = async (context) => {
    let cookies = ''
  
    cookies = context.req.headers.cookie

    cookies = cookie.parse(cookies)
    
    
    if(!cookies.token){
      return {
          redirect: {
              permanent: false,
              destination: '/auth/signin'
            }
        }
    }

    
    //const info = await fetch(config.base_api+'/user/info', {
    //    headers: {
    //        'Authorization': `Bearer ${cookies.token}`
    //    }
    //})
    
    //const json = await info.json()


    //if(json.ok == false) {
    //  return {
    //    redirect: {
    //      permanent: false,
    //      destination: '/auth/signin'
    //    }
    //  }
    //}
  
    return {props: { ok: true }}
}

export default AddPackage