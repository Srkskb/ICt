import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

//To make the selector (Something like tabs)


const FaqScreen = () => {
  // Ddefault active selector
  const [activeSections, setActiveSections] = useState([]);
  // Collapsed condition for the single collapsible
  const [collapsed, setCollapsed] = useState(true);
  const [state,setState] = useState({ data: [], hiderows: {}  })
  const [faqData, setfaqData] = useState([])
  const [hiderows, sethiderows] = useState(null)

  // MultipleSelect is for the Multiple Expand allowed
  // True: Expand multiple at a time
  // False: One can be expand at a time


  useEffect(() => {
    console.log('this is get list')
    getlist()
  }, []);

  const getlist = () => {
    try {
     axios.get('http://3.16.105.232:8181/api/faq/list')
      .then(response => {
          console.log('response faqs',response.data.data.faqs)
          var data = response.data.data.faqs
          var hiderows = {}
          data.forEach((item, i) => {
            hiderows[item.id] = false
          });
          console.log('hiderows',hiderows)
          setState(prev => ({ ...prev, hiderows, data }))
          //setfaqData(response.data.data.faqs)

      })
    .catch(err => {
        console.log('error',err)
      });
    }
    catch(error) {
      console.log('error2',error)
    }
  }


  const togglerows = (id)=> {
    console.log('id',id)
    console.log('before state',state.hiderows)
    var hiderows ={...state.hiderows, [id]: !state.hiderows[id]}
    console.log('hiderows',hiderows)
    setState(prev => ({...prev, hiderows }));

  }

  const renderItem_faqData = ({item, index}) => {
    console.log('item ',item,index)
    return (
<>
      <TouchableOpacity onPress={()=> togglerows(item.id)} key={item.id} style={{borderWidth:1, borderRadius:20, marginTop:20, height:40, alignItems:'center', justifyContent:'center'}}>
        <Text style={styles.headerText}>{item.question}</Text>
      </TouchableOpacity>
      {state.hiderows[item.id] && (
        <View style={{borderLeftWidth:1, borderRightWidth:1, borderBottomWidth:1, borderBottomLeftRadius: 2, borderBottomRightRadius:2, padding:4}}>
          <Text style={{ textAlign: 'center' }}>
            {item.answer}
          </Text>
        </View>
      )}
</>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView>
        <View style={{marginHorizontal:10}}>

        <FlatList
          ItemSeparatorComponent={
            () => <View style={{ padding: 5 }}/>
          }
          contentContainerStyle={{  paddingHorizontal: 10 }}
          data={state.data}
          renderItem={renderItem_faqData}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />

          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default FaqScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 30,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
    color:'red'
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
    textAlign: 'center',
  },
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
});
