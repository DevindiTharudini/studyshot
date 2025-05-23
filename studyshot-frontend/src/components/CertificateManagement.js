import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './CertificateManagement.css';

const users = ['Alice', 'Bob', 'Charlie', 'Diana'];
const modules = ['React', 'JavaScript', 'Node.js', 'CSS'];
const certificateTypes = [
  { label: 'Beginner', color: '#4caf50' },      // Green
  { label: 'Intermediate', color: '#2196f3' },  // Blue
  { label: 'Advanced', color: '#f44336' }       // Red
];

const getCertificateColor = (type) => {
  switch(type) {
    case 'Beginner': return '#4caf50';      // Green
    case 'Intermediate': return '#2196f3';  // Blue
    case 'Advanced': return '#f44336';      // Red
    default: return '#333';
  }
};

const congratulatoryMessages = {
  Beginner: "Congratulations on starting your journey! Keep learning and growing.",
  Intermediate: "Great progress! You're mastering the skills step-by-step.",
  Advanced: "Excellent achievement! You're a true expert in this module.",
};

const ProfessionalCertificate = ({ user, module, date, signatureDataURL, certificateType }) => {
  const color = getCertificateColor(certificateType);
  return (
    <div className="professional-certificate" style={{ borderColor: color }}>
      <div className="certificate-header" style={{ backgroundColor: color }}>
        <img src="/images/medal.png" alt="Medal" className="medal-large" />
        <h1>STUDYSHOT</h1>
        <h2>{certificateType.toUpperCase()} CERTIFICATE</h2>
      </div>

      <div className="certificate-body">
        <p className="cert-intro">This certificate is proudly presented to</p>
        <h2 className="cert-user">{user}</h2>
        <p className="cert-module">
          For successfully completing the <strong>{module}</strong> module.
        </p>

        <p className="cert-message">{congratulatoryMessages[certificateType]}</p>

        <div className="date-signature-container">
          <div className="date-section">
            <p><strong>Date Issued</strong></p>
            <p>{date}</p>
          </div>

          <div className="signature-section">
            <p>Authorized Signature</p>
            {signatureDataURL ? (
              <img src={signatureDataURL} alt="Signature" className="signature-img" />
            ) : (
              <div className="signature-placeholder">No Signature</div>
            )}
          </div>
        </div>
      </div>

      <div className="certificate-footer">
        <p>Empowering your learning journey</p>
      </div>
    </div>
  );
};

const CertificateManagement = () => {
  const navigate = useNavigate();
  const sigCanvas = useRef(null);

  const [certificates, setCertificates] = useState(() => {
    const saved = localStorage.getItem('certificates');
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    user: users[0],
    module: modules[0],
    date: '',
    certificateType: certificateTypes[0].label,
  });

  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem('certificates', JSON.stringify(certificates));
  }, [certificates]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const clearSignature = () => {
    sigCanvas.current.clear();
  };

  const saveCertificate = (e) => {
    e.preventDefault();
    if (!form.date) {
      setError('Please select a date.');
      return;
    }
    if (sigCanvas.current.isEmpty()) {
      setError('Please provide a signature.');
      return;
    }
    setError('');

    const signatureDataURL = sigCanvas.current.getCanvas().toDataURL('image/png');

    const newCert = {
      id: Date.now(),
      ...form,
      signatureDataURL,
    };

    setCertificates(prev => [...prev, newCert]);
    setForm({
      user: users[0],
      module: modules[0],
      date: '',
      certificateType: certificateTypes[0].label,
    });
    clearSignature();
  };

  const handleDelete = (id) => {
    if (window.confirm('Remove this certificate?')) {
      setCertificates(prev => prev.filter(c => c.id !== id));
    }
  };

  const downloadPDF = (certId) => {
    const element = document.getElementById(`cert-${certId}`);
    if (!element) return;

    html2canvas(element, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'pt',
        format: [canvas.width, canvas.height]
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`Certificate_${certId}.pdf`);
    });
  };

  return (
    <div className="certificate-management">
      <header>
        <h1>Certificate Management</h1>
        <button className="btn-back" onClick={() => navigate('/admin-dashboard')}>
          ← Back to Dashboard
        </button>
      </header>

      <form onSubmit={saveCertificate} className="certificate-form">
        <label>
          User:
          <select name="user" value={form.user} onChange={handleChange}>
            {users.map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </label>
        <label>
          Module:
          <select name="module" value={form.module} onChange={handleChange}>
            {modules.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </label>
        <label>
          Certificate Type:
          <select name="certificateType" value={form.certificateType} onChange={handleChange}>
            {certificateTypes.map(c => (
              <option key={c.label} value={c.label}>{c.label}</option>
            ))}
          </select>
        </label>
        <label>
          Date Issued:
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
        </label>

        <label>
          Signature:
          <SignatureCanvas
            penColor="black"
            canvasProps={{width: 400, height: 150, className: 'sigCanvas'}}
            ref={sigCanvas}
          />
          <button type="button" className="btn-clear" onClick={clearSignature}>Clear Signature</button>
        </label>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="btn-submit">Issue Certificate</button>
      </form>

      <section className="certificate-list">
        <h2>Issued Certificates</h2>
        {certificates.length === 0 ? (
          <p>No certificates issued yet.</p>
        ) : (
          certificates.map(c => (
            <div
              key={c.id}
              id={`cert-${c.id}`}
              className="certificate-card"
            >
              <ProfessionalCertificate
                user={c.user}
                module={c.module}
                date={c.date}
                signatureDataURL={c.signatureDataURL}
                certificateType={c.certificateType}
              />
              <div className="certificate-actions">
                <button className="btn-download" onClick={() => downloadPDF(c.id)}>Download PDF</button>
                <button className="btn-delete" onClick={() => handleDelete(c.id)}>Remove</button>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default CertificateManagement;
