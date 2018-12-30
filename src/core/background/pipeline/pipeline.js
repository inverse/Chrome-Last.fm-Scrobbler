'use strict';

/**
 * The module applies functions provided by pipeline stages to given song.
 */

import * as Util from '../util.js';
import * as UserInput from './user-input.js';
import * as Metadata from './metadata.js';
import * as Normalize from './normalize.js';
import * as LocalCache from './local-cache.js';
import * as CoverArtArchive from './coverartarchive.js';

/**
 * List of processors.
 * Each processor is an object contains `process` function takes song object
 * and returns Promise.
 * @type {Array}
 */
const processors = [
	Normalize,
	/**
	 * Load data submitted by user.
	 */
	UserInput,
	//
	/**
	 * Load data filled by user from storage.
	 */
	LocalCache,
	/**
	 * Load song metadata using ScrobbleService.
	 */
	Metadata,
	/**
	 * Looks for fallback cover art using Cover Art Archive service.
	 */
	CoverArtArchive,
];

return {
	/**
	 * Process song using pipeline processors.
	 * @param  {Object} song Song instance
	 * @return {Promise} Promise that will be resolved when all processors process song
	 */
	processSong(song) {
		// Reset possible flag, so we can detect changes
		// on repeated processing of the same song.
		song.flags.isProcessed = false;

		let factories = processors.map((processor) => processor.process);
		return Util.queuePromises(factories, song).then(() => {
			song.flags.isProcessed = true;
		});
	}
};
