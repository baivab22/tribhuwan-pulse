import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Donater {
  _id: string;
  donaterName: string;
  prizeName: string;
  prizeType: string;
  relatedDepart: string;
  contractDate: string;
  photo: string;
  contactNumber: string;
  email: string;
}

const API_URL = 'http://202.70.90.11:81/api/donaters';

const DonatersPage: React.FC = () => {
  const [donaters, setDonaters] = useState<Donater[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchDonaters();
  }, []);

  const fetchDonaters = async () => {
    try {
      const response = await axios.get(API_URL);
      setDonaters(response.data.data);
    } catch (error) {
      console.error('Error fetching donaters:', error);
    } finally {
      setLoading(false);
    }
  };

  const prizeTypes = ['All', 'Trophy', 'Medal', 'Certificate', 'Cash', 'Scholarship', 'Other'];
  
  const filteredDonaters = filter === 'All' 
    ? donaters 
    : donaters.filter(d => d.prizeType === filter);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      {/* Hero Section */}
      <div style={{
        textAlign: 'center',
        padding: '80px 20px 60px',
        color: 'white'
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: 'bold',
          marginBottom: '20px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          fontFamily: 'Georgia, serif'
        }}>
          🏆 Our Generous Donaters
        </h1>
        <p style={{
          fontSize: '20px',
          maxWidth: '700px',
          margin: '0 auto',
          opacity: 0.95,
          lineHeight: '1.6'
        }}>
          Celebrating the incredible individuals and organizations who make our achievements possible
        </p>
      </div>

      {/* Filter Section */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 20px 40px'
      }}>
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.95)',
          borderRadius: '50px',
          padding: '15px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '10px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.2)'
        }}>
          {prizeTypes.map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              style={{
                padding: '12px 28px',
                border: 'none',
                borderRadius: '25px',
                backgroundColor: filter === type ? '#667eea' : 'transparent',
                color: filter === type ? 'white' : '#667eea',
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                transform: filter === type ? 'scale(1.05)' : 'scale(1)'
              }}
              onMouseEnter={(e) => {
                if (filter !== type) {
                  e.currentTarget.style.backgroundColor = '#f0f0f0';
                }
              }}
              onMouseLeave={(e) => {
                if (filter !== type) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Section */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 20px 80px'
      }}>
        {loading ? (
          <div style={{
            textAlign: 'center',
            padding: '100px 20px',
            color: 'white',
            fontSize: '24px'
          }}>
            <div style={{
              display: 'inline-block',
              width: '50px',
              height: '50px',
              border: '5px solid rgba(255,255,255,0.3)',
              borderTop: '5px solid white',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            <p style={{ marginTop: '20px' }}>Loading amazing donaters...</p>
          </div>
        ) : filteredDonaters.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '100px 20px',
            backgroundColor: 'rgba(255,255,255,0.95)',
            borderRadius: '20px',
            color: '#667eea'
          }}>
            <h3 style={{ fontSize: '28px', marginBottom: '10px' }}>No donaters found</h3>
            <p style={{ fontSize: '18px', opacity: 0.7 }}>Try selecting a different filter</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '30px'
          }}>
            {filteredDonaters.map((donater, index) => (
              <div
                key={donater._id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  position: 'relative',
                  animation: `fadeIn 0.6s ease-out ${index * 0.1}s both`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.2)';
                }}
              >
                {/* Image Container */}
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={donater.photo || 'https://via.placeholder.com/400x300'}
                    alt={donater.donaterName}
                    style={{
                      width: '100%',
                      height: '250px',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  
                  {/* Prize Type Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    backgroundColor: 'rgba(102, 126, 234, 0.95)',
                    color: 'white',
                    padding: '8px 18px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                    backdropFilter: 'blur(10px)'
                  }}>
                    {donater.prizeType}
                  </div>

                  {/* Serial Number */}
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    left: '15px',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    color: '#667eea',
                    width: '45px',
                    height: '45px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                  }}>
                    {index + 1}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '25px' }}>
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#2c3e50',
                    marginBottom: '8px',
                    fontFamily: 'Georgia, serif'
                  }}>
                    {donater.donaterName}
                  </h3>

                  <p style={{
                    fontSize: '18px',
                    color: '#667eea',
                    marginBottom: '20px',
                    fontWeight: '600'
                  }}>
                    {donater.prizeName}
                  </p>

                  <div style={{
                    backgroundColor: '#f8f9fa',
                    borderRadius: '12px',
                    padding: '15px',
                    marginBottom: '15px'
                  }}>
                    <InfoRow icon="🏢" label="Department" value={donater.relatedDepart} />
                    <InfoRow icon="📅" label="Contract Date" value={new Date(donater.contractDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} />
                  </div>

                  <div style={{
                    borderTop: '2px solid #e9ecef',
                    paddingTop: '15px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '18px' }}>📞</span>
                      <a
                        href={`tel:${donater.contactNumber}`}
                        style={{
                          color: '#667eea',
                          textDecoration: 'none',
                          fontSize: '15px',
                          fontWeight: '500'
                        }}
                      >
                        {donater.contactNumber}
                      </a>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '18px' }}>✉️</span>
                      <a
                        href={`mailto:${donater.email}`}
                        style={{
                          color: '#667eea',
                          textDecoration: 'none',
                          fontSize: '15px',
                          fontWeight: '500',
                          wordBreak: 'break-all'
                        }}
                      >
                        {donater.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

const InfoRow: React.FC<{ icon: string; label: string; value: string }> = ({ icon, label, value }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
    fontSize: '14px'
  }}>
    <span style={{ marginRight: '8px', fontSize: '16px' }}>{icon}</span>
    <span style={{ color: '#7f8c8d', fontWeight: '600', marginRight: '8px' }}>
      {label}:
    </span>
    <span style={{ color: '#2c3e50', fontWeight: '500' }}>{value}</span>
  </div>
);

export default DonatersPage;