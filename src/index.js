import Vue from 'vue';

import app from './app';

let ref = new Firebase("https://share-data-makerlab.firebaseio.com");

let validChannel = (channel) => {
  return channel.length > 0;
};

let setChannel = (channel, show = false) => {
  if (validChannel(channel)) {
    app(channel, show);
  }
};

new Vue({

  el: "#channel",

  data: {
    channel: '',
    greetings: ''
  },

  methods: {

    login() {
      ref.authWithOAuthPopup("facebook", (err, authData) => {
        if (err) return alert('error login');
        this.greetings = `Hi, ${authData.facebook.displayName}`;
      });
    },

    logout() {
      this.greetings = '';
      ref.unauth();
    },

    create() {
      if (!ref.getAuth()) {
        return alert('Login required');
      }
      setChannel(this.channel, true);
    },

    join() {
      setChannel(this.channel);
    }

  }

});

