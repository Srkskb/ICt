import { StyleSheet, Text, View,SafeAreaView,Dimensions,Image,TouchableOpacity,ScrollView} from 'react-native'
import React from 'react'
const { width, height } = Dimensions.get("window");
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
const DetailScreen = () => {
  return (
    <SafeAreaView style={{flex:1,width:width,height:height,backgroundColor:"#FFF"}}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ width: width, height: '95%' }}>
<View style={{justifyContent:"center",alignItems:'center',borderBottomWidth:1,borderBottomColor:"#DCDCDC"}}>
    <Image
    source={require('../../../assets/images/images/12345.jpg')}
    resizeMode="contain"
    style={{height:height*0.3,width:width*1,backgroundColor:"#DCDCDC"}}
    />
</View>
<View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
<View style={{paddingTop:width*0.03,paddingHorizontal:width*0.03,width:"70%"}}>
<Text style={{fontSize:width*0.04,fontWeight:'bold'}}>
   {'HP-17.3"Laptop-AMD Ryzen 5-8GB\nMemory-SSD-Natural Silver'}
</Text>
</View>
<View style={{width:"30%",justifyContent:'center',alignItems:'center'}}>
    <TouchableOpacity>
    <View style={{borderWidth:1,borderRadius:50,paddingHorizontal:width*0.05,padding:width*0.02,backgroundColor:"#1776BB",borderColor:'#1776BB'}}>
<Text style={{fontWeight:'bold',color:"#fff",fontSize:width*0.03}}>
    AED 629.99
</Text>
    </View>
</TouchableOpacity>
</View>

</View>
<View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
    <View style={{alignItems:'flex-start',justifyContent:'flex-start',paddingTop:width*0.09,paddingHorizontal:width*0.03}}>
    <Image
    source={require('../../../assets/images/images/fire.png')}
    resizeMode="contain"
    style={{backgroundColor:"#fff",height:height*0.04,width:width*0.09}}
    />

    </View>
    <View style={{alignItems:'center',justifyContent:'center',paddingTop:width*0.09}}>
        <Text style={{fontSize:width*0.04,fontWeight:'bold',color:'#ED4E94'}}>
            Hot Offer
        </Text>
    </View>
</View>
<View style={{paddingTop:width*0.02,paddingHorizontal:width*0.03}}>
    <Text style={{color:"#ABA0D9",fontSize:width*0.035}}>
15-Month Microsoft 365 offer with device
    </Text>
</View>
<View style={{paddingTop:width*0.02}}>
<View style={{borderTopWidth:1,borderBottomWidth:1,backgroundColor:'#DCDCDC',borderBottomColor:'#DCDCDC',borderTopColor:'#DCDCDC',paddingHorizontal:width*0.03,paddingTop:width*0.03,paddingBottom:width*0.03}}>
<Text style={{fontSize:width*0.05,fontWeight:'bold'}}>
    Get it in 13 days
</Text>
<View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
    <View style={{width:"20%",paddingHorizontal:width*0.03,paddingTop:width*0.03}}>
<MaterialCommunityIcons
name='file-document-outline' size={width*0.1} color={"#1776BB"}
/>
    </View>
    <View style={{width:"80%",justifyContent:'flex-start',alignItems:'flex-start'}}>
        <View style={{flexDirection:'row'}}>
        <Text style={{fontSize:width*0.04,fontWeight:'bold'}}>
            Pickup:
        </Text >
        <View style={{}}>
        <Text style={{fontSize:width*0.04}}>
            order now for pickup on Mon,Nov at Area
        </Text>
        </View>
  
</View>
<TouchableOpacity onPress={()=>alert("Check your locations")}>
<View style={{paddingTop:width*0.01}}>
<Text style={{color:"#1776BB",fontSize:width*0.04}}>
    See all pickup locations
</Text>
        </View>
        </TouchableOpacity>
    </View>
</View>
<View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
    <View style={{width:"20%",paddingHorizontal:width*0.03,paddingTop:width*0.03}}>
<FontAwesome5
name='shipping-fast' size={width*0.1} color={"#1776BB"}
/>
    </View>
    <View style={{width:"80%",justifyContent:'flex-start',alignItems:'flex-start'}}>
        <View style={{flexDirection:'row'}}>
        <Text style={{fontSize:width*0.04,fontWeight:'bold'}}>
            shipping :
        </Text >
        <View style={{paddingHorizontal:width*0.01}}>
        <Text style={{fontSize:width*0.04}}>
            Unavailable in your Area
        </Text>
        </View>
  
</View>
<TouchableOpacity onPress={()=>alert("Check your locations")}>
<View style={{paddingTop:width*0.01}}>
<Text style={{fontSize:width*0.04}}>
    this item is only available in market
</Text>
        </View>
        </TouchableOpacity>
    </View>
</View>
</View>

</View>
<View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", paddingTop: width * 0.09, paddingHorizontal: width * 0.03 }}>
          <View style={{width:"80%",backgroundColor:"#FFFFFF"}}>
          <Text style={{ fontSize: width * 0.05, fontWeight: 'bold', color: "#ED4E94", fontFamily: "Poppins-Thin" }}>
            Description
          </Text>
</View>
<View style={{width:"20%",backgroundColor:"#ffffff"}}>
            <View style={{alignItems:'center',justifyContent:"center"}}>
              <TouchableOpacity>
              <MaterialCommunityIcons
name='chevron-down' size={width*0.09}
/>
</TouchableOpacity>
</View>
</View>
</View>
<View style={{borderBottomWidth:1,borderBottomColor:"#DCDCDC",marginHorizontal:width*0.03,paddingTop:width*0.01}}>

</View>
<View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", paddingTop: width * 0.05, paddingHorizontal: width * 0.03 }}>
          <View style={{width:"80%",backgroundColor:"#FFFFFF"}}>
          <Text style={{ fontSize: width * 0.05, fontWeight: 'bold',  fontFamily: "Poppins-Thin" }}>
          About The Seller
          </Text>
</View>
<View style={{width:"20%",backgroundColor:"#ffffff"}}>
            <View style={{alignItems:'center',justifyContent:"center"}}>
              <TouchableOpacity>
              <MaterialCommunityIcons
name='chevron-down' size={width*0.09}
/>
</TouchableOpacity>
</View>
</View>
</View>
<View style={{borderBottomWidth:1,borderBottomColor:"#DCDCDC",marginHorizontal:width*0.03,paddingTop:width*0.01}}>

</View>
<View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", paddingTop: width * 0.05, paddingHorizontal: width * 0.03 }}>
          <View style={{width:"80%",backgroundColor:"#FFFFFF"}}>
          <Text style={{ fontSize: width * 0.05, fontWeight: 'bold', fontFamily: "Poppins-Thin" }}>
           Compare
          </Text>
</View>
<View style={{width:"20%",backgroundColor:"#ffffff"}}>
            <View style={{alignItems:'center',justifyContent:"center"}}>
              <TouchableOpacity>
              <MaterialCommunityIcons
name='chevron-down' size={width*0.09}
/>
</TouchableOpacity>
</View>
</View>
</View>
<View style={{borderBottomWidth:1,borderBottomColor:"#DCDCDC",marginHorizontal:width*0.03,paddingTop:width*0.01}}>

</View>
<View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", paddingTop: width * 0.05, paddingHorizontal: width * 0.03 }}>
          <View style={{width:"80%",backgroundColor:"#FFFFFF"}}>
          <Text style={{ fontSize: width * 0.05, fontWeight: 'bold', fontFamily: "Poppins-Thin" }}>
            FAQ
          </Text>
</View>
<View style={{width:"20%",backgroundColor:"#ffffff"}}>
            <View style={{alignItems:'center',justifyContent:"center"}}>
              <TouchableOpacity>
              <MaterialCommunityIcons
name='chevron-down' size={width*0.09}
/>
</TouchableOpacity>
</View>
</View>
</View>
<View style={{borderBottomWidth:1,borderBottomColor:"#DCDCDC",marginHorizontal:width*0.01}}>

</View>
<View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", paddingTop: width * 0.05, paddingHorizontal: width * 0.03 }}>
          <View style={{width:"80%",backgroundColor:"#FFFFFF"}}>
          <Text style={{ fontSize: width * 0.05, fontWeight: 'bold', fontFamily: "Poppins-Thin" }}>
            Reviews
          </Text>
</View>
<View style={{width:"20%",backgroundColor:"#ffffff"}}>
            <View style={{alignItems:'center',justifyContent:"center"}}>
              <TouchableOpacity>
              <MaterialCommunityIcons
name='chevron-down' size={width*0.09}
/>
</TouchableOpacity>
</View>
</View>
</View>
<View style={{borderBottomWidth:1,borderBottomColor:"#DCDCDC",marginHorizontal:width*0.03,paddingTop:width*0.01}}>

</View>
<View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-evenly',paddingTop:width*0.05}}>
       <View style={{width:"45%",borderRadius:5,borderWidth:1,flexDirection:'row',alignItems:'center',backgroundColor:'#ED4E94',paddingHorizontal:width*0.05,justifyContent:'space-evenly',padding:width*0.04,borderColor:"#ED4E94"}}>
         <TouchableOpacity style={{flexDirection:'row'}}onPress={()=>alert('Track your food location')}>
<Text style={{fontSize:width*0.05,fontWeight:"bold",color:'#fff'}}>
ADD TO CART
</Text>
</TouchableOpacity>
       </View>
       <View style={{width:"45%",borderRadius:5,borderWidth:1,flexDirection:'row',alignItems:'center',backgroundColor:'#5A429B',paddingHorizontal:width*0.05,justifyContent:'space-evenly',padding:width*0.04,borderColor:'#5A429B'}}>
         <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>alert('Select Your Food')}>
         
<Text style={{fontSize:width*0.05,fontWeight:"bold",color:"#FFFFFF"}}>
PURCHASE
</Text>
</TouchableOpacity>
       </View>

     </View>

</ScrollView>
    </SafeAreaView>
  )
}

export default DetailScreen

const styles = StyleSheet.create({})