export const environment = {
  production: true,
  apiUrl: 'https://app.com:8443',

  tokenWhitelistedDomains: [ 
    new RegExp('app.com')
  ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};
