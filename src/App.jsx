import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getRandomWord, categories } from './data/words';
import confetti from 'canvas-confetti';
import { Play, RefreshCcw, User, Ghost, Eye, CheckCircle } from 'lucide-react';

const App = () => {
  const [gameState, setGameState] = useState('setup'); // setup, reveal, playing
  const [playerCount, setPlayerCount] = useState(3);
  const [imposterCount, setImposterCount] = useState(1);
  const [players, setPlayers] = useState([]);
  const [playerNames, setPlayerNames] = useState({});
  const [selectedCategories, setSelectedCategories] = useState(Object.keys(categories));
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [gameData, setGameData] = useState({ word: '', category: '' });
  const [showNames, setShowNames] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
    audio.volume = 0.3;
    audioRef.current = audio;
  }, []);

  const playFlipSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log("Audio play failed", e));
    }
  };

  const toggleCategory = (cat) => {
    if (selectedCategories.includes(cat)) {
      if (selectedCategories.length > 1) {
        setSelectedCategories(selectedCategories.filter(c => c !== cat));
      }
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const startGame = () => {
    const data = getRandomWord(selectedCategories);
    setGameData(data);

    let roles = Array(playerCount).fill('civilian');
    for (let i = 0; i < imposterCount; i++) {
      let rand;
      do {
        rand = Math.floor(Math.random() * playerCount);
      } while (roles[rand] === 'imposter');
      roles[rand] = 'imposter';
    }

    setPlayers(roles.map((role, i) => ({
      id: i + 1,
      name: playerNames[i] || `Player ${i + 1}`,
      role: role,
      hasSeen: false
    })));

    setCurrentPlayerIndex(0);
    setIsRevealed(false);
    setGameState('reveal');
    playFlipSound();
  };

  const handleNext = () => {
    if (currentPlayerIndex < playerCount - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
      setIsRevealed(false);
      playFlipSound();
    } else {
      setGameState('playing');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const pageVariants = {
    initial: { opacity: 0, scale: 0.8, rotate: -5 },
    animate: { opacity: 1, scale: 1, rotate: -1 },
    exit: { opacity: 0, scale: 0.8, rotate: 5 }
  };

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        {gameState === 'setup' && (
          <motion.div
            key="setup"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="notebook-page"
          >
            <div className="sheet-header">
              <h1 className="sketch-border" style={{ textAlign: 'center' }}>SUSSY BAKA</h1>
            </div>

            <div className="sheet-main">
              <div style={{ flexShrink: 0 }}>
                <h3 style={{ marginBottom: '8px' }}>Categories:</h3>
                <div className="category-chips">
                  {Object.keys(categories).map(cat => (
                    <div
                      key={cat}
                      className={`category-chip ${selectedCategories.includes(cat) ? 'active' : ''}`}
                      onClick={() => toggleCategory(cat)}
                    >
                      {cat}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ flexShrink: 0 }}>
                <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  Players: {playerCount}
                  <button
                    style={{ width: 'auto', padding: '5px 12px', fontSize: '0.9rem' }}
                    onClick={() => setShowNames(!showNames)}
                  >
                    {showNames ? 'Hide' : 'Names'}
                  </button>
                </h3>
                <input
                  type="range"
                  min="3" max="15"
                  value={playerCount}
                  onChange={(e) => setPlayerCount(parseInt(e.target.value))}
                />
                {showNames && (
                  <div className="player-names-list">
                    {Array.from({ length: playerCount }).map((_, i) => (
                      <input
                        key={i}
                        className="player-name-input"
                        placeholder={`Player ${i + 1}`}
                        value={playerNames[i] || ''}
                        onChange={(e) => setPlayerNames({ ...playerNames, [i]: e.target.value })}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div style={{ flexShrink: 0 }}>
                <h3>Imposters: {imposterCount}</h3>
                <input
                  type="range"
                  min="1" max={Math.min(3, playerCount - 1)}
                  value={imposterCount}
                  onChange={(e) => setImposterCount(parseInt(e.target.value))}
                />
              </div>
            </div>

            <div className="sheet-footer">
              <button className="wiggle" onClick={startGame}>
                <Play size={24} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
                START GAME
              </button>
            </div>
          </motion.div>
        )}

        {gameState === 'reveal' && (
          <motion.div
            key="reveal"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="notebook-page"
          >
            <div className="sheet-header">
              <h2 style={{ textAlign: 'center' }}>{players[currentPlayerIndex]?.name}</h2>
            </div>

            <div className="sheet-main">
              <div
                className="sketch-border reveal-card"
                onClick={() => !isRevealed && setIsRevealed(true)}
                style={{ cursor: !isRevealed ? 'pointer' : 'default' }}
              >
                {!isRevealed ? (
                  <>
                    <Eye size={48} />
                    <p style={{ fontSize: '1.4rem', marginTop: '10px' }}>Tap to reveal secret</p>
                  </>
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    {players[currentPlayerIndex]?.role === 'imposter' ? (
                      <>
                        <Ghost size={60} color="var(--color-accent)" />
                        <h1 style={{ color: 'var(--color-accent)', fontSize: '1.8rem', margin: '15px 0' }}>YOU ARE THE IMPOSTER</h1>
                        <p>Blend in, don't get caught!</p>
                      </>
                    ) : (
                      <>
                        <User size={60} />
                        <h3 style={{ margin: '10px 0', opacity: 0.7 }}>Category: {gameData.category}</h3>
                        <h1 style={{ fontSize: '2.5rem', textAlign: 'center' }}>{gameData.word}</h1>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="sheet-footer">
              <div style={{ height: '55px', display: 'flex', alignItems: 'flex-end' }}>
                {isRevealed && (
                  <button className="wiggle" onClick={handleNext}>
                    {currentPlayerIndex < playerCount - 1 ? 'NEXT PLAYER' : 'DONE'}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {gameState === 'playing' && (
          <motion.div
            key="playing"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="notebook-page"
          >
            <div className="sheet-header">
              <h2 style={{ textAlign: 'center' }}>GAME IN PROGRESS</h2>
            </div>

            <div className="sheet-main">
              <div className="sketch-border">
                <p style={{ textAlign: 'center', fontSize: '1.2rem', margin: '0 0 10px 0' }}>
                  Category: <strong>{gameData.category}</strong>
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  {players.map((p) => (
                    <div key={p.id} style={{ textAlign: 'center', border: '1px dashed #ccc', padding: '10px', borderRadius: '4px' }}>
                      <CheckCircle size={20} style={{ color: '#44bd32', margin: '0 auto 5px' }} />
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.8rem' }}>
                        {p.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ opacity: 0.7, fontSize: '0.95rem', alignSelf: 'center', width: '100%' }}>
                <p>1. Everyone describes the word without saying it.</p>
                <p>2. Imposter tries to guess or blend in.</p>
                <p>3. Finally, vote who is sussy!</p>
              </div>
            </div>

            <div className="sheet-footer">
              <button className="wiggle" onClick={() => setGameState('setup')}>
                <RefreshCcw size={20} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
                NEW GAME
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
