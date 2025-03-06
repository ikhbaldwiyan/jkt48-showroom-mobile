import { useRoute } from "@react-navigation/native";
import { Box, Pressable, Text, useColorModeValue } from "native-base";
import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";
import { SCHEDULES } from "../../../services";
import { Members } from "./components/Members";
import { SongsSetlist } from "./components/SongsSetlist";
import { Ticket } from "./components/Ticket";

const initialLayout = {
  width: Dimensions.get("window").width
};

const ScheduleTabs = ({ refreshing }) => {
  const [index, setIndex] = useState(0);
  const route = useRoute();
  const { params } = route;

  const [members, setMembers] = useState([]);
  const [songs, setSongs] = useState([]);
  const [ticket, setTicket] = useState({});
  const [isRamadahanEvent, setRamadhanEvent] = useState("");
  
  const routes = isRamadahanEvent ? [
    { key: "member", title: "Members" },
    { key: "ticket", title: "Ticket" }
  ] : [
    { key: "member", title: "Members" },
    { key: "songs", title: "Songs" },
    { key: "ticket", title: "Ticket" }
  ];

  useEffect(() => {
    async function getTheaterDetail() {
      try {
        const response = await SCHEDULES.getScheduleDetail(params.item._id);
        setMembers(response.data.memberList);
        setSongs(response.data.setlist.songs);
        setRamadhanEvent(
          response?.data?.setlist.originalName === "Ramadhan Event"
        );
        setTicket(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getTheaterDetail();
  }, [params, refreshing]);

  const renderTabs = SceneMap({
    member: () => <Members members={members} />,
    songs: () => <SongsSetlist songs={songs} />,
    ticket: () => <Ticket ticket={ticket} />
  });

  const renderTabBar = ({ navigationState }) => (
    <Box bg="#0082A6" borderRadius="md" flexDirection="row">
      {navigationState.routes.map((route, i) => {
        const color =
          index === i
            ? useColorModeValue("white", "#e5e5e5")
            : useColorModeValue("#e5e5e5", "red");
        const borderColor =
          index === i ? "#ECFAFC" : useColorModeValue("gray.500", "gray.400");

        return (
          <Box
            key={i}
            borderBottomWidth="3"
            borderColor={borderColor}
            flex={1}
            alignItems="center"
            p="3"
            cursor="pointer"
          >
            <Pressable onPress={() => setIndex(i)}>
              <Text color={color} fontWeight={i === index ? "bold" : "normal"}>
                {route.title}
              </Text>
            </Pressable>
          </Box>
        );
      })}
    </Box>
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderTabs}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
};

export default ScheduleTabs;
