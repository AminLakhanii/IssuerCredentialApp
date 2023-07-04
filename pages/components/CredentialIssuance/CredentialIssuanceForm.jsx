import React, { useState } from 'react';
import axios from 'axios';
import styles from './credentialIssuanceForm.module.css';

const CredentialIssuanceForm = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    address: '',
    aadhaarCard: null,
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      aadhaarCard: file,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append('fullname', formData.fullname);
    data.append('email', formData.email);
    data.append('phoneNumber', formData.phoneNumber);
    data.append('address', formData.address);
    data.append('aadhaarCard', formData.aadhaarCard);

    try {
      await axios.post('/api/issueCredential', data);
      setFormSubmitted(true);
    } catch (error) {
      console.error('Error issuing credential:', error);
      // You can handle and display the error to the user.
    }
  };

  return (
    <div className={styles.container}>
      <h2>Issue Credential Form</h2>
      {formSubmitted ? (
        <p>Issue credentials form submitted.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <div className={styles.row}>
              <div className={styles.one}>
                <label htmlFor="fullname" className={styles.formlabel}>Full Name</label>
              </div>
              <div className={styles.two}>
                <input
                  className={styles.text}
                  type="text"
                  id="fullname"
                  name="fullname"
                  placeholder="Your full name.."
                  value={formData.fullname}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.one}>
              <label htmlFor="email" className={styles.formlabel}>Email</label>
            </div>
            <div className={styles.two}>
              <input
                className={styles.text}
                type="email"
                id="email"
                name="email"
                placeholder="Your email-id.."
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.one}>
              <label htmlFor="phoneNumber" className={styles.formlabel}>Phone Number</label>
            </div>
            <div className={styles.two}>
              <input
                className={styles.text}
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Your phone no.."
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.one}>
              <label htmlFor="address" className={styles.formlabel}>Address</label>
            </div>
            <div className={styles.two}>
              <input
                className={styles.add}
                type="text"
                id="address"
                name="address"
                placeholder="Your address.."
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.one}>
              <label htmlFor="aadhaarCard" className={styles.formlabel}>Aadhaar Card (PDF)</label>
            </div>
            <div className={styles.two}>
              <input
                className={styles.btn1}
                type="file"
                id="aadhaarCard"
                name="aadhaarCard"
                accept=".pdf"
                onChange={handleFileInputChange}
                required
              />
            </div>
          </div>
          <div className={styles.row}>
            <button type="submit" className={styles.btn}>Issue Credential</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CredentialIssuanceForm;
