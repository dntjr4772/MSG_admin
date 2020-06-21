<template>
  <div id="view-user">
    <ul class="collection with-header">
      <li class="collection-header"><h4>사용자 이름 : {{name}}  신고 횟수: {{ban_count}}</h4></li>
      <li v-for="content in contents" v-bind:key="content.reported_user_id" class="collection-item">
        <h5>신고 사유: {{content.description}}</h5>
        <span>신고 날짜: {{content.ban_date}}</span>
        <button @click="deleteItem(content.id)" class="secondary-content">제거</button>
      </li>
    </ul>
    <router-link to="/home" class="btn grey">Back</router-link>
    <button @click="deleteuser(userSanction)" class="btn red">사용자 영구 정지</button>
    <!-- <button @click="testuser" class="btn blue">테스트 신고 추가</button> -->
  </div>
</template>

<script>
import db from './firebaseInit';
import firebase from 'firebase';
export default {
  name: 'view-user',
  data() {
    return {
      contents: [],
      name: "",
      ban_count: 0
    };
  },
  beforeRouteEnter(to, from, next) {
    
    db
      .collection('Ban')
      .where('reported_user_id', '==', to.params.user_id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
                const data = {
                    id: doc.id,
                    report_user_id: doc.data().report_user_id,
                    reported_user_id: doc.data().reported_user_id,
                    description: doc.data().description,
                    ban_date: doc.data().time
                    //ban_date:doc.data().ban_date.toDate().toLocaleString()
                };
                vm.contents.push(data);
                vm.ban_count=to.params.ban_count;
                vm.name=to.params.name;
          });
        });
      });
  },
  watch: {
    $route: 'fetchData'
  },
  methods: {
    fetchData() {
      db
        .collection('Ban')
        .where('reported_user_id', '==', this.$route.params.user_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = {
                    id: doc.id,
                    report_user_id: doc.data().report_user_id,
                    reported_user_id: doc.data().reported_user_id,
                    description: doc.data().description,
                    ban_date: doc.data().time
                };
                this.contents.push(data);
                this.ban_count=to.params.ban_count;
                this.name=to.params.name;
          });
        });
    },
    deleteuser(callbackFunc) {
      if (confirm('해당 사용자를 제재하시겠습니까?')) {
        db
        .collection('Ban')
        .where('reported_user_id', '==', this.$route.params.user_id)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              callbackFunc(this.$route.params.user_id);
              doc.ref.delete();
              //this.$router.push('/home');
            });
          });
      }
      //예약목록에서도 모조리 제거
    },
    userSanction(user_id){
      db
          .collection('User')
          .doc(this.$route.params.user_id).update({
            ban_count:0,
            "sanction":true
          })
          .then(() => {
            console.log("User is suspended");
            this.$router.push('/home');
          })
          .catch((error) => {
            console.error("Error updating document: ", error);
          });
      
    },
    deleteItem(id){
        db
          .collection('Ban')
          .doc(id).delete().then(function() {
            console.log("successfully deleted!");
            
           }).catch(function(error) {
            console.error("Error removing document: ", error);
           });
           //ban_count 1 줄이기
            this.ban_count-=1;
        db
          .collection('User')
          .doc(this.$route.params.user_id).update({
            
            "ban_count":this.ban_count
            
          })
          .then(() => {
            console.log("Subtract a number User's ban_count");
            this.$router.push('/home');
          })
          .catch((error) => {
            console.error("Error updating document: ", error);
          });
    },
    // testuser(){
    //   // Add a new document with a generated id.
    //   firebase.firestore().collection("Ban").add({
    //     ban_date: firebase.firestore.FieldValue.serverTimestamp(),
    //     description: "test",
    //     user_id:this.$route.params.user_id
    //   })
    //   .then(function(docRef) {
    //     console.log("Document written with ID: ", docRef.id);
    //   })
    //   .catch(function(error) {
    //     console.error("Error adding document: ", error);
    //   });
    

    // }
  }
}
</script>
