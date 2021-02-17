<template>
<div @click="disableDropdown" class="wraper" style="background-color:#f6f6f6;">
  <Header/>
  <Navbar v-bind:user="user" @storeClicked="dishClicked"/>
  <div class="content-banner">
			<div class="banner">
				<img alt="banner" style="margin: auto; height: 250px;width: 100%; display: block; border:0;">
			</div>
			<div class="search">
				<form action="#" id="searchform" method="#" style="padding:10px;">
					<div class="search-1 clearfix">
            <div id="vitri" class="vitri" @click="active=true">
               <p style="font-size: 20px; float:left;"> <i class="fa fa-map-marker"  style="margin-left: 20px;color: red; font-size: 20px;"></i> {{ location }}</p>
               <span
                class="fa fa-angle-right"
                style="float: right; font-size: 35px; margin-right: 15px;"
              ></span>
            </div>
            <input v-model="keyword" type="text" placeholder="Nhập món ăn, tên quán, khu vực,..."  v-on:keyup="onkeychange(keyword)">
						<a @click="onSearchClicked" class="icon-search"><i class="fa fa-search" style=" margin-top: 8px;font-size: 30px;"></i></a>
            <div class="dropdown" v-if="isDropdown" style="margin: 0 auto;">
            <div id="myDropdown" class="dropdown-content" style="width: 618px;
                height: 600px;
                overflow: auto; padding: 5px;">
              <div v-show="loading" name="fade" mode="out-in" style="width:100%; background-color: #fff; border-radius:10px;">
                <div class="lds-facebook"><div></div><div></div><div></div><div></div><div></div></div>
              </div>
              <div v-if="results && !loading">
                <div v-on:click="storeClicked(result.storeID)" href="" class="search_suggest" v-for="result in results" v-bind:key="result.storeID" style="
                text-align: left; display: flex; border-bottom: 1px solid darkgray;cursor: pointer;padding: 4px;">
                
                  <img :src="result.storePicture" class="left-thing" style="border-radius:5px;">
                  <div class="middle-thing" style="margin-left: 3px; height: 100%">
                    <p style="margin-top: 0px; height: 15%; font-weight: bold;">{{result.storeName}}</p>
                    <p style="margin-top: 0px;">{{subString(result.storeAddress)}}...</p>
                  </div>
                  <div v-if="getActiveTime(result.openTime,result.cLoseTime)" class="right-thing">
                    <p style="font-size: 12px;margin-top: 0px; height: 15%; color:green;">Đang hoạt động <span class="dot"></span></p>
                    <p style="color: #585858;" >{{result.khoangcach}} km</p>
                  </div>
                  <div v-else class="right-thing">
                    <p style=" margin-top: 0px; height: 20%; color:red;">Đóng cửa <span class="dot" style="background-color:#FF0000
  ;"></span></p>
                    <p >{{result.khoangcach}} km</p>
                </div>
              </div>
              </div>
            </div>
            </div>
					</div>
				</form>
			</div>
	</div>
   <transition v-if="active">
		<div class="modal-mask">
			<div class="modal-wrapper">
				<div class="modal-container">
						<i v-on:click="active=false" class="fa fa-window-close" style="float: right; font-size: 20px; margin-bottom: 10px;"></i>
					  <GoogleMap style="margin-top: 10px;" />
            
          <div class="modal-body">
            <p style="font-size: 15px; text-align:center;"> <i class="fa fa-location-arrow"  style="margin-left: 20px;color: red; font-size: 15px;"></i> {{ location }}</p>
            <slot class="form-group" name="body">
              <input id="new_location" type="text" class="form-control" placeholder="Nhập vị trí của bạn" style="float: right; height: 30px">
              <button style=" width:100%; height:30px; border-radius: 5px;margin-top: 10px; background-color: red; color: white; border: none; font-size: 15px"> Thay đổi</button>
            </slot>
          </div>
				</div>
			</div>
			</div>
		</transition>
      <transition name="fade" mode="out-in" >
          <router-view v-bind:keyword="keyword" :key="$route.path"></router-view>
      </transition>
   <Footer/>
  </div>
</template>

<script>
import Header from './containers/Header'
import Navbar from './containers/Navbar'
import Homebody from './Homebody'
import SearchPage from './SearchPage'
import Search from './containers/Search'
import Footer from './containers/Footer'
import GoogleMap from './containers/GoogleMap';

import ProvinceService from '@/services/ProvinceService.js'
import StoreService from '@/services/StoreService.js'
const baseUrl='https://localhost:44398/api/'
export default {
  name:'Home',
  components:{
      Header,
      Navbar,
      Search,
      Footer,
      GoogleMap
    },
  data() {
    return {
      location: 'Số 1, Võ Văn Ngân, TP.Thủ Đức, Việt Nam',
      active: false,
      nav: '',
      show: true,
      loading: false,
      user: '',
      stores:null,
      keyword: '',
      provinces:[],
      results: null,
      isDropdown: false
    }
  },
  created(){
    this.onInit();
  },
   mounted(){
      
  },
  methods:{
    async onInit(){
      this.keyword = this.$route.query.key;
      this.provinces= await ProvinceService.getAll();
      var id= localStorage.getItem('provinceId');
      this.stores = await StoreService.getByProvince(id);
      this.user=localStorage.getItem('userInfor');
      console.log(this.user);
      this.user = JSON.parse(this.user);
    },
    xoadau(str) {
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
      str = str.replace(/đ/g, "d");
      str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
      str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
      str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
      str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
      str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
      str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
      str = str.replace(/Đ/g, "D");
      return str.toLowerCase();
    },
    storeClicked(item) {
      this.$router.push('/storeDetail/'+ item)
    },
    dishClicked(item) {
      this.$router.push('/search?key='+ item)
    },
    onkeychange(key){
      this.isDropdown=true;
      this.loading = true;
      localStorage.setItem("keyword", key);
      if(key == '' || key == null)
        return this.results=null;
      else {
        setTimeout(() =>{
          this.results = this.stores.filter(this.searchfilter);
          this.loading = false;
         }, 1500);
      }
    },
    searchfilter(store){
      var name = this.xoadau(store.storeName.toString().toLowerCase());
      var searchkey = this.xoadau(this.keyword.toString().toLowerCase());
      if (name.includes(searchkey))
        return true;
      return false;
    },
    subString(index){
      return index.toString().substring(0,20);
    },
    onSearchClicked(){
      localStorage.setItem("keyword", this.keyword);
      this.$router.push('/search?key=' + this.keyword).catch(()=>{});
    },
   getActiveTime(open,close){
		  const today = new Date();
      const hour = today.getHours();
      const min = today.getMinutes();
      let openHour = parseInt((open+'').substring(0,2))
      let openMin = parseInt((open+'').substring(3,5)) 
      let closeHour = parseInt((close+'').substring(0,2))
      let closeMin = parseInt((close+'').substring(3,5))
      if( openHour < hour && hour < closeHour)
          return true;
      else if( hour == closeHour && min < closeMin)
          return true;
      else if(hour == openHour && min >= openMin)
          return true
      else return false;
    },
    disableDropdown(){     
      this.isDropdown = false
      return this.isDropdown
    }
  }
}
</script>

<style>
@import url('../../assets/css/style.css');
@import url('../../assets/css/bootstrap.min.css');
.dot {
  height: 7px;
  width: 7px;
  background-color:#339933;
  border-radius: 50%;
  display: inline-block;
}
.lds-facebook {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-facebook div {
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 10px;
  background: #ff0000;
  border-radius: 5px;
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.lds-facebook div:nth-child(1) {
  left: 8px;
  animation-delay: -0.24s;
}
.lds-facebook div:nth-child(2) {
  left: 32px;
  animation-delay: -0.12s;
}
.lds-facebook div:nth-child(3) {
  left: 56px;
  animation-delay: 0;
}
@keyframes lds-facebook {
  0% {
    top: 8px;
    height: 64px;
  }
  50%, 100% {
    top: 24px;
    height: 32px;
  }
}
.vitri{
  padding: 7px;
  margin: 0 auto;
  width: 650px;
  height: 50px;
  background-color: #fff;
  border-radius: 10px;
  margin-top: 120px;
  
}
</style>