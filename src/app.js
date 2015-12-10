import Vue from 'vue';
import Firebase from 'firebase';
import Autolinker from 'autolinker';
import xss from 'xss';

const baseURL = 'https://share-data-makerlab.firebaseio.com/';
let Messages;
let cleanAndAutolink = (msg) => Autolinker.link(xss(msg).trim());

let start = (channel, show) => {
  if (show) {
    app.channelInfo = `Created channel: ${channel}`;
  } else {
    app.channelInfo = `Joined created: ${channel}`;
  }

  app.shouldShow = show;
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
    shouldShow: false,
    newMsg: '',
    messages: []
  },

  methods: {

    addMsg() {
      let msg = cleanAndAutolink(this.newMsg);
      if (msg) {
        Messages.push(msg, function(err) {
          if (err) return alert(`Data could not be saved. ${err}`);
        });
        this.newMsg = '';
      }
    }

  }

});

export default start;
