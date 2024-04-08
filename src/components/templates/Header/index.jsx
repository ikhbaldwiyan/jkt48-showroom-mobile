import React from "react";
import { Box, Image, Text } from "native-base";
import Logo from "../../atoms/Logo";
import useUser from "../../../utils/hooks/useUser";

const Header = () => {
  const { profile } = useUser();

  return (
    <Box
      p="4"
      bg="black"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Logo isHeader />
      <Box flexDirection="row" alignItems="center" maxW="100">
        <Text color="white" fontWeight="semibold" mr="2" isTruncated>
          {profile?.name ?? "Guest"}
        </Text>
        <Image
          style={{ width: 40, height: 40 }}
          source={{
            uri: profile?.avatar_url ?? "https://static.showroom-live.com/image/avatar/1.png?v=100"
          }}
          alt="avatar"
        />
      </Box>
    </Box>
  );
};

export default Header;
