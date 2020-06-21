<template>
<div class="row">
    <div class="col s12 m7">
      <div class="card" id="card">
        <div class="card-image">
          <img :src=profileImageUrl alt="식당 사진">
          
        </div>
        <div class="card-content">
          <div>식당 이름 : {{restaurantName}}</div>
          <div>식당 번호 : {{restaurantPhone}}</div>
          <div>식당 설명 : {{description}}</div>
          <div>식당 주소 : {{res_address}}</div>
          <div>픽업 타임 : {{pickup_start_time}} ~ {{pickup_end_time}}</div>
          
        </div>
        <div class="card-action">
          <router-link to="/" class="btn grey">Back</router-link>
          <button @click="acceptUser" class="btn blue">승인</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from './firebaseInit';
export default {
  name: 'view-restuser',
  data() {
    return {
      restaurantName: "",
      restaurantPhone: 0,
      approved:false,
      profileImageUrl:"",
      description:"",
      pickup_end_time:"",
      pickup_start_time:"",
      res_address:""
    };
  },
  beforeRouteEnter(to, from, next) {
    db
      .collection('Restaurant')
      .where('res_id', '==', to.params.restuser_id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
                vm.id = doc.id,
                vm.profileImageUrl = doc.data().res_imageURL;
                vm.restaurantName = doc.data().res_name;
                vm.restaurantPhone = doc.data().res_phone;
                vm.approved = doc.data().approved;
                vm.description=doc.data().res_description;
                vm.pickup_end_time=doc.data().pickup_end_time;
                vm.pickup_start_time=doc.data().pickup_start_time;
                vm.res_address=doc.data().res_address;
          });
        });
      });
  },
  methods: {
    acceptUser(){
        if (confirm('해당 식당사용자를 승인하시겠습니까?')) {
          db
            .collection('Restaurant')
            .doc(this.$route.params.restuser_id).update({
                "approved":true
            })
            .then(() => {
                console.log("successfuly restaurant user approval");
                this.$router.push('/');
            })
            .catch((error) => {
                console.error("Error updating document: ", error);
            });
        }
    }
  }
}
</script>

<style> 
#card { text-align: center; }
</style>
