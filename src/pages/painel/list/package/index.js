import Link from 'next/link'

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
    Img,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    Tooltip,
} from '@chakra-ui/react'

import cookie from 'cookie'

import Header from '../../../../components/Header'
import Content from '../../../../components/Content'
import Topbar from '../../../../components/Topbar'
import Sidebar from '../../../../components/Sidebar'
import Led from '../../../../components/Led'

import { FaArrowLeft, FaArrowRight, FaEdit, FaTrash, FaBoxOpen, FaWhatsapp } from 'react-icons/fa'
import { IoMdArrowRoundForward } from 'react-icons/io'

import useApi from '../../../../helpers/Api'

const ListPackage = () => {

    const api = useApi()
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [isOpenTarget, setIsOpenTarget] = useState('')

    const [page, setPage] = useState(1)
    const [data, setData] = useState({data: []})
    const [lastPage, setLastPage] = useState(1)
    const [editPackageId, setEditPackageId] = useState('')
    const [editPackage, setEditPackage] = useState('')

    const [editPackageName, setEditPackageName] = useState('')
    const [editPackageNumber, setEditPackageNumber] = useState('')
    const [editPackageCode, setEditPackageCode] = useState('')
    const [editPackageLastUpdateHour, setEditPackageLastUpdateHour] = useState('')
    const [editPackageLastUpdateDate, setEditPackageLastUpdateDate] = useState('')
    const [editPackageStatus, setEditPackageStatus] = useState('')
    const [editPackageFinished, setEditPackageFinished] = useState('')

    const [searchPackage, setSearchPackage] = useState('')
    const [searchType, setSearchType] = useState('')
    const [trackpackage, setTrackPackage] = useState('')
    const [trackCodeData, setTrackCodeData] = useState({ evento: []})
    

    const handleDeleteDeliveredPackages = () => {
        setIsOpenTarget('delete_delivered_packages')
        onOpen()
    }

    const handleDeleteAllPackages = () => {
        setIsOpenTarget('delete_all_packages')
        onOpen()
    }

    const handleDeletePackage = async (id) => {
        setIsOpenTarget('alert_delete')
        setEditPackageId(id)
        onOpen()
    }

    const handleTrackPackage = async (code) => {
        setTrackCodeData({ evento: []})
        setIsOpenTarget('modal_track_package')
        setTrackPackage(code)
        onOpen()

        const res = await api.trackingCode(code)

        setTrackCodeData(res.result)
    }

    const handleSearchPackage = async (e) => {
        e.preventDefault()

        if(searchType.trim() != '' && searchPackage.trim() != '') {
            try {
                const res = await api.searchPackage(searchType, searchPackage)
                setData(res)
            } catch (error) {
                return null
            }
        }else{
            const res = await api.listPackage(page)
            setData(res.data)
        }

    }

    const confirDeletePackage = async () => {
        const res = await api.deletePackage(editPackageId)
        if(res.ok) {
            toast({
                title: "Sucesso!",
                description: "Pacote deletado com sucesso.",
                status: "success",
                duration: 5000,
                isClosable: true,
            })

            onClose()

            const res = await api.listPackage(page)
            setData(res.data)

            if(res.data.data == ''){
                setPage(1)
            }

            return
        }else{
            toast({
                title: "Erro!",
                description: "Ocorreu algum erro ao deletar esse pacote, tente novamente mais tarde.",
                status: "error",
                duration: 5000,
                isClosable: true,
            })

            return onClose()
        }
    }

    const confirmDeleteAllDeliveredPackage = async () => {
        const res = await api.deleteAllDeliveredPackage()
        if(res.ok) {
            toast({
                title: "Sucesso!",
                description: "Pacotes deletados com sucesso.",
                status: "success",
                duration: 5000,
                isClosable: true,
            })

            onClose()

            const res = await api.listPackage(page)
            setData(res.data)

            if(res.data.data == ''){
                setPage(1)
            }

            return
        }else{
            toast({
                title: "Erro!",
                description: "Ocorreu algum erro ao deletar esse pacote, tente novamente mais tarde.",
                status: "error",
                duration: 5000,
                isClosable: true,
            })

            return onClose()
        }
    }

    const confirmDeleteAllPackage = async () => {
        const res = await api.deleteAllPackage()
        if(res.ok) {
            toast({
                title: "Sucesso!",
                description: "Pacotes deletados com sucesso.",
                status: "success",
                duration: 5000,
                isClosable: true,
            })

            onClose()

            const res = await api.listPackage(page)
            setData(res.data)

            if(res.data.data == ''){
                setPage(1)
            }

            return
        }else{
            toast({
                title: "Erro!",
                description: "Ocorreu algum erro ao deletar esse pacote, tente novamente mais tarde.",
                status: "error",
                duration: 5000,
                isClosable: true,
            })

            return onClose()
        }
    }

    const handleEditPackage = async (code) => {
        setIsOpenTarget('modal_edit')
        setEditPackage(code)
        onOpen()
        const res = await api.getPackage(code)
        console.log(res)
        setEditPackageName(res.data.client_name)
        setEditPackageNumber(res.data.client_number)
        setEditPackageCode(res.data.code)
        setEditPackageLastUpdateHour(res.data.last_update_hour)

        if(res.data.last_update_date.includes('/')){
            var parserDate = res.data.last_update_date.split('/')[2]+'-'+res.data.last_update_date.split('/')[1]+'-'+res.data.last_update_date.split('/')[0]
            setEditPackageLastUpdateDate(parserDate)
        }else{
            setEditPackageLastUpdateDate(res.data.last_update_date)
        }

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
        if(res.ok) {
            onClose()
            return toast({
                title: "Sucesso!",
                description: "Pacote editado com sucesso.",
                status: "success",
                duration: 5000,
                isClosable: true,
            })
        }else if(res.message.includes('Please send all')){
            return toast({
                title: "Erro!",
                description: "Preencha todos os campos para salvar as alterações",
                status: "error",
                duration: 5000,
                isClosable: true,
            })
        }
        
        else{
            return toast({
                title: "Erro!",
                description: "Ocorreu algum erro, tente novamente mais tarde.",
                status: "error",
                duration: 5000,
                isClosable: true,
            })
        }
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
                pt="152px"
                justifyContent="center"
                overflowY="scroll"
            >
                <Flex 
                    justifyContent="flex-start"  
                    alignItems="center" 
                    flexDir="column" 
                    p="24px" 
                    w="100%" 
                    maxW="1500px"
                >
                    <Flex justifyContent="center" alignItems="center" mb="1rem">
                        <Link href="/painel/add/package">
                            <Button mr="0.5rem" colorScheme="green">Adicionar Novo</Button>
                        </Link>
                        <Button mr="0.5rem" colorScheme="yellow" color="white" onClick={handleDeleteDeliveredPackages}>Apagar entregues</Button>
                        <Button colorScheme="red" onClick={handleDeleteAllPackages}>Apagar todos</Button>

                    </Flex>
                    <Flex background="#fff" flexDir="column" boxShadow="md" borderRadius="md" pb="4rem" w="100%">
                        <Flex w="100%" bg="gray.200" p=".75rem 1.25rem" justifyContent="space-between">
                            <Text fontSize="26px" fontWeight="bold">Pacotes</Text>
                            <Flex>
                                <form onSubmit={handleSearchPackage}>
                                    <Input value={searchPackage} onChange={e=>setSearchPackage(e.target.value)} bg="white" placeholder="Procurar..." />
                                </form>
                                <Flex justifyContent="center" alignItems="center" m="0rem 0.4rem">
                                    Por
                                </Flex>
                                <Flex>
                                    <Select bg="white" placeholder="Selecione..." value={searchType} onChange={e=> setSearchType(e.target.value)}>
                                        <option value="client_name">Nome</option>
                                        <option value="client_number">Whatsapp</option>
                                        <option value="code">Código</option>
                                        <option value="last_update_hour">Última Atualização</option>
                                        <option value="last_update_date">Data</option>
                                        <option value="status">Última Movimentação</option>
                                    </Select>
                                </Flex>
                            </Flex>
                        </Flex>
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
                                            <Td cursor="pointer" onClick={() => handleTrackPackage(code.code)}>
                                                <Tooltip label="Clique para ver histórico de movimentações." hasArrow >
                                                    {code.code}
                                                </Tooltip>
                                            </Td>
                                            <Td>{code.last_update_hour}</Td>
                                            <Td>{code.last_update_date}</Td>
                                            <Td>{code.status}</Td>
                                            <Td>
                                                {code.status.includes('entregue') 
                                                    ?
                                                    <Led label="Entregue. Esse pacote já foi entregue." type="success" />
                                                    :
                                                    <Led label="A caminho. Esse pacote não foi entregue ainda." type="warning" />
                                                }
                                            </Td>
                                            <Td display="flex"flexDir="column">
                                                <Button onClick={() => handleEditPackage(code.code)} colorScheme="blue" color="white" m="2px 0" leftIcon={<FaEdit/>} >Editar</Button>
                                                <Button onClick={() => handleDeletePackage(code.id)} colorScheme="red" m="2px 0" leftIcon={<FaTrash/>} >Apagar</Button>
                                                <Button onClick={() => handleDeletePackage(code.id)} colorScheme="whatsapp" m="2px 0" leftIcon={<FaWhatsapp/>} >Enviar Mensagem</Button>
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
            <Modal isOpen={isOpenTarget == 'modal_edit' ? isOpen : null} onClose={onClose} isCentered size="xl">
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

            <Modal isOpen={isOpenTarget == 'modal_track_package' ? isOpen : null} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent maxW="50rem">
                    {trackCodeData != '' &&
                        <Flex flexDir="column" className="track_path">
                            <Flex w="100%" color="white" justifyContent="center" alignItems="center" flexDir="column" p="14px 24px" bgGradient="linear(to-r, yellow.400, yellow.300)" >
                                <Text fontSize="24px" fontWeight="bold">{trackpackage}</Text>
                                <Text fontSize="20px">{trackCodeData.categoria}</Text>
                            </Flex>
                            {trackCodeData.evento == '' &&
                                <Flex p="48px" w="100%" h="100%" justifyContent="center" alignItems="center">
                                    <Img maxW="100px" src="/assets/images/round-loading.svg" alt="Loading" />
                                </Flex>
                            }
                            <Flex p="12px" w="100%" maxH="600px" h="100%" overflowY="scroll" flexDir="column">
                                {trackCodeData.evento.map((event, i) => (
                                    <Flex>
                                        {i == 0 &&
                                            <Flex m="1rem 0rem" w="100%" bg="white" borderRadius="md" boxShadow="md">
                                                <Flex borderLeftWidth="7px" borderColor="blue.400" bg="gray.100" p="24px" flexDir="column" justifyContent="center" alignItems="center" textAlign="center">
                                                    <Img maxW="48px" mb="0.5rem" src="/assets/images/track-delivered.webp" />
                                                    <Text>{event.data}</Text>
                                                    <Text>{event.hora}</Text>
                                                </Flex>
                                                <Flex textAlign="center" w="100%" flexDir="column" justifyContent="center">
                                                    <Text fontWeight="bold" w="100%" fontSize="18px">{event.descricao}</Text>
                                                    <Text>{event.local}, {event.cidade}, {event.uf}</Text>
                                                </Flex>
                                            </Flex>
                                        }
                                        {i != 0 && 
                                            <Flex m="1rem 0rem" w="100%" bg="white" borderRadius="md" boxShadow="md">
                                                <Flex 
                                                    borderLeftWidth="7px" 
                                                    bg="gray.100" 
                                                    p=" 18px 24px" 
                                                    flexDir="column" 
                                                    justifyContent="center" 
                                                    alignItems="center" 
                                                    borderColor={event.descricao == 'Objeto saiu para entrega ao destinatário' 
                                                    ? 'yellow.400' 
                                                    : event.descricao.includes('encaminhado para retirada')
                                                    ? 'blue.600'
                                                    : event.descricao.includes('não realizada')
                                                    ? 'red.400'
                                                    : 'black'
                                                    } 
                                                    textAlign="center"
                                                >
                                                    {event.descricao == 'Objeto saiu para entrega ao destinatário' 
                                                        ?
                                                            <Img maxW="48px" mb="0.5rem" src="/assets/images/track-delivering.webp" />
                                                        :

                                                        event.descricao.includes('encaminhado para retirada')
                                                        ?
                                                            <Img maxW="48px" mb="0.5rem" src="/assets/images/track-forwarded.webp" />
                                                        :
                                                        event.descricao.includes('não realizada')
                                                        ?
                                                            <Img maxW="48px" mb="0.5rem" src="/assets/images/track-not-delivered.webp" />
                                                        :
                                                            <Img maxW="48px" mb="0.5rem" src="/assets/images/track-posted.webp" />
                                                    }

                                                    <Text>{event.data}</Text>
                                                    <Text>{event.hora}</Text>
                                                </Flex>
                                                <Flex textAlign="center" w="100%" flexDir="column" justifyContent="center">
                                                    <Text fontWeight="bold" w="100%" fontSize="18px">{event.descricao}</Text>
                                                    {event.destino &&
                                                        <Flex flexDir="row" alignItems="center" w="100%" justifyContent="center" fontSize="14px" color="gray.500">
                                                            <Text mr="0.5rem">{event.local} {event.cidade}, {event.uf}</Text>
                                                            <IoMdArrowRoundForward />
                                                            <Text ml="0.5rem"> {event.destino.local} {event.destino.cidade}, {event.destino.uf}</Text>
                                                        </Flex>
                                                    }
                                                    {!event.destino && 
                                                        <Text textTransform="">{event.local} {event.cidade}, {event.uf}</Text>
                                                    }
                                                </Flex>
                                            </Flex>
                                        }
                                    </Flex>
                                ))}
                            </Flex>
                        </Flex>
                    }
                </ModalContent>
            </Modal>

            <AlertDialog
                isOpen={isOpenTarget == 'alert_delete' || isOpenTarget == 'delete_all_packages' || isOpenTarget == 'delete_delivered_packages' ? isOpen : null}
                onClose={onClose}
                isCentered
                motionPreset="slideInTop"
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        {isOpenTarget == 'alert_delete' &&
                            'Deletar pacote'
                        }

                        {isOpenTarget == 'delete_all_packages' &&
                            'Deletar todos os pacotes'
                        }

                        {isOpenTarget == 'delete_delivered_packages' &&
                            'Deletar pacotes entregues'
                        }
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Você tem certeza que deseja deletar esse pacote? 
                            <br></br>
                            Essa ação não poderá ser desfeita!
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button onClick={onClose}>
                                Cancelar
                            </Button>
                            {isOpenTarget == 'alert_delete' &&
                                <Button colorScheme="red" onClick={confirDeletePackage} ml={3}>
                                    Sim, delete ele!
                                </Button>
                            }
                            {isOpenTarget == 'delete_all_packages' &&
                                <Button colorScheme="red" onClick={confirmDeleteAllPackage} ml={3}>
                                Sim, delete todos!
                                </Button>
                            }

                            {isOpenTarget == 'delete_delivered_packages' &&
                                <Button colorScheme="red" onClick={confirmDeleteAllDeliveredPackage} ml={3}>
                                Sim, delete todos entreges!
                                </Button>
                            }
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

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