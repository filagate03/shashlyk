import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const OrderTrackingScreen = () => {
  const [currentStatus, setCurrentStatus] = useState(2); // 0: принято, 1: готовится, 2: готово, 3: в пути, 4: доставлено
  const [estimatedTime, setEstimatedTime] = useState(25);

  // Simulate order progress
  useEffect(() => {
    const timer = setInterval(() => {
      setEstimatedTime(prev => Math.max(0, prev - 1));
    }, 60000); // Decrease estimated time every minute

    // Simulate order status progression
    const statusTimer = setTimeout(() => {
      if (currentStatus < 4) {
        setCurrentStatus(prev => prev + 1);
      }
    }, 30000); // Change status every 30 seconds (for demo)

    return () => {
      clearInterval(timer);
      clearTimeout(statusTimer);
    };
  }, [currentStatus]);

  const orderSteps = [
    { id: 0, title: 'Заказ принят', description: 'Ваш заказ подтвержден' },
    { id: 1, title: 'Готовится', description: 'Повар готовит ваш заказ' },
    { id: 2, title: 'Готово', description: 'Заказ готов к отправке' },
    { id: 3, title: 'В пути', description: 'Курьер направляется к вам' },
    { id: 4, title: 'Доставлено', description: 'Приятного аппетита!' },
  ];

  const getStatusStyle = (stepId) => {
    if (stepId < currentStatus) {
      return {
        container: styles.completedStep,
        circle: styles.completedCircle,
        line: styles.completedLine,
        title: styles.completedTitle,
        description: styles.completedDescription,
      };
    } else if (stepId === currentStatus) {
      return {
        container: styles.activeStep,
        circle: styles.activeCircle,
        line: styles.activeLine,
        title: styles.activeTitle,
        description: styles.activeDescription,
      };
    } else {
      return {
        container: styles.inactiveStep,
        circle: styles.inactiveCircle,
        line: styles.inactiveLine,
        title: styles.inactiveTitle,
        description: styles.inactiveDescription,
      };
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Отслеживание заказа</Text>
      
      <View style={styles.orderInfo}>
        <Text style={styles.orderNumber}>Заказ №SH-2023-00123</Text>
        <Text style={styles.estimatedTime}>
          {estimatedTime > 0 
            ? `Доставка примерно через ${estimatedTime} мин` 
            : 'Заказ скоро будет у вас'}
        </Text>
      </View>

      <View style={styles.timeline}>
        {orderSteps.map((step, index) => {
          const statusStyle = getStatusStyle(step.id);
          
          return (
            <View key={step.id} style={statusStyle.container}>
              <View style={styles.stepIndicator}>
                <View style={[styles.circle, statusStyle.circle]}>
                  {step.id < currentStatus ? (
                    <Text style={styles.checkmark}>✓</Text>
                  ) : (
                    <Text style={styles.stepNumber}>{step.id + 1}</Text>
                  )}
                </View>
                {index < orderSteps.length - 1 && (
                  <View style={[styles.line, statusStyle.line]}></View>
                )}
              </View>
              <View style={styles.stepInfo}>
                <Text style={[styles.stepTitle, statusStyle.title]}>{step.title}</Text>
                <Text style={[styles.stepDescription, statusStyle.description]}>
                  {step.description}
                </Text>
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.courierInfo}>
        <Text style={styles.sectionTitle}>Ваш курьер</Text>
        <View style={styles.courierDetails}>
          <View style={styles.courierAvatar}>
            <Text style={styles.avatarText}>АА</Text>
          </View>
          <View style={styles.courierText}>
            <Text style={styles.courierName}>Алексей А.</Text>
            <Text style={styles.courierPhone}>+7 (999) 123-45-67</Text>
          </View>
          <TouchableOpacity style={styles.callButton}>
            <Text style={styles.callButtonText}>Позвонить</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.orderDetails}>
        <Text style={styles.sectionTitle}>Детали заказа</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Адрес доставки:</Text>
          <Text style={styles.detailValue}>ул. Ленина, 25, кв. 10</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Способ оплаты:</Text>
          <Text style={styles.detailValue}>Картой курьеру</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Комментарий:</Text>
          <Text style={styles.detailValue}>Без лука, пожалуйста</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>Отменить заказ</Text>
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
  orderInfo: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#424242',
    marginBottom: 8,
  },
  estimatedTime: {
    fontSize: 16,
    color: '#FF8F00',
    fontWeight: '600',
  },
  timeline: {
    marginBottom: 20,
  },
  completedStep: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  activeStep: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  inactiveStep: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stepIndicator: {
    alignItems: 'center',
    marginRight: 16,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  completedCircle: {
    backgroundColor: '#388E3C',
  },
  activeCircle: {
    backgroundColor: '#D32F2F',
  },
  inactiveCircle: {
    backgroundColor: '#F5F5F5',
  },
  checkmark: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  stepNumber: {
    color: '#757575',
    fontSize: 18,
    fontWeight: 'bold',
  },
  line: {
    width: 2,
    flex: 1,
  },
  completedLine: {
    backgroundColor: '#388E3C',
  },
  activeLine: {
    backgroundColor: '#D32F2F',
  },
  inactiveLine: {
    backgroundColor: '#F5F5F5',
  },
  stepInfo: {
    flex: 1,
  },
  completedTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#388E3C',
    marginBottom: 4,
  },
  activeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginBottom: 4,
  },
  inactiveTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#757575',
    marginBottom: 4,
  },
  completedDescription: {
    fontSize: 14,
    color: '#388E3C',
  },
  activeDescription: {
    fontSize: 14,
    color: '#D32F2F',
  },
  inactiveDescription: {
    fontSize: 14,
    color: '#BDBDBD',
  },
  courierInfo: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#424242',
    marginBottom: 12,
  },
  courierDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  courierAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#D32F2F',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  courierText: {
    flex: 1,
  },
  courierName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#424242',
    marginBottom: 4,
  },
  courierPhone: {
    fontSize: 14,
    color: '#757575',
  },
  callButton: {
    backgroundColor: '#FF8F00',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  callButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  orderDetails: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#757575',
    width: 140,
  },
  detailValue: {
    fontSize: 14,
    color: '#424242',
    flex: 1,
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  cancelButtonText: {
    color: '#D32F2F',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrderTrackingScreen;