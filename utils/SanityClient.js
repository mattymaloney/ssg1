const sanityClient = require('@sanity/client');
const client = sanityClient({
    projectId: 'kg0fwugf',
    dataset: 'production',
    useCdn: true 
  })

module.exports = client;
