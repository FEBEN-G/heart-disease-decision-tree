import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Beaker, Heart, AlertCircle, CheckCircle2, ChevronRight, Info } from 'lucide-react';

const API_URL = 'http://localhost:8000/predict';

const inputFields = [
  { name: 'age', label: 'Age', type: 'number', placeholder: 'e.g. 45' },
  { name: 'sex', label: 'Sex', type: 'select', options: [{label: 'Male', value: 1}, {label: 'Female', value: 0}] },
  { name: 'cp', label: 'Chest Pain Type (0-3)', type: 'number', placeholder: '0-3' },
  { name: 'trestbps', label: 'Resting Blood Pressure', type: 'number', placeholder: 'mm Hg' },
  { name: 'chol', label: 'Serum Cholestoral', type: 'number', placeholder: 'mg/dl' },
  { name: 'fbs', label: 'Fasting Blood Sugar > 120 mg/dl', type: 'select', options: [{label: 'True', value: 1}, {label: 'False', value: 0}] },
  { name: 'restecg', label: 'Resting Electrocardiographic Results', type: 'number', placeholder: '0-2' },
  { name: 'thalach', label: 'Max Heart Rate Achieved', type: 'number', placeholder: 'e.g. 150' },
  { name: 'exang', label: 'Exercise Induced Angina', type: 'select', options: [{label: 'Yes', value: 1}, {label: 'No', value: 0}] },
  { name: 'oldpeak', label: 'ST Depression', type: 'number', step: '0.1', placeholder: 'e.g. 1.5' },
  { name: 'slope', label: 'Slope of Peak Exercise ST', type: 'number', placeholder: '0-2' },
  { name: 'ca', label: 'Number of Major Vessels', type: 'number', placeholder: '0-4' },
  { name: 'thal', label: 'Thalassemia', type: 'number', placeholder: '1-3' },
];

function App() {
  const [formData, setFormData] = useState({
    age: 57, sex: 1, cp: 0, trestbps: 140, chol: 192, fbs: 0, restecg: 1, thalach: 148, exang: 0, oldpeak: 0.4, slope: 1, ca: 0, thal: 1
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'oldpeak' ? parseFloat(value) : parseInt(value)
    });
  };

  const samples = {
    healthy: { age: 57, sex: 0, cp: 1, trestbps: 130, chol: 236, fbs: 0, restecg: 0, thalach: 174, exang: 0, oldpeak: 0, slope: 1, ca: 1, thal: 2 },
    atRisk: { age: 63, sex: 1, cp: 3, trestbps: 145, chol: 233, fbs: 1, restecg: 0, thalach: 150, exang: 0, oldpeak: 2.3, slope: 0, ca: 0, thal: 1 }
  };

  const loadSample = (type) => {
    setFormData(samples[type]);
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await axios.post(API_URL, formData);
      setResult(response.data);
    } catch (err) {
      setError('Backend connection failed. Make sure the FastAPI server is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '1000px', margin: '40px auto', padding: '20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          style={{ display: 'inline-block', padding: '15px', background: 'rgba(255, 77, 77, 0.1)', borderRadius: '50%', marginBottom: '20px' }}
        >
          <Heart size={48} color="#ff4d4d" fill="#ff4d4d" />
        </motion.div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '10px' }}>Heart Guard <span style={{ color: 'var(--accent)' }}>AI</span></h1>
        <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem' }}>Using Decision Tree Pipeline from Local Machine</p>
        
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <button onClick={() => loadSample('healthy')} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #10b981', background: 'transparent', color: '#10b981', fontSize: '0.9rem' }}>
            Load Healthy Sample
          </button>
          <button onClick={() => loadSample('atRisk')} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #ef4444', background: 'transparent', color: '#ef4444', fontSize: '0.9rem' }}>
            Load At-Risk Sample
          </button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'start' }}>
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="card"
        >
          <h2 style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Activity size={24} color="var(--accent)" /> Patient Metrics
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              {inputFields.map((field) => (
                <div key={field.name} style={{ marginBottom: '15px' }}>
                  <label htmlFor={field.name}>{field.label}</label>
                  {field.type === 'select' ? (
                    <select id={field.name} name={field.name} value={formData[field.name]} onChange={handleChange}>
                      {field.options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                  ) : (
                    <input 
                      type={field.type} 
                      id={field.name} 
                      name={field.name} 
                      step={field.step}
                      placeholder={field.placeholder}
                      value={formData[field.name]} 
                      onChange={handleChange} 
                      required 
                    />
                  )}
                </div>
              ))}
            </div>
            <button 
              type="submit" 
              disabled={loading}
              style={{
                width: '100%',
                padding: '15px',
                marginTop: '10px',
                background: 'linear-gradient(90deg, var(--primary), var(--primary-dark))',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontWeight: '600',
                fontSize: '1rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              {loading ? 'Processing...' : 'Run Diagnostics'} <ChevronRight size={20} />
            </button>
          </form>
        </motion.div>

        <div style={{ position: 'sticky', top: '40px' }}>
          <AnimatePresence mode="wait">
            {!result && !error && !loading && (
              <motion.div 
                key="idle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="card"
                style={{ textAlign: 'center', borderStyle: 'dashed', borderColor: 'var(--glass-border)' }}
              >
                <div style={{ padding: '60px 0' }}>
                  <Beaker size={64} color="var(--text-dim)" style={{ marginBottom: '20px', opacity: 0.3 }} />
                  <h3 style={{ color: 'var(--text-dim)' }}>Awaiting Diagnostics Data</h3>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', marginTop: '10px' }}>
                    Enter patient information to receive an AI-driven prediction.
                  </p>
                </div>
              </motion.div>
            )}

            {loading && (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="card"
                style={{ textAlign: 'center' }}
              >
                <div style={{ padding: '60px 0' }}>
                   <div className="spinner" style={{ 
                     width: '50px', 
                     height: '50px', 
                     border: '3px solid var(--glass)', 
                     borderTopColor: 'var(--accent)', 
                     borderRadius: '50%', 
                     animation: 'spin 1s linear infinite',
                     margin: '0 auto 20px'
                   }}></div>
                   <h3>Analyzing Data...</h3>
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div 
                key="error"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="card"
                style={{ background: 'rgba(220, 38, 38, 0.1)', borderColor: 'rgba(220, 38, 38, 0.2)' }}
              >
                <AlertCircle size={40} color="#ef4444" style={{ marginBottom: '15px' }} />
                <h3 style={{ color: '#ef4444' }}>Connection Error</h3>
                <p style={{ marginTop: '10px', fontSize: '0.9rem' }}>{error}</p>
              </motion.div>
            )}

            {result && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card"
                style={{ 
                  borderTop: `4px solid ${result.prediction === 0 ? '#10b981' : '#ef4444'}`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h2 style={{ fontSize: '1.5rem' }}>Analysis Results</h2>
                  {result.prediction === 0 ? <CheckCircle2 color="#10b981" size={32} /> : <AlertCircle color="#ef4444" size={32} />}
                </div>

                <div style={{ 
                  padding: '25px', 
                  borderRadius: '15px', 
                  background: result.prediction === 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  marginBottom: '20px',
                  textAlign: 'center'
                }}>
                  <h1 style={{ 
                    fontSize: '2rem', 
                    color: result.prediction === 0 ? '#10b981' : '#ef4444',
                    textTransform: 'uppercase',
                    letterSpacing: '2px'
                  }}>
                    {result.status}
                  </h1>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '1rem', marginBottom: '15px', color: 'var(--text-dim)' }}>Confidence Distribution</h3>
                  
                  {/* Healthy Bar */}
                  <div style={{ marginBottom: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: 'var(--text-main)', fontWeight: '500' }}>Healthy</span>
                      <span style={{ fontWeight: '600', color: '#10b981' }}>{result.probabilities ? result.probabilities.Healthy.toFixed(1) : 'N/A'}%</span>
                    </div>
                    <div style={{ width: '100%', height: '10px', background: 'var(--glass)', borderRadius: '10px', overflow: 'hidden' }}>
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${result.probabilities ? result.probabilities.Healthy : 0}%` }}
                        style={{ height: '100%', background: '#10b981' }}
                      />
                    </div>
                  </div>

                  {/* Heart Disease Bar */}
                  <div style={{ marginBottom: '5px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: 'var(--text-main)', fontWeight: '500' }}>Heart Disease</span>
                      <span style={{ fontWeight: '600', color: '#ef4444' }}>{result.probabilities ? result.probabilities['Heart Disease'].toFixed(1) : 'N/A'}%</span>
                    </div>
                    <div style={{ width: '100%', height: '10px', background: 'var(--glass)', borderRadius: '10px', overflow: 'hidden' }}>
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${result.probabilities ? result.probabilities['Heart Disease'] : 0}%` }}
                        style={{ height: '100%', background: '#ef4444' }}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', padding: '15px', background: 'var(--glass)', borderRadius: '10px' }}>
                  <Info size={20} color="var(--accent)" />
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: '1.4' }}>
                    These percentages represent the model's confidence for each classification.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner { border-radius: 50%; }
        input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
      `}} />
    </div>
  );
}

export default App;
