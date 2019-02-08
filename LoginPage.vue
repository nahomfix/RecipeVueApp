<template>
    <div>
        <div class="loginBox">
            <img :src="avatar" class="user"/>
            <h4>Login</h4>
                <label for="username">Username:</label><input id="user_name" type="text" class="form-control" v-model='username' name="username">
                <label for="password">Password:</label><input id="password" type="password" class="form-control" v-model='password' name="password">
                <div class="loginBtn text-center">
                    <button class="btn light-green accent-4" name="action" @click="loginUser">Login</button>
                </div>
                <div class="text-center">
                <span>Don't have an account yet?&nbsp;</span><router-link to="/signup" class="greenColor">Join Us</router-link>
                </div>
        </div>
    </div>
</template>

<script>
import Avatar from '../assets/avatar-male.png';
import axios from 'axios';

/* eslint-disable */

export default {
    name: "LoginPage",
    data(){
        return{
            username: '',
            password: '',
            avatar: Avatar,
            token: localStorage.getItem('token')
        }
    },
    methods: {
        loginUser(){
            let user = {
                "username": this.username,
                "password": this.password
            }

            axios.post('http://localhost:3000/api/Users/login', user)
            .then(
                (res) => {
                    localStorage.setItem('token', res.data.id)
                    localStorage.setItem('username', user.username)
                    this.$emit('check-token', res.data.id)
                })
            .catch(err => console.log(err))
            // console.log(user);
            // this.token = localStorage.getItem('token');
            
            // console.log("THIS IS THE TOKEN... " + this.token);
            // this.$emit('passedToken', this.token);
            this.$router.push('/');
            // this.$router.go();   
        }
    }
}
</script>

<style scoped>

.loginBox{
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 350px;
    height: 420px;
    box-sizing: border-box;
    background: rgba(0,0, 0, 0.1);
    padding: 80px 40px;
    border-radius: 10px;

}

.user{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    top: -50px;
    left: 125px;
}

h4{
    margin: 0;
    padding: 0 0 20px;
    text-align: center; 
}

.loginBox input{
    margin-bottom: 30px;
}
.loginBtn{
    /* margin-left: 100px; */
    margin-bottom: 25px;
    
}

button{
    color: white;
}

input{
    background-color: white;
}
</style>
