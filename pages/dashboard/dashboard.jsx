import React from 'react';
import styles from './dashboard.module.css';
import Navbar from './navbar';
import CredentialIssuanceForm from '../components/CredentialIssuance/CredentialIssuanceForm';

const Dashboard = () => {
  const username = 'John Doe'; // Replace with the actual username

  return (
    <div className={styles.container}>
      <Navbar username={username} />
      <img className={styles.img} src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" />
      <div className={styles.content}>
        <h2 className="title">Merchant Kyc issuer and verification</h2>
        <div><CredentialIssuanceForm /></div>
      </div>
    </div>
  );
};

export default Dashboard;
