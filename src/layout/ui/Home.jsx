import styles from "../../styles/home.module.scss";
import React, { useState, Suspense, useEffect } from "react";
import { useLoaderData, Await } from "react-router-dom";
import { getUserInfo, getUserSavedTracks, getAudioFeaturesForTracks } from "../../utility/api_endpoints";
import { accessToken } from "../../utility/api_auth";

export async function loader() {
    const userInfo = await getUserInfo(accessToken);
    const savedTracks = await getUserSavedTracks(accessToken); 
    const minifySavedTracks = savedTracks.map((track) => {
      return {
        track: track.track.name,
        artist: track.track.artists[0].name,
        album: track.track.album.name,
        duration: track.track.duration_ms,
        uri: track.track.uri,
        id: track.track.id,
      };
    });
  
  
    return {
      userInfo,
      minifySavedTracks,
    };
  }

export default function Home() {
  const [customBPM, setCustomBPM] = useState(90);
  const [currentBPM, setCurrentBPM] = useState(60);
  const { userInfo, minifySavedTracks } = useLoaderData();
  const [minifyAndBpmSavedTracks, setMinifyAndBpmSavedTracks] = useState([]);

  async function processTracks(minifySavedTracks) {
    const chunks = [];
    for (let i = 0; i < minifySavedTracks.length; i += 100) {
      chunks.push(minifySavedTracks.slice(i, i + 100));
    }

    const processedTracks = [];
    for (const chunk of chunks) {
      const trackUris = chunk.map(track => track.id);
      const chunkAudioFeatures = await getAudioFeaturesForTracks(accessToken, trackUris);
      const mergedData = chunk.map((track, index) => {
        return { ...track, ...chunkAudioFeatures[index] };
      });
      processedTracks.push(...mergedData);
    }

    setMinifyAndBpmSavedTracks(processedTracks);
  }

  useEffect(() => {
    // Assuming minifySavedTracks and accessToken are available here
    processTracks(minifySavedTracks);
  }, []); // Empty dependency array means this effect runs once on mount

  if(minifyAndBpmSavedTracks){
    console.log(minifyAndBpmSavedTracks);
  }

  const handleBPMChange = (event) => {
    setCustomBPM(event.target.value);
  };

  const handleCurrentBPMChange = (event) => {
    setCurrentBPM(event.target.value);
  };

  return (
    <main>
      <section className={styles.app_wrapper}>
        <div className={styles.playlist_editor}>
          <h2>Playlist Editor</h2>
          <p>Current BPM: {currentBPM}</p>
        </div>
        <div className={styles.playlist_settings}>
          <h2>Playlist Settings</h2>
          <div className={styles.userInfo}>
            <div></div>
            <p>Logged in as *username*</p>
          </div>
          <div className={styles.playlist_settings_wrapper}>
            <div className={styles.playlist_settings_wrapper__BPMbuttons}>
              <div>
                <input
                  type="radio"
                  id="slow"
                  name="bpm"
                  value="60"
                  onChange={handleCurrentBPMChange}
                  defaultChecked
                />
                <label htmlFor="slow">~60 BPM - Slow walk</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="moderate"
                  name="bpm"
                  value="100"
                  onChange={handleCurrentBPMChange}
                />
                <label htmlFor="moderate">~100 BPM - Moderate walk</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="brisk"
                  name="bpm"
                  value="120"
                  onChange={handleCurrentBPMChange}
                />
                <label htmlFor="brisk">~120 BPM - Brisk walk</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="custom"
                  name="bpm"
                  value={customBPM}
                  onChange={handleCurrentBPMChange}
                />
                <label htmlFor="custom">
                  ~
                  <input
                    type="number"
                    min="60"
                    max="220"
                    placeholder="90"
                    onChange={handleBPMChange}
                  />{" "}
                  Custom BPM
                </label>
              </div>
            </div>
            <div className={styles.savedTracks}>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
