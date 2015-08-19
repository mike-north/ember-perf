module.exports = {
  scenarios: [
    {
      name: 'ember-1.5',
      dependencies: {
        ember: '~1.5.0',
        handlebars: '~1.3.0',
        'ember-data': '1.0.0-beta.11'
      }
    },
    {
      name: 'ember-1.6',
      dependencies: {
        ember: '~1.6.0',
        handlebars: '~1.3.0',
        'ember-data': '1.0.0-beta.11'
      }
    },
    {
      name: 'ember-1.7',
      dependencies: {
        ember: '~1.7.0',
        handlebars: '~1.3.0',
        'ember-data': '1.0.0-beta.11'
      }
    },
    {
      name: 'ember-1.8',
      dependencies: {
        ember: '~1.8.1',
        handlebars: '~1.3.0'
      }
    },
    {
      name: 'ember-1.9',
      dependencies: {
        ember: '~1.9.1',
        handlebars: '~2.0.0'
      }
    },
    {
      name: 'ember-1.10',
      dependencies: {
        ember: '~1.10.0',
        handlebars: null
      },
      resolutions: {
        ember: '~1.10.0',
        handlebars: null
      }
    },
    {
      name: 'ember-1.11',
      dependencies: {
        ember: '~1.11.0',
        'ember-data': '1.13.7',
        handlebars: null
      },
      resolutions: {
        ember: '~1.11.0',
        'ember-data': '1.13.7',
        handlebars: null
      }
    },
    {
      name: 'ember-1.12',
      dependencies: {
        ember: '~1.12.0',
        'ember-data': '1.13.7',
        handlebars: null
      },
      resolutions: {
        ember: '~1.12.0',
        'ember-data': '1.13.7',
        handlebars: null
      }
    },
    {
      name: 'ember-1.13',
      dependencies: {
        ember: '~1.13.0',
        'ember-data': '~1.13.0',
        handlebars: null
      },
      resolutions: {
        ember: '~1.13.0',
        'ember-data': '~1.13.0',
        handlebars: null
      }
    },
    {
      name: 'ember-release',
      dependencies: {
        ember: 'components/ember#release',
        'ember-data': '~2.0.0-beta.1',
        handlebars: null
      },
      resolutions: {
        ember: 'release'
      }
    },
    {
      name: 'ember-beta',
      dependencies: {
        ember: 'components/ember#beta',
        'ember-data': '~2.0.0-beta.1',
        handlebars: null
      },
      resolutions: {
        ember: 'beta'
      }
    },
    {
      name: 'ember-canary',
      dependencies: {
        ember: 'components/ember#canary',
        'ember-data': '~2.0.0-beta.1',
        handlebars: null
      },
      resolutions: {
        ember: 'canary'
      }
    }
  ]
};
