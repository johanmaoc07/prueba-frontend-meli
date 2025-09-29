

import React, { useState, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import Toast from '../toast/toast';
import { useLanguage } from '../../hooks/useLenguaje';



import config from '../../utils/config';
import { useUsuario } from '../../hooks/useUsuario';
import { useCountries } from '../../hooks/useCountries';
import './formulario.css';

const Formulario = () => {
  const { t } = useLanguage();
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
      setToast({ message: t.toast.captchaRequired, type: 'error' });
      return;
    }

    const success = await updateUser(urlParams.userId, formData);

    if (success) {
      setToast({ message: t.toast.saveSuccess, type: 'success' });
      console.log('Datos guardados. En producción redirigiría a confirmación');
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
          <div className="loading">{t.loading}.</div>
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


      <div className="formulario">
        <div className="titulo">
          {t.title}
        </div>
        <div className="subtitulo">
          {t.subtitle}
        </div>

        <div className="formulario-container">
          <div className="campo">
            <div className="campo-label">{t.fullname}</div>
            <input
              type="text"
              className="campo-input"
              placeholder={t.placeholders.fullname}
              value={formData.fullname}
              onChange={(e) => handleInputChange('fullname', e.target.value)}
            />
          </div>

          <div className="campo">
            <div className="campo-label">{t.country}</div>
            <select
              className="campo-select"
              value={formData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
            >
              <option value="">{t.placeholders.country}</option>
              {countryOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="campo">
            <div className="campo-label">{t.address}</div>
            <input
              type="text"
              className="campo-input"
              placeholder={t.placeholders.address}
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
              {t.terms}
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
              {userLoading ? t.buttons.updating : t.buttons.continue}
            </button>
            <button
              type="button"
              className="boton-secundario"
              onClick={handleGoBack}
            >
              {t.buttons.back}
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