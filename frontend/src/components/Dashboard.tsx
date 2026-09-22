import React, { useEffect, useState } from 'react';
import { Document, fetchDocuments, fetchCurrentUser, logout } from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/common.css';

const Dashboard: React.FC = () => {
  const [docs, setDocs] = useState<Document[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  const [loadingDocs, setLoadingDocs] = useState<boolean>(true);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load current user
    fetchCurrentUser()
      .then((data) => setUsername(data.username))
      .catch(() => setUsername(null))
      .finally(() => setLoadingUser(false));

    // Load documents
    fetchDocuments()
      .then((data) => setDocs(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoadingDocs(false));
  }, []);

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await logout();
      // After logout, reload the page to let Spring Security redirect to login
      window.location.reload();
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark default-color-dark fixed-top">
          <a className="navbar-brand" href="/">
            App Name
          </a>
          {!loadingUser && username && (
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav navbar-right">
                <li className="nav-item">
                  <a style={{ color: '#FFFFFF' }} href="#">
                    {username}
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={handleLogout}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          )}
        </nav>
      </header>

      <div className="container" style={{ marginTop: '80px' }}>
        {username && (
          <>
            <div className="row col-md-9 col-md-offset-2 custyle">
              <h3>Document List</h3>
            </div>

            <div className="row col-md-6 col-md-offset-2 custyle">
              {loadingDocs ? (
                <p>Loading documents...</p>
              ) : error ? (
                <p className="text-danger">Error loading documents: {error}</p>
              ) : docs.length > 0 ? (
                <table className="table table-striped custab">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {docs.map((doc, idx) => (
                      <tr key={idx}>
                        <td>{doc.title}</td>
                        <td>{doc.description}</td>
                        <td className="text-center">
                          <a className="btn btn-info btn-xs" href={doc.link} download>
                            <span className="glyphicon glyphicon-download"></span> Download
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <h5>No document to display</h5>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;