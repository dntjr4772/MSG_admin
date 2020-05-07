<template>
  <div id="restaurantlist">
    <ul class="collection with-header">
      <li class="collection-header"><h4>식당 사용자 신청 목록</h4></li>
      <li v-for="user in users" v-bind:key="user.id" class="collection-item">
         {{user.name}} 
         <!-- <router-link class="secondary-content" v-bind:to="{ name: 'view-user', params: { user_id: user.user_id }}">상세 내역</router-link> -->
      </li>
    </ul>
  </div>
</template>

<script>
import db from './firebaseInit';
export default {
  name: 'restaurantlist',
  data() {
    return {
      users: [],
      //loading: true
    };
  },
  created() {
    db
      .collection('restaurantUsers')
      .where('apply', '==', false)
      .get()
      .then(querySnapshot => {
        //this.loading = false;
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            name: doc.data().restaurantName,
            restaurantPhone: doc.data().restaurantPhone
          };
          this.users.push(data);
          
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }
};