# 🛒 Products App

Aplicación móvil desarrollada con **React Native** que permite gestionar productos y usuarios.  
Incluye autenticación, registro de cuentas y próximamente un listado de productos.

---

## 🚀 Características principales

- Registro e inicio de sesión de usuarios
- Persistencia de sesión con token seguro
- Pantallas temáticas con componentes personalizados (`ThemedText`, `ThemedButton`, etc.)
- Integración con API REST para productos
- Configuración mediante variables de entorno (`.env`)

---

## 🛠️ Desarrollo

1. Instalar las dependencias:
```bash
   npm i
```

2. Clonar el archivo .env.template, renombrarlo a .env y escribir tus propias credenciales:
```bash
    cp .env.template .env
```

3. Levantar el proyecto:
```bash
    npm start
```

## 📂 Estructura del proyecto
* app/auth/register → Pantalla de registro

* core/auth/actions → Acciones de autenticación (login, register, check-status)

* presentation/auth/store → Store global con Zustand

* presentation/theme → Componentes y hooks de estilo

## 🧪 Pruebas recomendadas
* Probar el flujo de registro en RegisterScreen

* Validar login con credenciales correctas/incorrectas

* Revisar persistencia de sesión en useAuthStore

## ✨ Autor
Errold — Backend & Mobile Developer 🇨🇷 Especializado en React, Next.js, NestJS, Vue.js, React Native, TailwindCSS, Prisma y Node.js

## ✉️ Contacto
[![GitHub](https://img.shields.io/badge/GitHub-Errold146-181717?logo=github)](https://github.com/Errold146)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-ErroldNúñezS-0A66C2?logo=linkedin)](https://linkedin.com/in/errold-núñez-sánchez) 
[![Email](https://img.shields.io/badge/Email-ErroldNúñezS-D14836?logo=gmail)](mailto:errold222@gmail.com)