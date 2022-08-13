import { createApp } from "vue";
import App from "./App.vue";
import ChakraUIVuePlugin, { chakra } from "@chakra-ui/vue-next";
import { domElements } from "@chakra-ui/vue-system";

const app = createApp(App);
app.use(ChakraUIVuePlugin);

domElements.forEach((tag) => {
  app.component(`chakra.${tag}`, chakra(tag));
});

app.mount("#app");
