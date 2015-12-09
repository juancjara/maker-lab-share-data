import Vue from 'vue';
import Autolinker from 'autolinker';
import xss from 'xss';

let cleanAndAutolink = (msg) => Autolinker.link(xss(msg).trim());

let app = new Vue({

  el: "#app",

  data: {
    newMsg: '',
    messages: []
  },

  methods: {

    addMsg() {
      let msg = cleanAndAutolink(this.newMsg);
      if (msg) {
        this.messages.unshift(msg);
        this.newMsg = '';
      }
    }

  }

});
