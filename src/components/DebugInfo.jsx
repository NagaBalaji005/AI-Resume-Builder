import React from 'react';
import { api } from '../services/api';

const DebugInfo = () => {
  const [apiStatus, setApiStatus] = React.useState('Testing...');
  const [testApiStatus, setTestApiStatus] = React.useState('Testing...');
  const [userInfo, setUserInfo] = React.useState('Loading...');
  const [testResults, setTestResults] = React.useState('');
  const [rawResponse, setRawResponse] = React.useState('');

  React.useEffect(() => {
    // Test simple API first
    fetch('/api/simple-test')
      .then(response => {
        console.log('Simple Test API Response:', response);
        return response.text();
      })
      .then(text => {
        console.log('Simple Test API Raw Response:', text);
        setRawResponse('Simple Test Raw: ' + text.substring(0, 200));
        try {
          const data = JSON.parse(text);
          setApiStatus('Simple Test API: ' + JSON.stringify(data));
        } catch (e) {
          setApiStatus('Simple Test API: Invalid JSON - ' + text.substring(0, 100));
        }
      })
      .catch(error => {
        setApiStatus('Simple Test API Error: ' + error.message);
      });

    // Test GET API
    fetch('/api/test-get')
      .then(response => {
        console.log('Test GET API Response:', response);
        return response.text();
      })
      .then(text => {
        console.log('Test GET API Raw Response:', text);
        try {
          const data = JSON.parse(text);
          setTestApiStatus('Test GET API: ' + JSON.stringify(data));
        } catch (e) {
          setTestApiStatus('Test GET API: Invalid JSON - ' + text.substring(0, 100));
        }
      })
      .catch(error => {
        setTestApiStatus('Test GET API Error: ' + error.message);
      });

    // Check user info
    const user = localStorage.getItem('user');
    if (user) {
      setUserInfo('User: ' + user);
    } else {
      setUserInfo('No user found');
    }
  }, []);

  const runTestAuth = async () => {
    try {
      const result = await api.testAuth.signin({ username: 'testuser', password: 'testpass' });
      setTestResults('Test successful: ' + JSON.stringify(result));
    } catch (error) {
      setTestResults('Test failed: ' + error.message);
    }
  };

  const testDirectFetch = async () => {
    try {
      const response = await fetch('/api/test-signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: 'test', password: 'test123' }),
      });
      
      const text = await response.text();
      console.log('Direct fetch response:', text);
      setTestResults('Direct fetch: ' + text.substring(0, 200));
    } catch (error) {
      setTestResults('Direct fetch error: ' + error.message);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Debug Information</h2>
      <div className="space-y-2">
        <p><strong>Health API:</strong> {apiStatus}</p>
        <p><strong>Test Auth API:</strong> {testApiStatus}</p>
        <p><strong>User Info:</strong> {userInfo}</p>
        <p><strong>Current URL:</strong> {window.location.href}</p>
        <p><strong>Raw Response:</strong> {rawResponse}</p>
        <button 
          onClick={runTestAuth}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
        >
          Test Auth API
        </button>
        <button 
          onClick={testDirectFetch}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Direct Fetch Test
        </button>
        {testResults && (
          <p><strong>Test Results:</strong> {testResults}</p>
        )}
      </div>
    </div>
  );
};

export default DebugInfo; 