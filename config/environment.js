'use strict';

module.exports = function(environment) {
  let ENV = {
    firebase: {
      apiKey: "AIzaSyD1cwJ74UW8_LePmdZ_H6a390F6W_2sk7o",
      authDomain: "fire-chat-90cc1.firebaseapp.com",
      databaseURL: "https://fire-chat-90cc1.firebaseio.com",
      projectId: "fire-chat-90cc1",
      storageBucket: "fire-chat-90cc1.appspot.com",
      messagingSenderId: "582292293635",
      appId: "1:582292293635:web:5fa0577f84ebcd1b79e636",
      measurementId: "G-MRV5VTTMXT",
    },
    modulePrefix: 'fire-chat',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
