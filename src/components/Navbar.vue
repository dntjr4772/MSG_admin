 <template>
  <nav>
      <div class="nav-wrapper orange">
        <div class="container">
          <router-link to="/" class="brand-logo">MSG admin</router-link>    
          <ul class="right">
            <!-- <li v-if="isLoggedIn"><span class="email black-text">{{currentUser}}</span></li> -->
            <li v-if="isLoggedIn"><router-link to="/home">사용자 신고 유저</router-link></li>
            <li v-if="isLoggedIn"><router-link to="/">식당 신청 목록</router-link></li>
            <li v-if="!isLoggedIn"><router-link to="/login">Login</router-link></li>
            <li v-if="!isLoggedIn"><router-link to="/register">Register</router-link></li>
            <li v-if="isLoggedIn"><button v-on:click="logout" class="btn black">Logout</button></li>
             
          </ul>
        </div>
      </div>
    </nav>
  </template>

<script>
import firebase from 'firebase';
export default {
  name: 'navbar',
  data() {
    return {
      isLoggedIn: false,
      currentUser: false
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go({ path: this.$router.path });
        });
    }
  }
};
</script>

<style scoped>
.email {
  padding-right: 10px;
}
</style>