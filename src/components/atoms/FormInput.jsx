import React, { forwardRef } from "react";
import { HStack, Text, Box } from "native-base";
import { TextInput, StyleSheet } from "react-native";

const FormInput = forwardRef(({
  label,
  labelIcon,
  required,
  placeholder,
  value,
  onChange,
  type = "text",
  isInvalid,
  errorText,
  InputLeftElement,
  InputRightElement,
  ...props
}, ref) => {
  return (
    <Box mb="4" {...props}>
      {label && (
        <HStack space={2} alignItems="center" mb="2">
          {labelIcon}
          <Text color="white" fontWeight="medium">
            {label} {required && <Text color="red">*</Text>}
          </Text>
        </HStack>
      )}
      <HStack
        w="100%"
        bg="white"
        borderRadius="md"
        alignItems="center"
        px="3"
        borderColor={isInvalid ? "red" : "transparent"}
        borderWidth={1}
      >
        {InputLeftElement && <Box mr="2">{InputLeftElement}</Box>}
        <TextInput
          ref={ref}
          placeholder={placeholder}
          placeholderTextColor="#A3A3A3"
          style={styles.input}
          value={value}
          onChangeText={onChange}
          secureTextEntry={type === "password"}
          returnKeyType={props.returnKeyType}
          onSubmitEditing={props.onSubmitEditing}
          {...props}
        />
        {InputRightElement && <Box ml="2">{InputRightElement}</Box>}
      </HStack>
      {isInvalid && errorText && (
        <Text color="red" mt="1" fontSize="sm">
          {errorText}
        </Text>
      )}
    </Box>
  );
});

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: 16,
    color: "black",
    paddingVertical: 10,
  },
});

export default FormInput;
