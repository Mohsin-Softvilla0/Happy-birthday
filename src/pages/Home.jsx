import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Gift, Camera, Volume2, VolumeX } from 'lucide-react';
import Countdown from 'react-countdown'; // Added for countdown
import image1 from '../assets/WhatsApp Image 2025-06-06 at 13.44.44_d0f60af0.jpg';
import image2 from '../assets/2.jpg';
import image3 from '../assets/3.jpg';

const BirthdayWebsite = () => {
  const [currentPage, setCurrentPage] = useState('wish');
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [cakeClicked, setCakeClicked] = useState(false);
  const [showBalloons, setShowBalloons] = useState(false);
  const [showFlowers, setShowFlowers] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [audioContext, setAudioContext] = useState(null);

  // Her name
  const girlfriendName = "Tahira";

  // Birthday date for countdown (set to next day for demo, adjust as needed)
  const birthdayDate = new Date('2025-06-07T00:00:00');

  // Play birthday music
  const playBirthdayMusic = () => {
    if (!audioContext) {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      setAudioContext(context);

      const notes = [
        { freq: 261.63, duration: 0.5 }, // C
        { freq: 261.63, duration: 0.5 }, // C
        { freq: 293.66, duration: 1 },   // D
        { freq: 261.63, duration: 1 },   // C
        { freq: 349.23, duration: 1 },   // F
        { freq: 329.63, duration: 2 },   // E
      ];

      let time = context.currentTime;
      notes.forEach(note => {
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(context.destination);

        oscillator.frequency.setValueAtTime(note.freq, time);
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, time);
        gainNode.gain.exponentialRampToValueAtTime(0.01, time + note.duration);

        oscillator.start(time);
        oscillator.stop(time + note.duration);

        time += note.duration;
      });

      setMusicPlaying(true);
      setTimeout(() => setMusicPlaying(false), 6000);
    }
  };

  const toggleMusic = () => {
    if (!musicPlaying) {
      playBirthdayMusic();
    }
  };

  // Countdown renderer
  const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span style={{ color: 'white', fontSize: 'clamp(1rem, 4vw, 1.25rem)' }}>
        It's your birthday, {girlfriendName}! 🎉
      </span>;
    }
    return (
      <div style={{
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        color: 'white',
        fontSize: 'clamp(1rem, 4vw, 1.25rem)',
        fontWeight: '600',
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '1rem',
        borderRadius: '12px',
        marginBottom: '2rem'
      }}>
        <span>{days}d</span>
        <span>{hours}h</span>
        <span>{minutes}m</span>
        <span>{seconds}s</span>
      </div>
    );
  };

  const styles = {
    container: {
      fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      position: 'relative',
      minHeight: '100vh',
    },

    musicButton: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000,
      background: musicPlaying ? 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)' : 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '60px',
      height: '60px',
      cursor: 'pointer',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },

    wishPage: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '1rem'
    },

    starsContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none'
    },

    star: {
      position: 'absolute',
      color: 'white',
      opacity: 0.6,
      animation: 'twinkle 2s infinite'
    },

    balloonsContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none'
    },

    balloon: {
      position: 'absolute',
      width: '32px',
      height: '40px',
      borderRadius: '50%',
      opacity: 0.8,
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      animation: 'float 3s ease-in-out infinite'
    },

    wishContent: {
      textAlign: 'center',
      zIndex: 10,
      padding: '1rem',
      width: '100%',
      maxWidth: '600px'
    },

    mainTitle: {
      fontSize: 'clamp(2rem, 8vw, 4rem)',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '2rem',
      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
      animation: 'glow 2s ease-in-out infinite alternate',
      lineHeight: '1.2'
    },

    cakeContainer: {
      marginBottom: '2rem',
      position: 'relative'
    },

    cake: {
      background: 'linear-gradient(180deg, #fef3c7 0%, #f59e0b 100%)',
      width: 'clamp(150px, 50vw, 200px)',
      height: 'clamp(105px, 35vw, 140px)',
      margin: '0 auto',
      borderRadius: '12px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
      position: 'relative',
      transform: 'scale(1)',
      transition: 'transform 0.3s ease',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 'clamp(2rem, 8vw, 3rem)'
    },

    candlesContainer: {
      position: 'absolute',
      top: '-24px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: 'clamp(8px, 3vw, 16px)'
    },

    candle: {
      width: '8px',
      height: '32px',
      background: '#d97706',
      borderRadius: '4px'
    },

    flame: {
      position: 'absolute',
      top: '-12px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '12px',
      height: '12px',
      background: '#f97316',
      borderRadius: '50%',
      animation: 'flicker 0.5s ease-in-out infinite alternate'
    },

    button: {
      background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
      color: 'white',
      padding: 'clamp(0.75rem, 3vw, 1rem) clamp(1.5rem, 6vw, 2rem)',
      borderRadius: '50px',
      fontSize: 'clamp(1rem, 4vw, 1.25rem)',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
      transition: 'all 0.3s ease',
      margin: '0.5rem'
    },

    buttonSecondary: {
      background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)'
    },

    cakePage: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fb923c 0%, #ec4899 50%, #ef4444 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '1rem'
    },

    flowersContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none'
    },

    flower: {
      position: 'absolute',
      fontSize: '2rem',
      animation: 'fall 4s linear infinite'
    },

    cakePageTitle: {
      fontSize: 'clamp(2rem, 8vw, 3.5rem)',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '2rem',
      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
      animation: 'pulse 2s infinite'
    },

    cakeToCut: {
      background: 'linear-gradient(180deg, #fce7f3 0%, #ec4899 100%)',
      width: 'clamp(200px, 60vw, 280px)',
      height: 'clamp(150px, 45vw, 200px)',
      margin: '0 auto',
      borderRadius: '12px',
      boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
      cursor: 'pointer',
      transition: 'all 1s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      fontSize: 'clamp(2.5rem, 10vw, 4rem)',
      marginBottom: '2rem'
    },

    cakeCut: {
      display: 'flex',
      justifyContent: 'center',
      gap: '2rem',
      flexWrap: 'wrap'
    },

    cakeHalf: {
      background: 'linear-gradient(180deg, #fce7f3 0%, #ec4899 100%)',
      width: 'clamp(90px, 25vw, 120px)',
      height: 'clamp(150px, 45vw, 200px)',
      boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 'clamp(1.5rem, 6vw, 2rem)',
      animation: 'wobble 1s ease-in-out infinite'
    },

    cakeHalfLeft: {
      borderRadius: '12px 0 0 12px',
      transform: 'rotate(-12deg)'
    },

    cakeHalfRight: {
      borderRadius: '0 12px 12px 0',
      transform: 'rotate(12deg)'
    },

    greetingPage: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #ef4444 100%)',
      padding: '2rem 1rem',
      position: 'relative',
      overflowY: 'auto', // Ensure vertical scrolling
      overflowX: 'hidden', // Prevent horizontal scrolling
      height: '100vh' // Ensure full viewport height
    },

    heartsContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none'
    },

    heart: {
      position: 'absolute',
      color: 'white',
      opacity: 0.4,
      animation: 'heartbeat 3s ease-in-out infinite'
    },

    greetingContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 10,
      minHeight: '100%' // Ensure content can expand
    },

    greetingTitle: {
      fontSize: 'clamp(2rem, 8vw, 3.5rem)',
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      marginBottom: '2rem',
      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
      animation: 'glow 2s ease-in-out infinite alternate'
    },

    wishCardsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1.5rem',
      marginBottom: '3rem'
    },

    wishCard: {
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      padding: '1.5rem',
      boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
      transition: 'all 0.5s ease',
      cursor: 'pointer',
      textAlign: 'center'
    },

    wishText: {
      fontSize: 'clamp(1rem, 4vw, 1.25rem)',
      fontWeight: '600',
      color: '#374151',
      lineHeight: '1.6',
      marginTop: '1rem'
    },

    photoGalleryTitle: {
      fontSize: 'clamp(1.5rem, 6vw, 2.5rem)',
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      marginBottom: '2rem',
      textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
    },

    photoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '1rem',
      marginBottom: '3rem'
    },

    photoFrame: {
      background: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      padding: '1rem',
      boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
      transition: 'all 0.5s ease',
      cursor: 'pointer'
    },

    photo: {
      width: '100%',
      height: 'clamp(120px, 30vw, 200px)',
      objectFit: 'cover',
      borderRadius: '12px',
      display: 'block'
    },

    photoLabel: {
      color: 'white',
      textAlign: 'center',
      marginTop: '0.75rem',
      fontWeight: '600',
      fontSize: 'clamp(0.8rem, 3vw, 1rem)'
    },

    finalMessage: {
      textAlign: 'center',
      marginTop: '3rem',
      marginBottom: '3rem' // Add bottom margin for spacing
    },

    finalMessageCard: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '24px',
      padding: 'clamp(1.5rem, 6vw, 3rem)',
      boxShadow: '0 25px 50px rgba(0,0,0,0.2)'
    },

    finalMessageTitle: {
      fontSize: 'clamp(1.5rem, 6vw, 2.5rem)',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '1rem'
    },

    finalMessageText: {
      fontSize: 'clamp(1rem, 4vw, 1.25rem)',
      color: 'rgba(255, 255, 255, 0.9)',
      lineHeight: '1.6'
    },

    fadeIn: {
      animation: 'fadeIn 1s ease-out'
    },

    '@media (max-width: 768px)': {
      musicButton: {
        width: '50px',
        height: '50px',
        top: '10px',
        right: '10px'
      },
      wishCardsGrid: {
        gridTemplateColumns: '1fr',
        gap: '1rem'
      },
      photoGrid: {
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '0.75rem'
      },
      cakeCut: {
        gap: '1rem'
      }
    }
  };

  const WishPage = () => {
    useEffect(() => {
      const timer = setTimeout(() => setShowBalloons(true), 3000);
      return () => clearTimeout(timer);
    }, []);

    const blowCandles = () => {
      setCandlesBlown(true);
      setTimeout(() => setShowBalloons(true), 1000);
    };

    return (
      <div style={styles.wishPage}>
        <div style={styles.starsContainer}>
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              style={{
                ...styles.star,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            >
              <Sparkles size={Math.random() * 20 + 10} />
            </div>
          ))}
        </div>

        {showBalloons && (
          <div style={styles.balloonsContainer}>
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                style={{
                  ...styles.balloon,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  backgroundColor: ['#ef4444', '#eab308', '#3b82f6', '#10b981', '#ec4899'][Math.floor(Math.random() * 5)],
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        )}

        <div style={styles.wishContent}>
          <h1 style={{ color: 'white' }}>
            Happy Birthday {girlfriendName}! 🎉
          </h1>

          <div style={styles.cakeContainer}>
            <div style={styles.cake}>
              <div style={styles.candlesContainer}>
                {[...Array(5)].map((_, i) => (
                  <div key={i} style={{ position: 'relative' }}>
                    <div style={styles.candle}></div>
                    {!candlesBlown && (
                      <div style={{
                        ...styles.flame,
                        animationDelay: `${i * 0.2}s`
                      }} />
                    )}
                  </div>
                ))}
              </div>
              🎂
            </div>
          </div>

          <button
            onClick={blowCandles}
            style={styles.button}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            💨 Blow the Candles
          </button>

          {candlesBlown && (
            <div style={styles.fadeIn}>
              <button
                onClick={() => setCurrentPage('cake')}
                style={{ ...styles.button, ...styles.buttonSecondary }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                🍰 Let's Cut the Cake!
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const CakePage = () => {
    const cutCake = () => {
      setCakeClicked(true);
      setTimeout(() => {
        setShowFlowers(true);
        setTimeout(() => setCurrentPage('greeting'), 2000);
      }, 1000);
    };

    return (
      <div style={styles.cakePage}>
        {showFlowers && (
          <div style={styles.flowersContainer}>
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                style={{
                  ...styles.flower,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                }}
              >
                🌸
              </div>
            ))}
          </div>
        )}

        <div style={styles.wishContent}>
          <h2 style={styles.cakePageTitle}>
            Time to Cut the Cake! 🎂
          </h2>

          <div style={{ marginBottom: '2rem' }}>
            {!cakeClicked ? (
              <div
                onClick={cutCake}
                style={styles.cakeToCut}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                🎂
                <div style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)', color: 'white', fontWeight: 'bold', marginTop: '1rem' }}>
                  Click to Cut!
                </div>
              </div>
            ) : (
              <div style={styles.cakeCut}>
                <div style={{ ...styles.cakeHalf, ...styles.cakeHalfLeft }}>
                  🍰
                </div>
                <div style={{ ...styles.cakeHalf, ...styles.cakeHalfRight }}>
                  🍰
                </div>
              </div>
            )}
          </div>

          {cakeClicked && (
            <div style={styles.fadeIn}>
              <p style={{ fontSize: 'clamp(1.25rem, 5vw, 1.5rem)', color: 'white', fontWeight: '600', marginBottom: '2rem' }}>
                Perfect! Now let's celebrate! 🎉
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const GreetingPage = () => {
    const [selectedCard, setSelectedCard] = useState(0);
    const [hoveredPhoto, setHoveredPhoto] = useState(null);

    const wishes = [
      "You light up my world like nobody else! ✨",
      "Every moment with you is a treasure 💎",
      "You're not just my girlfriend, you're my best friend 👫",
      "Here's to another year of amazing adventures together! 🌟",
      "You make every day feel like a celebration 🎉"
    ];

    // Array of imported images (looping through available images)
    const photos = [image1, image2, image3];

    return (
      <div style={styles.greetingPage}>
        <div style={styles.heartsContainer}>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              style={{
                ...styles.heart,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            >
              <Heart size={Math.random() * 25 + 15} />
            </div>
          ))}
        </div>

        <div style={styles.greetingContainer}>
          <h2 style={styles.greetingTitle}>
            Special Wishes for You! 💕
          </h2>

          {/* Countdown Timer */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h3 style={{
              fontSize: 'clamp(1.25rem, 5vw, 1.75rem)',
              color: 'white',
              marginBottom: '1rem'
            }}>
              Countdown to {girlfriendName}'s Birthday!
            </h3>
            <Countdown date={birthdayDate} renderer={countdownRenderer} />
          </div>

          <div style={styles.wishCardsGrid}>
            {wishes.map((wish, index) => (
              <div
                key={index}
                style={{
                  ...styles.wishCard,
                  ...(selectedCard === index ? { boxShadow: '0 0 0 4px #fbbf24' } : {})
                }}
                onClick={() => setSelectedCard(index)}
                onMouseEnter={(e) => {
                  if (selectedCard !== index) {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.boxShadow = '0 30px 60px rgba(0,0,0,0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCard !== index) {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = '0 25px 50px rgba(0,0,0,0.2)';
                  }
                }}
              >
                <Gift color="#ec4899" size={40} />
                <p style={styles.wishText}>
                  {wish}
                </p>
              </div>
            ))}
          </div>

          <h3 style={styles.photoGalleryTitle}>
            Beautiful Memories 📸
          </h3>

          <div style={styles.photoGrid}>
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                style={{
                  ...styles.photoFrame,
                  ...(hoveredPhoto === index ? { transform: 'scale(1.1) rotate(3deg)' } : {})
                }}
                onMouseEnter={() => setHoveredPhoto(index)}
                onMouseLeave={() => setHoveredPhoto(null)}
              >
                <img
                  src={photos[index % photos.length]} // Cycle through available images
                  alt={`Memory ${index + 1}`}
                  style={styles.photo}
                />
                <p style={styles.photoLabel}>
                  Memory {index + 1}
                </p>
              </div>
            ))}
          </div>

          <div style={styles.finalMessage}>
            <div style={styles.finalMessageCard}>
              <h4 style={styles.finalMessageTitle}>
                You're Amazing, {girlfriendName}! 🌟
              </h4>
              <p style={styles.finalMessageText}>
                Hope your special day is filled with happiness, love, and all your favorite things.
                Here's to many more birthdays together! 💖
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'wish':
        return <WishPage />;
      case 'cake':
        return <CakePage />;
      case 'greeting':
        return <GreetingPage />;
      default:
        return <WishPage />;
    }
  };

  return (
    <div style={styles.container}>
      <button
        onClick={toggleMusic}
        style={styles.musicButton}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      >
        {musicPlaying ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>

      {renderPage()}

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes glow {
          0% { text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }
          100% { text-shadow: 2px 2px 20px rgba(255,255,255,0.5); }
        }

        @keyframes flicker {
          0% { transform: translateX(-50%) scale(1); }
          100% { transform: translateX(-50%) scale(1.1); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fall {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes wobble {
          0%, 100% { transform: rotate(-12deg); }
          50% { transform: rotate(-8deg); }
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default BirthdayWebsite;