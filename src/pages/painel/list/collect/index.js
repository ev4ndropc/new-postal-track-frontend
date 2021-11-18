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
  Badge,
  FormControl,
  Checkbox,
  Select,
} from '@chakra-ui/react'

import moment from 'moment'

import cookie from 'cookie'
import Cookies from 'js-cookie'

import Content from '../../../../components/Content'


import useApi from '../../../../helpers/Api'

import { FaArrowLeft, FaArrowRight, FaBoxOpen, FaFileDownload } from 'react-icons/fa'

const VerifyCollect = () => {
  const token = Cookies.get('token')
  moment.locale('pt')

  const api = useApi()

  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)

  const [list, setList] = useState({ data: [] })
  const [selectedCollect, setSelectedCollect] = useState([])
  const [selectAll, setSelectAll] = useState(false)

  const [totalCollected, setTotalCollected] = useState(0)
  const [totalNotCollected, setTotalNotCollected] = useState(0)

  const [searchDate, setSearchDate] = useState(moment().format('YYYY-MM-DD'))
  const [identifier, setIdentifier] = useState('')

  const handleAddSelectedCollect = (identifier) => {
    var newCollect = [...selectedCollect]

    var index = newCollect.indexOf(identifier)

    if (index == -1) {
      newCollect.push(identifier)
      setSelectedCollect(newCollect)
    } else {
      newCollect.splice(index, 1)
      setSelectedCollect(newCollect)
    }

  }


  const handleMarkAsCollected = async () => {
    const res = await api.markAsCollected(selectedCollect)

    var verify_total_collected = 0
    var verify_total_not_collected = 0

    const getList = async () => {
      const res = await api.listCollects(page, searchDate, token)
      setList(res.data)


      if (res.data.pagination.lastPage != undefined) {
        setLastPage(res.data.pagination.lastPage)
      }

      res.data.data.forEach(collect => {
        if (collect.collected == 'true') {
          verify_total_collected++
        } else {
          verify_total_not_collected++
        }
      })

      setTotalCollected(verify_total_collected)
      setTotalNotCollected(verify_total_not_collected)
    }

    getList()

  }

  const handleMarkAsNotCollected = async () => {
    const res = await api.markAsNotCollected(selectedCollect)

    var verify_total_collected = 0
    var verify_total_not_collected = 0

    const getList = async () => {
      const res = await api.listCollects(page, searchDate, token)
      setList(res.data)


      if (res.data.pagination.lastPage != undefined) {
        setLastPage(res.data.pagination.lastPage)
      }

      res.data.data.forEach(collect => {
        if (collect.collected == 'true') {
          verify_total_collected++
        } else {
          verify_total_not_collected++
        }
      })

      setTotalCollected(verify_total_collected)
      setTotalNotCollected(verify_total_not_collected)
    }

    getList()
  }

  const handleDeleteCollect = async (identifier) => {
    const res = await api.deleteCollect(identifier)

    var verify_total_collected = 0
    var verify_total_not_collected = 0

    const getList = async () => {
      const res = await api.listCollects(page, searchDate, token)
      setList(res.data)


      if (res.data.pagination.lastPage != undefined) {
        setLastPage(res.data.pagination.lastPage)
      }

      res.data.data.forEach(collect => {
        if (collect.collected == 'true') {
          verify_total_collected++
        } else {
          verify_total_not_collected++
        }
      })

      setTotalCollected(verify_total_collected)
      setTotalNotCollected(verify_total_not_collected)
    }

    getList()
  }

  useEffect(() => {

    const timeout = setTimeout(function () {
      var verify_total_collected = 0
      var verify_total_not_collected = 0

      const getList = async () => {
        const res = await api.listCollects(page, searchDate, token)
        setList(res.data)


        if (res.data.pagination.lastPage != undefined) {
          setLastPage(res.data.pagination.lastPage)
        }

        res.data.data.forEach(collect => {
          if (collect.collected == 'true') {
            verify_total_collected++
          } else {
            verify_total_not_collected++
          }
        })

        setTotalCollected(verify_total_collected)
        setTotalNotCollected(verify_total_not_collected)
      }

      getList()
    }, 1000);

    return () => clearTimeout(timeout)
  }, [searchDate])

  useEffect(() => {

    if (identifier != '') {
      const timeout = setTimeout(async function () {
        const res = await api.findCollect(identifier, token)
        setList(res)
      }, 1000)

      return () => clearTimeout(timeout)
    } else return null

  }, [identifier])

  return (
    <Content pageTitle="Verificar Coletas">
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
          maxW="1500px"
        >
          <Flex w="100%" background="#fff" flexDir="column" boxShadow="md" borderRadius="md">
            <Flex className="list-collect-header" w="100%" bgColor="gray.200" p="12px" justifyContent="space-between" >
              <Flex>
                <Text fontSize="24px" fontWeight="bold">Pacotes Bipados</Text>
              </Flex>

              <Flex flexDir="column" justifyContent="center" alignItems="center">
                <Text>Total coletado:</Text>
                <Badge ml="0.5rem" textAlign="center" maxW="80px" minW="80px" variant="solid" colorScheme="yellow">{totalCollected}</Badge>
              </Flex>

              <Flex flexDir="column" justifyContent="center" alignItems="center">
                <Text>Total não coletado:</Text>
                <Badge ml="0.5rem" textAlign="center" maxW="80px" minW="80px" variant="solid" colorScheme="yellow">{totalNotCollected}</Badge>
              </Flex>

              <Flex className="list-collect-inputs">
                <FormControl m="0 0.5rem" maxW="250px" id="date" display="flex" justifyContent="center" flexDir="row">
                  <Button mr="0.5rem" colorScheme="green" >
                    <FaFileDownload />
                  </Button>
                  <Input bg="white" value={searchDate} onChange={e => setSearchDate(e.target.value)} type="date" />
                </FormControl>

                <FormControl m="0 0.5rem" maxW="250px" id="find" display="flex" justifyContent="center" flexDir="row">
                  <Input bg="white" type="text" value={identifier} onChange={e => setIdentifier(e.target.value)} placeholder="Procurar..." />
                </FormControl>
              </Flex>
            </Flex>
            <Flex className="list-collect-mark" w="100%" m="0.5rem 0" p="12px">
              <Button m="0.5rem 0.25rem 0 0" onClick={handleMarkAsCollected} colorScheme="green">Marcar como coletado</Button>
              <Button m="0.5rem 0 0 0.25rem" onClick={handleMarkAsNotCollected} colorScheme="yellow">Marcar como nao coletado</Button>
            </Flex>
            <Flex w="100%" overflowX={list.data == '' ? 'hidden' : 'scroll' }>
              {list.data != '' &&
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Selecionar</Th>
                      <Th>Identificador</Th>
                      <Th>Canal de Vendas</Th>
                      <Th>Coletado</Th>
                      <Th>Data</Th>
                      <Th>Ações</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {list.data.map((collect, i) => (
                      <Tr key={i} fontSize="18px" >
                        <Td>
                          <Checkbox onChange={() => handleAddSelectedCollect(collect.identifier)} colorScheme="yellow" />
                        </Td>
                        <Td>
                          {collect.identifier}
                        </Td>
                        <Td>
                          {collect.sale_channel}
                        </Td>
                        <Td>
                          {collect.collected == 'false' &&
                            <Badge variant="solid" colorScheme="red">Não Coletado</Badge>
                          }
                          {collect.collected == 'true' &&
                            <Badge variant="solid" colorScheme="green">Coletado</Badge>
                          }
                        </Td>
                        <Td>
                          {moment(Number(collect.updated_at)).format('LLL')}
                        </Td>
                        <Td display="flex" flexDir="column">
                          <Button onClick={() => handleDeleteCollect(collect.identifier)} colorScheme="red" m="2px 0" >Apagar</Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              }
              {list.data == '' &&
                <Flex w="100%" h="120px" display="flex" flexDir="column" justifyContent="center" alignItems="center">
                  <FaBoxOpen mb="1rem" size="32px" />
                  <Text>Nenhum dado para mostrar.</Text>
                  <Text>Altera a data ou faça uma pesquisa nos campos acima.</Text>
                </Flex>
              }
            </Flex>
            <Flex w="100%" p="12px">
              <Flex w="100%" justifyContent="center" alignItems="center">
                <Button onClick={() => { if (page > 1) return setPage(page - 1) }}>
                  <FaArrowLeft />
                </Button>

                <Flex maxW="320px">
                  <Text m="0.5rem">Página</Text>
                  <Input maxW="100px" textAlign="center" type="number" value={page} onChange={e => setPage(e.target.value)} placeholder="Numéro da página" />
                  <Text m="0.5rem" minW="50px">de {lastPage}</Text>
                </Flex>

                <Button onClick={() => { if (page < lastPage) return setPage(page + 1) }}>
                  <FaArrowRight />
                </Button>
              </Flex>
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


  if (!cookies.token) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/signin'
      }
    }
  }

  return { props: { ok: true } }
}

export default VerifyCollect
