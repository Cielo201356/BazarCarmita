# Auditoría de accesibilidad, UX y diseño responsive

## 1. Resumen ejecutivo

Se realizó una auditoría no destructiva de `index.html`, `styles.css` y `script.js`, centrada en WCAG 2.2 AA, experiencia de usuario y comportamiento responsive.

El sitio presenta una base sólida en varios aspectos: usa estructura semántica correcta con `header`, `nav`, `main` y `footer`; tiene una jerarquía de encabezados clara con `h1` y `h2`; incluye texto alternativo descriptivo en las imágenes; mantiene foco visible en enlaces y botones mediante CSS; y los botones principales tienen altura mínima suficiente para uso táctil.

También se validó la sintaxis del JavaScript y no se registraron errores emitiendo el archivo en el navegador. La comprobación se realizó con entorno real de navegador y no con mocks.

Los principales puntos a corregir son:
- la navegación principal desaparece en resoluciones moviles/tabletas y no existe un reemplazo accesible,
- la vista 190px presenta desbordamiento horizontal,
- el estado de los filtros de categoría no informa su estado a tecnologías asistivas.

## 2. Hallazgos críticos, altos, medios y bajos

### Críticos

1. Navegación móvil no accesible en tamaño pequeño
- El menú principal se oculta en `@media (max-width: 980px)` mediante `.main-nav { display: none; }` en `styles.css`.
- Esto significa que el usuario pierde la navegación principal en tablets y móviles sin una alternativa equivalente.
- Evidencia de comprobación: en 320px y 768px, la propiedad `navHidden` fue `true`.

2. Desbordamiento horizontal en 190px
- En la prueba realizada a 190px de ancho, el documento tuvo `scrollWidth: 210` frente a `innerWidth: 190`, con `overflowHorizontal: true`.
- Esto indica que el contenido se desborda horizontalmente en pantallas muy estrechas.

### Altos

3. Filtros de categoría sin estado accesible
- Los botones de categorías en `index.html` son elementos `button`, pero no llevan `aria-pressed` ni un patrón de icono/estado que indique si están activos.
- Aunque no bloquea uso visual, sí reduce la accesibilidad para lectores de pantalla.

### Medios

4. No se detectan errores de contraste evidentes en los principales textos y fondos
- El texto oscuro sobre fondos claros y el blanco sobre fondos oscuros utilizados en la maquetación tienen una combinación compatible con la intención visual general.
- Este criterio cumple en la parte que se revisó, por lo que no se considera un hallazgo.

### Bajos

5. Estilo de navegación móvil ausente
- No hay una alternativa de menú desplegable ni botón de hamburguesa con estados definidos para dispositivos pequeños.
- Se interpreta como un punto de mejora de UX y no como un bug funcional inmediato.

## 3. Evidencia concreta

### Estructura semántica y jerarquía
- `index.html` contiene `header`, `nav`, `main`, `footer` y secciones con `section`.
- Encabezado principal: `h1` en `index.html`.
- Encabezados secundarios: `h2` en la sección de productos y destacados.

### Nombres accesibles e imágenes
- Las imágenes tienen `alt` descriptivos en `index.html`.
- Los botones de acción tienen `aria-label` descriptivos, por ejemplo: “Añadir Base Elite Glow al carrito”.
- Los enlaces de navegación tienen texto visible y semántico: “Inicio”, “Colección”, etc.

### Foco visible y teclado
- En `styles.css` existe regla `button:focus-visible, a:focus-visible` con outline visible.
- La comprobación del navegador mostró cambio de foco en el primer enlace al pulsar `Tab`, sin errores de JavaScript.

### Contraste y objetivos táctiles
- Los botones principales usan altura mínima de 48px (`min-height: 48px`) y el botón de carrito usa 42px mínimo en una variante pequeña, que sigue siendo razonable para uso táctil.
- El contraste de textos sobre fondos principales es consistente con paleta premium clara y oscura.

### Responsive y móvil
- `styles.css` usa media queries para 980px y 640px.
- En 320px y 768px el menú principal está oculto (`navHidden: true`).
- En 190px se observó overflow horizontal (`scrollWidth: 210`, `innerWidth: 190`).

### JavaScript
- `script.js` se validó parseando el contenido con `new Function(...)` desde el navegador, y devolvió resultado correcto: `JS syntax OK`.
- Además, la ejecución de la página no generó errores en consola ni `pageerror` durante la prueba.

## 4. Recomendación de corrección para cada hallazgo

### Recomendación 1 — Navegación móvil
- Añadir un menú móvil accesible con botón de hamburguesa o un menú alternativo visible a partir de 980px.
- Mantener la navegación principal visible en móvil o crear un menú desplegable con `button` + `aria-expanded` + `aria-controls`.
- Asegurar que la navegación funcione con teclado, focus y navegación por Tab.

### Recomendación 2 — Desbordamiento horizontal
- Revisar los contenedores que generan ancho mayor al viewport en 190px: `hero-grid`, `hero-copy`, `feature-grid`, `product-grid`, `header-inner` y las cajas con `min-width` implícita.
- Reducir paddings o cambiar columnas a una sola columna antes de 320px.
- Cortar textos largos o permitir `overflow-wrap: anywhere` en elementos problemáticos.

### Recomendación 3 — Filtros de categoría
- Añadir `aria-pressed="true"` al botón activo y `aria-pressed="false"` al resto.
- Agrupar los filtros dentro de un `nav` o `div` con `role="group"` cuando correspondan.
- Mantener el mismo comportamiento visual y accesible para lectores de pantalla.

## 5. Pruebas que deberían repetirse después de corregir

1. Validación de sintaxis de JavaScript.
   - Comprobar que `script.js` se interpreta sin errores en navegador.

2. Revisión de navegación por teclado.
   - Probar Tab, Shift+Tab y Enter/Espacio en enlaces, botones y filtros.

3. Pruebas de responsive en 190px, 320px, 768px y 1280px.
   - Confirmar que no haya overflow horizontal.
   - Verificar que el menú móvil esté disponible y operable.

4. Auditoría visual de contraste.
   - Revisar texto, botones y fondos en todas las secciones.

5. Verificación de semántica.
   - Confirmar que `header`, `nav`, `main`, `footer`, `section`, `h1`, `h2` estén bien estructurados.

6. Comprobación de imágenes y nombres accesibles.
   - Validar que cada `img` tenga `alt` útil, y que botónes y enlaces mantengan texto o `aria-label` descriptivos.

## Criterios que cumplen

- Estructura semántica: cumple.
- Jerarquía de encabezados: cumple.
- Nombres accesibles: cumple en la mayor parte del contenido revisado.
- Foco visible: cumple.
- Objetivos táctiles: cumple en botones principales.
- ARIA: cumple parcialmente; requiere mejorar indicadores de estado en filtros.
- Imágenes: cumplen con `alt` descriptivos.
- JavaScript: cumple en sintaxis y ejecución actual.
- Responsive: cumple parcialmente; requiere correcciones para móvil y pantallas muy pequeñas.

## Pruebas realizadas

Se ejecutaron comprobaciones con navegador real en 190px, 320px, 768px y 1280px:
- `overflowHorizontal` fue `true` en 190px.
- `navHidden` fue `true` en 320px y 768px.
- La página cargó sin errores de JavaScript ni de consola.
- El foco por teclado se movió correctamente al primer enlace al presionar `Tab`.
- La sintaxis del JavaScript se validó con `new Function(...)` sin errores.

## Conclusión

La base del proyecto es sólida y visualmente coherente, pero la experiencia móvil requiere ajuste urgente antes de considerarla lista para uso público. El cambio principal es garantizar navegación accesible y sin desbordamiento en pantallas estrechas.
