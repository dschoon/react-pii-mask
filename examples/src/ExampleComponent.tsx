import React from 'react';
import { PIIFilter } from 'react-pii-mask';

export const ExampleComponent: React.FC = () => {
  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>React PII Mask Demo</h1>
      
      <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '1fr 1fr 1fr' }}>
        <section>
          <h2>Automatic Detection</h2>
          <PIIFilter 
            preserveFormat
            maskCharacter="*"
            ignorePatterns={[
              /Random content/i
            ]}
          >
            <div style={{ display: 'grid', gap: '1rem' }}>
              <p>john.doe@example.com</p>
              <p>Ignored content</p>
              <p>123-456-7890</p>
              <p>123-45-6789</p>
              <p>John Doe</p>
            </div>
          </PIIFilter>
        </section>

        <section>
          <h2>Class-based Masking</h2>
          <PIIFilter autoDetect={false} preserveFormat maskCharacter="#">
            <div style={{ display: 'grid', gap: '1rem' }}>
              <p className="email">contact@company.com</p>
              <p className="phone">(555) 123-4567</p>
              <p className="name">Jane Smith</p>
              <p className="pii">Sensitive Information</p>
              <p>Public Information</p>
            </div>
          </PIIFilter>
        </section>

        <section>
          <h2>Auto-Detection Disabled</h2>
          <PIIFilter 
            autoDetect={false} 
            preserveFormat 
            maskCharacter="X"
          >
            <div style={{ display: 'grid', gap: '1rem' }}>
              <p>test@email.com won't be masked</p>
              <p className="pii">But this will be!</p>
              <p>Regular content</p>
            </div>
          </PIIFilter>
        </section>
      </div>
    </div>
  );
};
