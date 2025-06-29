import { useEffect, useState } from "react";
import { HStack, Text, VStack } from "native-base";

const CountdownTimer = ({ targetDateTime, showDate, children }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    let target;

    if (
      typeof targetDateTime === "string" &&
      targetDateTime.includes(":") &&
      !targetDateTime.includes("-") &&
      !targetDateTime.includes("/")
    ) {
      const [hours, minutes] = targetDateTime.split(":").map(Number);
      target = new Date();
      target.setHours(hours, minutes, 0, 0);

      if (target <= now) {
        target.setDate(target.getDate() + 1);
      }
    } else {
      target = new Date(targetDateTime);
    }

    const difference = target - now;

    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDateTime]);

  const formatTime = (value) => String(value).padStart(2, "0");

  // Check if show has ended by combining showDate and targetDateTime
  const isShowEnded = () => {
    if (!showDate) return false;

    const now = new Date();
    let showStartTime;

    if (
      typeof targetDateTime === "string" &&
      targetDateTime.includes(":") &&
      !targetDateTime.includes("-") &&
      !targetDateTime.includes("/")
    ) {
      const [hours, minutes] = targetDateTime.split(":").map(Number);
      showStartTime = new Date(showDate);
      showStartTime.setHours(hours, minutes, 0, 0);
    } else {
      showStartTime = new Date(targetDateTime);
    }

    // Calculate show end time (2 hours after start)
    const showEndTime = new Date(showStartTime.getTime() + 2 * 60 * 60 * 1000);

    return now > showEndTime;
  };

  // Check if show is currently live (within 2 hours of start time)
  const isShowLive = () => {
    if (!showDate) return false;

    const now = new Date();
    let showStartTime;

    if (
      typeof targetDateTime === "string" &&
      targetDateTime.includes(":") &&
      !targetDateTime.includes("-") &&
      !targetDateTime.includes("/")
    ) {
      const [hours, minutes] = targetDateTime.split(":").map(Number);
      showStartTime = new Date(showDate);
      showStartTime.setHours(hours, minutes, 0, 0);
    } else {
      // Use targetDateTime as is if it's a full date-time
      showStartTime = new Date(targetDateTime);
    }

    // Calculate show end time (2 hours after start)
    const showEndTime = new Date(showStartTime.getTime() + 2 * 60 * 60 * 1000);

    return now >= showStartTime && now <= showEndTime;
  };

  // If show has ended (after 2 hours), show ended message
  if (isShowEnded()) {
    return (
      <VStack
        borderBottomLeftRadius="lg"
        borderBottomRightRadius="lg"
        space={3}
        alignItems="center"
        bg="blueGray.900"
        py={3}
      >
        <Text color="white" fontSize="md" fontWeight="medium">
          Show theater sudah berakhir
        </Text>
      </VStack>
    );
  }

  if (isShowLive()) {
    return (
      <>
        <VStack space={3} alignItems="center" bg="blueGray.900" py={3}>
          <Text color="white" fontSize="md" fontWeight="medium">
            Show theater sedang berlangsung
          </Text>
        </VStack>
        {children}
      </>
    );
  }

  return (
    <>
      <VStack space={3} alignItems="center" bg="blueGray.900" py={3}>
        <Text color="white" fontSize="md" fontWeight="medium">
          Show Theater akan dimulai dalam
        </Text>

        <VStack
          bg="coolGray.800"
          px={6}
          py={2}
          mb="2"
          borderRadius="md"
          alignItems="center"
        >
          <HStack space={1}>
            <Text fontSize="2xl" fontWeight="bold">
              {formatTime(timeLeft.hours)}
            </Text>
            <Text fontSize="2xl" fontWeight="bold">
              :
            </Text>
            <Text fontSize="2xl" fontWeight="bold">
              {formatTime(timeLeft.minutes)}
            </Text>
            <Text fontSize="2xl" fontWeight="bold">
              :
            </Text>
            <Text fontSize="2xl" fontWeight="bold">
              {formatTime(timeLeft.seconds)}
            </Text>
          </HStack>

          <HStack space={3} mt={1}>
            <Text color="coolGray.400" fontSize="xs">
              Jam
            </Text>
            <Text color="coolGray.400" fontSize="xs">
              Menit
            </Text>
            <Text color="coolGray.400" fontSize="xs">
              Detik
            </Text>
          </HStack>
        </VStack>
      </VStack>
      {children}
    </>
  );
};

export default CountdownTimer;
