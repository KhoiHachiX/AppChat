<template>

   <div class="chat-window">
		
		<div class="messages">
			
			<div class="message" v-for="message in messages" v-bind:key="message._id">
				
				<div class="username">{{message.username}}</div>
				<div class="message-text">{{message.msg}}</div>
                <div class = "battery">{{ (level*100).toFixed(2) }}%</div>
			</div>
			
		</div>
		<form class="container-md" v-on:submit="sendMessage">
			<input type="text" class="form-control" placeholder="Message in here" v-model="msg">
			<button  v-on:click="sendMessage" v-bind:disabled="!msg" type="button" class="btn btn-outline-primary">Send</button>
	
		</form>
        
	</div>
	
</template>

<script>
import { useBattery } from '@vueuse/core';
export default {
	name: 'RoomChat',
	props: ['messages'],
	data: function () {
		return {
			msg: "",
            
		}
	},

	methods: {
		sendMessage: function () {
			if (!this.msg) {
				alert("Please enter a message");
				return;
			}

			this.$emit('sendMessage', this.msg);
			this.msg = "";
		}
        
	},
    setup() {
    const { isCharging, chargingTime, dischargingTime, level } = useBattery();

    return { isCharging, chargingTime, dischargingTime, level };
  }
}

</script>
<style lang="scss" scoped>
.chat-window {
	flex: 1;
	display: flex;
	flex-direction: column;
	background-color: #F9F9F9;
	box-shadow: 1px 1px 6px 0px rgba(0, 0, 0, 0.15);
	.messages {
		flex: 1;
		overflow: scroll;

		.message {
			display: flex;
			border-bottom: 2px solid #000000;
			padding: 10px;

			&:last-of-type {
				border-bottom: none;
			}

			.username {
				width: 100px;
				margin-right: 250px;
			}

			.message-text {
				flex: 1;
			}
            .battery{
                flex: 0;
            }
            
		}
	}
	.container-md {
		display: flex;
		

		input {
			flex: 1;
			height: 35px;
			font-size: 18px;
			box-sizing: border-box;
		}

		button {
			width: 75px;
			height: 35px;
			box-sizing: border-box;
		}
	}
}
</style>