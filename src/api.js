export default {
	id: 'operation-translator-node',
	handler: async ({ input_to_translate, language }, { database, accountability }) => {
		// Fetch the user's language if "auto" is selected
		let userLanguage = 'en-US'; // Default language fallback

		if (language === 'auto' && accountability?.user) {
			try {
				// Retrieve user data from the database
				const userData = await database
					.select('language')
					.from('directus_users')
					.where('id', accountability.user)
					.first();

				if (userData?.language) {
					userLanguage = userData.language;
				} else {
					throw new Error('User language not found in user data.');
				}
			} catch (error) {
				throw new Error(`Failed to retrieve user language: ${error.message}`);
			}
		} else {
			// Use the language provided in the operation options
			userLanguage = language || 'en-US';
		}

		// Fetch translations from the Directus database
		const translations = await database
			.select('key', 'value')
			.from('directus_translations')
			.where('language', userLanguage);

		// Create a translation map for quick lookup
		const translationMap = {};
		translations.forEach(({ key, value }) => {
			translationMap[key] = value;
		});

		// Function to recursively find and replace $t: markers
		function translateValue(value) {
			if (typeof value === 'string') {
			  // Updated regex to match {$t:...} markers
			  return value.replace(/\{\$t:([^\s{}]+)\}/g, (match, key) => {
				return translationMap[key] || match; // Replace if found, otherwise keep the original
			  });
			} else if (Array.isArray(value)) {
			  // Process each element in the array
			  return value.map((item) => translateValue(item));
			} else if (typeof value === 'object' && value !== null) {
			  // Process each key in the object
			  const translatedObject = {};
			  for (const key in value) {
				if (value.hasOwnProperty(key)) {
				  translatedObject[key] = translateValue(value[key]);
				}
			  }
			  return translatedObject;
			}
			// If it's another type (e.g., number, boolean), return as-is
			return value;
		  }
		  

		// Parse the input if it's a JSON string, otherwise use it directly
		let parsedInput;
		try {
			parsedInput = typeof input_to_translate === 'string' ? JSON.parse(input_to_translate) : input_to_translate;
		} catch (error) {
			throw new Error('Invalid JSON input provided for translation');
		}

		// Process the parsed input with the recursive translation function
		const translatedPayload = translateValue(parsedInput);

		return translatedPayload;
	},
};
