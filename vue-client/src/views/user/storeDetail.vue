<template>
<div style="background-color: #f6f6f6f6"> 
  <Header/>
  <Navbar v-bind:user="user" @storeClicked="dishClicked"/>
  <div class="pn-microsite">
    <div id="storeInfor" class="micro-content">
      <div class="micro-header clearfix">
        <div class="main-image fl_left">
          <div class="img" style="height: 275px">
            <a href="#">
              <img
                :src="storeOpen[0].storePicture"
                alt="foody-mobile.jpg"
                style="width: 488px; height: 275px;border-radius: 15px 0px 0px 15px;"
              />
            </a>
          </div>
        </div>
        <div class="main-information fl_left">
          <div class="res-common">
            <div class="breadcrum"></div>
            <div class="main-info-title">
              <span class="main-info-title-contracted" style="float:right">
                <span class="fa fa-check-circle" style="font-size: 30px"></span>
              </span>
              <h1 style="width: 600px; margin-top:20px;font-size: 25px" class="fl_left">{{storeOpen[0].storeName}}
              </h1>
              <div class="clearfix"></div>
              <div class="category">
                <div class="category-items fl_left" style="max-width: 200px;">
                  <a title="category-items;" style="font-size:large;"><span class="fa fa-cutlery"></span>  {{ businessTypeName }}</a>
                </div>
                <div class="category-cuisines fl_left">
                </div>
              </div>
            </div>
            <div class="res-summary-point"></div>
            <div class="disableSection">
              <div class="res-common-add">
                <span>
                  <a href="#map">
                    <span style="font-size:large;">  <span class="fa fa-location-arrow locationicon fa-3x"></span> {{storeOpen[0]['storeAddress']}}</span>
                  </a>
                </span>
              </div>
              <div
              ></div>
              <div class="res-common-price">
                <div class="micro-timesopen">
                  <span class="fa fa-clock-o houricon"></span>
                  <span style="font-size:large;"> {{storeOpen[0].openTime}} || {{storeOpen[0].cLoseTime}}   </span>
                  <span v-if="getActiveTime(storeOpen[0].openTime,storeOpen[0].cLoseTime)" class="itsopen" title="Chưa mở cửa" style="font-size:large;float:right">Đang mở cửa</span>
                  <span v-else class="itsclose" title="Chưa mở cửa" style="font-size:large; float:right">Đóng cửa</span>
                </div>
                <div class="res-common-minmaxprice">
                  <span class="fa fa-tag minmaxpriceicon"> Khuyến mãi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div :class="'micro-main-menu fl_left ' + scroll">
      <div class="tool-bar">
        <ul class="list-tool">
          <li>
            <a href="#storeInfor" v-bind:class="activeClass1" @click="changeActive('Thông tin quán')"
              >
              <i class="fa fa-info-circle" aria-hidden="true"></i>
              Thông tin quán
              <span
                class="fa fa-angle-right"
                style="float: right; font-size: 14px"
              ></span>
            </a>
          </li>
          <li>
            <a href="#menu" v-bind:class="activeClass2" @click="changeActive('Thực đơn')"
              >
              <i class="fa fa-list" aria-hidden="true"></i>
              Thực đơn
              <span
                class="fa fa-angle-right"
                style="float: right; font-size: 14px ;"
              ></span>
            </a>
          </li>
          <li>
            <a href="#comment" v-bind:class="activeClass3" @click="changeActive('Comments')"
              >
              <i class="fa fa-comment-o" aria-hidden="true"></i>
              Comments
              <span
                class="fa fa-angle-right"
                style="float: right; font-size: 14px"
              ></span>
            </a>
          </li>
          <li>
            <a href="#map" v-bind:class="activeClass4" @click="changeActive('Xem trên Map')"
              > <i class="fa fa-location-arrow"></i>
              Xem trên Map
              <span
                class="fa fa-angle-right"
                style="float: right; font-size: 14px"
              ></span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  
    <div class="micro-right fl_right">
      <div class="micro-main-content"
        style="clear: both; position: static; min-height: 500px">
        <div id="menu" class="microsite-table-book">
          <div class="tb-title">
            <h2 style="font-size: 16px; padding: 5px 0; cursor: pointer">
              <a
                href=""
                title="Menu"
                target="_blank"
                style="color: #f37934"
                >MENU</a
              >
            </h2>
          </div>
          <div class="tb-offers-box">
            <div class="tb-content">
              <div v-for="dish in storeMenu" v-bind:key="dish.dish_ID" class="tb-offer-item">
                <div @click="showDishChoosed(dish)" class="tb-item-left" style="margin-left: 20px;">
                  <img :src="dish.dishPicture" style="width: 100px; height: 90px; border-radius:10px; cursor:pointer;" />
                </div>
                <div class="tb-item-mid" style="">
                  <a @click="showDishChoosed(dish)" style="color: #277bb9" class="tb-oi-time">
                    <span class="">{{dish.dishName}}</span>
                    <span class=""></span>
                  </a>
                  <a class="tb-shorttitle">
                    <span>
                      {{dish.dishPrice}}</span
                    >
                  </a>
                  <a class="tb-shorttitle">
                    <span>
                      Something about dish...</span
                    >
                  </a>
                </div>
                <div style="width: 30px; height:30px; background-color: red; float:right; border-radius: 5px;"><p style="text-align: center; margin-top: 7px;"><span class="fa fa-plus fl-right" style="color:white;"></span></p></div>
              </div>
            </div>
          </div>
        </div>

        <transition v-if="active">
              <div class="modal-mask">
              <div class="modal-wrapper">
                <div class="modal-container">
                <div class="modal-header">
                  <slot name="header">
                  <h3>{{dishChoosed.dishName}}</h3>
                  <a class="tb-shorttitle" style="float:right; font-size: 20px;">
                      <span>
                        {{dishChoosed.dishPrice}}</span
                      >
                    </a>
                  </slot>
                </div>

                <div class="modal-body">
                <slot name="body">
                  <div class="row">
                  <div class="tb-item-left col-sm-6">
                  <img :src="dishChoosed.dishPicture" style="width: 300px; height: 200px; border-radius:3px" />
                  </div>
                  <div class="tb-item-mid col-sm-4">
                    <a class="tb-shorttitle">
                      <span>
                        Something about dish...</span
                      >
                    </a>
                  </div>
                  </div>
                  </slot>
                </div>

                <div class="modal-footer">
                  <slot name="footer">
                  <button class="btn btn-danger" @click="active=false">
                    Close
                  </button>
                  </slot>
                </div>
                </div>
              </div>
              </div>
            </transition>
            <Comments v-bind:storeID="storeID" />
          <div id="map" class="microsite-gallery" style="margin-top: 15px">
            <GoogleMap />
        </div>
      </div>
    </div>
  </div>
   <Footer/>
</div>
</template>

<script>
import { freeSet } from '@coreui/icons';
import Header from './containers/Header';
import Navbar from './containers/Navbar';
import GoogleMap from './containers/GoogleMap';
import Comments from './containers/Comments/comments';
import Footer from './containers/Footer'
const baseUrl='https://localhost:44398/api';
export default {
  name: 'storeDetail',
   icons: { freeSet },
   beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.usersOpened = from.fullPath.includes('Homepage')
    })
  },
  data(){
    return{
      user: '',
      //binding class
      activeClass1: 'active',
      activeClass2: '',
      activeClass3: '',
      activeClass4: '',
      scroll: '',
      nav: '',
      //dishChoosed
      active: false,
      dishChoosed:'',
      storeID:'',
      storeOpen: [
        {
        storeID: String,
        storeAddress: String,
        storeName: String,
        storePicture: String,
        openTime: String,
        cLoseTime: String ,
        userID: String,
        provinceID:String ,
        menuID: String,
        businessTypeID:String,
        ratePoint: String
        }
      ],
      storeMenu:[],
      menuId: '',
      dishType: [],
      isMapOpen: false,
      provinces: [],
      businessTypeName:'',
      ratePoint:[],
      totalRate:5,
      commentList:[]
    }
  },
  components:{
    Header,
    Navbar,
    GoogleMap,
    Comments,
    Footer
  },
methods:{
    show(index){
      //console.log(index)
    },
    getType(index){
      this.$http.get(baseUrl +'/BusinessType/GetByID?id='+ index).then(response =>{
        this.businessTypeName = response.data[0].businessTypeName })
    },
    showDishChoosed(index)
    {
      this.active = true;
      this.dishChoosed = index;
    },
    changeActive(tab){
      switch(tab){
              case 'Thông tin quán' : 
                this.activeClass1 = 'active';
                this.activeClass2 = '';
                this.activeClass3 = '';
                this.activeClass4 = '';
                break;
              case 'Thực đơn' : 
                this.activeClass1 = '';
                this.activeClass2 = 'active';
                this.activeClass3 = '';
                this.activeClass4 = '';
                break;
              case 'Comments' : 
                this.activeClass1 = '';
                this.activeClass2 = '';
                this.activeClass3 = 'active';
                this.activeClass4 = '';
                break;
              case 'Xem trên Map' : 
                this.activeClass1 = '';
                this.activeClass2 = '';
                this.activeClass3 = '';
                this.activeClass4 = 'active';
                break;
            }
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
     dishClicked (item) {
       this.$router.push({path: `DishType`, query:{key: item}})
    },
    onScroll(){
      window.onscroll = () => {
        if (document.documentElement.scrollTop > 400) {
         this.scroll= 'sticky'
        } else {
          this.scroll= ''
        }
      };
    }
    
},
  created(){
    this.storeID=this.$route.params.id;
  },
  mounted(){
    this.user=localStorage.getItem('userInfor');
    this.user = JSON.parse(this.user);
    const id = this.$route.params.id;
    this.$http.get('https://localhost:44398/api/Store/GetByID?id='+ id).then(response => {
          this.storeOpen = response.data
          this.storeID=this.storeOpen[0].storeID
          this.$http.get('https://localhost:44398/api/Dish/GetByIDMenu?id=' +this.storeOpen[0].menuID).then(response => {
              this.storeMenu = response.data;
          });
          this.getType(this.storeOpen[0].businessTypeID);
    });
    this.$http.get('https://localhost:44398/api/DishType/GetAll').then(response => {
       this.dishType = response.data;
     });
    this.onScroll();
  }
}
</script>

<style>
@import url('../../assets/css/comments.css');
@import url('../../assets/css/style-1.css');
@import url('../../assets/css/reset.css');
html {
  scroll-behavior: smooth;
}
.sticky {
  position: fixed;
  top: 0px;
}

</style>
