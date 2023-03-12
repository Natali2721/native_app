import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  Dimensions,
} from "react-native";

export default function RegistrationScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [isShow, setIsShow] = useState(false);
  const [isActiveLogin, setActiveLogin] = useState(false);
  const [isActivePassword, setActivePassword] = useState(false);
  const [isActiveEmail, setActiveEmail] = useState(false);

  //
  const [dimensions, setDimensions] = useState(Dimensions.get("window"));

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      const height = Dimensions.get("window").height;
      console.log(width);
      console.log(height);
      if (width > height) {
        setDimensions({ orientation: "landscape" });
      } else {
        setDimensions({ orientation: "portrait" });
      }
    };
    const subscription = Dimensions.addEventListener("change", onChange);
    return () => subscription?.remove();
  }, []);
  //

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const onSignup = () => {
    if (password === "" || email === "" || login === "") {
      console.log("missing fields");
      return;
    }
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log("Credentials", `${login} + ${email} + ${password}`);
    setLogin(""), setEmail(""), setPassword("");
  };

  const loginHandler = (text) => setLogin(text);
  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageBG}
          source={require("../../assets/images/imageBG.png")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={-110}
          >
            <View style={styles.form}>
              <View style={styles.photoBox}>
                {isShowKeyboard && (
                  <Image source={require("../../assets/images/photo.png")} />
                )}
                <Image
                  style={{
                    ...styles.iconImage,
                    right: isShowKeyboard ? -18 : -12,
                    bottom: isShowKeyboard ? 8 : 14,
                  }}
                  source={
                    isShowKeyboard
                      ? require("../../assets/images/add_grey.png")
                      : require("../../assets/images/add.png")
                  }
                />
              </View>
              <Text style={styles.titleText}>Registration</Text>
              <TextInput
                value={login}
                onChangeText={loginHandler}
                //style={styles.input}
                //style={[styles.input, focus && styles.focus]}
                style={{
                  ...styles.input,
                  borderColor: isActiveLogin ? "#FF6C00" : "#E8E8E8",
                  backgroundColor: isActiveLogin ? "#FFF" : "#F6F6F6",
                }}
                placeholder="Login"
                placeholderTextColor="#BDBDBD"
                onFocus={() => {
                  setIsShowKeyboard(true), setActiveLogin(true);
                }}
                onBlur={() => setActiveLogin(false)}
              />
              <TextInput
                value={email}
                onChangeText={emailHandler}
                style={{
                  ...styles.input,
                  borderColor: isActiveEmail ? "#FF6C00" : "#E8E8E8",
                  backgroundColor: isActiveEmail ? "#FFF" : "#F6F6F6",
                }}
                placeholder="Email address"
                placeholderTextColor="#BDBDBD"
                keyboardType="email-address"
                //onFocus={() => setIsShowKeyboard(true)}
                onFocus={() => {
                  setIsShowKeyboard(true), setActiveEmail(true);
                }}
                onBlur={() => setActiveEmail(false)}
              />

              <View>
                <TextInput
                  value={password}
                  onChangeText={passwordHandler}
                  style={{
                    ...styles.input,
                    borderColor: isActivePassword ? "#FF6C00" : "#E8E8E8",
                    backgroundColor: isActivePassword ? "#FFF" : "#F6F6F6",
                    marginBottom: 0,
                  }}
                  secureTextEntry={true}
                  placeholder="Password"
                  placeholderTextColor="#BDBDBD"
                  //onFocus={() => setIsShowKeyboard(true)}
                  onFocus={() => {
                    setIsShowKeyboard(true), setActivePassword(true);
                  }}
                  onBlur={() => setActivePassword(false)}
                />
                <TouchableOpacity
                  style={styles.showPasswordButton}
                  // onPress={showPassword}
                >
                  <Text style={styles.showPasswordText}>Show</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.btn} onPress={onSignup}>
                <Text style={styles.btnTitle}>Sign up</Text>
              </TouchableOpacity>

              <Text style={styles.loginText}>Have an account? Log in</Text>
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
  },
  imageBG: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
    position: "relative",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    paddingBottom: 66,
    paddingTop: 92,
  },
  photoBox: {
    position: "absolute",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    alignSelf: "center",
    left: "50%",
    top: 0,
    zIndex: 1,
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
  iconImage: {
    position: "absolute",
    //height: 25,
    //width: 25,
    //bottom: 14,
    //right: -12,
  },
  titleText: {
    fontFamily: "robotoMedium",
    fontSize: 30,
    color: "#212121",
    textAlign: "center",
    lineHeight: 35,
    letterSpacing: 1,
    marginBottom: 32,
  },
  input: {
    fontFamily: "robotoRegular",
    fontSize: 16,
    height: 50,
    borderRadius: 8,
    //backgroundColor: "#F6F6F6",
    //borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderWidth: 1,
    marginBottom: 16,
    padding: 16,
    lineHeight: 18.75,
  },

  showPasswordButton: {
    position: "absolute",
    right: 16,
    //top: "30%",
    top: 15,
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
    backgroundColor: "#FF6C00",

    justifyContent: "center",
    alignItems: "center",
    marginTop: 43,
    marginBottom: 16,
    borderRadius: 100,
  },
  btnTitle: {
    fontFamily: "robotoRegular",
    fontWeight: "400",
    fontSize: 16,
    color: "#ffffff",
    lineHeight: 18.75,
  },
  loginText: {
    fontFamily: "robotoRegular",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#1B4371",
    textAlign: "center",
  },
});
