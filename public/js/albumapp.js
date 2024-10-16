document.addEventListener('DOMContentLoaded', () => {
    // Handle random album button
    const randomAlbumBtn = document.getElementById('randomAlbumBtn');
    if (randomAlbumBtn) {
        randomAlbumBtn.addEventListener('click', async () => {
            try {
                const response = await fetch('/albums/random');
                if (!response.ok) throw new Error('Failed to fetch random album');
                const album = await response.json();
                window.location.href = `/albums/${album.id}`;
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to get a random album. Please try again.');
            }
        });
    }

    // Load album details
    const albumTitle = document.getElementById('albumTitle');
    if (albumTitle) {
        const albumId = window.location.pathname.split('/').pop();
        fetch(`/api/albums/${albumId}`)
            .then(response => {
                if (!response.ok) throw new Error('Album not found');
                return response.json();
            })
            .then(album => {
                document.title = album.title;
                albumTitle.textContent = album.title;
                document.getElementById('albumCover').src = album.album_cover;
                document.getElementById('albumCover').alt = `${album.title} cover`;
                document.getElementById('releaseDate').textContent = `Release Date: ${album.release_date}`;
                document.getElementById('albumLength').textContent = `Length: ${album.length_minutes} minutes`;
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to load album details. Please try again.');
            });
    }
});
