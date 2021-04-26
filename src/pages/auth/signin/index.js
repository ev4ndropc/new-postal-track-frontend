import Head from 'next/head'
import Link from 'next/link'

import { useState } from 'react';

import {
  Container,
  Box,
  Button,
  Text,
  Checkbox,
  Flex,
  Img,
  Input,
  InputGroup,
  InputLeftElement,
  useBreakpointValue,
  useToast,
  background} from "@chakra-ui/react";

import { FaEnvelope, FaKey, FaSignInAlt } from 'react-icons/fa'

import config from '../../../config'
import useApi from '../../../helpers/Api'
import { doLogin } from '../../../helpers/AuthHandler'

export default function Signin () {

  const api = useApi()
  const toast = useToast()

  const size = useBreakpointValue({ base: "md", sm: "md", md: 'lg', lg: 'lg' })
  const flex_direction = useBreakpointValue({ sm: 'row', base: 'column' })

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)
  const [rememberPassword, setRememberPassword] = useState(false)


  const handleSubmit = async () => {
    setIsInvalid(false)
    if(!email || !password){
      toast({
        title: "Preencha todos os campos.",
        description: "Digite seu e-mail e senha e tente novamente.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      })
      setIsInvalid(true)
      return
    }

    setLoading(true)
    const json = await api.signin(email, password)

    if(json.ok == false){
      setLoading(false)
      toast({
        title: "Login ou senha inválido.",
        description: "Verifique seus dados e tente novamente.",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    }else{
      setLoading(false)
      toast({
        title: "Login efetuado com sucesso.",
        description: "Aguarde enquanto redirecionamos você.",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      doLogin(json.token, rememberPassword)

      setTimeout(() => {
        window.location.href = '/painel/home'
      }, 3000)
    }
  }

  return (
    <Container as={Flex} justifyContent="center" alignItems="center" m="0" p="12px" maxW="100%" bgColor="gray.100" w="100%" h="100vh">
      <Head>
        <title>Faça o login - {config.SITE_NAME}</title>
      </Head>

      <Box maxW="480px" w="100%" p="24px" bgColor="white" boxShadow="md" borderRadius="md">

        <Flex flexDirection="column" justifyContent="center" alignItems="center" mb="2rem">
          <Img w={{base: '164px', md: '184px', lg: '248px'}} src="/assets/images/logo.png" />
          <Text color="gray.400" textAlign="center" fontSize={{ base: '14px', sm: '16px', md: '16px', lg: '18px' }}>
            Bem-vindo, digite o seu email e senha e e clique em entrar para continuar.
          </Text>
        </Flex>

        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            mt={{ base: '0', md: '0.3rem' }}
            color="gray.300"
            size={size}
            children={<FaEnvelope/>}
          />
          <Input
            type="email"
            placeholder="Digite seu e-mail"
            size={size}
            focusBorderColor="yellow.300"
            color="gray.500"
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            isInvalid={isInvalid}
            errorBorderColor="yellow.300"
          />
        </InputGroup>

        <InputGroup mt="1rem">
          <InputLeftElement
            pointerEvents="none"
            mt={{ base: '0', md: '0.3rem' }}
            color="gray.300"
            size={size}
            children={<FaKey/>}
          />
          <Input
            type="password"
            placeholder="Digite a sua senha"
            size={size}
            focusBorderColor="yellow.300"
            color="gray.500"
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            isInvalid={isInvalid}
            errorBorderColor="yellow.300"
          />
        </InputGroup>

        <InputGroup mt="1rem">
          <Checkbox
            size={size}
            colorScheme="yellow"
            color="gray.500"
            checked={rememberPassword}
            onChange={(e) => setRememberPassword(!rememberPassword) }
            disabled={loading}
          >
            Lembrar minha senha
          </Checkbox>
        </InputGroup>

        <InputGroup mt="1rem">
          <Button
            leftIcon={<FaSignInAlt/>}
            w="100%"
            colorScheme="yellow"
            color="white"
            onClick={handleSubmit}
            size={size}
            disabled={loading}
            isLoading={loading}
            loadingText="Entrando..."
          >
            Fazer Login
          </Button>
        </InputGroup>

        <Flex justifyContent="center" alignItems="center" flexDirection={flex_direction} mt="1rem" color="gray.500">
          Não tem uma conta ainda?
          <Link href="/auth/signup">
            <Text ml="0.2rem" color="yellow.500" cursor="pointer">
              Cadastre-se
            </Text>
          </Link>
        </Flex>
      </Box>

    </Container>
  )
}
