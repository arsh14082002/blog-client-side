import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

const FileUploader = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      if (fileType === 'image/jpeg' || fileType === 'image/jpg') {
        setSelectedFile(URL.createObjectURL(file));
        onFileSelect(file);
        setErrorMessage('');
      } else {
        setErrorMessage('Only JPG and JPEG files are allowed.');
      }
    }
  };

  return (
    <div className="file-uploader">
      {isUploading ? (
        <Loader2 className="loader" />
      ) : (
        <>
          <input type="file" onChange={handleFileChange} accept=".jpg,.jpeg" />
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          {selectedFile && (
            <div className="w-full h-1/2">
              <img src={selectedFile} alt="Preview" className="w-full h-[300px] object-cover" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FileUploader;
