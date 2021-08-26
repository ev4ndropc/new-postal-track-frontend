import { useState } from 'react'

import {
    Flex,
    Button,
    Text,
    chakra,
    FormControl,
    FormLabel,
    Input,
    InputLeftAddon,
    InputGroup,
    useToast
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

import useApi from '../../../../helpers/Api'

const AddPackage = () => {
    const api = useApi()
    const toast = useToast()

    const [clientName, setClientName] = useState('')
    const [clientNumber, setClientNumber] = useState('')
    const [code, setCode] = useState('')


    const handleSubmitCode = async (e) => {
        e.preventDefault()

        if(clientName.trim() == '' || clientNumber.trim() == '' || code.trim() == ''){
            toast({
                title: "Atenção!",
                description: "Preencha todos os campos.",
                status: "warning",
                duration: 5000,
                isClosable: true,
            })
            return
        }

        const res = await api.addPackage(clientName, clientNumber, code)

        if(res.ok) {
            toast({
                title: "Sucesso!",
                description: "Código cadastrado com sucesso.",
                status: "success",
                duration: 5000,
                isClosable: true,
            })
            setClientName('')
            setClientNumber('')
            setCode('')
            return
        }else if(res.message.includes('already registered')){
            return toast({
                title: "Erro!",
                description: "Esse código já foi cadastrado.",
                status: "error",
                duration: 5000,
                isClosable: true,
              })
        }else{
            return toast({
                title: "Erro!",
                description: "Ocorreu algum erro, contate o nosso suporte.",
                status: "error",
                duration: 5000,
                isClosable: true,
              })
        }
    }

    const handleClearFields = () => {
        setClientName('')
        setClientNumber('')
        setCode('')
        return
    }

    return (
        <Content pageTitle="Adicionar Pacote">
            <Flex 
                bgGradient="linear(to-b, #f1f1f1, #fff)"
                position="relative"
                w="100%"
                h="100%"
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
                            <Text  fontSize="24px" fontWeight="bold">Adicionar Pacote</Text>
                        </Flex>
                        <Flex w="100%" m="2rem 0" p="12px 24px" flexDir="column">
                            <chakra.form className="form-add-package" method="POST" w="100%" display="flex" flexDir="column"onSubmit={handleSubmitCode}>
                                <Flex w="100%" flexDir="row">
                                    <FormControl mr="0.5rem" id="code">
                                        <FormLabel>Nome</FormLabel>
                                        <InputGroup size="lg">
                                            <InputLeftAddon children={<AiOutlineUser/>} />
                                            <Input value={clientName} onChange={e=>setClientName(e.target.value)} placeholder="Nome do cliente" type="text" />
                                        </InputGroup>
                                    </FormControl>

                                    <FormControl ml="0.5rem" mr="0.5rem" id="channel">
                                        <FormLabel>Whatsapp</FormLabel>
                                        <InputGroup size="lg">
                                            <InputLeftAddon children={<AiOutlineWhatsApp/>} />
                                            <Input value={clientNumber} onChange={e=>setClientNumber(e.target.value)}  size="lg" placeholder="Whatsapp" type="text" />
                                        </InputGroup>
                                    </FormControl>

                                    <FormControl ml="0.5rem" id="channel">
                                        <FormLabel>Código de rastreio</FormLabel>
                                        <InputGroup size="lg">
                                            <InputLeftAddon children={<BiPackage/>} />
                                            <Input value={code} onChange={e=>setCode(e.target.value)} size="lg" placeholder="Código de rastreio" type="text" />
                                        </InputGroup>
    
                                    </FormControl>
                                </Flex>

                                <FormControl mt="2rem">
                                    <Button type="submit" leftIcon={<AiOutlinePlusSquare/>} colorScheme="green" size="lg" color="white">Adicionar</Button>
                                    <Button  ml="0.5rem" leftIcon={<AiOutlineClear/>} onClick={handleClearFields} colorScheme="red" size="lg" color="white">Limpar</Button>
                                </FormControl>
                            </chakra.form>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Content>
    )
}

// export const getServerSideProps = async (context) => {
//     let cookies = ''
  
//     cookies = context.req.headers.cookie

//     try {
//         cookies = cookie.parse(cookies)
//     } catch (error) {
//         return {
//             redirect: {
//                 permanent: false,
//                 destination: '/auth/signin'
//               }
//           }
//     }
    
    
//     if(!cookies.token){
//       return {
//           redirect: {
//               permanent: false,
//               destination: '/auth/signin'
//             }
//         }
//     }

    
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
  
//     return {props: { ok: true }}
// }

export default AddPackage