import Vue from "vue";
import {testFun} from "../common/test";
import Hello from "./components/Hello";
import Login from "./components/Login";
import io from 'socket.io-client';
import Router from "./routes";

const socket = io("localhost:8080/")

window["socket"] = socket

socket.on("connect", () => {
    console.log("wwiwjiwjwlijwiwjwl")
})

let v = new Vue({
    el: "#app",
    template: `
    <div>
        <div>Hello {{name}}!</div>
        Name: <input v-model="name" type="text">
        bliep
        <hello :name="name" :initialEnthusiasm="5"/>
        <router-view></router-view>
    </div>`,
    data: {
        name: testFun()
    },
    components: {
        Hello, Login
    },
    router: Router
});

