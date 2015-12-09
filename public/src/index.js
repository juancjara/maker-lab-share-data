import Vue from 'vue';

import app from './app';

let validChannel = (channel) => {
  return channel.length > 0;
};

let setChannel = (channel, inputEnable) => {app(channel, inputEnable);};

new Vue({

  el: "#channel",

  data: {
    channel: ''
  },

  methods: {

    goToChannel(inputEnable = false) {
      if (validChannel(this.channel)) {
        app(this.channel, inputEnable);
      }
    }

  }

});

