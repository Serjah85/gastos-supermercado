# 🛒 Control de Gastos Supermercado

App web PWA para controlar gastos del supermercado, comparar precios entre supermercados y analizar el gasto por categorías.

---

## 📁 Estructura del proyecto

```
gastos-supermercado/
├── index.html        ← App completa (HTML + CSS + JS en un solo archivo)
├── manifest.json     ← Configuración PWA (nombre, icono, colores)
├── sw.js             ← Service Worker (funciona offline, cacheo)
├── icon-192.png      ← Icono app 192×192
├── icon-512.png      ← Icono app 512×512
├── netlify.toml      ← Configuración de despliegue en Netlify
└── README.md         ← Este archivo
```

---

## 🚀 Despliegue en GitHub + Netlify (paso a paso)

### PASO 1 — Crear repositorio en GitHub

1. Ve a [github.com](https://github.com) e inicia sesión
2. Pulsa **"New"** (botón verde, arriba a la izquierda)
3. Nombre del repositorio: `gastos-supermercado`
4. Déjalo en **Public** (necesario para Netlify gratuito)
5. **NO** marques "Add README" (ya lo tienes)
6. Pulsa **"Create repository"**

### PASO 2 — Subir los archivos a GitHub

En la página del repositorio vacío:

1. Pulsa **"uploading an existing file"** (o el botón "Add file → Upload files")
2. Arrastra los **6 archivos** del proyecto:
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `icon-192.png`
   - `icon-512.png`
   - `netlify.toml`
3. Escribe un mensaje de commit, ej: `Primera versión`
4. Pulsa **"Commit changes"**

### PASO 3 — Conectar Netlify con GitHub

1. Ve a [netlify.com](https://netlify.com) y crea cuenta gratuita (puedes usar tu cuenta GitHub para registrarte)
2. En el dashboard, pulsa **"Add new site → Import an existing project"**
3. Elige **"Deploy with GitHub"** y autoriza el acceso
4. Selecciona el repositorio `gastos-supermercado`
5. En la configuración de build:
   - **Build command:** (déjalo vacío)
   - **Publish directory:** `.`  (un punto)
6. Pulsa **"Deploy site"**

Netlify tardará ~30 segundos. Te dará una URL del tipo:
```
https://nombre-aleatorio.netlify.app
```

### PASO 4 — Personalizar el dominio (opcional)

En Netlify → Site settings → Domain management:
- Puedes cambiar el nombre a algo como: `gastos-super-arancha.netlify.app`
- O conectar un dominio propio si tienes uno

---

## 🔄 Cómo actualizar la app

Cada vez que hagas cambios y los subas a GitHub, Netlify los despliega **automáticamente en 1-2 minutos**.

Para actualizar desde GitHub web:
1. Ve al repositorio
2. Haz clic en el archivo que quieres modificar (`index.html`)
3. Pulsa el icono del lápiz (editar)
4. Haz tus cambios
5. Pulsa **"Commit changes"**

Netlify detecta el commit y actualiza la app. Arancha verá los cambios en su próxima visita (o la app le avisará si tiene el SW activo).

---

## 📱 Cómo instala Arancha la app en su móvil

### Android (Chrome):
1. Abre la URL en Chrome
2. Aparece un banner "Instalar app" en la pantalla → pulsa "Instalar"
3. La app aparece en el escritorio como app nativa

### iPhone (Safari):
1. Abre la URL en **Safari** (obligatorio, no Chrome en iOS)
2. Pulsa el botón de compartir (cuadrado con flecha hacia arriba)
3. Selecciona **"Añadir a pantalla de inicio"**
4. Pulsa "Añadir"

---

## 🛠 Funcionalidades

- ✅ Múltiples perfiles de usuario
- ✅ Registro rápido (solo total) o detallado (producto a producto)
- ✅ OCR de ticket con cámara del móvil
- ✅ 11 categorías: Fruta, Verdura, Carne, Pescado, Lácteos, Panadería, Bebidas, Limpieza, Higiene, Congelados, Otros
- ✅ 9 supermercados: Mercadona, Carrefour, DIA, Ahorramas, Lidl, Aldi, El Corte Inglés, Amazon Fresh, Otro
- ✅ Dashboard: gasto semanal, mensual, ticket promedio, total del período
- ✅ Estadísticas: tendencia mensual, por categoría, por supermercado
- ✅ Comparador automático de precios entre supermercados
- ✅ Exportar / importar Excel (3 hojas: Compras, Productos, Alertas)
- ✅ Funciona offline (Service Worker)
- ✅ Instalable como PWA en móvil y escritorio

---

## 📋 Roadmap (próximas versiones)

- [ ] Importar PDF / email de pedidos online
- [ ] Lista de la compra previa
- [ ] Comparación de precios en tiempo real con supermercados
- [ ] Notificaciones de alerta de precio

---

Hecho con ❤️ por Alberto · Beta tester: Arancha
