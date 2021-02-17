<template>
<div class="main" :style="'margin-bottom:' + margin +'px;'">
   <vueper-slides 
      style="width: 90%;margin: 0 auto; margin-top:20px;background-color:#f6f6f6;"
      fixed-height="230px"
      class="no-shadow"
      :visible-slides="3"
      slide-multiple
      :gap="3"
      :bullets="false"
      :slide-ratio="1 / 4"
      :dragging-distance="200"
      :breakpoints="{ 800: { visibleSlides: 2, slideMultiple: 2 } }">
      <vueper-slide  @click.native="active=true" style="border-radius:10px;" v-for="(slide, i) in banner" :key="i" :image="slide.src" />
    </vueper-slides>
    <transition v-if="active">
		<div class="modal-mask">
			<div class="modal-wrapper">
				<div class="modal-container">

				<div class="modal-header">
					<slot name="header">
					<h3>DANH SÁCH QUÁN</h3>
					</slot>
				</div>

				<div class="modal-body">
					<slot name="body">
					  Danh sách quán
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
     <transition v-if="loading">
       	<div class="modal-mask">
          <div class="loading" >
            <span class="fa fa-spinner fa-spin"></span>
          </div>
         </div>
    </transition>

   <div class="ship" style="width:90%">
	  <div style="width:100%">
        <div class="hero" style="width:30%;">
          <h2 style="font-size:20px">MÓN NGON MỖI NGÀY</h2>
        </div>
    </div>
      <div id="Giaotannoi" class="sub-menu-ship" >
        <ul>
          <li v-for="(dish, index) in dishes" v-bind:key="index" style="height:110px;width:102px;"  @click="dishClicked(dish.dishName)">
             <a>
              <img :src="dish.dishPicture" style="border-radius:10px 10px 10px 10px; width:102px; height:90px;cursor: pointer;"/>
              <div @click="dishClicked(dish.dishName)" class="name-food" style="text-align: center; 	background-color:#f6f6f6;"> 
                <p style="font-family: Helvetica; font-size:13px; font-weight:bold;">{{dish.dishName}}</p></div>
          </a>
          </li>
        </ul>
      </div>
  </div>
    <div class="ship">
      <div class="menu-ship" style="width:100%">
        <div class="hero"  style="width:30%; text-align:left">
          <h3>ĐƯỢC ĐÁNH GIÁ CAO</h3>
        </div>
      </div>
      <div id="Giaotannoi" class="sub-menu-ship" >
        <ul>
          <li v-for="(store, index ) in rates" v-bind:key="index">
            <a v-on:click="storeClicked(store.storeID)">
              <img :src="store.storePicture"  style="border-radius:10px 10px 0px 0px; width:205px; height:150px"/>
              <div class="name-food">{{ subString(store.storeName)}}...</div>
              <div class="address-store"><i class="fa fa-map-marker" style="color: red"></i>{{ subString(store.storeAddress) }}...
              <div style="color: #585858; float:right;">{{store.khoangcach}} km</div>
              </div>
                <div class="address-store"> <span class="fa fa-cutlery"></span> {{ getType(store.businessTypeID) }}
                <div style="color: #585858; float:right;">{{Math.ceil(store.ratePoint*100)/100}} <span class="fa fa-star" style="color: orange"></span></div>
                </div>
              <div class="intro"></div>
            </a>
          </li>
        </ul>
      </div>
    </div>
     <div class="ship">
      <div class="menu-ship" style="width:100%">
        <div class="hero"   style="width:30% ;text-align:left">
          <h3>GẦN BẠN NHẤT</h3>
        </div>
      </div>
      <div id="Giaotannoi" class="sub-menu-ship" >
        <ul>
          <li v-for="(store, index ) in stores" v-bind:key="index">
            <a v-on:click="storeClicked(store.storeID)">
              <img :src="store.storePicture"  style="border-radius:10px 10px 0px 0px; width:205px; height:150px"/>
              <div class="name-food"> {{ subString(store.storeName)}}...</div>
              <div class="address-store"><i class="fa fa-map-marker"  style="color: red"></i>  {{ subString(store.storeAddress) }}...
              <div style="color: #585858; float:right;">{{store.khoangcach}} km</div></div>
                <div class="address-store"> <span class="fa fa-cutlery"></span>  {{ getType(store.businessTypeID) }}
                <div style="color: #585858; float:right;">{{Math.ceil(store.ratePoint*100)/100}} <span class="fa fa-star" style="color: orange"></span></div>
                </div>
              <div class="intro"></div>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div style="margin-top: 20px;">
      <div v-for="(list, index) in loadMoreList" v-bind:key="index" class="ship">
        <div class="menu-ship">
          <div class="hero" style="width:30%">
            <h3 v-if="list" style="text-align:left"> {{ getType(list[0].businessTypeID) }}</h3>
          </div>
        </div>
        <div v-if="list" class="sub-menu-ship">
          <ul>
            <li v-for="(store,index) in list" v-bind:key="index">
              <a v-on:click="storeClicked(store.storeID)">
                <img :src="store.storePicture"  style="border-radius:10px 10px 0px 0px; width:205px; height:150px"/>
                <div class="name-food">{{ subString(store.storeName) }}...</div>
                <div class="address-store"> <i class="fa fa-map-marker"  style="color: red"></i> {{ subString(store.storeAddress) }}...
                  <div style="color: #585858; float:right;">{{store.khoangcach}} km</div>
                </div>
                  <div class="address-store"> <span class="fa fa-cutlery"></span>  {{ getType(store.businessTypeID) }}
                  <div style="color: #585858; float:right;">{{Math.ceil(store.ratePoint*100)/100}} <span class="fa fa-star" style="color: orange"></span></div>
                  </div>
                <div class="intro"></div>
              </a>
            </li>
          </ul>
        </div> 
      </div>  
    </div>
    <div style="margin-top: 20px;">
      <div class="ship">
        <div class="menu-ship">
          <div class="hero" style="width:100%">
            <h3 style="text-align:center">Xem Thêm <i class="fa fa-chevron-down" style="color:red"></i></h3>
          </div>
        </div>
      </div>  
    </div>
  </div>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides';
import 'vueperslides/dist/vueperslides.css';
import StoreService from '@/services/StoreService.js';
import { loadOptions } from '@babel/core';
const baseUrl='https://localhost:44398/api/'

export default {
    name: 'Homebody',
    components:{
        VueperSlides, VueperSlide
    },
    data() {
        return {
          margin: 150,
          loading: false,
          index: 0,
          stores: [],
          //Search data
          rates: [],
          type: [],
          loadMoreList: [],
          dishes: [],
          banner:[
            {
              id:1,
              src: require('../../assets/imgs/banner1.jpg')
            },
            {
              id:2,
              src: require('../../assets/imgs/banner2.jpg')
            },
            {
              id:3,
              src: require('../../assets/imgs/banner3.jpg')
            },
            {
              id:4,
                src: require('../../assets/imgs/banner4.jpg')
            },
            {
              id:5,
              src: require('../../assets/imgs/banner1.jpg')
            },
            {
              id:6,
            src: require('../../assets/imgs/banner2.jpg')
            },
            {
              id:7,
              src: require('../../assets/imgs/banner3.jpg')
            },
            {
              id:8,
              src: require('../../assets/imgs/banner4.jpg')
            }
          ],
          active:false
        }
      },
      created(){
          this.onInit();
          this.$http.get(baseUrl + 'Dish/GetAll').then(response => {
                this.dishes = response.data;
                let x = Math.floor(Math.random()*(this.dishes.length-10))
                console.log(x);
                console.log(this.dishes.length - 10)
                this.dishes = this.dishes.slice(x,x+10);
          })
      },
      mounted(){
          this.scroll();
      },
      methods:{
        async onInit(){
          try{
            var id= localStorage.getItem('provinceId');
            this.stores = await StoreService.getByProvince(id);
            this.rates = await StoreService.getByProvince(id);
            this.rates.sort(function compare( a, b ) {
                return parseFloat(b.ratePoint) - parseFloat(a.ratePoint);
            });
            this.type = await StoreService.getAllBussinessType(); 
          }catch{}
        },
        storeClicked (item) {
          this.$router.push('/storeDetail/' + item)
        },
        dishClicked (item) {
          localStorage.setItem("keyword", item);
          console.log(localStorage.getItem("keyword"));
          this.$router.push('/search?key='+ item)
        },
        changeProvince(index){
          this.$http.get(baseUrl+ 'GetByIDProvince?id=' + index).then(response => {
            this.stores= response.data
          });
        },
        onChildClick(value){
          this.provinceID = value
        },
        getType(index){
          var temp='Unknown'
          this.type.forEach(element => {
              if(element.businessTypeID == index)
                temp = element.businessTypeName;
          });
          return temp;
        },
        subString(index){
          return index.toString().substring(0,20);
        },
        scroll() {
        window.onscroll = () => {
          let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
          console.log(bottomOfWindow)
          if(bottomOfWindow) {
            this.loading = true;
            if(this.index < this.type.length){
              var temp = this.type[this.index];
              if(this.index < this.type.length){
                var store = this.stores.filter(function(store) {
                      return store.businessTypeID ==  temp.businessTypeID });}
              while(store.length==0){
                  this.index = this.index + 1;
                  if( this.index < this.type.length){
                  temp = this.type[this.index].businessTypeID;
                  store = this.stores.filter(function(store) {
                        return store.businessTypeID ==  temp });
                  }
              }
              setTimeout(() =>{ 
                this.loadMoreList.push(store);
                this.index = this.index + 1;
                this.loading = false;
                this.margin = 150;
              }, 1500);
            }
            else{
              this.loading = false;
              return;
            } 
          }
        };
      },
    },
    updated(){
    }
}
</script>

<style>
@import url('../../assets/css/comments.css');
  .center_div{
   text-align: center;
}
</style>