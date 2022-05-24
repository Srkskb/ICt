import { Text, View,Image,TouchableOpacity,Dimensions,ScrollView,StyleSheet} from 'react-native'
import React, { Component } from 'react'
const { width, height } = Dimensions.get("window");
export default class index extends Component {
  render() {
    return (
      <View style={{width:"100%",height:"100%",alignItems:'center',backgroundColor:"#fff"}}>
        <Image
        source={require("../../../assets/images/images/7864.jpeg")}
        style={{height:height*0.17,width:width*1}}
        />
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
        <ScrollView ref={(snapScroll) => { this.snapScroll = snapScroll; }}
              horizontal={true}
              decelerationRate={0}
              onResponderRelease={() => {


                var snapTo = (this.scrollingRight) ? Math.ceil(this.lastx / interval) :
                  Math.floor(this.lastx / interval);
                var scrollTo = snapTo * interval;
                this.snapScroll.scrollTo(0, scrollTo);
              }}
              scrollEventThrottle={32}
              onScroll={(event) => {
                var nextx = event.nativeEvent.contentOffset.x;
                this.scrollingRight = (nextx > this.lastx);
                this.lastx = nextx;
              }}
              showsHorizontalScrollIndicator={false}
              style={styles.listViewHorizontal}
            >
        <TouchableOpacity onPress={()=>alert("Sub")}>
        <View style={{paddingTop:width*0.03,justifyContent:'center',alignItems:'center',paddingHorizontal:width*0.03}}>
        <View elevation={5} style={{height:200,borderRadius:10,width:300,justifyContent:'center',alignItems:'center'}}>
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
        <TouchableOpacity onPress={()=>alert("Sub")}>
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
        <TouchableOpacity onPress={()=>alert("Sub")}>
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
        </TouchableOpacity>
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