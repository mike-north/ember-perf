/* eslint-env node */
module.exports = {
  scenarios: [
    {
      name: 'default',
      bower: {
        dependencies: {}
      }
    },
    {
      name: 'ember-1.11',
      bower: {
        dependencies: {
          'ember': '~1.11.0',
          'ember-cli-shims': '0.0.6',
          'ember-cli-test-loader': '0.2.1',
          'ember-data': '1.13.15',
          'ember-load-initializers': '0.1.7',
          'ember-qunit': '0.4.16',
          'ember-qunit-notifications': '0.1.0',
          'ember-resolver': '~0.1.20',
          jquery: '~1.11.3',
          'loader.js': 'ember-cli/loader.js#3.4.0'
        },
        resolutions: {
          'ember': '~1.11.0'
        }
      },
      npm: {
        devDependencies: {
          'ember-getowner-polyfill': '^1.0.0',
          'ember-source': null,
          'ember-cli-shims': null
        }
      }
    },
    {
      name: 'ember-1.12',
      bower: {
        dependencies: {
          'ember': '~1.12.0',
          'ember-cli-shims': '0.0.6',
          'ember-cli-test-loader': '0.2.1',
          'ember-data': '1.13.15',
          'ember-load-initializers': '0.1.7',
          'ember-qunit': '0.4.16',
          'ember-qunit-notifications': '0.1.0',
          'ember-resolver': '~0.1.20',
          jquery: '~1.11.3',
          'loader.js': 'ember-cli/loader.js#3.4.0'
        },
        resolutions: {
          'ember': '~1.12.0'
        }
      },
      npm: {
        devDependencies: {
          'ember-getowner-polyfill': '^1.0.0',
          'ember-source': null,
          'ember-cli-shims': null
        }
      }
    },
    {
      name: 'ember-1.13',
      bower: {
        dependencies: {
          'ember': '~1.13.0',
          'ember-cli-shims': '0.0.6',
          'ember-cli-test-loader': '0.2.1',
          'ember-data': '1.13.15',
          'ember-load-initializers': '0.1.7',
          'ember-qunit': '0.4.16',
          'ember-qunit-notifications': '0.1.0',
          'ember-resolver': '~0.1.20',
          jquery: '~1.11.3',
          'loader.js': 'ember-cli/loader.js#3.4.0'
        },
        resolutions: {
          'ember': '~1.13.0'
        }
      },
      npm: {
        devDependencies: {
          'ember-getowner-polyfill': '^1.0.0',
          'ember-source': null,
          'ember-cli-shims': null
        }
      }
    },
    {
      name: 'ember-2.0',
      bower: {
        dependencies: {
          'ember': '~2.0.0'
        },
        resolutions: {
          'ember': '~2.0.0'
        }
      },
      npm: {
        devDependencies: {
          'ember-getowner-polyfill': '^1.0.0',
          'ember-source': null
        }
      }
    },
    {
      name: 'ember-2.1',
      bower: {
        dependencies: {
          'ember': '~2.1.0'
        },
        resolutions: {
          'ember': '~2.1.0'
        }
      },
      npm: {
        devDependencies: {
          'ember-getowner-polyfill': '^1.0.0',
          'ember-source': null
        }
      }
    },
    {
      name: 'ember-2.2',
      bower: {
        dependencies: {
          'ember': '~2.2.0'
        },
        resolutions: {
          'ember': '~2.2.0'
        }
      },
      npm: {
        devDependencies: {
          'ember-getowner-polyfill': '^1.0.0',
          'ember-source': null
        }
      }
    },
    {
      name: 'ember-lts-2.4',
      bower: {
        dependencies: {
          'ember': 'components/ember#lts-2-4'
        },
        resolutions: {
          'ember': 'lts-2-4'
        }
      },
      npm: {
        devDependencies: {
          'ember-source': null
        }
      }
    },
    {
      name: 'ember-2.5',
      bower: {
        dependencies: {
          'ember': '~2.5.0'
        },
        resolutions: {
          'ember': '~2.5.0'
        }
      },
      npm: {
        devDependencies: {
          'ember-source': null
        }
      }
    },
    {
      name: 'ember-2.6',
      bower: {
        dependencies: {
          'ember': '~2.6.0'
        },
        resolutions: {
          'ember': '~2.6.0'
        }
      },
      npm: {
        devDependencies: {
          'ember-source': null
        }
      }
    },
    {
      name: 'ember-2.7',
      bower: {
        dependencies: {
          'ember': '~2.7.0'
        },
        resolutions: {
          'ember': '~2.7.0'
        }
      },
      npm: {
        devDependencies: {
          'ember-source': null
        }
      }
    },
    {
      name: 'ember-lts-2.8',
      bower: {
        dependencies: {
          'ember': 'components/ember#lts-2-8'
        },
        resolutions: {
          'ember': 'lts-2-8'
        }
      },
      npm: {
        devDependencies: {
          'ember-source': null
        }
      }
    },
    {
      name: 'ember-2.9',
      bower: {
        dependencies: {
          'ember': '~2.9.0'
        },
        resolutions: {
          'ember': '~2.9.0'
        }
      },
      npm: {
        devDependencies: {
          'ember-source': null
        }
      }
    },
    {
      name: 'ember-2.10',
      bower: {
        dependencies: {
          'ember': '~2.10.0'
        },
        resolutions: {
          'ember': '~2.10.0'
        }
      },
      npm: {
        devDependencies: {
          'ember-source': null
        }
      }
    },
    {
      name: 'ember-release',
      bower: {
        dependencies: {
          'ember': 'components/ember#release'
        },
        resolutions: {
          'ember': 'release'
        }
      },
      npm: {
        devDependencies: {
          'ember-source': null
        }
      }
    },
    {
      name: 'ember-beta',
      bower: {
        dependencies: {
          'ember': 'components/ember#beta'
        },
        resolutions: {
          'ember': 'beta'
        }
      },
      npm: {
        devDependencies: {
          'ember-source': null
        }
      }
    },
    {
      name: 'ember-canary',
      bower: {
        dependencies: {
          'ember': 'components/ember#canary'
        },
        resolutions: {
          'ember': 'canary'
        }
      },
      npm: {
        devDependencies: {
          'ember-source': null
        }
      }
    }
  ]
};
