/* External Vue stuff */
import Vue from "vue";

/* Vue plugins  */
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

//import SomeComponent from "./components.js";

Vue.filter("thousandsSeperator", function(value) {
  if (value === 0) return "0";
  if (!value) return "";
  var newValue = value.toLocaleString();
  return newValue;
});

Vue.component("some-component", {
  props: ["someData"],
  template: `
  <div id="someBox">
    <h3>Data in component</h3>
    <ul>
      <li v-for="item in someData">
        <ul>
          <li v-for="(value, key) in item"> {{ key }} : {{ value }}</li>
        </ul>
      </li>  
    </ul>
  </div>       
  `,
  created: function() {
    console.log("Component inititiated");
  }
});

const VueApp = new Vue({
  el: "#app",
  data: {
    someArray: [0, 1017, 217456],
    someData: null
  },
  template: `
        <div class="test">
          <h3>Array in root</h3>
          <ul>
            <li v-for="item in someArray"> {{ item | thousandsSeperator}}</li>
          </ul>
          <some-component :some-data="someData"></some-component>
        </div>
    `,
  methods: {
    getData: function() {
      this.url = "https://jsonplaceholder.typicode.com/users";
      //this.url = "/some-service" + "/users";
      this.$http.get(this.url).then(
        response => {
          this.someData = response.data;
          console.log("response", response);
        },
        response => {
          console.log("Error!", response);
        }
      );
    }
  },
  created: function() {
    this.getData();
    console.log("vueapp inititiated");
  }
});

export { VueApp };
