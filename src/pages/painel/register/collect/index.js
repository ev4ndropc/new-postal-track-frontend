import {
    chakra,
    Flex,
    FormControl,
    FormLabel,
    Button,
    Input,
    Select,
    Text,
    InputGroup,
    InputLeftAddon,
} from '@chakra-ui/react'

import cookie from 'cookie'

import { FaTruckLoading } from 'react-icons/fa'
import { RiStore2Line } from 'react-icons/ri'
import { BiPackage } from 'react-icons/bi'

import Header from '../../../../components/Header'
import Content from '../../../../components/Content'
import Topbar from '../../../../components/Topbar'
import Sidebar from '../../../../components/Sidebar'
import Barcode from '../../../../components/Barcode'

const RegisterCollect = () => {
    return (
        <Content>
            <Header pageTitle="Registrar Coleta"/>
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
                            <Text fontSize="18px">Registrar Coleta</Text>
                        </Flex>
                        <Barcode/>
                        <Flex w="100%" m="2rem 0" p="12px 24px" flexDir="column">
                            <chakra.form method="POST" w="100%" display="flex" flexDir="column">
                                <Flex w="100%" flexDir="row">
                                    <FormControl mr="0.5rem" id="code">
                                        <FormLabel>Identificador</FormLabel>
                                        <InputGroup size="lg">
                                            <InputLeftAddon children={<BiPackage/>} />
                                            <Input placeholder="Código de barra identificador" type="text" />
                                        </InputGroup>
                                    </FormControl>

                                    <FormControl ml="0.5rem" id="channel">
                                        <FormLabel>Canal de vendas</FormLabel>
                                        <InputGroup size="lg">
                                            <InputLeftAddon children={<RiStore2Line/>} />
                                            <Select borderTopLeftRadius="none" borderBottomLeftRadius="none" placeholder="Selecione o canal de vendas">
                                                <option value="option1">MercadoLivre</option>
                                                <option value="option2">Shopee</option>
                                                <option value="option3">Amazon</option>
                                            </Select>
                                        </InputGroup>
                                    </FormControl>
                                </Flex>

                                <FormControl mt="2rem">
                                    <Button type="submit" leftIcon={<FaTruckLoading/>} colorScheme="yellow" size="lg" color="white">Registrar</Button>
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

export default RegisterCollect