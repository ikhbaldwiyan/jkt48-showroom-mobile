import { Box, Text } from "native-base";
import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';

const menu = [
  {
    text: 'Home',
    img: require('../../../assets/icon/home.png'),
  },
  {
    text: 'Room List',
    img: require('../../../assets/icon/home.png'),
  },
  {
    text: 'History',
    img: require('../../../assets/icon/home.png'),
  },
  {
    text: 'Theater',
    img: require('../../../assets/icon/home.png'),
  },
  {
    text: 'Login',
    img: require('../../../assets/icon/home.png'),
  },
];

const BottomNavigation = () => {
  return (
    <Box backgroundColor="black" flexDirection="row" height="84">
      {menu.map((menu, idx) => (
        <Box key={idx} flex="1" justifyContent="center" alignItems="center">
          <TouchableOpacity>
            <Box alignItems="center">
              <Image w="24" h="24" source={menu.img} />
              <Text mt="2" color="white" fontWeight="semibold">{menu.text}</Text>
            </Box>
          </TouchableOpacity>
        </Box>
      ))}
    </Box>
  );
};

export default BottomNavigation;
