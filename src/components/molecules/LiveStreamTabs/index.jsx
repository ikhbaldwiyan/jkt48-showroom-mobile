import React, { useState } from 'react';
import { Box, Pressable, useColorModeValue } from "native-base";
import { Animated, Dimensions } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
import { Comment, Podium, Room } from "../LiveStream";

const initialLayout = {
  width: Dimensions.get('window').width
};

const renderScene = SceneMap({
  room: Room,
  comment: Comment,
  podium: Podium,
});

export default function LiveStreamTabs() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([{
    key: 'room',
    title: 'Room'
  }, {
    key: 'comment',
    title: 'Comment'
  }, {
    key: 'podium',
    title: 'Podium'
  }]);

  const renderTabBar = props => {
    return (
      <Box bg="teal" borderRadius="md" flexDirection="row">
        {props.navigationState.routes.map((route, i) => {
          const color = index === i ? useColorModeValue('white', '#e5e5e5') : useColorModeValue('#e5e5e5', 'red');
          const borderColor = index === i ? '#ECFAFC' : useColorModeValue('gray.500', 'gray.400');
          return (
            <Box borderBottomWidth="3" borderColor={borderColor} flex={1} alignItems="center" p="3" cursor="pointer">
              <Pressable onPress={() => {
                console.log(i);
                setIndex(i);
              }}>
                <Animated.Text style={{
                  color,
                  fontWeight: i === index ? "bold" : "normal"
                }}>
                  {route.title}
                </Animated.Text>
              </Pressable>
            </Box>
          )
        })}
      </Box>
    )
  };

  return <TabView navigationState={{
    index,
    routes
  }} renderScene={renderScene} renderTabBar={renderTabBar} onIndexChange={setIndex} initialLayout={initialLayout} style={{
    marginTop: 6
  }} />;
}