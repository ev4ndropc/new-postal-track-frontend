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
  useToast} from "@chakra-ui/react";

import { FaUserAlt, FaEnvelope, FaKey, FaRocket } from 'react-icons/fa'
import { IoLogoWhatsapp } from 'react-icons/io'

import Content from '../../../components/Content'
import Header from '../../../components/Header'

import config from '../../../config'
import useApi from '../../../helpers/Api'
import { doLogin } from '../../../helpers/AuthHandler'


export default function Signin () {
  const api = useApi()
  const toast = useToast()

  const size = useBreakpointValue({ base: "md", sm: "md", md: 'lg', lg: 'lg' })
  const flex_direction = useBreakpointValue({ sm: 'row', base: 'column' })

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phone, setPhone] = useState('')

  const [loading, setLoading] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)
  const [checkedTerms, setCheckedTerms] = useState(false)


  const handleSubmit = async () => {
    setIsInvalid(false)
    if(!name || !email || !password || !confirmPassword || !phone){
      toast({
        title: "Preencha todos os campos.",
        description: "Digite seu nome, e-mail, senha e um número valido para continuar.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      })
      setIsInvalid(true)
      return
    }

    if(password != confirmPassword){
      toast({
        title: "As senhas não coincidem.",
        description: "A senha informada e a confirmação de senha são diferentes.",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
      return
    }

    setLoading(true)
    const json = await api.signup(name, email, password, phone)

    if(json.message.includes('already a registered')){
      toast({
        title: "E-mail já utilizado.",
        description: "Já existe um usuário cadastrado com esse e-mail.",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
      setLoading(false)
      return
    }
    if(json.ok == true) {
      setLoading(false)
      toast({
        title: "Registro efetuado com sucesso.",
        description: "Obrigado por se cadastrar na "+config.SITE_NAME+"!",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
      doLogin(json.token)

      setTimeout(() => {
        window.location.href = '/painel/home'
      }, 3000)
      return
    }else{
      setLoading(false)
      toast({
        title: "Ocorreu algum erro ao criar a sua conta.",
        description: "Contate um administrador",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
      return
    }
  }


  return (
    <Content>
      <Flex w="100%" justifyContent="center" alignItems="center">
        <Header pageTitle="Crie sua conta grátis" />

        <Box maxW="480px" w="100%" p="24px" bgColor="white" boxShadow="md" borderRadius="md">

          <Flex flexDirection="column" justifyContent="center" alignItems="center" mb="2rem">
            <Img w={{base: '164px', md: '184px', lg: '248px'}} src="/assets/images/logo.png" />
            <Text color="gray.400" textAlign="center" fontSize={{ base: '14px', sm: '16px', md: '16px', lg: '18px' }}>
              Para fazer parte da Postal Track é muito simples, digite seus dados abaixo e crie sua conta gratuitamente.
            </Text>
          </Flex>

          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              mt={{ base: '0', md: '0.3rem' }}
              color="gray.300"
              size={size}
              children={<FaUserAlt/>}
            />
            <Input
              type="text"
              placeholder="Digite seu nome completo"
              size={size}
              focusBorderColor="yellow.300"
              color="gray.500"
              onChange={(e) => setName(e.target.value)}
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
            <InputLeftElement
              pointerEvents="none"
              mt={{ base: '0', md: '0.3rem' }}
              color="gray.300"
              size={size}
              children={<FaKey/>}
            />
            <Input
              type="password"
              placeholder="Repita sua senha"
              size={size}
              focusBorderColor="yellow.300"
              color="gray.500"
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              children={<IoLogoWhatsapp/>}
            />
            <Input
              type="tel"
              placeholder="Digite seu número de Whatsapp"
              size={size}
              focusBorderColor="yellow.300"
              color="gray.500"
              onChange={(e) => setPhone(e.target.value)}
              disabled={loading}
              maxLength="13"
              isInvalid={isInvalid}
              errorBorderColor="yellow.300"
            />
          </InputGroup>

          <InputGroup mt="1rem">
            <Checkbox size={size} colorScheme="yellow" color="gray.500" onChange={(e) => setCheckedTerms(!checkedTerms)}>
              <Flex>
                Eu concordo com os <Link href="/terms"><Text color="yellow.500" ml="0.3rem">termos de uso e privacidade</Text></Link>
              </Flex>
            </Checkbox>
          </InputGroup>

          <InputGroup mt="1rem">
            <Button
              leftIcon={<FaRocket/>}
              w="100%"
              colorScheme="yellow"
              color="white"
              size={size}
              disabled={loading}
              isLoading={loading}
              loadingText="Criando sua conta..."
              onClick={handleSubmit}
            >
              Criar minha conta
            </Button>
          </InputGroup>

          <Flex justifyContent="center" alignItems="center" flexDirection={flex_direction} mt="1rem" color="gray.500">
            Já tem uma conta ainda?
            <Link href="/auth/signin">
              <Text ml="0.2rem" color="yellow.500" cursor="pointer">
                  Ir para o Login
              </Text>
            </Link>
          </Flex>
        </Box>
      </Flex>

    </Content>
  )
}
