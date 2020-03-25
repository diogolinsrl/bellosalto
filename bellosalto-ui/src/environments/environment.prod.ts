export const environment = {
  production: true,
  apiUrl: 'https://app.bellosalto.com:8443',

  tokenWhitelistedDomains: [ 
    new RegExp('app.bellosalto.com')
  ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};
