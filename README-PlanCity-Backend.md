# PlanCity --- Guía de implementación del backend

> **Objetivo:** implementar el backend de PlanCity dentro del proyecto
> Next.js existente, utilizando Supabase PostgreSQL, Supabase Storage,
> Prisma y autenticación propia compatible con OAuth.
>
> **Estado:** guía de implementación. No implica que el backend esté
> implementado ni que se hayan ejecutado migraciones.

## 1. Contexto del proyecto

El frontend actual utiliza Next.js con App Router y está organizado bajo
`src/`.

``` text
src/
├── app/
│   ├── admin/
│   ├── (site)/
│   ├── layout.tsx
│   └── globals.css
└── features/
    ├── admin/
    ├── auth/
    ├── categories/
    ├── dashboard/
    ├── events/
    ├── site-shell/
    ├── theme/
    └── users/
```

Se conservará esta estructura. Los componentes visuales, hooks y
servicios frontend existentes no deben moverse ni reemplazarse como
parte de la preparación del backend.

## 2. Arquitectura objetivo

``` text
Navegador
   │
   ▼
Componentes y hooks de src/features/
   │ HTTP / fetch
   ▼
Next.js App Router — src/app/api/
   │
   ▼
Servicios de servidor — src/server/modules/
   │
   ├── Prisma ORM ───────────► Supabase PostgreSQL
   │
   └── Servicio de archivos ─► Supabase Storage (avatars)
```

Responsabilidades:

-   **`src/app/api/`**: endpoints HTTP, validación de entrada y
    respuestas.
-   **`src/server/modules/`**: reglas de negocio, autenticación,
    perfiles y acceso a datos.
-   **`src/server/db/`**: cliente Prisma reutilizable.
-   **`src/server/security/`**: hash de contraseñas, sesiones, permisos
    y validaciones comunes.
-   **`src/features/`**: interfaz, hooks y consumo de la API desde el
    cliente.
-   **`prisma/schema.prisma`**: modelo ORM que refleja las tablas
    existentes.

Todo código que use secretos, Prisma, credenciales administrativas o
acceso a base de datos debe ejecutarse exclusivamente en el servidor. No
se debe importar desde componentes cliente (`"use client"`).

## 3. Base de datos existente

El proyecto Supabase ya tiene estas tablas:

-   `public.users`
-   `public.password_credentials`
-   `public.user_identities`
-   `public.sessions`

También existen los tipos PostgreSQL `user_role`, `user_status` y
`avatar_source`, y el bucket privado de Storage `avatars`.

Entre las columnas confirmadas de `users` están `id`, `name`, `email`,
`role`, `status`, `avatar_url`, `avatar_source`, `avatar_updated_at`,
`avatar_storage_path` y `avatar_provider_url`. La columna `email`
permite `NULL`. Las otras tablas almacenan credenciales, identidades
OAuth y sesiones.

### Reglas para preservar los datos

1.  **No recrear tablas existentes.**
2.  No ejecutar `prisma migrate dev` ni `prisma db push` sobre el
    proyecto Supabase existente sin una revisión explícita del plan y de
    las diferencias.
3.  Antes de escribir `schema.prisma`, inspeccionar el esquema real y
    confirmar todas las columnas, constraints, tipos enum, claves
    foráneas e índices.
4.  Elegir entre introspección (`prisma db pull`) y un esquema Prisma
    revisado manualmente. Revisar siempre el resultado antes de usarlo.
5.  Mantener el SQL y los cambios de esquema versionados en el
    repositorio cuando se acuerde una política de migraciones.

## 4. Preparar el entorno

### Requisitos

-   Node.js compatible con la versión de Next.js del proyecto.
-   npm.
-   Acceso al proyecto Supabase.
-   Credenciales de conexión a PostgreSQL obtenidas desde **Supabase →
    Connect**.
-   Una contraseña de base de datos segura y almacenada fuera del
    repositorio.

Primero, revisar `package.json`, `package-lock.json` y `tsconfig.json`
para conocer las versiones existentes antes de instalar o actualizar
paquetes.

### Dependencias previstas

Seleccionar versiones compatibles con el proyecto antes de instalarlas:

-   `prisma` y `@prisma/client`: acceso tipado a PostgreSQL.
-   Una biblioteca de validación como `zod`.
-   Una implementación mantenida de Argon2id para hash de contraseñas.
-   Una biblioteca criptográfica del runtime Node.js para generar tokens
    aleatorios y calcular hashes.
-   Cliente de Supabase para operaciones de Storage desde el servidor,
    si se elige esa vía.

No instalar todas las dependencias a ciegas ni actualizar Next.js como
parte de esta tarea. Confirmar primero las versiones y el runtime de
despliegue.

## 5. Variables de entorno

Crear o completar `.env.local` en la raíz. No subirlo al repositorio.

Ejemplo de nombres de variables (rellenar con valores reales desde el
panel de Supabase):

``` dotenv
# Conexión PostgreSQL para el servidor / Prisma.
# Usar la cadena adecuada al entorno: directa o pooler.
DATABASE_URL=""

# Solo si Prisma requiere una conexión directa separada para operaciones
# de administración del esquema; confirmar compatibilidad con la versión elegida.
DIRECT_URL=""

# Supabase Storage desde el servidor, si se utiliza el SDK.
NEXT_PUBLIC_SUPABASE_URL=""
SUPABASE_SERVICE_ROLE_KEY=""
```

Notas de seguridad:

-   `DATABASE_URL` y `DIRECT_URL` no deben llevar el prefijo
    `NEXT_PUBLIC_`.
-   `SUPABASE_SERVICE_ROLE_KEY` es un secreto exclusivo del servidor.
    Nunca usarlo en componentes cliente ni exponerlo en respuestas HTTP.
-   `NEXT_PUBLIC_SUPABASE_URL` es una URL pública; no es una contraseña.
-   Si no se usa el SDK de Supabase, no añadir variables de Storage
    innecesarias.
-   No pegar secretos en chats, issues o capturas.
-   Comprobar que `.env.local` esté excluido por `.gitignore`.

## 6. Estructura backend propuesta

``` text
src/
├── app/
│   └── api/
│       ├── auth/
│       │   ├── register/route.ts
│       │   ├── login/route.ts
│       │   ├── logout/route.ts
│       │   ├── me/route.ts
│       │   └── oauth/
│       │       ├── [provider]/route.ts
│       │       └── callback/route.ts
│       └── profile/
│           └── avatar/route.ts
├── server/
│   ├── db/
│   │   └── prisma.ts
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.repository.ts
│   │   │   ├── password.service.ts
│   │   │   ├── session.service.ts
│   │   │   └── oauth/
│   │   └── profile/
│   │       ├── profile.service.ts
│   │       └── avatar.service.ts
│   ├── security/
│   │   ├── require-user.ts
│   │   ├── permissions.ts
│   │   └── validation.ts
│   └── lib/
└── features/                 # frontend existente, conservar
prisma/
└── schema.prisma
```

Esta estructura es orientativa. Ajustarla a las convenciones existentes
sin duplicar utilidades ni crear archivos vacíos.

## 7. Orden de implementación

### Fase 0 --- Auditoría sin cambios

-   Revisar `package.json`, `tsconfig.json`, `next.config.*` y
    componentes actuales de login/registro.
-   Confirmar la versión de Next.js, runtime Node.js y estructura de
    imports.
-   Verificar las tablas, índices, constraints, permisos y RLS reales de
    Supabase.
-   Confirmar si hay datos existentes y cómo se utiliza actualmente
    `avatar_url`.
-   Entregar un plan y un listado de archivos que se crearán o
    modificarán.

**Criterio de salida:** el plan está aprobado antes de tocar el código.

### Fase 1 --- Conexión a PostgreSQL

-   Configurar variables de entorno locales.
-   Configurar Prisma y reflejar el esquema existente.
-   Crear un singleton de Prisma adecuado para desarrollo.
-   Verificar una consulta de lectura desde el servidor.
-   No ejecutar migraciones destructivas ni recrear tablas.

**Criterio de salida:** Next.js puede consultar PostgreSQL desde código
exclusivamente de servidor.

### Fase 2 --- Registro y login con contraseña

-   Validar entradas en el servidor.
-   Normalizar correo electrónico.
-   Hashear contraseñas con Argon2id; nunca almacenar contraseñas en
    texto plano.
-   Crear usuario y credencial de forma transaccional.
-   Evitar filtrar si una cuenta existe cuando no sea necesario.
-   Crear sesiones con tokens criptográficamente aleatorios; almacenar
    solo su hash en la tabla `sessions`.
-   Entregar el token al navegador solo mediante una cookie `HttpOnly`,
    `Secure` en producción y `SameSite` apropiado.
-   Añadir expiración, revocación, cierre de sesión y limitación de
    intentos.

**Criterio de salida:** registro, login, sesión persistente y logout
pasan pruebas de seguridad y funcionalidad.

### Fase 3 --- Autorización

-   Implementar una función de servidor que valide la cookie, el hash de
    sesión, la expiración, la revocación y el estado del usuario.
-   Obtener el rol desde la base de datos, no desde datos editables por
    el cliente.
-   Proteger rutas y operaciones administrativas en el servidor.
-   No confiar únicamente en ocultar botones o páginas del frontend.
-   Mantener bloqueado el acceso directo a tablas desde roles `anon` y
    `authenticated` si todo acceso de la aplicación debe pasar por el
    backend propio.
-   Revisar cuidadosamente el uso de credenciales privilegiadas: RLS no
    sustituye la autorización de la aplicación.

**Criterio de salida:** un usuario normal no puede acceder ni ejecutar
operaciones de administrador alterando peticiones.

### Fase 4 --- OAuth con Google

-   Registrar el cliente OAuth en Google Cloud.
-   Configurar origen JavaScript y URI de redirección autorizados según
    el dominio real y el callback elegido.
-   Generar y validar `state`; utilizar PKCE cuando corresponda.
-   Validar la respuesta OAuth/OIDC y la identidad del proveedor en el
    servidor.
-   Guardar la identidad por `(provider, provider_subject)`, sin confiar
    solo en el correo para vincular cuentas.
-   Definir un proceso seguro de vinculación de cuentas existentes.
-   Crear una sesión propia de PlanCity después de autenticar
    correctamente al usuario.
-   Tratar el correo del proveedor como no verificado hasta comprobar la
    información fiable de verificación.

**Criterio de salida:** login y registro con Google funcionan sin
permitir suplantación ni vinculación insegura de cuentas.

### Fase 5 --- Avatar y Supabase Storage

-   Mantener `avatar_source` con los valores `DEFAULT`, `OAUTH` y
    `UPLOAD`.
-   Usar `avatar_provider_url` para la imagen inicial del proveedor y
    `avatar_storage_path` para el archivo guardado.
-   Mantener `avatar_url` por compatibilidad hasta determinar si
    contiene datos que deban migrarse.
-   Crear o verificar el bucket privado `avatars`.
-   Autorizar operaciones mediante la sesión de PlanCity en el servidor.
-   Validar tamaño, MIME y contenido real del archivo; aceptar solo
    formatos previstos.
-   Restringir rutas a la carpeta del usuario y no confiar en IDs
    enviados por el cliente.
-   No sobrescribir un avatar `UPLOAD` durante logins OAuth posteriores.
-   Eliminar archivos antiguos de forma segura tras confirmar que el
    nuevo archivo se guardó correctamente.

**Criterio de salida:** un usuario puede cambiar su avatar sin acceder
al de otros usuarios.

### Fase 6 --- Conectar módulos existentes

-   Conectar `features/auth` con los endpoints de autenticación.
-   Sustituir progresivamente los datos simulados de `features/users`,
    `features/categories`, `features/events` y `features/dashboard` por
    servicios de API.
-   Implementar autorización de administrador para endpoints de gestión.
-   Mantener componentes y estilos siempre que sea posible.
-   Añadir estados de carga, error, vacío y éxito.

**Criterio de salida:** cada módulo consume datos reales y verifica
permisos en el servidor.

## 8. Endpoints iniciales propuestos

  ----------------------------------------------------------------------------
  Método                  Ruta                         Propósito
  ----------------------- ---------------------------- -----------------------
  `POST`                  `/api/auth/register`         Crear cuenta con
                                                       contraseña.

  `POST`                  `/api/auth/login`            Validar credenciales e
                                                       iniciar sesión.

  `POST`                  `/api/auth/logout`           Revocar sesión y
                                                       limpiar cookie.

  `GET`                   `/api/auth/me`               Obtener el perfil de la
                                                       sesión actual.

  `GET`                   `/api/auth/oauth/google`     Iniciar el flujo OAuth.

  `GET`                   `/api/auth/oauth/callback`   Validar el retorno del
                                                       proveedor y crear
                                                       sesión.

  `POST`                  `/api/profile/avatar`        Subir o reemplazar el
                                                       avatar del usuario
                                                       autenticado.

  `DELETE`                `/api/profile/avatar`        Quitar el avatar
                                                       personalizado, con
                                                       autorización.
  ----------------------------------------------------------------------------

Los métodos y rutas son una propuesta; deben adaptarse a las
convenciones del proyecto antes de implementarse.

## 9. Seguridad obligatoria

-   Nunca enviar secretos de Supabase ni credenciales de PostgreSQL al
    cliente.
-   No confiar en `role`, `user_id`, correo o ruta de archivo enviados
    por el navegador.
-   Hashear contraseñas y tokens de sesión.
-   Usar cookies `HttpOnly` y protecciones apropiadas frente a CSRF.
-   Validar todas las entradas en el servidor.
-   Aplicar limitación de intentos a login y registro.
-   Mantener las respuestas de error libres de SQL, tokens y datos
    sensibles.
-   Revisar CORS, cabeceras y redirecciones OAuth según el despliegue
    real.
-   Probar RLS y privilegios efectivos; habilitar RLS sin políticas ni
    permisos correctos no basta.
-   No exponer una clave `service_role` en variables `NEXT_PUBLIC_*`.
-   Añadir pruebas de acceso no autorizado y escalada de privilegios.

## 10. Pruebas y aceptación

Antes de dar por terminada cada fase, comprobar:

-   Registro válido e inválido.
-   Contraseña incorrecta y usuario inexistente.
-   Cookie ausente, inválida, expirada y revocada.
-   Acceso administrativo con rol normal.
-   Intentos de cambiar el rol desde el cliente.
-   OAuth con `state` incorrecto, callback inválido y cuenta ya
    vinculada.
-   Avatar demasiado grande, tipo no permitido y acceso a archivo ajeno.
-   Reemplazo del avatar sin perder el archivo anterior ante un fallo.
-   Build de producción y comprobación de TypeScript.

## 11. Checklist de progreso

-   [x] Auditar versiones y estructura del proyecto.
-   [x] Verificar esquema y seguridad de Supabase.
-   [x] Reflejar el esquema en Prisma sin recrear tablas; preservar el índice de expresión fuera del modelo ORM.
-   [x] Configurar variables de entorno localmente.
-   [x] Conectar Prisma CLI a PostgreSQL para introspección de solo lectura.
-   [x] Verificar una consulta de Prisma Client (`SELECT 1`) desde código de servidor de Next.js.
-   [x] Implementar registro, login, sesiones y logout (comprobaciones funcionales/seguridad pendientes).
-   [x] Añadir resolución de sesión y helpers de autorización para usuario/admin; restringir las páginas `/admin`.
-   [ ] Aplicar autorización a operaciones de administración cuando se creen sus endpoints (aún no existen).
-   [ ] Implementar Google OAuth.
-   [ ] Implementar avatares privados.
-   [ ] Conectar módulos de frontend a la API.
-   [ ] Ejecutar pruebas y build de producción.

## 12. Regla de trabajo

Implementar por fases pequeñas. Antes de cada fase, indicar archivos a
crear o modificar, dependencias nuevas y riesgos. Después, ejecutar
comprobaciones de TypeScript, lint y build según los scripts disponibles
en `package.json`.

No cambiar estilos ni rediseñar el frontend como parte del backend. No
ejecutar migraciones sobre la base de datos existente sin revisar el
plan y recibir aprobación explícita.
