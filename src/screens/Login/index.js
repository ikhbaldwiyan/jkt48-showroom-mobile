import React from "react";
import { Box, Button, FormControl, Input, Text } from "native-base";
import Logo from "../../components/atoms/Logo";

const Login = ({ navigation }) => {
  return (
    <Box
      flex="1"
      bgColor="secondary"
      justifyContent="center"
      alignItems="center"
    >
      <Logo />
      <Text mt="20" fontSize="2xl" fontWeight="semibold" color="white">
        Login Showroom
      </Text>
      <Text
        py="3"
        fontWeight="light"
        color="white"
        maxWidth="300px"
        textAlign="center"
      >
        Silakan login untuk menggunakan fitur komen dan podium.
      </Text>
      <Box py="4" mx="6">
        <FormControl>
          <Input
            bgColor="white"
            variant="filled"
            w="100%"
            fontSize="md"
            name="id"
            placeholder="ID Showroom"
          />
          <Input
            mt="6"
            bgColor="white"
            type="password"
            variant="filled"
            w="100%"
            fontSize="md"
            name="id"
            placeholder="Password"
          />
          <Text color="white" my="4">
            Belum Punya Akun? <Text color="silver">Daftar Disini</Text>
          </Text>
          <Button
            my="4"
            background="primary"
            onPress={() => navigation.replace("Main")}
          >
            <Text fontSize="16" color="white" fontWeight="medium">
              Login
            </Text>
          </Button>
        </FormControl>
      </Box>
    </Box>
  );
};

export default Login;
