

import React, { useState, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import Toast from '../toast/toast';


import config from '../../utils/config';
import { useUsuario } from '../../hooks/useUsuario';
import { useCountries } from '../../hooks/useCountries';
import './formulario.css';

const Formulario = () => {
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const { usuario, isLoading: userLoading, loadUserData, updateUser, validationErrors } = useUsuario();
  const { countryOptions, isLoading: countriesLoading } = useCountries();
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);


  const [formData, setFormData] = useState({
    fullname: '',
    country: '',
    address: ''
  });

  const [urlParams, setUrlParams] = useState({
    referrer: '',
    token: '',
    userId: ''
  });

  const [acceptedTerms, setAcceptedTerms] = useState(false);


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const referrer = params.get('referrer') || '/previous-step';
    const token = params.get('token') || '123';

    const userId = extractUserIdFromToken(token);

    setUrlParams({ referrer, token, userId });
    loadUserData(userId);
  }, [loadUserData]);

  const extractUserIdFromToken = (token: string): string => {
    if (token === '123') return 'user_123';
    if (token === '456') return 'user_456';
    return 'user_default';
  };

  useEffect(() => {
    if (usuario) {
      setFormData({
        fullname: usuario.fullname || '',
        country: usuario.country || '',
        address: usuario.address || ''
      });
    }
  }, [usuario]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTermsChange = (checked: boolean) => {
    setAcceptedTerms(checked);
  };

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
  };

  const handleSubmit = async () => {
    if (!captchaValue) {
      setToast({ message: 'Debe completar el captcha', type: 'error' });

      return;
    }

    const success = await updateUser(urlParams.userId, formData);

    if (success) {
      setToast({ message: 'Datos guardados exitosamente', type: 'success' });

      setTimeout(() => {
        const nextUrl = `/checkout/confirmation?referrer=/checkout/review&token=${urlParams.token}`;
        console.log('Redirigiendo a:', nextUrl);
      }, 1500);
    } else {
      setToast({ message: 'Error al guardar los datos', type: 'error' });
    }
  };

  const handleGoBack = () => {
    const backUrl = urlParams.referrer || '/previous-step';
    window.location.href = backUrl;
  };

  if (userLoading || countriesLoading) {
    return (
      <div>
        <div className="nav-header">
          <img
            src="https://http2.mlstatic.com/frontend-assets/ui-navigation/5.21.22/mercadolibre/logo__large_plus.png"
            alt="MercadoLibre"
            className="logo"
          />
        </div>
        <div className="formulario">
          <div className="loading">Cargando datos del usuario...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="nav-header">
        <img
          src="https://http2.mlstatic.com/frontend-assets/ui-navigation/5.21.22/mercadolibre/logo__large_plus.png"
          alt="MercadoLibre"
          className="logo"
        />
      </div>

      {process.env.NODE_ENV === 'development' && (
        <div style={{ padding: '10px', backgroundColor: '#f0f0f0', fontSize: '12px' }}>
          <strong>Debug URL Params:</strong> referrer={urlParams.referrer}, token={urlParams.token}, userId={urlParams.userId}
        </div>
      )}

      <div className="formulario">
        <div className="titulo">
          Revisión de Datos
        </div>
        <div className="subtitulo">
          Verifica que tu información este correcta
        </div>

        <div className="formulario-container">
          <div className="campo">
            <div className="campo-label">Nombre completo</div>
            <input
              type="text"
              className="campo-input"
              placeholder="Ingresá tu nombre completo"
              value={formData.fullname}
              onChange={(e) => handleInputChange('fullname', e.target.value)}
            />
          </div>

          <div className="campo">
            <div className="campo-label">País</div>
            <select
              className="campo-select"
              value={formData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
            >
              <option value="">Seleccioná tu país</option>
              {countryOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="campo">
            <div className="campo-label">Dirección</div>
            <input
              type="text"
              className="campo-input"
              placeholder="Ingresá tu dirección completa"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
            />
          </div>

          {validationErrors.length > 0 && (
            <div className="errores">
              {validationErrors.map((error, index) => (
                <div key={index} className="error-mensaje">
                  {error}
                </div>
              ))}
            </div>
          )}

          <div className="checkbox-container">
            <input type="checkbox" id="sms-whatsapp" className="checkbox" checked={acceptedTerms}
              onChange={(e) => handleTermsChange(e.target.checked)} />
            <label htmlFor="sms-whatsapp" className="checkbox-label">
              Acepto que me contacten por SMS y WhatsApp.
            </label>
          </div>

          <div className="captcha">
            <ReCAPTCHA
              sitekey={config.captchaSiteKey}
              onChange={handleCaptchaChange}
            />
          </div>

          <div className="botones">
            <button
              type="button"
              className={`boton-primario ${(!acceptedTerms || !captchaValue) ? 'boton-disabled' : ''}`}
              onClick={handleSubmit}
              disabled={userLoading || !acceptedTerms || !captchaValue}
            >
              {userLoading ? 'Actualizando...' : 'Continuar'}
            </button>
            <button
              type="button"
              className="boton-secundario"
              onClick={handleGoBack}
            >
              Volver
            </button>
          </div>
        </div>
      </div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Formulario;