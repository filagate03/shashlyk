import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const LoyaltyScreen = () => {
  const userPoints = 1250;
  const nextLevelPoints = 2000;
  const progress = (userPoints / nextLevelPoints) * 100;

  const benefits = [
    { title: 'Бонусы за заказы', description: 'Получайте 5% от суммы заказа бонусами' },
    { title: 'День рождения', description: 'Специальная скидка 20% в день рождения' },
    { title: 'Бесплатная доставка', description: 'Бесплатная доставка при заказе от 1000₽' },
    { title: 'Эксклюзивные блюда', description: 'Доступ к сезонным и эксклюзивным блюдам' },
  ];

  const recentBonuses = [
    { date: '12.10.2023', description: 'Бонус за заказ №SH-2023-00120', points: '+120' },
    { date: '05.10.2023', description: 'Бонус за приглашение друга', points: '+300' },
    { date: '28.09.2023', description: 'Бонус за заказ №SH-2023-00098', points: '+80' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Программа лояльности</Text>
      
      <View style={styles.pointsCard}>
        <Text style={styles.pointsTitle}>Ваши баллы</Text>
        <Text style={styles.pointsValue}>{userPoints}</Text>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBar, { width: `${progress}%` }]}></View>
        </View>
        <Text style={styles.progressText}>
          До уровня VIP: {nextLevelPoints - userPoints} баллов
        </Text>
      </View>

      <View style={styles.benefitsSection}>
        <Text style={styles.sectionTitle}>Ваши преимущества</Text>
        {benefits.map((benefit, index) => (
          <View key={index} style={styles.benefitItem}>
            <Text style={styles.benefitTitle}>{benefit.title}</Text>
            <Text style={styles.benefitDescription}>{benefit.description}</Text>
          </View>
        ))}
      </View>

      <View style={styles.bonusesSection}>
        <Text style={styles.sectionTitle}>История начислений</Text>
        {recentBonuses.map((bonus, index) => (
          <View key={index} style={styles.bonusItem}>
            <View style={styles.bonusInfo}>
              <Text style={styles.bonusDate}>{bonus.date}</Text>
              <Text style={styles.bonusDescription}>{bonus.description}</Text>
            </View>
            <Text style={styles.bonusPoints}>{bonus.points}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.inviteButton}>
        <Text style={styles.inviteButtonText}>Пригласить друзей</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginBottom: 16,
  },
  pointsCard: {
    backgroundColor: '#D32F2F',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  pointsTitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 18,
    marginBottom: 8,
  },
  pointsValue: {
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 5,
    width: '100%',
    marginBottom: 8,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#FFD54F',
    borderRadius: 5,
  },
  progressText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
  },
  benefitsSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#424242',
    marginBottom: 16,
  },
  benefitItem: {
    marginBottom: 16,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#424242',
    marginBottom: 4,
  },
  benefitDescription: {
    fontSize: 14,
    color: '#757575',
  },
  bonusesSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  bonusItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  bonusInfo: {
    flex: 1,
  },
  bonusDate: {
    fontSize: 12,
    color: '#BDBDBD',
    marginBottom: 4,
  },
  bonusDescription: {
    fontSize: 14,
    color: '#424242',
  },
  bonusPoints: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#388E3C',
  },
  inviteButton: {
    backgroundColor: '#FF8F00',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  inviteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoyaltyScreen;