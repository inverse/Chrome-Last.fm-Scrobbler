'use strict';

Connector.playerSelector = '#main-content';

Connector.getArtist = () => {
	return $('.playingNow div[class*="songArtist"]').text() || $('.view-liveMusicNow .artist').text();
};

Connector.getTrack = () => {
	return $('.playingNow h3').text() || $('.view-liveMusicNow .title').text();
};

Connector.getAlbum = () => {
	return $('.playingNow div[class*="songRelease"]').text() || $('.view-liveMusicNow .release').text();
};

Connector.isPlaying = () => $('#jwplayerDiv, #radio-player4-player').hasClass('jw-state-playing');