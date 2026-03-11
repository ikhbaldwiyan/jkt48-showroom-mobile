import analytics from "@react-native-firebase/analytics";
import {
  Box,
  Center,
  HStack,
  ScrollView,
  Spinner,
  Text,
  useToast,
} from "native-base";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { EyeIcon, EyeSlashIcon, LoginIcon } from "../../assets/icon";
import FormInput from "../../components/atoms/FormInput";
import Logo from "../../components/atoms/Logo";
import ToastAlert from "../../components/atoms/ToastAlert";
import { AUTH } from "../../services";
import { loginApi } from "../../services/auth";
import useAuthStore from "../../store/authStore";
import { activityLog } from "../../utils/activityLog";

const Login = ({ navigation }) => {
  const { setUser, setSession, setProfile, setUserProfile } = useAuthStore();
  const [formData, setFormData] = useState({
    account_id: "",
    password: "",
    captcha_url: "",
    captcha_word: "",
    csrf_token: "",
    cookies_sr_id: "",
    error_message: "",
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
          cookies_sr_id: response.data.session["cookies sr_id"],
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
              : error,
        }));
      }

      if (
        error === "Incorrect authentication code" ||
        error?.includes("Your account ID/password is incorrect")
      ) {
        setFormData((prevState) => ({
          ...prevState,
          captcha_word: "",
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
              <ToastAlert
                variant="left-accent"
                status="success"
                title="Login Berhasil"
                description={`Welcome ${data?.profile?.name}`}
              />
            );
          },
          placement: "top-right",
        });

        await analytics().logEvent("login", {
          username: formData.account_id,
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
        placement: "top-right",
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
          description: "Login user to Android",
        });
      })
      .catch((err) => {
        activityLog({
          userId: null,
          logName: "Login",
          description: "Register user profile",
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
          padding: 20,
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
          maxWidth="300%"
          textAlign="center"
        >
          Silakan login untuk menggunakan fitur komen dan podium.
        </Text>
        <Box py="4" mx="6" w="100%" maxW="400px">
          <FormInput
            label="ID Akun"
            required
            placeholder="Ex: inzoid48"
            value={formData.account_id}
            onChange={(value) => handleChange("account_id", value)}
          />

          <FormInput
            label="Password"
            required
            placeholder="Ex: abcabc123"
            value={formData.password}
            onChange={(value) => handleChange("password", value)}
            type={showPassword ? "text" : "password"}
            InputRightElement={
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
              </TouchableOpacity>
            }
          />

          {formData?.error_message && (
            <Text color="red" mt="3">
              {formData?.error_message}
            </Text>
          )}

          {formData?.captcha_url && (
            <Box py="3">
              <Image
                alt="captcha"
                source={{ uri: formData.captcha_url }}
                size="md"
                width="100%"
                borderRadius="xl"
                resizeMode="contain"
              />
              <Text mb="3" color="white">
                Tolong verifikasi captcha di bawah ini:
              </Text>
              <FormInput
                placeholder="Ketik kode captcha diatas"
                value={formData.captcha_word}
                onChange={(value) => handleChange("captcha_word", value)}
              />
            </Box>
          )}

          <Text onPress={handleRegister} color="white" my="1">
            Belum Punya Akun?{" "}
            <Text fontWeight="semibold" color="primary">
              Daftar Disini
            </Text>
          </Text>

          <TouchableOpacity
            style={{
              marginVertical: 12,
              backgroundColor: "#24A2B7",
              borderRadius: 12,
              paddingVertical: 12,
              alignItems: "center",
              opacity: loading ? 0.7 : 1,
            }}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.8}
          >
            <HStack alignItems="center" space="1">
              {loading ? <Spinner color="white" /> : <LoginIcon size={24} />}
              <Text fontSize="16" color="white" fontWeight="medium">
                {loading ? "Loading..." : "Login"}
              </Text>
            </HStack>
          </TouchableOpacity>
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
        </Box>
      </ScrollView>
    </Box>
  );
};

export default Login;
