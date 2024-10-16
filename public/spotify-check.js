const clientId = '33e7b1c0ee524c98ac1e02f5c596156a';
const clientSecret = '72a67e973a2140298a83f1b4eb6f06f4';

async function checkForNewAlbum() {
    try {
        // Get access token
        const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });
        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        // Search for King Gizzard & The Lizard Wizard's latest album
        const searchResponse = await fetch('https://api.spotify.com/v1/search?q=artist:King%20Gizzard%20%26%20The%20Lizard%20Wizard&type=album&limit=1', {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });
        const searchData = await searchResponse.json();

        if (searchData.albums && searchData.albums.items.length > 0) {
            const latestAlbum = searchData.albums.items[0];
            const releaseDate = new Date(latestAlbum.release_date);
            const today = new Date();

            if (releaseDate.toDateString() === today.toDateString()) {
                document.getElementById('result').textContent = 'YEEEEES';
            } else {
                document.getElementById('result').textContent = 'Naur';
            }
        } else {
            document.getElementById('result').textContent = 'Naur';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('result').textContent = 'Error checking for new album';
    }
}

// Run the check when the page loads
window.onload = checkForNewAlbum;
