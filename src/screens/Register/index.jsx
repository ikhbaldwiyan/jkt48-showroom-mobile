import {
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  Spinner,
  Text,
  useToast
} from "native-base";
import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "../../assets/icon";
import Logo from "../../components/atoms/Logo";
import { activityLog } from "../../utils/activityLog";
import analytics from "@react-native-firebase/analytics";
import useAuthStore from "../../store/authStore";
import { AUTH } from "../../services";

const Register = ({ navigation }) => {
  const { setUser, setSession, setProfile, setUserProfile } = useAuthStore();
  const [formData, setFormData] = useState({
    account_id: "",
    name: "",
    password: "",
    password_confirm: "",
    avatar_id: 1
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const [error, setError] = useState("");

  const toast = useToast();

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const autoLogin = async () => {
    const response = await AUTH.loginApi({
      account_id: formData.account_id,
      password: formData.password
    });

    const data = response.data;
    setUser(data.user);
    setSession(data.session);
    setProfile(data.profile);

    activityLog({
      description: "Register from android",
      logName: "Register"
    }).then(() => {
      setRegisterProfile(formData.account_id);
    });

    navigation.replace("Main");
  };

  const setRegisterProfile = async (userId) => {
    await AUTH.detailUserApi(userId)
      .then((res) => {
        setUserProfile(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await AUTH.regsiterApi(formData);

      const isError = response.data.error;

      if (isError) {
        setError(isError)
        setLoading(false);
      }

      if (response.data.status.ok) {
        autoLogin();

        await analytics().logEvent("Register", {
          username: formData.account_id
        });

        toast.show({
          render: () => {
            return (
              <Box
                m="3"
                py="1"
                px="2"
                mt="10"
                mb={5}
                bg="green.500"
                rounded="sm"
              >
                <Text>Register Sukses</Text>
              </Box>
            );
          },
          placement: "top-right"
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginRedirect = () => {
    navigation.replace("Login");
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
        Register Showroom
      </Text>
      <Text
        py="3"
        fontWeight="light"
        color="white"
        maxWidth="300px"
        textAlign="center"
      >
        Silakan isi semua form dibawah untuk daftar
      </Text>
      <Box py="4" mx="6">
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
            placeholder="Ex: sorum48"
            value={formData.account_id}
            onChangeText={(value) => handleChange("account_id", value)}
            isInvalid={error === "This account ID cannot be used."}
          />
          {error === "This account ID cannot be used." && (
            <Text color="red" mt="2">
              ID Akun sudah dipakai user lain, silakan ganti ID dengan username
              lain
            </Text>
          )}

          <Text py={3}>
            Nama <Text color="red">*</Text>
          </Text>
          <Input
            bgColor="white"
            variant="filled"
            w="100%"
            fontSize="md"
            name="id"
            placeholder="Ex : Indah"
            value={formData.name}
            onChangeText={(value) => handleChange("name", value)}
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
              isInvalid={error === "Incorrect authentication password"}
            />
            <Box position="absolute" right="1" top="53%">
              <Button onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
              </Button>
            </Box>
          </Box>
          <Box position="relative">
            <Text mt="4" mb="3">
              Konfirmasi Password <Text color="red">*</Text>
            </Text>
            <Input
              bgColor="white"
              type={showPasswordConfirmation ? "text" : "password"}
              variant="filled"
              w="100%"
              fontSize="md"
              name="password_confirm"
              placeholder="Ex: abcabc123"
              value={formData.password_confirm}
              onChangeText={(value) => handleChange("password_confirm", value)}
              InputRightElement={() =>
                loading ? <Spinner color="white" /> : "Login"
              }
              isInvalid={error === "Incorrect authentication password"}
            />
            <Box position="absolute" right="1" top="53%">
              <Button
                onPress={() =>
                  setShowPasswordConfirmation(!showPasswordConfirmation)
                }
              >
                {showPasswordConfirmation ? <EyeSlashIcon /> : <EyeIcon />}
              </Button>
            </Box>
          </Box>

          {error && (
            <Text color="red" mt="3">
              {error === "Incorrect authentication password"
                ? "Password dan Konfirmasi Password tidak sama, tolong cek ulang"
                : error === "Please fill in all required fields."
                ? "Tolong isi semua form yang wajib di input"
                : error ===
                  "Password must be 6 characters (minimum) to 30 characters (maximum) in length."
                ? "Password harus terdiri minimal 6 karakter dan maksimal 30 karakter"
                : error !== "This account ID cannot be used." && error}
            </Text>
          )}

          <Text onPress={handleLoginRedirect} color="white" mt="3">
            Sudah punya akun?{" "}
            <Text fontWeight="semibold" color="primary">
              Login Disini
            </Text>
          </Text>

          <Button
            mt="4"
            my="3"
            background="primary"
            borderRadius="lg"
            onPress={handleRegister}
            isLoading={loading}
            isLoadingText="Creating Account.."
          >
            <HStack alignItems="center" space="1">
              <Text
                onPress={handleRegister}
                fontSize="16"
                color="white"
                fontWeight="medium"
              >
                Register
              </Text>
            </HStack>
          </Button>
        </FormControl>
      </Box>
    </Box>
  );
};

export default Register;
