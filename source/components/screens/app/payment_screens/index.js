import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions,
  Alert,
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {DefaultColours, SCREEN_WIDTH, SCREEN_HIGHT, FontSize} from '@constants';
import {Loader} from '@global_components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions} from '@react-navigation/native';
import Modal from 'react-native-modal';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import Svg, {Path, Circle, Line} from 'react-native-svg';
import {
  LoginLogoImg,
  AtdRateImg,
  LockImg,
  GoogleImg,
  FacebookImg,
  LinkedInImg,
  BackButtonImg,
  DrawerImage,
} from '@images';
import {
  HomeActiveImg,
  HomeInactiveImg,
  AccountActiveImg,
  AccountInactiveImg,
  CartActiveImg,
  CartInactiveImg,
  ChatActiveImg,
  ChatInavtiveImg,
} from '@images';
let {height, width} = Dimensions.get('window');
import {
  initStripe,
  CardField,
  useStripe,
  useConfirmPayment,
  StripeProvider,
} from '@stripe/stripe-react-native';
import StripeCheckout from 'react-native-stripe-checkout-webview';
const PaymentScreen = ({navigation, route}) => {
  const [state, setState] = useState({loader: true, cart: []});
  const [id, setID] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [locality, setLocality] = useState('');
  const [city, setCity] = useState('');
  const [cstate, setcState] = useState('');
  const [code, setCode] = useState('');
  const [view, setView] = useState('cart');
  const [cardView, setCardView] = useState(false);
  const [sloading, setLoading] = useState(false);
  const {confirmPayment, loading} = useConfirmPayment();
  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(
      `https://ictsripepay.netlify.app/.netlify/functions/stripe`,
      {
        method: 'POST',
        body: JSON.stringify({
          amount: 4800,
          currency: 'inr',
          payment_method_types: ['card'],
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const {paymentIntent, ephemeralKey, customer} = await response.json();
    return {
      paymentIntent,
    };
  };

  const initializePaymentSheet = async () => {
    const {paymentIntent} = await fetchPaymentIntentClientSecret();
    console.log(paymentIntent);
    await new Promise(resolve => setTimeout(resolve, 2500));
    const {error} = await initPaymentSheet({
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      // customerId: customer,
      customFlow: false,
      merchantDisplayName: 'Ict',
      style: 'alwaysDark',
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const {error} = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };

  const checkOut = () => {
    AsyncStorage.getItem('userExist').then(res => {
      try {
        var data = JSON.stringify({
          product: {
            user: JSON.parse(res),
            transactionId: 'TR1648301811161',
            orderId: 'OR1648301811161',
            paidAmount: total,
            totalItems: state.cart.length,
            totalPrice: total,
            totalDiscount: 0,
            deliveryCharges: 0,
            totalAmount: total,
            shippingAddr: null,
            appOrderId: 'APOR1648301811161',
            paymentStatus: true,
            from: 'bycart',
            items: acart,
            address: {
              address: {},
              name: name,
              mobile: mobile,
              postcode: code,
              houseNo: houseNo,
              locality: locality,
              city: city,
              state: state,
              // "postalAddress": "abcbbcccdnklsdnkl",
              userId: JSON.parse(res),
              long: 0,
              lat: 0,
            },
          },
          token: {
            id: 'tok_1LafzjIQlecXJ3PYF5gn9tZh',
            object: 'token',
            card: {
              id: 'card_1LafzjIQlecXJ3PYul7fwOZz',
              object: 'card',
              address_city: null,
              address_country: null,
              address_line1: null,
              address_line1_check: null,
              address_line2: null,
              address_state: null,
              address_zip: null,
              address_zip_check: null,
              brand: 'Visa',
              country: 'US',
              cvc_check: 'unchecked',
              dynamic_last4: null,
              exp_month: 12,
              exp_year: 2023,
              funding: 'credit',
              last4: '4242',
              name: 'nitish1@yopmail.com',
              tokenization_method: null,
            },
            client_ip: '106.211.27.82',
            created: 1661433675,
            email: 'nitish1@yopmail.com',
            livemode: false,
            type: 'card',
            used: false,
          },
        });
        var config = {
          method: 'post',
          url: 'http://Ictkart.com/api/buyproduct/add',
          headers: {
            'Content-Type': 'application/json',
          },
          data: data,
        };
        var options = {
          // image: 'https://i.imgur.com/Yh6YyiN.png',
          currency: 'INR',
          key: 'rzp_test_8Lwiuz3VZWGJHK',
          amount: total * 100,
          name: 'ICT Kart',
          prefill: {
            email: 'test@email.com',
            contact: '9191919191',
          },
          theme: {color: '#5A429B'},
        };
        // RazorpayCheckout.open(options).then((res) => {
        // axios(config)
        // .then((response)=>{
        //   // console.log(res)

        //   Toast.show(response.data.message)
        //   if(response.data.status==200){
        //     getlist()
        //     setView('cart')
        //   }
        // })
        // .catch((error)=>{
        //   // console.log(error);
        //   Toast.show(error.response.data.message)
        // });
        // });
      } catch (error) {
        //console.log('error2',error)
      }
    });
  };
  const handlePayPress = async () => {
    const billingDetails: BillingDetails = {
      email: 'test@example.com',
    };
    // Fetch the intent client secret from the backend.
    const {paymentIntent} = await fetchPaymentIntentClientSecret();
    const {payment, error} = await confirmPayment(paymentIntent, {
      paymentMethodType: 'Card',
      paymentMethodData: {
        billingDetails,
      },
    });
    // checkOut()
    Toast.show('Order placed successfully');
    // naviagtion.navigate('HomeScreen')
    if (error) {
      // console.log('Payment confirmation error', error);
    } else if (payment) {
      // console.log('Success from promise', payment);
    }
  };

  const getlist = () => {
    AsyncStorage.getItem('userExist').then(res => {
      try {
        var data = JSON.stringify({
          userId: JSON.parse(res),
        });

        var config = {
          method: 'post',
          url: 'http://Ictkart.com/api/user/cart',
          headers: {
            'Content-Type': 'application/json',
          },
          data: data,
        };

        axios(config)
          .then(response => {
            // console.log(response.data.data.list)
            if (JSON.stringify(response.data.status) == 200) {
              setState(prev => ({...prev, cart: response.data.data.list}));
            }
          })
          .catch(function (error) {
            //console.log(error);
          });
      } catch (error) {
        //console.log('error2',error)
      }
    });
  };

  useEffect(() => {
    if (navigation.isFocused()) {
      setTimeout(() => {
        setState(prev => ({...prev, loader: false}));
      }, 2000);
      getlist();
      initStripe({
        publishableKey:
          'pk_test_51Gze4PEdL6oaZOjizb9kCMyTAwKEzo0Lcl0ZTBKsHJNtGfrqIfNcoYRAh6XtguOXVGjAuOha5wqUIcP3YCahaHne00FSYLR15v',
      });
      initializePaymentSheet();
    }
  }, [navigation]);

  const total = state.cart
    .map(i => i.sellingPrice * i.quantity)
    .reduce((a, b) => a + b, 0);
  const ototal = state.cart
    .map(i => i.originalPrice * i.quantity)
    .reduce((a, b) => a + b, 0);
  const acart = state.cart.map((o, i) => {
    const product = o._id;
    const currency = o.currency;
    const type = 'product';
    const items = o.quantity;
    const originalPrice = o.originalPrice;
    const sellingPrice = o.sellingPrice;
    const vendor = null;
    return {
      product,
      currency,
      type,
      items,
      originalPrice,
      sellingPrice,
      vendor,
    };
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{width: '100%', height: '92%', alignItems: 'center'}}>
        <View
          style={{
            backgroundColor: '#ccc',
            paddingVertical: 6,
            width: '100%',
            height: '100%',
          }}>
          {/*<StripeProvider>*/}
          <CardField
            postalCodeEnabled={false}
            autofocus
            placeholders={{
              number: '4242 4242 4242 4242',
            }}
            cardStyle={{
              backgroundColor: '#FFFFFF',
              textColor: '#000000',
            }}
            style={{
              width: '100%',
              height: 50,
              marginVertical: 30,
            }}
            onCardChange={cardDetails => console.log(cardDetails)}
          />
          {/*</StripeProvider>*/}
          <TouchableOpacity
            onPress={() => openPaymentSheet()}
            style={{
              backgroundColor: '#5A429B',
              height: 44,
              borderRadius: 4,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '1%',
              width: '100%',
            }}>
            <Text
              style={{
                color: '#fdfdfd',
                fontSize: FontSize(width * 0.036),
                fontWeight: '400',
              }}>
              Make Payment ( AED {total} )
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          height: '8%',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('HomeScreen')}
          style={{
            width: '25%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {route.name == 'HomeScreen' ? (
            <Image
              source={HomeActiveImg}
              style={styles.icon}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={HomeInactiveImg}
              style={styles.icon}
              resizeMode="contain"
            />
          )}
          <Text style={{color: 'grey', fontSize: FontSize(10), paddingTop: 2}}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('SettingScreen')}
          style={{
            width: '25%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {route.name == 'SettingScreen' ? (
            <Image
              source={AccountActiveImg}
              style={styles.icon}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={AccountInactiveImg}
              style={styles.icon}
              resizeMode="contain"
            />
          )}
          <Text style={{color: 'grey', fontSize: FontSize(10), paddingTop: 2}}>
            Account
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('CartScreen')}
          style={{
            width: '25%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {route.name == 'CartScreen' ? (
            <Image
              source={CartActiveImg}
              style={styles.icon}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={CartInactiveImg}
              style={styles.icon}
              resizeMode="contain"
            />
          )}
          {state.cart && state.cart.length == 0 ? null : (
            <View
              style={{
                position: 'absolute',
                borderRadius: 20,
                backgroundColor: DefaultColours.blue0,
                paddingHorizontal: 5,
                top: 2,
                right: '30%',
                paddingVertical: 2,
              }}>
              <Text style={{color: '#fff', fontSize: FontSize(7)}}>
                {state.cart && state.cart.length}
              </Text>
            </View>
          )}
          <Text style={{color: 'grey', fontSize: FontSize(10), paddingTop: 2}}>
            Cart
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ChatScreen')}
          style={{
            width: '25%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {route.name == 'ChatScreen' ? (
            <Image
              source={ChatActiveImg}
              style={styles.icon}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={ChatInavtiveImg}
              style={styles.icon}
              resizeMode="contain"
            />
          )}
          <Text style={{color: 'grey', fontSize: FontSize(10), paddingTop: 2}}>
            Chat
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PaymentScreen;
const styles = StyleSheet.create({
  icon: {
    width: 23,
    height: 22,
  },
});
