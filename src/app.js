export default {
	id: 'operation-translator-node',
	name: 'Universal Translator',
	icon: 'language',
	description: 'Translates any JSON object, array, or string marked with {$t:string} using the Directus translations table.',
	overview: ({ input_to_translate }) => [
	  {
		label: 'Input to Translate',
		text: input_to_translate ? 'Provided' : 'Not provided',
	  },
	],
	options: [
	  {
		field: 'input_to_translate',
		name: 'Input to Translate',
		type: 'json',
		meta: {
		  width: 'full',
		  interface: 'input-code',
		  options: {
			language: 'json',
			placeholder: 'Enter JSON object, array, or string with $t: markers...',
		  },
		},
		required: true,
	  },
	  {
		field: 'language',
		name: 'Language',
		type: 'string',
		meta: {
		  width: 'full',
		  interface: 'select-dropdown',
		  options: {
			choices: [
			  { text: 'Auto (User\'s Language)', value: 'auto' },
			  { text: 'English (en-US)', value: 'en-US' },
			  { text: 'Greek (el-GR)', value: 'el-GR' },
			  // Add other language options as needed
			],
		  },
		},
		required: true,
	  },
	],
  };
  