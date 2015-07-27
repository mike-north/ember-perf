module.exports = {
  scenarios: [
    {
      name: 'ember-1.8',
      dependencies: {
        ember: '~1.8.1',
        handlebars: '~1.3.0'
      },
      resolutions: {
        ember: '~1.8.1',
        handlebars: '~1.3.0'
      }
    },
    {
      name: 'ember-1.9',
      dependencies: {
        ember: '~1.9.1',
        handlebars: '~2.0.0'
      },
      resolutions: {
        ember: '~1.9.1',
        handlebars: '~2.0.0'
      }
    }
    // ,
    // {
    //   name: 'ember-release',
    //   dependencies: {
    //     'ember': 'components/ember#release'
    //   },
    //   resolutions: {
    //     'ember': 'release'
    //   }
    // },
    // {
    //   name: 'ember-beta',
    //   dependencies: {
    //     'ember': 'components/ember#beta'
    //   },
    //   resolutions: {
    //     'ember': 'beta'
    //   }
    // },
    // {
    //   name: 'ember-canary',
    //   dependencies: {
    //     'ember': 'components/ember#canary'
    //   },
    //   resolutions: {
    //     'ember': 'canary'
    //   }
    // }
  ]
};
