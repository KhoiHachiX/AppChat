<template>
  <div id="app">
      <div class="header">
        <h1 class="text-center"> Chat Room</h1>
        <p class="text-center">Username:{{ username }}</p>
        <p class="text-center">Online:{{ users.length }}</p>
        <p class="text-center"> {{showDateTime}}</p>
    <p class="text-center"> Latitude:{{currPos.lat.toFixed(2)}},  Longitude:{{currPos.lng.toFixed(2)}}  </p>
      </div>

		<RoomChat v-bind:messages="messages"  v-on:sendMessage="this.sendMessage"  />


  </div>
</template>

<script>
import io from 'socket.io-client';
import RoomChat from './components/RoomChat';
import { useLocation } from './useLocation';
import { computed } from 'vue';
export default {
  name: 'app',
  components:{
    RoomChat
},
setup() {
    const { coords } = useLocation()
    const currPos = computed(() => ({
      lat: coords.value.latitude,
      lng: coords.value.longitude
    }))
 return{currPos};
 
},
  
  data: function(){
    return{
      username:"",
      socket: io("http://localhost:3000"),
      messages:[],
      users:[],
      showDateTime:null,
     levels:[],
      
    }
  },
  methods:{
   joinServer: function() {
			this.socket.on('loggedIn', data => {
				this.messages = data.messages;
				this.users = data.users;
				this.socket.emit('newuser', this.username);
			});
 
			this.listen();
		},
		listen: function() {
			this.socket.on('userOnline', user => {
				this.users.push(user);
			});
			this.socket.on('userLeft', user => {
				this.users.splice(this.users.indexOf(user), 1);
			});
			this.socket.on('msg', message => {
				this.messages.push(message);
			});
     this.socket.on('level',level =>{
      this.levels.push(level);
     });
     
		},
    sendMessage: function(message){
      this.socket.emit('msg',message);
    },
    getCurrentDateTime(){
      let dateTime = new Date();
      this.showDateTime = dateTime;
      console.log(dateTime);
    },
  
  },
  created(){
    this.getCurrentDateTime();
    
  },
  mounted:function(){
   this.username = prompt("What is your name","Khoi");
    if(!this.username){
      this.username = "Khoi";
    }
    this.joinServer();
  },
  
}
</script>

<style lang="scss">
body{
  font-family: 'Avenir',Helvetica,Arial,sans-serif ;
  background-image: url(./image/grey.png) ;
}
#app {
  display: flex;
  flex-direction:column ;
  height: 100vh;
  width: 100%;
  max-width: 768px;
  margin:0 auto;
  background-color:white;

}
</style>
