import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
  Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function SupportScreen({ navigation }: any) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [message, setMessage] = useState('');

  const supportCategories = [
    { id: 'technical', title: 'Technical Issues', icon: 'settings-outline', color: '#2196F3' },
    { id: 'payment', title: 'Payment & Billing', icon: 'card-outline', color: '#4CAF50' },
    { id: 'delivery', title: 'Delivery Issues', icon: 'bicycle-outline', color: '#FF9800' },
    { id: 'account', title: 'Account Issues', icon: 'person-outline', color: '#9C27B0' },
    { id: 'general', title: 'General Inquiry', icon: 'help-circle-outline', color: '#795548' },
  ];

  const faqItems = [
    {
      question: 'How do I list my products?',
      answer: 'Go to your dashboard and tap on "Sell Fresh" or "Sell Waste" to list new products.'
    },
    {
      question: 'How does payment work?',
      answer: 'Payments are processed securely through our platform. You receive payment after successful delivery.'
    },
    {
      question: 'What is the AI waste scanner?',
      answer: 'Our AI technology helps identify waste types and suggests optimal pricing for your waste products.'
    },
    {
      question: 'How do I track my orders?',
      answer: 'Visit "My Orders" section to track all your active and completed orders.'
    },
  ];

  const handleSubmitSupport = () => {
    if (!selectedCategory || !message.trim()) {
      Alert.alert('Error', 'Please select a category and enter your message.');
      return;
    }
    
    Alert.alert(
      'Support Request Submitted',
      'Thank you for contacting us. We will get back to you within 24 hours.',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Help & Support</Text>
      <View style={styles.placeholder} />
    </View>
  );

  const renderQuickActions = () => (
    <View style={styles.quickActions}>
      <TouchableOpacity 
        style={styles.quickActionBtn}
        onPress={() => Linking.openURL('tel:+918888888888')}
      >
        <Ionicons name="call" size={24} color="#4CAF50" />
        <Text style={styles.quickActionText}>Call Us</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.quickActionBtn}
        onPress={() => Linking.openURL('mailto:support@ilavahealth.com')}
      >
        <Ionicons name="mail" size={24} color="#2196F3" />
        <Text style={styles.quickActionText}>Email</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.quickActionBtn}
        onPress={() => Alert.alert('Chat', 'Live chat feature coming soon!')}
      >
        <Ionicons name="chatbubble" size={24} color="#FF9800" />
        <Text style={styles.quickActionText}>Live Chat</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#4CAF50', '#66BB6A']} style={styles.headerGradient}>
        {renderHeader()}
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderQuickActions()}

        {/* FAQ Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          {faqItems.map((item, index) => (
            <View key={index} style={styles.faqItem}>
              <Text style={styles.faqQuestion}>{item.question}</Text>
              <Text style={styles.faqAnswer}>{item.answer}</Text>
            </View>
          ))}
        </View>

        {/* Contact Form */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Support</Text>
          
          <Text style={styles.label}>Select Category</Text>
          <View style={styles.categoryGrid}>
            {supportCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  selectedCategory === category.id && styles.selectedCategory
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Ionicons 
                  name={category.icon as any} 
                  size={24} 
                  color={selectedCategory === category.id ? '#FFFFFF' : category.color} 
                />
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.selectedCategoryText
                ]}>
                  {category.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Describe your issue</Text>
          <TextInput
            style={styles.messageInput}
            multiline
            numberOfLines={4}
            placeholder="Please describe your issue in detail..."
            value={message}
            onChangeText={setMessage}
            textAlignVertical="top"
          />

          <TouchableOpacity 
            style={styles.submitButton}
            onPress={handleSubmitSupport}
          >
            <LinearGradient colors={['#4CAF50', '#66BB6A']} style={styles.submitGradient}>
              <Text style={styles.submitButtonText}>Submit Request</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerGradient: {
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: -10,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  quickActionBtn: {
    alignItems: 'center',
    padding: 10,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginTop: 5,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    padding: 20,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 15,
  },
  faqItem: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ECF0F1',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 5,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 10,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCategory: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2C3E50',
    marginTop: 8,
    textAlign: 'center',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  messageInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 15,
    fontSize: 14,
    color: '#2C3E50',
    backgroundColor: '#F8F9FA',
    marginBottom: 20,
    minHeight: 100,
  },
  submitButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  submitGradient: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  bottomSpacer: {
    height: 20,
  },
});
