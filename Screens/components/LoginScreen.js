import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  Dimensions,
} from "react-native";

export default function LoginScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [isActivePassword, setActivePassword] = useState(false);
  const [isActiveEmail, setActiveEmail] = useState(false);

  //
  const [dimensions, setDimensions] = useState(Dimensions.get("window").width);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      console.log(width);
      setDimensions(width);
    };
    const subscription = Dimensions.addEventListener("change", onChange);
    return () => subscription?.remove();
  }, []);
  //

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const onLogin = () => {
    if (password === "" || email === "") {
      console.log("missing fields");
      return;
    }
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log("Credentials", `${email} + ${password}`);
    setEmail(""), setPassword("");
  };

  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);

  //const showPassword = () => {
  //  console.log("press");
  //  setSecureText(({ pressed }) => (pressed ? false : true));
  //};

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/images/imageBG.png")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={-35}
          >
            <View style={{ ...styles.form, width: dimensions }}>
              <Text style={styles.titleText}>Login</Text>
              <TextInput
                //style={styles.input}
                style={{
                  ...styles.input,
                  borderColor: isActiveEmail ? "#FF6C00" : "#E8E8E8",
                  backgroundColor: isActiveEmail ? "#FFF" : "#F6F6F6",
                }}
                placeholder="Email address"
                placeholderTextColor="#BDBDBD"
                //onFocus={() => setIsShowKeyboard(true)}
                onFocus={() => {
                  setIsShowKeyboard(true), setActiveEmail(true);
                }}
                onBlur={() => setActiveEmail(false)}
                value={email}
                onChangeText={emailHandler}
              />
              <View>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: isActivePassword ? "#FF6C00" : "#E8E8E8",
                    backgroundColor: isActivePassword ? "#FFF" : "#F6F6F6",
                    marginTop: 16,
                  }}
                  secureTextEntry={secureText}
                  placeholder="Password"
                  placeholderTextColor="#BDBDBD"
                  //onFocus={() => setIsShowKeyboard(true)}
                  onFocus={() => {
                    setIsShowKeyboard(true), setActivePassword(true);
                  }}
                  onBlur={() => setActivePassword(false)}
                  value={password}
                  onChangeText={passwordHandler}
                />

                <TouchableOpacity
                  style={styles.showPasswordButton}
                  //onPress={showPassword}
                >
                  <Text style={styles.showPasswordText}>Show</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.btn} onPress={onLogin}>
                <Text style={styles.btnText}>Log In</Text>
              </TouchableOpacity>
              <Text style={styles.textSignup}>
                Don't have an account? Sign Up
              </Text>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
  },
  titleText: {
    fontFamily: "robotoMedium",
    fontSize: 30,
    lineHeight: 35.16,
    alignSelf: "center",
    letterSpacing: 1,
    marginTop: 32,
    marginBottom: 32,
  },
  input: {
    fontFamily: "robotoRegular",
    fontSize: 16,
    height: 50,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderRadius: 8,
    borderStyle: "solid",
    borderWidth: 1,
    lineHeight: 18.75,
    padding: 16,
  },
  showPasswordButton: {
    position: "absolute",
    right: 16,

    top: 30,
  },
  showPasswordText: {
    fontSize: 16,
    fontFamily: "robotoRegular",
    fontWeight: "400",
    lineHeight: 18.75,
    color: "#1B4371",
  },
  btn: {
    height: 51,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 43,
    marginBottom: 16,
    backgroundColor: "#FF6C00",
  },
  btnText: {
    fontFamily: "robotoRegular",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#ffffff",
  },
  textSignup: {
    fontFamily: "robotoRegular",
    fontSize: 16,
    lineHeight: 18.75,
    alignSelf: "center",
    marginBottom: 144,
    color: "#1B4371",
  },
});
