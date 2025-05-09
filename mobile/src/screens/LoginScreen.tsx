import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import Icon from 'react-native-vector-icons/FontAwesome';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
}

enum LoginMethod {
  OPTIONS = 'options',
  EMAIL = 'email',
  PHONE = 'phone',
  OTP = 'otp',
}

const LoginScreen: React.FC<Props> = ({ navigation, route }) => {
  const { userType } = route.params;
  const [loginMethod, setLoginMethod] = useState<LoginMethod>(LoginMethod.OPTIONS);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');

  const handleBackToSplash = () => {
    navigation.goBack();
  };

  const handleBackToOptions = () => {
    setLoginMethod(LoginMethod.OPTIONS);
  };

  const handleEmailLogin = () => {
    // In a real app, we would validate and call an API
    navigation.navigate('Home');
  };

  const handlePhoneLogin = () => {
    // In a real app, we would validate and send OTP
    setLoginMethod(LoginMethod.OTP);
  };

  const handleOtpVerification = () => {
    // In a real app, we would verify OTP with an API
    navigation.navigate('Home');
  };

  const handleGoogleLogin = () => {
    // In a real app, we would integrate with Google OAuth
    navigation.navigate('Home');
  };

  const handleAppleLogin = () => {
    // In a real app, we would integrate with Apple Sign In
    navigation.navigate('Home');
  };

  const renderLoginOptions = () => (
    <>
      <Text style={styles.welcome}>Welcome to Ilava</Text>
      <Text style={styles.welcomeSubtitle}>
        Sign in as a {userType === 'farmer' ? 'Farmer' : 'Buyer'}
      </Text>

      <View style={styles.socialButtons}>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => setLoginMethod(LoginMethod.EMAIL)}>
          <Icon name="envelope" size={20} color="#333" />
          <Text style={styles.socialButtonText}>Continue with Email</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => setLoginMethod(LoginMethod.PHONE)}>
          <Icon name="phone" size={20} color="#333" />
          <Text style={styles.socialButtonText}>Continue with Phone</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={handleGoogleLogin}>
          <Icon name="google" size={20} color="#DB4437" />
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={handleAppleLogin}>
          <Icon name="apple" size={20} color="#333" />
          <Text style={styles.socialButtonText}>Continue with Apple</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.signupText}>
        Don't have an account?{' '}
        <Text style={styles.signupLink}>Sign up</Text>
      </Text>
    </>
  );

  const renderEmailLogin = () => (
    <>
      <Text style={styles.welcome}>Sign in with Email</Text>
      <Text style={styles.welcomeSubtitle}>Enter your email and password</Text>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="your@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••••"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleEmailLogin}>
          <Text style={styles.loginButtonText}>Sign In</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleBackToOptions}>
        <Text style={styles.backToOptions}>
          Back to login options
        </Text>
      </TouchableOpacity>
    </>
  );

  const renderPhoneLogin = () => (
    <>
      <Text style={styles.welcome}>Sign in with Phone</Text>
      <Text style={styles.welcomeSubtitle}>We'll send a verification code to your phone</Text>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handlePhoneLogin}>
          <Text style={styles.loginButtonText}>Send Verification Code</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleBackToOptions}>
        <Text style={styles.backToOptions}>
          Back to login options
        </Text>
      </TouchableOpacity>
    </>
  );

  const renderOtpVerification = () => (
    <>
      <Text style={styles.welcome}>Verify Your Phone</Text>
      <Text style={styles.welcomeSubtitle}>
        Enter the 6-digit code sent to {phoneNumber}
      </Text>

      <View style={styles.form}>
        <View style={styles.otpContainer}>
          <TextInput
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={6}
            value={otp}
            onChangeText={setOtp}
          />
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleOtpVerification}>
          <Text style={styles.loginButtonText}>Verify Code</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => setLoginMethod(LoginMethod.PHONE)}>
        <Text style={styles.backToOptions}>
          Resend code
        </Text>
      </TouchableOpacity>
    </>
  );

  const renderLoginContent = () => {
    switch (loginMethod) {
      case LoginMethod.EMAIL:
        return renderEmailLogin();
      case LoginMethod.PHONE:
        return renderPhoneLogin();
      case LoginMethod.OTP:
        return renderOtpVerification();
      default:
        return renderLoginOptions();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={handleBackToSplash}>
                <Icon name="arrow-left" size={24} color="#333" />
              </TouchableOpacity>
              <Image
                source={require('../assets/ilava-logo.svg')}
                style={styles.logo}
              />
              <Text style={styles.title}>ILAVA</Text>
            </View>

            <View style={styles.card}>{renderLoginContent()}</View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'rgba(234, 231, 31, 0.1)',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    width: '100%',
  },
  backButton: {
    padding: 8,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    color: '#31b43e',
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
    marginRight: 40, // offset for the back button
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    width: '100%',
    maxWidth: 400,
    padding: 30,
  },
  welcome: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  forgotPassword: {
    fontSize: 14,
    color: '#31b43e',
    textAlign: 'right',
  },
  loginButton: {
    backgroundColor: '#31b43e',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  socialButtons: {
    gap: 12,
    marginBottom: 30,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  signupText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 30,
  },
  signupLink: {
    color: '#31b43e',
    fontWeight: '600',
  },
  backToOptions: {
    fontSize: 14,
    color: '#31b43e',
    textAlign: 'center',
    marginTop: 15,
    fontWeight: '500',
  },
  otpContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  otpInput: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 10,
  },
});

export default LoginScreen;