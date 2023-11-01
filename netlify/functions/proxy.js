const fetch = require('node-fetch');

exports.handler = async function (event, context) {
   const sanityStudioURL = 'https://kristijandini.sanity.studio';
   const path = event.path;
   const url = `${sanityStudioURL}${path}`;

   try {
      const response = await fetch(url, {
         method: event.httpMethod,
         headers: event.headers,
         body: event.body,
      });

      const body = await response.text();

      return {
         statusCode: response.status,
         headers: response.headers,
         body,
      };
   } catch (error) {
      return {
         statusCode: 500,
         body: JSON.stringify({ error: 'Proxy request failed' }),
      };
   }
};
