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
  props: ["anotherArray"],
  template: `
  <div id="someBox">
    <h3>Array in component</h3>
    <ul>
      <li v-for="item in anotherArray"> {{ item | thousandsSeperator}}</li>
    </ul>
  </div>       
  `,
  created: function() {
    console.log("Component inititiated");
  }
});

//Vue.component("some-component", SomeComponent);

const VueApp = new Vue({
  el: "#app",
  data: {
    someArray: [0, 1017, 217456],
    anotherArray: [0, 9917, 3213778]
  },
  template: `
        <div class="test">
          <h3>Array in root</h3>
          <ul>
            <li v-for="item in someArray"> {{ item | thousandsSeperator}}</li>
          </ul>
          <some-component :another-array="anotherArray"></some-component>
        </div>
    `,
  created: function() {
    console.log("vueapp inititiated");
  }
});

export { VueApp };
