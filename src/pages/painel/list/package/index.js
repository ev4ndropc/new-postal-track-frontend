import { useEffect, useState } from 'react'
import {
    Flex,
    Text,
    Table,
    Tbody,
    Td,
    Button,
    Th,
    Thead,
    Tr,
    Input,
    Skeleton,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    useDisclosure,
    ModalBody,
    ModalCloseButton,
    ModalHeader,
    ModalFooter,
    FormControl,
    FormLabel,
    Select,
    chakra,
} from '@chakra-ui/react'

import cookie from 'cookie'

import Header from '../../../../components/Header'
import Content from '../../../../components/Content'
import Topbar from '../../../../components/Topbar'
import Sidebar from '../../../../components/Sidebar'
import Led from '../../../../components/Led'

import { FaArrowLeft, FaArrowRight, FaEdit, FaTrash, FaBoxOpen } from 'react-icons/fa'

import useApi from '../../../../helpers/Api'

const ListPackage = () => {

    const api = useApi()
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [page, setPage] = useState(1)
    const [data, setData] = useState({data: []})
    const [lastPage, setLastPage] = useState(1)
    const [editPackage, setEditPackage] = useState('')

    const [editPackageName, setEditPackageName] = useState('')
    const [editPackageNumber, setEditPackageNumber] = useState('')
    const [editPackageCode, setEditPackageCode] = useState('')
    const [editPackageLastUpdateHour, setEditPackageLastUpdateHour] = useState('')
    const [editPackageLastUpdateDate, setEditPackageLastUpdateDate] = useState('')
    const [editPackageStatus, setEditPackageStatus] = useState('')
    const [editPackageFinished, setEditPackageFinished] = useState('')
    

    const handleDeletePackage = async (id) => {

        const res = await api.deletePackage(id)
        if(res.ok) {
            toast({
                title: "Sucesso!",
                description: "Pacote deletado com sucesso.",
                status: "success",
                duration: 5000,
                isClosable: true,
            })

            const res = await api.getData(page)
            setData(res.data)

            if(res.data.data == ''){
                setPage(1)
            }

            return
        }
    }

    const handleEditPackage = async (code) => {
        setEditPackage(code)
        onOpen()
        const res = await api.getPackage(code)
        console.log(res)
        setEditPackageName(res.data.client_name)
        setEditPackageNumber(res.data.client_number)
        setEditPackageCode(res.data.code)
        setEditPackageLastUpdateHour(res.data.last_update_hour)
        setEditPackageLastUpdateDate(res.data.last_update_date)
        setEditPackageStatus(res.data.status)
        setEditPackageFinished(res.data.finished)
    }

    const handleSaveEditPackage = async (e) => {
        e.preventDefault()
        const res = await api.editPackage({
            client_name: editPackageName,
            client_number: editPackageNumber,
            code: editPackageCode,
            last_update_hour: editPackageLastUpdateHour,
            last_update_date: editPackageLastUpdateDate,
            status: editPackageStatus,
            finished: editPackageFinished
        })
        console.log(res)
    }

    useEffect(() => {
        const getData = async () => {
            const res = await api.listPackage(page)
            setData(res.data)

            if(res.data.pagination.lastPage != undefined){
                setLastPage(res.data.pagination.lastPage)
            }
        }

        getData()
    }, [page])

    return (
        <Content>
            <Header pageTitle="Lista de Pacotes"/>
            <Sidebar/>
            <Topbar/>
            <Flex 
                bgGradient="linear(to-b, #f1f1f1, #fff)"
                position="absolute"
                w="100%"
                h="100%"
                paddingLeft="320px"
                pt="90px"
                justifyContent="center"
                overflowY="scroll"
            >
                <Flex 
                    justifyContent="center"  
                    alignItems="flex-start" 
                    flexDir="row" 
                    p="24px" 
                    w="100%" 
                    maxW="1500px"
                >
                    <Flex background="#fff" flexDir="column" boxShadow="md" borderRadius="md" pb="4rem">
                        <Table 
                            variant="striped" 
                            display={data.data == '' ? 'flex' : '' } 
                            flexDir={data.data == '' ? 'column' : '' }
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Thead>
                                <Tr >
                                    <Th color="black" fontSize="14px">Id</Th>
                                    <Th color="black" fontSize="14px">Nome</Th>
                                    <Th color="black" fontSize="14px">Whatsapp</Th>
                                    <Th color="black" fontSize="14px">Código</Th>
                                    <Th color="black" fontSize="14px">Última Atualização</Th>
                                    <Th color="black" fontSize="14px">Data</Th>
                                    <Th color="black" fontSize="14px">Última Movimentação</Th>
                                    <Th color="black" fontSize="14px">Status</Th>
                                    <Th color="black" fontSize="14px">Ações</Th>
                                </Tr>
                            </Thead>
                            {data.data == '' &&
                                <Tbody h="120px" display="flex" flexDir="column" justifyContent="center" alignItems="center">
                                    <FaBoxOpen mb="1rem" size="32px" />
                                    <Text>Nenhum dado para mostrar</Text>
                                </Tbody>
                            }
                            {data.data != '' &&
                                <Tbody>
                                    {data.data.map((code, i) => (
                                        <Tr key={i}>
                                            <Td fontWeight="bold">{code.id}</Td>
                                            <Td>{code.client_name}</Td>
                                            <Td>{code.client_number}</Td>
                                            <Td>{code.code}</Td>
                                            <Td>{code.last_update_hour}</Td>
                                            <Td>{code.last_update_date}</Td>
                                            <Td>{code.status}</Td>
                                            <Td>
                                                {code.status.includes('entregue') 
                                                    ?
                                                    <Led type="success" />
                                                    :
                                                    <Led type="warning" />
                                                }
                                            </Td>
                                            <Td display="flex"flexDir="column">
                                                <Button onClick={() => handleEditPackage(code.code)} colorScheme="blue" color="white" m="2px 0" leftIcon={<FaEdit/>} >Editar</Button>
                                                <Button onClick={() => handleDeletePackage(code.id)} colorScheme="red" m="2px 0" leftIcon={<FaTrash/>} >Apagar</Button>
                                            </Td>
                                        </Tr>
                                    ))
                                    }
                                </Tbody>
                            }
                        </Table>
                        <Flex w="100%" p="12px">
                            {data != '' &&
                                <Flex w="100%" justifyContent="center" alignItems="center">
                                    <Button onClick={() => { if(page > 1) return setPage(page-1) }}>
                                        <FaArrowLeft/>
                                    </Button>

                                    <Flex maxW="320px">
                                        <Text m="0.5rem">Página</Text>
                                        <Input maxW="100px" textAlign="center" value={page} onChange={e=>setPage(e.target.value)} placeholder="Numéro da página"/>
                                        <Text m="0.5rem" minW="50px">de {lastPage}</Text>
                                    </Flex>

                                    <Button onClick={() => { if(page < lastPage) return setPage(page+1) }}>
                                        <FaArrowRight/>
                                    </Button>
                                </Flex>
                            }
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
                <ModalOverlay />
                <ModalContent>
                    <chakra.form method="PUT" onSubmit={handleSaveEditPackage}>
                        <ModalHeader fontWeight="normal">Editar o pacote <strong>{editPackage}</strong></ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl m="0.8rem 0" id="name">
                                <FormLabel>Nome</FormLabel>
                                <Input type="text" value={editPackageName} onChange={e=>setEditPackageName(e.target.value)} />
                            </FormControl>

                            <FormControl m="0.8rem 0" id="number">
                                <FormLabel>Whatsapp</FormLabel>
                                <Input type="number" value={editPackageNumber} onChange={e=>setEditPackageNumber(e.target.value)} />
                            </FormControl>

                            <FormControl m="0.8rem 0" id="code">
                                <FormLabel>Código</FormLabel>
                                <Input type="text" background="gray.100" value={editPackageCode} onChange={e=>setEditPackageCode(e.target.value)} readOnly />
                            </FormControl>

                            <FormControl m="0.8rem 0" id="last_update_hour">
                                <FormLabel>Hora</FormLabel>
                                <Input type="time" value={editPackageLastUpdateHour.includes('Nenhum') ? '' : editPackageLastUpdateHour} onChange={e=>setEditPackageLastUpdateHour(e.target.value)} />
                            </FormControl>

                            <FormControl m="0.8rem 0" id="last_update_date">
                                <FormLabel>Data</FormLabel>
                                <Input type="date" value={editPackageLastUpdateDate.includes('Nenhum') ? '' : editPackageLastUpdateDate} onChange={e=>setEditPackageLastUpdateDate(e.target.value)} />
                            </FormControl>

                            <FormControl m="0.8rem 0" id="status">
                                <FormLabel>Status</FormLabel>
                                <Input type="text" value={editPackageStatus} onChange={e=>setEditPackageStatus(e.target.value)} />
                            </FormControl>

                            <FormControl m="0.8rem 0" id="finished">
                                <FormLabel>Finalizado</FormLabel>
                                <Select placeholder="Escolha" value={editPackageFinished} onChange={e=>setEditPackageFinished(e.target.value)}>
                                    <option value="y">Finalizado</option>
                                    <option value="n">Não finalizado</option>
                                </Select>
                            </FormControl>
                            
                        </ModalBody>

                        <ModalFooter>
                            <Button variant="outline" mr={3} onClick={onClose}>
                                Fechar
                            </Button>
                            <Button type="submit" colorScheme="blue" >Salvar</Button>
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

export default ListPackage