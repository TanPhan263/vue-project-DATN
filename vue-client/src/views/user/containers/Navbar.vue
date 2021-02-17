<template>
  	<div class="navbar-fixed" style="position: absolute; top: 35px;">
		<div class="container-header clearfix">
			<div class="logo fl_left">
				<a href="/Homepage/" title="deliveryNow.vn">
					<img src="../../../assets/imgs/foody-vn.png" alt="now.vn" width="112" style="margin-top: 5px;">
				</a>
			</div>
            <select
			id="province"
			style="width:180px; font-weight:bold; font-size: 15px;"
            class="country fl_left"
            vertical
			v-model="provinceSelected"
            placeholder="Địa điểm"
			@change="getProvince()"
            >
			<option v-on:click="getProvince" v-for="pro in provinces" v-bind:key="pro.provinceID" :value="pro.provinceID">
				{{pro.provinceName}}
			</option>
            </select>
			<div v-if="isLoggedin" class="fl_right">
			  <CHeaderNav class="mr-4">
				<CHeaderNavItem class="d-md-down-none mx-2">
					<CHeaderNavLink>
					 <div v-if="user">Xin chào {{ getName() }}</div>	
					</CHeaderNavLink>
				</CHeaderNavItem>
				<TheHeaderDropdownAccnt style="" v-bind:avt="getAvt"/>
			  </CHeaderNav>
			</div>
			<div v-else  id="login" class="fl_right">
				<router-link style="border-radius: 15px;margin-right: 5px;" to="/login" class="btn-login">Đăng nhập</router-link>
				<router-link style="border-radius: 15px;margin-right: 5px; width: 90px; text-align:center;" to="/register" class="btn-login">Đăng kí</router-link>
			</div>
		</div>
	</div>
</template>

<script>
const baseUrl='https://localhost:44398/api/'
import TheHeaderDropdownAccnt from '@/containers/TheHeaderDropdownAccnt'
import AuthService from '@/services/AuthService.js';
export default {
name: 'navbars',
components:{
	TheHeaderDropdownAccnt
},
data(){
    return{
		provinceSelected: '',
		avt:'',
		provinces: '',
    }
},
props:{
	user: String
},
computed:{
	isLoggedin: function() {
		if(localStorage.getItem('isAuthen') == null || localStorage.getItem('isAuthen') == 'Đăng nhập thất bại' || !AuthService.isAuthented(localStorage.getItem('isAuthen'))) return false
		return true
	}
  },
  methods:{
	  getName(){
		  try{
		   	return this.user.userName;
		  }
		  catch{
			  alert("Lỗi rồi")
		  }
		   
	  },
	  getProvince(){
		try{
			localStorage.setItem('provinceId',this.provinceSelected)
			this.$router.go();
		}
		catch(e)
		{

		}
	  },
	  getAvt(){
		  this.user = JSON.parse(this.user)
		  if(this.avt=='')
			  return '../assets/imgs/userPic.png';
		  else if(this.user.picture =='') return '../assets/imgs/userPic.png';
		  return this.user.picture
	  },
	  getProvinceSelected(){
		  if(this.provinces!=''){
			this.provinces.forEach(element => {
				if(element.provinceID == localStorage.getItem('provinceId'))
					return element.provinceName
			});
		  }
		  return 'TP Hồ Chí Minh'
	  },
	  storeClicked(index){
			this.$emit('storeClicked',index);
	}
  },
  mounted(){
	this.$http.get(baseUrl + 'Province/GetAll').then(response => {
            this.provinces=response.data
    })
	if(localStorage.getItem('provinceId')==null)
	  {
		  this.provinceSelected='-MO5b_1K2_tF_C4GVDo3';
		  localStorage.setItem('provinceId', this.provinceSelected)
	  }
	  if(localStorage.getItem('provinceId')!=''){
		  this.provinceSelected=localStorage.getItem('provinceId')
	  }
	// if(localStorage.getItem('isAuthen')!= null && localStorage.getItem('isAuthen') != 'Đăng nhập thất bại')
	// {
	// 	 this.$http.get("https://localhost:44398/api/User/GetByID",{ headers: {"Authorization" : `Bearer ${localStorage.getItem('isAuthen')}`}}).then(respone =>{
    //         this.avt= respone.data
	// 	})
	// }
  }
}
</script>

<style>
.options{
    width: 100px;
    height: 20px;
}
</style>