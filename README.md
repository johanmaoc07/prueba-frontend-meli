# prueba-frontend-meli

Formulario de revisión de datos del usuario. Esta hecho con React y TypeScript.

## Instalación

**Servidor:**
```bash
cd server
npm install express cors
node index.js
```

**Cliente:**
```bash
cd client
npm install
npm start
```

**Abrir en http://localhost:3000**


**Funcionalidades**
```bash
-Formulario con datos del usuario precargados
-Validaciones desde el front
-Google captcha
-Multiilenguaje (español/portugués)
-Toast para las notificaciones
```

**Arquitectura**
```bash
server/         
client/
  ├── components/   
  ├── hooks/        
  ├── services/     
  ├── context/      
  └── types/        
```

**Tecnico**
```bash
- Uso del Context API en lugar de Redux
- Se realizan las validaciones en front
- Backend con mock simple, enfoque en la arquitectura frontend
```

**Multiidioma**
```bash
Detecta idioma segun el dominio:

URL: ?lang=pt
Dominio: .com.br => PT, .com.ar => ES
```

**Variables de entorno**
```bash
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_CAPTCHA_SITE_KEY=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
```

**Testing**
```bash
cd client
npm test
```











