import { useEffect, useRef, useState } from "react";
import { Dimensions, ScrollView } from "react-native";
import { Box, HStack, Image, Pressable } from "native-base";


const { width: windowWidth } = Dimensions.get("window");

const Screenshot = ({
  images = [],
  folder,
  isShowroom = false,
  autoPlayMs = 3000,
  thumbnail,
  room_name,
  format,
  onPressImage,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollRef = useRef(null);
  const slideWidth = windowWidth - 24;
  const landscape = isShowroom || room_name === "JKT48";


  const handleScroll = (event) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / slideWidth);
    setActiveIndex(slide);
  };

  const goToSlide = (index, animated = true) => {
    scrollRef.current?.scrollTo({ x: slideWidth * index, animated });
    setActiveIndex(index);
  };

  useEffect(() => {
    if (!images || images.length === 0) return;

    const interval = setInterval(() => {
      if (activeIndex === images.length - 1) {
        // if last slide → instantly jump back to first
        goToSlide(0, false);
      } else {
        goToSlide(activeIndex + 1);
      }
    }, autoPlayMs);

    return () => clearInterval(interval);
  }, [activeIndex, images, autoPlayMs]);

  if (!images || images.length === 0) {
    return (
      <Image
        mt="3"
        rounded="md"
        source={{ uri: thumbnail }}
        width={windowWidth}
        height={200}
        alt="thumbnail"
      />
    );
  }

  return (
    <Box mt="3" height={landscape ? 220 : 412}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {images.map((img, idx) => (
          <Pressable
            key={idx}
            onPress={() => onPressImage(idx)}
          >
            <Image
              width={slideWidth}
              height={landscape ? 220 : 412}
              rounded="lg"
              source={{
                uri: `https://img.crstlnz.my.id/${folder}/${img}.${format}`,
              }}
              alt={`screenshot-${idx}`}
            />
          </Pressable>
        ))}
      </ScrollView>

      <HStack justifyContent="center" mt="4" space={2}>
        {images.slice(0, 18).map((_, idx) => (
          <Pressable key={idx} onPress={() => goToSlide(idx)}>
            <Box
              w={activeIndex === idx ? 4 : 2}
              h={2}
              rounded="full"
              bg={activeIndex === idx ? "primary" : "gray.400"}
            />
          </Pressable>
        ))}
      </HStack>
    </Box>

  );
};

export default Screenshot;
