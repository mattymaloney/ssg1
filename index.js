const fs = require('fs');
const Handlebars = require('handlebars');
const client = require('./utils/SanityClient') // at the top of the file
const blocksToHtml = require('@sanity/block-content-to-html'); // Added to the top

function buildHTML(filename, data) {
	const source = fs.readFileSync(filename,'utf8').toString();
	const template = Handlebars.compile(source);
	const output = template(data);

	return output
}

async function main(src, dist) {
	// const html = buildHTML(src, { "variableData": "This is variable data"});
	const data = await getSanityData();
	
	const html = buildHTML(src, data);

	fs.writeFile(dist, html, function (err) {
		if (err) return console.log('index.js writeFile error', err);
		console.log('index.html created');
	});
}

main('./src/index.html', './dist/index.html');


// async function getSanityData() {
//     const query = `{
//         "about": *[_id == 'YOUR-ID-HERE'][0]
//     }`
//     let data = await client.fetch(query);
// }


async function getSanityData() {
	// const query = `{
	// 	"about": *[_type == 'about'][1]
	// }`
	const query = `{
		"about": *[_id == '3c7e0c5f-dacb-48e5-ab81-03527e5ae6ec'][0]
	}`
	let data = await client.fetch(query);
	data.about.content = blocksToHtml({
			blocks: data.about.content
	})
	return await data
}
