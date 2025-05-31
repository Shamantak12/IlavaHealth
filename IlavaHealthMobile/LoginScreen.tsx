import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FontAwesome, MaterialIcons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

// Placeholder logo (replace with your own asset if needed)
const logo = 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg';

export default function LoginScreen({ onBack, onLoginSuccess, userType = 'buyer' }) {
  const [loginMethod, setLoginMethod] = useState('options');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [phoneForOtp, setPhoneForOtp] = useState('');
  const [error, setError] = useState('');

  const handleEmailLogin = () => {
    if (!email.includes('@') || password.length < 6) {
      setError('Enter a valid email and password (min 6 chars)');
      return;
    }
    setError('');
    if (onLoginSuccess) onLoginSuccess(userType);
  };

  const handlePhoneLogin = () => {
    if (phoneNumber.length < 10) {
      setError('Enter a valid phone number');
      return;
    }
    setError('');
    setPhoneForOtp(phoneNumber);
    setLoginMethod('otp');
  };

  const handleOtpVerification = () => {
    if (otp.some((d) => d.length !== 1)) {
      setError('Enter all 6 digits');
      return;
    }
    setError('');
    if (onLoginSuccess) onLoginSuccess(userType);
  };

  const renderLoginOptions = () => (
    <>
      <Text style={styles.welcome}>Welcome to Ilava</Text>
      <Text style={styles.welcomeSubtitle}>Sign in as a {userType === 'farmer' ? 'Farmer' : 'Buyer'}</Text>
      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButton} onPress={() => setLoginMethod('email')}>
          <MaterialIcons name="email" size={20} color="#31b43e" />
          <Text style={styles.socialButtonText}>Continue with Email</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={() => setLoginMethod('phone')}>
          <AntDesign name="phone" size={20} color="#31b43e" />
          <Text style={styles.socialButtonText}>Continue with Phone</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={() => onLoginSuccess && onLoginSuccess(userType)}>
          <FontAwesome name="google" size={20} color="#31b43e" />
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={() => onLoginSuccess && onLoginSuccess(userType)}>
          <FontAwesome name="apple" size={20} color="#31b43e" />
          <Text style={styles.socialButtonText}>Continue with Apple</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.signupText}>Don't have an account? <Text style={styles.signupLink}>Sign up</Text></Text>
    </>
  );

  const renderEmailLogin = () => (
    <>
      <Text style={styles.welcome}>Sign in with Email</Text>
      <Text style={styles.welcomeSubtitle}>Enter your email and password</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} placeholder="your@email.com" value={email} onChangeText={setEmail} autoCapitalize="none" />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} placeholder="••••••••••" value={password} onChangeText={setPassword} secureTextEntry />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.loginButton} onPress={handleEmailLogin}>
        <Text style={styles.loginButtonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setLoginMethod('options')}><Text style={styles.backToOptions}>Back to login options</Text></TouchableOpacity>
    </>
  );

  const renderPhoneLogin = () => (
    <>
      <Text style={styles.welcome}>Sign in with Phone</Text>
      <Text style={styles.welcomeSubtitle}>We'll send a verification code to your phone</Text>
      <View style={styles.inputGroup}>
        <TextInput style={styles.input} placeholder="Enter your phone number" value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.loginButton} onPress={handlePhoneLogin}>
        <Text style={styles.loginButtonText}>Send Verification Code</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setLoginMethod('options')}><Text style={styles.backToOptions}>Back to login options</Text></TouchableOpacity>
    </>
  );

  const renderOtpVerification = () => (
    <>
      <Text style={styles.welcome}>Verify Your Phone</Text>
      <Text style={styles.welcomeSubtitle}>Enter the 6-digit code sent to {phoneForOtp}</Text>
      <View style={styles.otpContainer}>
        {otp.map((digit, idx) => (
          <TextInput
            key={idx}
            style={styles.otpInput}
            maxLength={1}
            keyboardType="number-pad"
            value={digit}
            onChangeText={t => {
              const newOtp = [...otp];
              newOtp[idx] = t;
              setOtp(newOtp);
            }}
          />
        ))}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.loginButton} onPress={handleOtpVerification}>
        <Text style={styles.loginButtonText}>Verify Code</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setLoginMethod('phone')}><Text style={styles.backToOptions}>Resend code</Text></TouchableOpacity>
    </>
  );

  let content;
  if (loginMethod === 'email') content = renderEmailLogin();
  else if (loginMethod === 'phone') content = renderPhoneLogin();
  else if (loginMethod === 'otp') content = renderOtpVerification();
  else content = renderLoginOptions();

  return (
    <View style={styles.loginContainer}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#31b43e" />
        </TouchableOpacity>
        <Image source={{ uri: logo }} style={styles.logo} />
        <Text style={styles.title}>ILAVA</Text>
      </View>
      <View style={styles.card}>{content}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  backButton: { marginRight: 8 },
  logo: { width: 40, height: 40, marginRight: 8 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#31b43e' },
  card: { width: '90%', backgroundColor: '#f8f8f8', borderRadius: 12, padding: 20, alignItems: 'center' },
  welcome: { fontSize: 20, fontWeight: 'bold', marginBottom: 8, color: '#31b43e' },
  welcomeSubtitle: { fontSize: 14, color: '#333', marginBottom: 16 },
  socialButtons: { width: '100%', marginBottom: 16 },
  socialButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 8, padding: 10, marginBottom: 8, borderWidth: 1, borderColor: '#e0e0e0' },
  socialButtonText: { marginLeft: 10, color: '#333', fontWeight: 'bold' },
  signupText: { color: '#333', marginTop: 8 },
  signupLink: { color: '#31b43e', fontWeight: 'bold' },
  inputGroup: { width: '100%', marginBottom: 12 },
  label: { color: '#333', marginBottom: 4 },
  input: { backgroundColor: '#fff', borderRadius: 6, borderWidth: 1, borderColor: '#e0e0e0', padding: 10, fontSize: 16 },
  error: { color: 'red', marginBottom: 8 },
  loginButton: { backgroundColor: '#31b43e', borderRadius: 8, padding: 12, alignItems: 'center', marginTop: 8, width: '100%' },
  loginButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  backToOptions: { color: '#31b43e', marginTop: 12, textAlign: 'center' },
  otpContainer: { flexDirection: 'row', justifyContent: 'center', marginVertical: 12 },
  otpInput: { width: 40, height: 40, borderWidth: 1, borderColor: '#31b43e', borderRadius: 8, textAlign: 'center', fontSize: 18, marginHorizontal: 4, backgroundColor: '#fff' },
});
