import Vue from "vue";
import {testFun} from "../common/test";
import Hello from "./components/Hello";
import io from 'socket.io-client';

const socket = io("localhost:8080/")
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
    </div>`,
    data: {
        name: testFun()
    },
    components: {
        Hello
    }
});

