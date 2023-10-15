import { View, Text, StyleSheet, ScrollView, TextInput, SafeAreaView, Button, TouchableOpacity,  KeyboardAvoidingView, Dimensions} from 'react-native'
import React , { useState, useRef } from 'react'
import OTPTextView from 'react-native-otp-textinput'
import axios from 'axios'
const sessionstorage = require('sessionstorage');

const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
)

const AppButtonClear = ({ onPress, title }) => (
      <TouchableOpacity onPress={onPress} style={styles.appButtonContainerClear}>
        <Text style={styles.appButtonTextClear}>{title}</Text>
      </TouchableOpacity>
)

const AppButtonButtom = ({ onPress, title }) => (
      <TouchableOpacity onPress={onPress} style={styles.appButtonContainerButtom}>
        <Text style={styles.appButtonTextButtom}>{title}</Text>
      </TouchableOpacity>
)

const AppText = (props) => (
    <Text {...props} style={{fontFamily: "Cuprum-VariableFont_wght", ...props.style, fontSize: 18}}>{props.children}</Text>
)

const VerifyEmail = ( {navigation}) => {
  const [otpInput, setOtpInput] = useState("");
  const input = useRef(null);
  const clear = () => input.current?.clear();
  const updateOtpText = () => input.current?.setValue(otpInput);
  const showTextAlert = () => otpInput && Alert.alert(otpInput);
  const handleCellTextChange = async (text, i) => {
    if (i === 0) {
      const clippedText = await REACT_NATIVE_APP_MYIP.getString();
      if (clippedText.slice(0, 1) === text) {
        input.current?.setValue(clippedText, true);
      }
    }
  };
  const onPressLogin = () => {
    navigation.navigate('Login')
  };
  const onPressNewContent = () => {
    console.log(otpInput);
    // navigation.navigate('New Content')
    const url = "http://192.168.1.192:3360/verify_OTP";
    console.log("Sending request to", url);
    axios.post(url, {
      user_OTP: otpInput
    })
    .then(({data}) => { 
      console.log(data)
      if(data.status === 'success') {
        navigation.navigate('New Content')
      }
    })
    .catch(async error => {
      console.error("AXIOS ERROR:");
      console.error(await error);
    });
  }
  const onPressResend = () => {
    const url = "http://192.168.1.192:3360/send_login_OTP";
    console.log("Sending request to", url);
    axios.post(url)
    .then(({data}) => { 
      console.log(data)
      // if(data.status === 'success') {
  
      // }
    })
    .catch(async error => {
      console.error("AXIOS ERROR:");
      console.error(await error);
    });
  }

    return (
        <View style={styles.container}>
            <View style={{...styles.ellipse, transform: [{scaleX: 1.4}],}}/>
            <View style={styles.circle}> 
              <Text style={{color:'black', fontSize:45, fontFamily: "Cuprum-Bold"}}>Verify your email</Text>
              <AppText style={{color:'black', marginTop: 10}}>A 4-digit code has been sent to</AppText>
              <Text style={{color:'black', fontFamily: "Cuprum-Bold", left:-32, fontSize: 18}}>sample@email.com</Text>
              <AppButtonClear 
                title={"Change"}
                onPress={onPressLogin}
              />
              <SafeAreaView>
                <OTPTextView
                  ref={input}
                  containerStyle={styles.textInputContainer}
                  handleTextChange={setOtpInput}
                  handleCellTextChange={handleCellTextChange}
                  inputCount={4}
                  keyboardType="numeric"
                />
              </SafeAreaView>
              <AppText style={{color:'black', marginTop: 5, left: -20}}>The OTP will be expired in</AppText>
              <Text style={{color:'black', top: -20, fontFamily: "Cuprum-Bold", fontSize: 18, left: 90}}>9:59</Text>
              <AppButton 
                title={'Verify'}
                onPress={onPressNewContent}
              />
            <AppText style={{color:'black', marginTop: 5, top:210, left: -30}}>Didn't recieve the code?</AppText>
            <AppButtonButtom 
              title={'Resend'} 
              onPress={onPressResend}/>
            </View> 
        </View>
    )
}

const styles = StyleSheet.create({
    circle: {
        height: 580,
        width: 580,
        borderRadius: 290,
        backgroundColor: "#FAEBDC",
        top:-500,
        alignItems: 'center',
        paddingTop:150
        
    },
    ellipse: {
        height: 600,
        width: 600,
        borderRadius: 300,
        backgroundColor: "#FAEBDC",
        top: 100,
        alignItems: 'center',
        paddingTop:90
      
    },
    container: {
        backgroundColor: "#f2a676",
        alignItems: "center",
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    input: {
        width: 300,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        fontFamily: "Cuprum-VariableFont_wght",
        borderRadius: 7,
      },
      title: {
        textAlign: 'center',
        marginVertical: 8,
        color:"black",
        fontFamily: "Cuprum-VariableFont_wght",
      },
      appButtonContainer: {
        elevation: 0,
        backgroundColor: "#E67738",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop: 10,
        width: 120
      },
      appButtonText: {
        fontSize: 18,
        color: "white",
        fontWeight: "bold",
        alignSelf: "center",
        fontFamily: "Cuprum-VariableFont_wght",
      },
      appButtonContainerClear: {
        elevation: 0,
        backgroundColor: "#FAEBDC",
        borderRadius: 10,
        paddingVertical: 0,
        paddingHorizontal: 0,
        marginTop: 0,
        top: -23,
        left: 63
      },
      appButtonTextClear: {
        fontSize: 18,
        width: 50,
        color: "#E76F51",
        left: 8,
        textDecorationLine: "underline",
        fontFamily: "Cuprum-VariableFont_wght",
      },
      appButtonContainerButtom: {
        elevation: 0,
        backgroundColor: "#f2a676",
        borderRadius: 10,
        paddingVertical: 2,
        paddingHorizontal: 2,
        marginTop: 0,
        top: 184,
        left: 80
      },
      appButtonTextButtom: {
        fontSize: 18,
        fontFamily: "Cuprum-VariableFont_wght",
        width: 50,
        color: "white",
        left: 0,
        textDecorationLine: "underline",
        fontFamily: "Cuprum-VariableFont_wght",
      },
      otpinput: {
        margin: 12,
        padding: 10,
        height: 40, 
        width: 40, 
        backgroundColor:'white', 
        top:-40, 
        borderRadius:7, 
        borderColor: "#E76F51", 
        borderWidth:2,
        fontFamily: "Cuprum-VariableFont_wght"
      },
      otpinputContainer: {
        margin: 12,
        padding: 0, // Adjust the padding here as needed
        height: 40,
        width: 40,
        top: -40,
        borderRadius: 7,
        borderColor: "#E76F51",
        borderWidth: 2,
      },
    safeAreaView: {
      flex: 1,
    },
    // container: {
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   backgroundColor: '#F5FCFF',
    //   padding: 5,
    //   paddingVertical: 20,
    // },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      fontSize: 18,
      fontWeight: '500',
      textAlign: 'center',
      color: '#333333',
      marginBottom: 10,
    },
    textInputContainer: {
      marginBottom: 20,
    },
    roundedTextInput: {
      borderRadius: 10,
      borderWidth: 4,
    },
    buttonWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 20,
      width: '60%',
      gap: 20,
    },
    textInput: {
      height: 40,
      width: '80%',
      borderColor: '#000',
      borderWidth: 1,
      padding: 10,
      fontSize: 16,
      letterSpacing: 5,
      marginBottom: 10,
      textAlign: 'center',
    },
}
)
export default VerifyEmail

