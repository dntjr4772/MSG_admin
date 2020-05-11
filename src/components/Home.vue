<template>
  <div id="home">
    <ul class="collection with-header">
      <li class="collection-header"><h4>신고 유저 목록</h4></li>
      <li v-for="user in users" v-bind:key="user.id" class="collection-item">
         {{user.name}} 
         <router-link class="secondary-content" v-bind:to="{ name: 'view-user', params: { user_id: user.user_id, ban_count:user.ban_count,name:user.name}}">상세 내역</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import db from './firebaseInit';
export default {
  name: 'home',
  data() {
    return {
      users: []
    };
  },
  created() {
    db
      .collection('users')
      .where('ban_count', '>=', 10)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            user_id: doc.data().user_id,
            name: doc.data().userName,
            ban_count:doc.data().ban_count
          };
          this.users.push(data);
        });
      });
  }
};
</script>