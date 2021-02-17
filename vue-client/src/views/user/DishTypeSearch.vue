<template>
    <div class="discover">
      <div class="artical">
        <div class="menu-artical">
          <button class="menu-left">
            {{ this.$route.query.key.toUpperCase()}}
          </button>
        </div>
        <div id="KhamPha" class="slider">
          <ul>
            <li  v-for="store in stores" v-bind:key="store.storeID">
              <a href=""
                ><img :src="store.storePicture" style="border-radius:10px 10px 0px 0px; width:205px; height:150px" />
                <div class="name-food">{{ store.storeName.substr(0,20) }}</div>
                <div class="address-store">{{ store.storeAddress.substr(0,25) }}...</div>
                <div class="comment"></div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
import Header from './containers/Header'
import Navbar from './containers/Navbar'
import Search from './containers/Search'
export default {
	data(){
		return{
        stores:[]
		}
	},
    components:{
        Header,
        Navbar,
        Search
	},
	mounted(){
        const key = this.$route.query.key
        console.log(key)
		this.$http.get('https://localhost:44398/api/Dish/Search?dishname=' + key).then(response => {
         if(response.data !='Không có kết quả tìm kiếm')
            this.stores = response.data
          else this.stores = []
         	console.log(this.stores)
      });
	},
	methods:{
		
	}
}
</script>

<style scope>
.main{
	width:100%;
	padding:20px 5px 0 5px;   
}
.artical{
	border-radius: 20px;
	margin: 0 auto;
}
.artical .menu-artical{
    text-align:center;
	overflow:hidden;
}
.artical .menu-artical .menu-left{
	float:left;
    margin:0;
    border:none;
    height: 50px;
    width: 15%;
    font-size: 15px;
    font-weight: bold;
    border-radius: 10px;
    color: darkred;
}
.artical .menu-artical .menu-left .action{
	border-bottom:2px solid #960014;
	color:#960014;
}
.artical .menu-artical .menu-left a{
	text-decoration:none;
	display:block;
	color:#000;
	float:left;
	font-size: 20px;
	padding:16px;
	white-space:nowrap;   
}
.artical .menu-artical .menu-right{
	width:60%;
	text-align:right;
	float:right;   
}
.artical .menu-artical .menu-right select{
	padding:5px;
	font-size:13px;
	border-radius:4px; 
	margin:10px 6px 0 0;
}
.discover .artical .slider{
    display:flex;
    flex-direction:column;
	flex-wrap:wrap;    
}
.discover .artical .slider ul{
	margin:0;
	padding:0;
	list-style-type:none; 
}
.discover .artical .slider ul li{
	float:left;
	margin-top:10px;
	margin-left:17px;
	border-radius:10px
}
.discover .artical .slider ul li a{
	text-decoration:none;
	color:#000;
	display:block;    
}
.discover .artical .slider ul li a div.name-food{
	font-weight:bold;
	font-size:15px;
	overflow:hidden;
	padding:3px; 
}
.discover .artical .slider ul li a div.address-store{
	font-size:13px;
	color:#9a9a9a;
	display:block;  
	padding:3px; 
}
</style>