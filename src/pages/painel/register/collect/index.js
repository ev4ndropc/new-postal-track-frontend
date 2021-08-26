import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
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
    useToast,
    useDisclosure,
    ModalContent,
    ModalOverlay,
    Modal,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
} from '@chakra-ui/react'

import cookie from 'cookie'

import { FaTruckLoading } from 'react-icons/fa'
import { RiStore2Line } from 'react-icons/ri'
import { BiPackage } from 'react-icons/bi'
import { ImBarcode, ImQrcode } from 'react-icons/im'
import { AiOutlinePlusCircle } from 'react-icons/ai'

import Header from '../../../../components/Header'
import Content from '../../../../components/Content'
import Topbar from '../../../../components/Topbar'
import Sidebar from '../../../../components/Sidebar'

import useApi from '../../../../helpers/Api'

const Barcode = dynamic(
    () => import('../../../../components/Barcode'),
    { ssr: false }
)

const RegisterCollect = () => {
    const api = useApi()
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [readerType, setReaderType] = useState(null)
    
    const [data, setData] = useState('')
    const [salesChannel, setSalesChannel] = useState([])
    const [salesChannelName, setSalesChannelName] = useState('')

    const [salesChannelselected, setSalesChannelSelected] = useState('')
    

    const handleActiveReader = (reader) => {
        setReaderType(reader)
    }

    const handleAddSalesChannel = () => {
        onOpen()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(readerType == 'barcode') {
            if(salesChannelselected != ''){
                if(data == '') {
                    return toast({
                        title: "Atenção!",
                        description: "O campo do identificador está vazio.",
                        status: "warning",
                        duration: 5000,
                        isClosable: true,
                    })
                }
            }else{
                return toast({
                    title: "Atenção!",
                    description: "Escolha o canal de vendas primeiro.",
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                })
            }
        }else{
            if(salesChannelselected != ''){
                if(data == '') {
                    return toast({
                        title: "Atenção!",
                        description: "O campo do identificador está vazio.",
                        status: "warning",
                        duration: 5000,
                        isClosable: true,
                    })
                }else{
                    const res = await api.addCollect(data, salesChannelselected)
                    if(res.message.includes('already a collection')){
                        return toast({
                            title: "Atenção!",
                            description: "Já existe uma coleta cadastrada com esse identificador.",
                            status: "warning",
                            duration: 5000,
                            isClosable: true,
                        })
                    }else if(!res.ok) {
                        return toast({
                            title: "Erro!",
                            description: "Ocorreu algum erro, contate o administrador.",
                            status: "error",
                            duration: 5000,
                            isClosable: true,
                        })
                    }else{
                        setData('')
                        return toast({
                            title: "Sucesso!",
                            description: "Coleta registrada com sucesso.",
                            status: "success",
                            duration: 5000,
                            isClosable: true,
                        })  
                    }
                }
            }else{
                return toast({
                    title: "Atenção!",
                    description: "Escolha o canal de vendas primeiro.",
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                })
            }
        }
    }

    const handleAddNewSaleChannel = async (e) => {
        e.preventDefault()
        const res = await api.addSalesChannel(salesChannelName)
        if(res.ok) {

            var info = await api.getSalesChannel()
            setSalesChannel(info.sales_channel)

            setSalesChannelName('')
            onClose()

            return toast({
                title: "Sucesso!",
                description: "Canal de vendas adicionado com sucesso.",
                status: "success",
                duration: 5000,
                isClosable: true,
            })
        }else if(res.message.includes('already')) {
            return toast({
                title: "Atenção!",
                description: "Já existe um canal de vendas com esse nome.",
                status: "warning",
                duration: 5000,
                isClosable: true,
            }) 
        }else{
            return toast({
                title: "Erro!",
                description: "Aconteceu algum erro, contate o administrador.",
                status: "error",
                duration: 5000,
                isClosable: true,
            }) 
        }
    }
    
    // useEffect(() => {
    //     if(data != '')
    //     return handleSubmit
    // }, [data])

    useEffect(() => {
        const getSalesChannelInfo = async () => {
            var res = await api.getSalesChannel()
            setSalesChannel(res.sales_channel)
        }

        getSalesChannelInfo()
    }, [])

    return (
        <Content pageTitle="Registrar Coleta">
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
                            <Text  fontSize="24px" fontWeight="bold">Registrar Coleta</Text>
                        </Flex>
                        {readerType == 'barcode' &&
                            <Barcode submit={handleSubmit} data={data} setData={setData} />
                        }
                        <Flex w="100%" m="2rem 0" p="12px 24px" flexDir="column">
                            <chakra.form className="form-register-collect" w="100%" display="flex" onSubmit={handleSubmit} flexDir="column">
                                <Flex w="100%" flexDir="row">
                                    <FormControl mr="0.5rem" id="code">
                                        <FormLabel>Identificador</FormLabel>
                                        <InputGroup size="lg">
                                            <InputLeftAddon children={<BiPackage/>} />
                                            <Input value={data} onChange={e => setData(e.target.value)} placeholder="Código de barra identificador" type="text" />
                                        </InputGroup>
                                    </FormControl>

                                    <FormControl ml="0.5rem" id="channel">
                                        <FormLabel>Canal de vendas</FormLabel>
                                        <InputGroup size="lg">
                                            <InputLeftAddon children={<RiStore2Line/>} />
                                            <Select borderTopLeftRadius="none" onChange={e=> setSalesChannelSelected(e.target.value)} borderBottomLeftRadius="none" placeholder="Selecione o canal de vendas">
                                                {salesChannel.map((sale_channel, i) => (
                                                    <option key={i} value={sale_channel.name}>{sale_channel.name}</option>

                                                ))}
                                            </Select>
                                            <Button className="add-sale-channel" p="1rem" ml="0.5rem" onClick={handleAddSalesChannel}>
                                                <AiOutlinePlusCircle size="32px" />
                                            </Button>
                                        </InputGroup>
                                    </FormControl>
                                </Flex>

                                <FormControl mt="2rem">
                                    <Button type="submit" leftIcon={<FaTruckLoading/>} colorScheme="yellow" size="lg" color="white">Registrar</Button>
                                    <Button 
                                        leftIcon={<ImBarcode/>} 
                                        onClick={() => handleActiveReader(readerType == 'barcode' ? null : 'barcode')} 
                                        colorScheme={readerType == 'barcode' ? 'red' : 'green'}
                                        ml="1rem" 
                                        size="lg" 
                                        color="white"
                                    >
                                        {readerType == 'barcode' ? 'Parar de usar o' : 'Usar'} leitor de código de barras
                                    </Button>
                                </FormControl>
                            </chakra.form>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <Modal size="lg" isCentered closeOnOverlayClick={true} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <chakra.form method="POST" onSubmit={handleAddNewSaleChannel}>
                        <ModalHeader>Adicionar canal de vendas</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                                <FormControl mr="0.5rem" id="sale_channel">
                                    <FormLabel>Nome do canal de vendas</FormLabel>
                                    <InputGroup size="lg">
                                        <InputLeftAddon children={<RiStore2Line/>} />
                                        <Input value={salesChannelName} onChange={e => setSalesChannelName(e.target.value)} placeholder="Nome do canal de vendas" type="text" />
                                    </InputGroup>
                                </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button type="submit" colorScheme="yellow" color="white" mr={3}>
                                Adicionar
                            </Button>
                            <Button onClick={onClose}>Cancelar</Button>
                        </ModalFooter>
                    </chakra.form>
                </ModalContent>
            </Modal>
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

export default RegisterCollect