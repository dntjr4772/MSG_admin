<template>
  <div id="view-restuser">
    번호 : {{restaurantPhone}}<br>
    식당이름 : {{restaurantName}}<br>
    <router-link to="/home" class="btn grey">Back</router-link>
    <button @click="acceptUser" class="btn blue">승인</button>
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
      apply:false,
      profileImageUrl:""
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
                vm.apply = doc.data().apply;

          });
        });
      });
  },
  methods: {
    acceptUser(){
        if (confirm('해당 식당사용자를 승인하시겠습니까?')) {
          db
            .collection('users')
            .doc(this.$route.params.user_id).update({
                
                "apply":!(this.apply)
            })
            .then(() => {
                console.log("Subtract a number User's ban_count");
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