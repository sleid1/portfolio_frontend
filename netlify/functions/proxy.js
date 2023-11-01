exports.handler = async function (event, context) {
   const path = event.path;
   const sanityStudioURL = 'https://kristijandini.sanity.studio';
   const url = `${sanityStudioURL}${path}`;

   try {
      // Use dynamic import to load 'node-fetch'
      const fetchModule = await import('node-fetch');
      const fetch = fetchModule.default;

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
