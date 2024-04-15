import {
  Box,
  Button,
  Center,
  FormControl,
  Image,
  Input,
  Spinner,
  Text,
  useToast
} from "native-base";
import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "../../assets/icon";
import Logo from "../../components/atoms/Logo";
import { AUTH } from "../../services";
import { loginApi } from "../../services/auth";
import { activityLog } from "../../utils/activityLog";
import { storeStorage } from "../../utils/storage";

const Login = ({ navigation }) => {
  const [formData, setFormData] = useState({
    account_id: "",
    password: "",
    captcha_url: "",
    captcha_word: "",
    csrf_token: "",
    cookies_sr_id: "",
    error_message: ""
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toast = useToast();

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await loginApi(formData);

      if (response.data.user.captcha_url) {
        setFormData((prevState) => ({
          ...prevState,
          captcha_url: response.data.user.captcha_url,
          csrf_token: response.data.session.csrf_token,
          cookies_sr_id: response.data.session["cookies sr_id"]
        }));
      }

      if (response.data.user.error) {
        setFormData((prevState) => ({
          ...prevState,
          error_message: response.data.user.error
        }));
      }

      if (response.data.user.ok) {
        const data = response.data;
        storeStorage("user", data.user);
        storeStorage("session", data.session);
        storeStorage("profile", data.profile);
        getSessionUser(data);
        navigation.replace("Main");

        toast.show({
          render: () => {
            return (
              <Box
                m="3"
                py="1"
                px="2"
                mt="10"
                mb={5}
                bg="green.400"
                rounded="sm"
              >
                <Text>Login Success</Text>
              </Box>
            );
          },
          placement: "top-right"
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getSessionUser = async (data) => {
    await AUTH.detailUserApi(data.user.account_id)
      .then((res) => {
        storeStorage("userProfile", res.data);
        activityLog({
          userId: res?.data?._id,
          logName: "Login",
          description: "Login user to Android",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box
      flex="1"
      bgColor="secondary"
      justifyContent="center"
      alignItems="center"
    >
      <Logo />
      <Text mt="38" fontSize="2xl" fontWeight="semibold" color="white">
        Login
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
            value={formData.account_id}
            onChangeText={(value) => handleChange("account_id", value)}
          />
          <Box position="relative">
            <Input
              mt="6"
              bgColor="white"
              type={showPassword ? "text" : "password"}
              variant="filled"
              w="100%"
              fontSize="md"
              name="id"
              placeholder="Password"
              value={formData.password}
              onChangeText={(value) => handleChange("password", value)}
              InputRightElement={() =>
                loading ? <Spinner color="white" /> : "Login"
              }
            />
            <Box
              position="absolute"
              right="1"
              top={showPassword ? "35%" : "40%"}
            >
              <Button onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
              </Button>
            </Box>
          </Box>

          {formData?.error_message && (
            <Text color="red" mt="3">
              {formData?.error_message}
            </Text>
          )}

          {formData?.captcha_url && (
            <Box py="3">
              <Text mb="3">Tolong verifikasi captcha di bawah ini:</Text>
              <Image
                alt="captcha"
                source={{ uri: formData.captcha_url }}
                size="md"
                width="100%"
                borderRadius="xl"
                resizeMode="contain"
              />
              <Input
                mt="3"
                bgColor="white"
                type="text"
                variant="filled"
                w="100%"
                fontSize="md"
                name="id"
                placeholder="Ketik captcha diatas"
                value={formData.captcha_word}
                onChangeText={(value) => handleChange("captcha_word", value)}
              />
            </Box>
          )}
          {/* <Text color="white" my="3">
            Belum Punya Akun? <Text color="silver">Daftar Disini</Text>
          </Text> */}

          <Button
            my="3"
            background="primary"
            onPress={handleLogin}
            isLoading={loading}
          >
            <Text fontSize="16" color="white" fontWeight="medium">
              Login
            </Text>
          </Button>
          <Center>
            <Text
              fontWeight="medium"
              mt="6"
              onPress={() => navigation.replace("Main")}
              color="gray.400"
              my="2"
            >
              Skip Login
            </Text>
          </Center>
        </FormControl>
      </Box>
    </Box>
  );
};

export default Login;
