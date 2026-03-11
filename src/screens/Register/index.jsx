import analytics from "@react-native-firebase/analytics";
import {
  Box,
  Button,
  HStack,
  Image,
  Text,
  useToast,
  VStack
} from "native-base";
import { useLayoutEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { EyeIcon, EyeSlashIcon } from "../../assets/icon";
import FormInput from "../../components/atoms/FormInput";
import ToastAlert from "../../components/atoms/ToastAlert";
import { Oshimen } from "../../components/organisms";
import Layout from "../../components/templates/Layout";
import { AUTH } from "../../services";
import { useUpdateOshimen } from "../../services/hooks/useMembers";
import useAuthStore from "../../store/authStore";
import { activityLog } from "../../utils/activityLog";

const Register = ({ navigation }) => {
  const { setUser, setSession, setProfile, setUserProfile } = useAuthStore();
  const [formData, setFormData] = useState({
    account_id: "",
    name: "",
    password: "",
    password_confirm: "",
    avatar_id: 1,
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const [error, setError] = useState("");
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [oshimen, setOshimen] = useState();
  const updateOshimen = useUpdateOshimen();

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Register Showroom",
      headerTitleStyle: {
        fontSize: 16,
      },
    });
  }, []);

  const autoLogin = async () => {
    const response = await AUTH.loginApi({
      account_id: formData.account_id,
      password: formData.password,
    });

    const data = response.data;
    setUser(data.user);
    setSession(data.session);
    setProfile(data.profile);

    activityLog({
      description: "Register from android",
      logName: "Register",
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
        updateUserOshimen();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const updateUserOshimen = () => {
    updateOshimen.mutate(
      {
        user_id: formData?.account_id,
        oshimen_id: oshimen?._id,
      },
      {
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await AUTH.regsiterApi(formData);

      const isError = response.data.error;

      if (isError) {
        setError(isError);
        setLoading(false);
      }

      if (response.data.status.ok) {
        autoLogin();

        await analytics().logEvent("Register", {
          username: formData.account_id,
        });

        toast.show({
          render: () => (
            <ToastAlert
              variant="left-accent"
              status="success"
              title="Register Berhasil"
              description={`Welcome ${formData?.name}`}
            />
          ),
          placement: "top-right",
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
    <Layout>
      <Box
        flex="1"
        bgColor="secondary"
        justifyContent="center"
        alignItems="center"
      >
        <Text
          py="3"
          fontWeight="light"
          color="white"
          maxWidth="300px"
          textAlign="center"
        >
          Silakan isi semua form dibawah untuk daftar
        </Text>
        <Box py="4" mx="6" w="full" px="6">
          <FormInput
            label="ID Akun"
            required
            placeholder="Ex: sorum48"
            value={formData.account_id}
            onChange={(value) => handleChange("account_id", value)}
            isInvalid={error === "This account ID cannot be used."}
            errorText="ID Akun sudah dipakai user lain, silakan ganti ID dengan username lain"
          />

          <FormInput
            label="Nama"
            required
            placeholder="Ex : Indah"
            value={formData.name}
            onChange={(value) => handleChange("name", value)}
          />

          <Box mb="4">
            <Text color="white" fontWeight="medium" mb="2">
              Oshimen <Text color="red">*</Text>
            </Text>
            {oshimen ? (
              <HStack
                rounded="md"
                bg="gray.200"
                p="2"
                space={4}
                alignItems="center"
              >
                <Box
                  width={75}
                  height={75}
                  borderWidth={2}
                  borderColor="gray.600"
                  borderRadius="full"
                  overflow="hidden"
                >
                  <Image
                    alt="Member"
                    source={{ uri: oshimen?.image }}
                    width="100%"
                    height="100%"
                  />
                </Box>
                <VStack w="70%" space={2}>
                  <Text color="black" fontWeight="semibold" flexWrap="nowrap">
                    {oshimen?.name}
                  </Text>
                  <Button
                    px="3"
                    width={120}
                    size="sm"
                    bg="blueGray.700"
                    onPress={() => setIsOpen(true)}
                  >
                    <Text fontSize="xs" fontWeight="semibold">
                      Ubah Oshimen
                    </Text>
                  </Button>
                </VStack>
              </HStack>
            ) : (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setIsOpen(true)}
              >
                <HStack
                  rounded="md"
                  bg="gray.200"
                  p="2"
                  space={4}
                  alignItems="center"
                >
                  <Box
                    width={75}
                    height={75}
                    borderWidth={2}
                    borderColor="gray.500"
                    borderRadius="full"
                    overflow="hidden"
                  >
                    <Image
                      alt="Member"
                      source={require("../../assets/image/default.png")}
                      width={75}
                      height={75}
                    />
                  </Box>
                  <VStack w="70%" space={2}>
                    <Button
                      px="3"
                      width={120}
                      size="sm"
                      bg="blueGray.700"
                      onPress={() => setIsOpen(true)}
                    >
                      <Text fontSize="xs" fontWeight="semibold">
                        Pilih Member
                      </Text>
                    </Button>
                  </VStack>
                </HStack>
              </TouchableOpacity>
            )}
          </Box>

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

          <FormInput
            required
            label="Konfirmasi Password"
            placeholder="Ex: abcabc123"
            value={formData.password_confirm}
            onChange={(value) => handleChange("password_confirm", value)}
            type={showPasswordConfirmation ? "text" : "password"}
            InputRightElement={
              <TouchableOpacity
                onPress={() =>
                  setShowPasswordConfirmation(!showPasswordConfirmation)
                }
              >
                {showPasswordConfirmation ? <EyeSlashIcon /> : <EyeIcon />}
              </TouchableOpacity>
            }
          />

          {error && (
            <Text color="red" mt="1" mb="3">
              {error === "Incorrect authentication password"
                ? "Password dan Konfirmasi Password tidak sama, tolong cek ulang"
                : error === "Please fill in all required fields."
                ? "Tolong isi semua form yang wajib di input"
                : error ===
                  "Password must be 6 characters (minimum) to 30 characters (maximum) in length."
                ? "Password harus terdiri angka, minimal 6 karakter dan maksimal 30 karakter"
                : error !== "This account ID cannot be used." && error}
            </Text>
          )}

          <Text onPress={handleLoginRedirect} color="white" mt="1">
            Sudah punya akun?{" "}
            <Text fontWeight="semibold" color="primary">
              Login Disini
            </Text>
          </Text>

          <Button
            mt="6"
            mb="3"
            background="primary"
            borderRadius="lg"
            onPress={handleRegister}
            isLoading={loading}
            isLoadingText="Creating Account.."
          >
            <Text fontSize="16" color="white" fontWeight="medium">
              Register
            </Text>
          </Button>

          <Oshimen
            isRegister={true}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setOshimen={setOshimen}
          />
        </Box>
      </Box>
    </Layout>
  );
};

export default Register;
