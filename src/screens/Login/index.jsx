import {
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Image,
  Input,
  ScrollView,
  Spinner,
  Text,
  useToast
} from "native-base";
import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon, LoginIcon } from "../../assets/icon";
import Logo from "../../components/atoms/Logo";
import { AUTH } from "../../services";
import { loginApi } from "../../services/auth";
import { activityLog } from "../../utils/activityLog";
import analytics from "@react-native-firebase/analytics";
import useAuthStore from "../../store/authStore";

const Login = ({ navigation }) => {
  const { setUser, setSession, setProfile, setUserProfile } = useAuthStore();
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

      const error = response?.data?.user?.error;

      if (error) {
        setFormData((prevState) => ({
          ...prevState,
          error_message:
            error === "An error occured. Please go back and try again."
              ? "Login gagal, silakan coba lagi"
              : error === "Incorrect authentication code"
                ? "Kode captcha salah, tolong cek lagi"
                : error.includes("Your account ID/password is incorrect")
                  ? "ID Akun atau password salah. password bisa mengandung huruf besar/kecil dan harus sesuai."
                  : error === "Please fill in all required fields."
                    ? "Silakan Isi ID Akun dan Password"
                    : error
        }));
      }

      if (error === "Incorrect authentication code" || error?.includes("Your account ID/password is incorrect")) {
        setFormData((prevState) => ({
          ...prevState,
          captcha_word: ""
        }));
      }

      if (response.data.user.ok) {
        const data = response.data;
        setUser(data.user);
        setSession(data.session);
        setProfile(data.profile);
        getSessionUser(data);
        navigation.replace("SplashScreen");

        toast.show({
          render: () => {
            return (
              <Box
                m="3"
                py="1"
                px="2"
                mt="10"
                mb={5}
                bg="green.700"
                rounded="sm"
              >
                <Text>Login Sukses</Text>
              </Box>
            );
          },
          placement: "top-right"
        });

        await analytics().logEvent("login", {
          username: formData.account_id
        });
      }
    } catch (error) {
      console.log(error);
      toast.show({
        render: () => {
          return (
            <Box m="3" py="1" px="2" mt="10" mb={5} bg="red" rounded="sm">
              <Text>Login Gagal, Silahkan coba lagi nanti</Text>
            </Box>
          );
        },
        placement: "top-right"
      });
    } finally {
      setLoading(false);
    }
  };

  const getSessionUser = async (data) => {
    await AUTH.detailUserApi(data.user.account_id)
      .then((res) => {
        setUserProfile(res.data);
        activityLog({
          userId: res?.data?._id,
          logName: "Login",
          description: "Login user to Android"
        });
      })
      .catch((err) => {
        activityLog({
          userId: null,
          logName: "Login",
          description: "Register user profile"
        });
        console.log(err);
      });
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <Box flex="1" bgColor="secondary">
      <ScrollView
        flex="1"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
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
        <Box py="4" mx="6" w="100%" maxW="400px">
          <FormControl>
            <Text mb={3}>
              ID Akun <Text color="red">*</Text>
            </Text>
            <Input
              bgColor="white"
              variant="filled"
              w="100%"
              fontSize="md"
              name="id"
              placeholder="Ex: inzoid48"
              value={formData.account_id}
              onChangeText={(value) => handleChange("account_id", value)}
              isInvalid={formData?.error_message}
            />
            <Box position="relative">
              <Text mt="4" mb="3">
                Password <Text color="red">*</Text>
              </Text>
              <Input
                bgColor="white"
                type={showPassword ? "text" : "password"}
                variant="filled"
                w="100%"
                fontSize="md"
                name="password"
                placeholder="Ex: abcabc123"
                value={formData.password}
                onChangeText={(value) => handleChange("password", value)}
                InputRightElement={() =>
                  loading ? <Spinner color="white" /> : "Login"
                }
                isInvalid={formData?.error_message}
              />
              <Box position="absolute" right="1" top="53%">
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
                  placeholder="Ketik kode captcha diatas"
                  value={formData.captcha_word}
                  onChangeText={(value) => handleChange("captcha_word", value)}
                />
              </Box>
            )}
            <Text onPress={handleRegister} color="white" my="1">
              Belum Punya Akun?{" "}
              <Text fontWeight="semibold" color="primary">
                Daftar Disini
              </Text>
            </Text>

            <Button
              my="3"
              background="primary"
              onPress={handleLogin}
              isLoading={loading}
              isLoadingText="Logging in"
              borderRadius="lg"
            >
              <HStack alignItems="center" space="1">
                <LoginIcon size={24} />
                <Text fontSize="16" color="white" fontWeight="medium">
                  Login
                </Text>
              </HStack>
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
      </ScrollView>
    </Box>
  );
};

export default Login;
