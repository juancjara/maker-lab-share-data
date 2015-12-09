import Vue from 'vue';
import Firebase from 'firebase';
import Autolinker from 'autolinker';
import xss from 'xss';

const baseURL = 'https://share-data-makerlab.firebaseio.com/';

let cleanAndAutolink = (msg) => Autolinker.link(xss(msg).trim());

let Messages;

let start = (channel, inputEnable) => {
  if (inputTable) {
    app.channelInfo = `Channel created: ${channel}`;
  } else {
    app.channelInfo = `Joinned channel: ${channel}`;
  }

  app.shouldHide = !inputEnable;
  app.messages = [];
  app.newMsg = '';

  Messages = new Firebase(baseURL + channel);

  Messages.on('child_added', (snapshot) => {
    app.messages.unshift(cleanAndAutolink(snapshot.val()));
  });
};

let app = new Vue({

  el: "#msg",

  data: {
    channelInfo: '',
    shouldHide: true,
    newMsg: '',
    messages: []
  },

  methods: {

    addMsg() {
      let msg = cleanAndAutolink(this.newMsg);
      if (msg) {
        Messages.push(msg);
        this.newMsg = '';
      }
    }

  }

});

export default start;
