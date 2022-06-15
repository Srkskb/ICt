import { Text, View,Image,TouchableOpacity,Dimensions,ScrollView,StyleSheet} from 'react-native'
import React, { Component } from 'react'
import axios from 'axios';
const { width, height } = Dimensions.get("window");
export default class index extends Component {
  state={
    bimage:'',
    category:[]
  }
  componentDidMount() {
    this.getBanner()
    this.getCategories()
  }
  getBanner(){
    try {
     axios.get('http://3.16.105.232:8181/api/banner/list?displayAt=service&status=true')
      .then(response => {
      // console.log(response.data.data.banners[0].bannerImage)
      this.setState({bimage:response.data.data.banners[0].bannerImage})

      })
    .catch(err => {
        //console.log('error',err)
      });
    }
    catch(error) {
      //console.log('error2',error)
    }
  }
  getCategories(){
    try {
     axios.get('http://3.16.105.232:8181/api/categories/dropdown/list?type=service')
      .then(response => {
      // console.log(response.data.data.list)
      this.setState({category:response.data.data.list})

      })
    .catch(err => {
        //console.log('error',err)
      });
    }
    catch(error) {
      //console.log('error2',error)
    }
  }
  render() {
    return (
      <View style={{width:"100%",height:"100%",alignItems:'center',backgroundColor:"#fff"}}>
        {this.state.bimage? <Image
                source={{uri:this.state.bimage}}
                style={{height:height*0.3,width:width}}
                />:<Image
                source={require("../../../assets/images/images/7864.jpeg")}
                style={{height:height*0.3,width:width}}
                resizeMode={'contain'}
                />}
          <ScrollView showsVerticalScrollIndicator={false} style={{ width: width, height:'90%' }}>
        <View style={{paddingTop:width*0.05,paddingHorizontal:width*0.03,justifyContent:'center',alignItems:'center'}}>
<Text style={{fontSize:width*0.06,fontWeight:"bold",color:"#000"}}>
  Popular Professional Services
</Text>
<Text style={{fontSize:width*0.034,fontWeight:"500",color:"#000",paddingTop:width*0.01}}>
 {' A Whole Word of freelance Talent at your finger tips'}
</Text>
        </View>
        <View style={{paddingTop:width*0.03}}>
        <ScrollView horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={styles.listViewHorizontal}
            >
            {this.state.category.map((item, index) => {
    ////console.log('item ',item,index)
    return (
      <TouchableOpacity key={item._id}
      onPress={()=>this.props.navigation.navigate("ServiceScreen")}>
        <View style={{paddingVertical:width*0.03,justifyContent:'center',alignItems:'center',paddingHorizontal:width*0.03}}>
        <View elevation={5} style={{height:200,borderRadius:10,width:300,justifyContent:'center',
        alignItems:'center',backgroundColor: '#fff'}}>
          <Image
          source={{uri:item.icon}}
          style={{height:height*0.09,width:width*0.1}}
          />
<Text style={{fontSize:width*0.05,fontWeight:'bold',}}>
 {item.label}
</Text>
</View>
        </View>
        </TouchableOpacity>
      )})}
        {/*<TouchableOpacity onPress={()=>this.props.navigation.navigate("ServiceScreen")}>
        <View style={{paddingVertical:width*0.03,justifyContent:'center',alignItems:'center',paddingHorizontal:width*0.03}}>
        <View elevation={5} style={{height:200,borderRadius:10,width:300,justifyContent:'center',
        alignItems:'center',backgroundColor: '#fff'}}>
          <Image
          source={require("../../../assets/images/images/555.png")}
          style={{height:height*0.09,width:width*0.1}}
          />
<Text style={{fontSize:width*0.05,fontWeight:'bold',}}>
  Software Installation
</Text>
</View>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("ServiceScreen")}>
        <View style={{paddingTop:width*0.03,justifyContent:'center',alignItems:'center',paddingHorizontal:width*0.03}}>
        <View elevation={5} style={{height:200,borderRadius:10,width:300,justifyContent:'center',alignItems:'center'}}>
          <Image
          source={require("../../../assets/images/images/556.png")}
          style={{height:height*0.09,width:width*0.1}}
          />
<Text style={{fontSize:width*0.05,fontWeight:'bold',}}>
  Hardware Repair
</Text>
</View>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("ServiceScreen")}>
        <View style={{paddingTop:width*0.03,justifyContent:'center',alignItems:'center',paddingHorizontal:width*0.03}}>
        <View elevation={5} style={{height:200,borderRadius:10,width:300,justifyContent:'center',alignItems:'center'}}>
          <Image
          source={require("../../../assets/images/images/557.png")}
          style={{height:height*0.09,width:width*0.1}}
          />
<Text style={{fontSize:width*0.05,fontWeight:'bold',}}>
  Computer Hardware
</Text>
</View>
        </View>
        </TouchableOpacity>*/}
        <View style={{paddingBottom:width*0.08}}>

        </View>
        </ScrollView>
        </View>
        </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  listViewHorizontal: {

  },
})