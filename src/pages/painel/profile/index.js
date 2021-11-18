import {
  Avatar,
  Flex,
  FormControl,
  FormLabel,
  Img,
  Text,
  Input,
  Button,
  chakra,
  useToast
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'

import { useEffect, useState } from 'react'

import cookie from 'cookie'

import Content from '../../../components/Content'
import useApi from '../../../helpers/Api'

const Profile = () => {
  const api = useApi()
  const toast = useToast()
  const dispatch = useDispatch()

  const name = useSelector(state => state.user.name)
  const email = useSelector(state => state.user.email)
  const avatar = useSelector(state => state.user.avatar)
  const whatsapp = useSelector(state => state.user.whatsapp)
  const storeName = useSelector(state => state.user.storeName)

  const [newName, setNewName] = useState(name)
  const [newAvatar, setNewAvatar] = useState(avatar)
  const [newPassword, setNewPassword] = useState('')
  const [newRePassword, setNewRePassword] = useState('')
  const [newWhatsapp, setNewWhatsapp] = useState(whatsapp)
  const [newStoreName, setNewStoreName] = useState(storeName)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(newPassword.trim() != ''){
      if(newPassword.trim() != newRePassword.trim()) {
        toast({
          title: "As senhas não coincidem.",
          description: "Verifique se colocou a mesma senha nos dois campos.",
          status: "warning",
          duration: 5000,
          isClosable: true,
        })
        return
      }
    }

    var data = {
      name: newName,
      avatar: newAvatar,
      password: newPassword,
      whatsapp: newWhatsapp,
      storeName: newStoreName
    }

    const res = await api.updateUserInfo(data)

    if(res.ok) {
      dispatch({
        type: 'SET_DATA',
        payload: data
      })
    }

  }

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
            <Avatar cursor="pointer" size="xl" src={`/assets/images/avatar/${avatar}`} />
          </Flex>
          <Flex flexDir="column" w="100%">
            <chakra.form onSubmit={handleSubmit}>
              <FormControl id="name">
                <FormLabel>Seu nome</FormLabel>
                <Input placeholder={name} value={newName} onChange={e=>setNewName(e.target.value)} type="text" />
              </FormControl>

              <FormControl id="email" mt="1rem">
                <FormLabel>Seu email</FormLabel>
                <Input disabled readOnly placeholder={email} value={email} onChange={e=> null} type="email" />
              </FormControl>

              <FormControl id="password" mt="1rem">
                <FormLabel>Nova senha</FormLabel>
                <Input type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} placeholder="**********" />
              </FormControl>

              <FormControl id="re-password" mt="1rem">
                <FormLabel>Confirmar senha</FormLabel>
                <Input type="password" value={newRePassword} onChange={e=>setNewRePassword(e.target.value)} placeholder="**********" />
              </FormControl>

              <FormControl id="whatsapp" mt="1rem">
                <FormLabel>Whatsapp</FormLabel>
                <Input type="phone" placeholder={whatsapp} value={newWhatsapp} onChange={e=>setNewWhatsapp(e.target.value)} />
              </FormControl>

              <FormControl id="whatsapp" mt="1rem">
                <FormLabel>Nome da loja</FormLabel>
                <Input type="phone" placeholder={newStoreName} value={newStoreName} onChange={e=>setNewStoreName(e.target.value)} />
              </FormControl>

              <FormControl mt="1rem">
                <Button type="submit" colorScheme="yellow" color="white" size="lg">Salvar informações</Button>
              </FormControl>
            </chakra.form>
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

  return { props: { ok: true } }
}

export default Profile
