import * as React from 'react';
import { Box, Center, Pressable, useColorModeValue } from "native-base";
import { Animated, Dimensions } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';

const FirstRoute = () => (
  <Box flex={1} borderBottomRadius={6} bg="primary" p="3">
    Profile
  </Box>
);

const SecondRoute = () => <Center flex={1} my="4">
    This is Tab 2
  </Center>;

const ThirdRoute = () => <Center flex={1} my="4">
    This is Tab 3
  </Center>;

const FourthRoute = () => <Center flex={1} my="4">
    This is Tab 4{' '}
  </Center>;

const initialLayout = {
  width: Dimensions.get('window').width
};
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
  fourth: FourthRoute
});

export default function Tabs() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([{
    key: 'first',
    title: 'Room'
  }, {
    key: 'second',
    title: 'Comment'
  }, {
    key: 'third',
    title: 'Podium'
  }]);

  const renderTabBar = props => {
    return <Box bg="teal" borderRadius="md" flexDirection="row">
        {props.navigationState.routes.map((route, i) => {
        const color = index === i ? useColorModeValue('white', '#e5e5e5') : useColorModeValue('#e5e5e5', 'red');
        const borderColor = index === i ? '#ECFAFC' : useColorModeValue('gray.500', 'gray.400');
        return <Box borderBottomWidth="3" borderColor={borderColor} flex={1} alignItems="center" p="3" cursor="pointer">
                <Pressable onPress={() => {
                  console.log(i);
                  setIndex(i);
                }}>
                  <Animated.Text  style={{
                    color,
                    fontWeight: i === index ? "bold" : "normal"
                  }}>
                    {route.title}
                  </Animated.Text>
                </Pressable>
              </Box>;
         })}
      </Box>;
  };

  return <TabView navigationState={{
    index,
    routes
  }} renderScene={renderScene} renderTabBar={renderTabBar} onIndexChange={setIndex} initialLayout={initialLayout} style={{
    marginTop: 6
  }} />;
}