<template>
<div class="row">
    <div class="col s12 m7">
      <div class="card">
        <div class="card-image">
          <img :src=profileImageUrl alt="식당 사진">
          
        </div>
        <div class="card-content">
          <div>식당 이름 : {{restaurantName}}</div>
          <div>식당 번호 : {{restaurantPhone}}</div>
          <div>식당 설명 : {{description}}</div>
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
      description:""
    };
  },
  beforeRouteEnter(to, from, next) {
    db
      .collection('restaurantUsers')
      .where('restuser_id', '==', to.params.restuser_id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
                vm.id = doc.id,
                vm.profileImageUrl = doc.data().profileImageUrl;
                vm.restaurantName = doc.data().restaurantName;
                vm.restaurantPhone = doc.data().restaurantPhone;
                vm.approved = doc.data().approved;
                vm.description=doc.data().description;
          });
        });
      });
  },
  methods: {
    acceptUser(){
        if (confirm('해당 식당사용자를 승인하시겠습니까?')) {
          db
            .collection('restaurantUsers')
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