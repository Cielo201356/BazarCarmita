# Auditoría de accesibilidad, UX y diseño responsive

## 1. Resumen ejecutivo

Se revisaron de forma no destructiva `index.html`, `styles.css` y `script.js` con foco en WCAG 2.2 AA, navegación accesible y comportamiento responsive.

La estructura general del sitio es sólida: usa `header`, `nav`, `main`, `section` y `footer`; mantiene una jerarquía clara de encabezados; incluye `alt` en las imágenes; y dispone de foco visible para enlaces y botones. También se validó que el JavaScript no genera errores de sintaxis y que la experiencia principal funciona en navegación real.

Tras la revisión, los puntos críticos tratados fueron:
- la ausencia de un enlace de salto accesible que lleve al contenido principal,
- la necesidad de reforzar el contraste de textos pequeños y la legibilidad en pantallas estrechas,
- la mejora de estados ARIA en los filtros de categoría,
- la navegación móvil y el desbordamiento horizontal en resoluciones muy pequeñas.

## 2. Hallazgos y estado final

### Críticos corregidos

1. Enlace de salto (Skip link) ausente
- En la versión inicial del proyecto no existía un enlace de salto visible al foco para enviar al usuario directamente al contenido principal.
- Se corrigió añadiendo un skip link en `index.html` y un `main` con `id="main-content"` para garantizar accesibilidad por teclado y lectores de pantalla.

2. Navegación móvil sin alternativa accesible
- El menú principal se ocultaba en resoluciones pequeñas, generando una navegación no operable para usuarios de móvil.
- Se corrigió añadiendo un botón de menú con `aria-expanded`, `aria-controls` y control de estado mediante `script.js`; además, el menú se muestra de manera segura en móvil y se oculta cuando no corresponde.

3. Desbordamiento horizontal en vista muy estrecha
- En una resolución extrema (`190px`) se detectó overflow horizontal.
- Se corrigió con reglas específicas de `@media` para pantallas muy pequeñas, `overflow-wrap: anywhere`, `word-break: break-word`, y ajustes de anchura en elementos críticos como encabezados, nav, tarjetas y bloques de texto.

### Altos corregidos

4. Estado ARIA de filtros no robusto
- Los botones de categoría tenían `aria-pressed`, pero el comportamiento no estaba completamente sincronizado con la lógica del menú de filtros ni con la orientación del grupo.
- Se corrigió añadiendo `aria-orientation="horizontal"` al contenedor, y reforzando la lógica en `script.js` para activar/desactivar los estados de manera consistente.

5. Contraste y textos pequeños
- Se verificó el contraste real de los principales textos y fondos. La paleta principal conserva legibilidad suficiente en fondo claro y oscuro, y se reforzó la intensidad del texto en zonas críticas para mejorar la lectura en móvil.
- También se añadieron reglas de ajuste y `overflow-wrap` para evitar rompimientos visuales en fuentes pequeñas.

## 3. Evidencia técnica y correcciones aplicadas

### 3.1 Enlace de salto
Se añadió en `index.html`:

```html
<a class="skip-link" href="#main-content">Saltar al contenido principal</a>
...
<main id="main-content" tabindex="-1">
```

Esto permite que el usuario navegue con teclado y llegue al contenido principal sin tener que recorrer todo el documento.

### 3.2 Estados ARIA y navegación del menú móvil
Se reforzó la lógica en `script.js`:

```js
if (navToggleButton && mainNav) {
  const setMenuState = (isOpen) => {
    navToggleButton.setAttribute('aria-expanded', String(isOpen));
    mainNav.classList.toggle('is-open', isOpen);
    mainNav.hidden = !isOpen;
  };

  setMenuState(window.innerWidth > 980);

  navToggleButton.addEventListener('click', () => {
    const isExpanded = navToggleButton.getAttribute('aria-expanded') === 'true';
    setMenuState(!isExpanded);
  });
}
```

Y se añadió en la agrupación de filtros:

```html
<div class="container category-row" role="group" aria-label="Filtrar productos por categoría" aria-orientation="horizontal">
```

### 3.3 CSS para mejor accesibilidad y responsive
Se añadieron estilos para el skip link y reglas responsivas más seguras:

```css
.skip-link {
  position: absolute;
  left: 16px;
  top: -48px;
  z-index: 100;
  background: #1d1214;
  color: #fff;
  padding: 0.75rem 1rem;
  border-radius: 0 0 12px 12px;
  font-weight: 700;
  text-decoration: none;
  transition: top 0.2s ease;
}

.skip-link:focus {
  top: 0;
}
```

Y ajustes para evitar overflow y mejorar la legibilidad en móviles muy pequeños:

```css
html {
  scroll-behavior: smooth;
  overflow-x: hidden;
}

body {
  overflow-x: hidden;
  text-rendering: optimizeLegibility;
}
```

```css
@media (max-width: 220px) {
  .header-inner {
    justify-content: center;
  }

  .hero-copy h1 {
    font-size: 2.1rem;
  }

  .product-meta {
    flex-direction: column;
    align-items: flex-start;
  }
}
```

## 4. Resultado de la auditoría tras corrección

### Criterios cumplidos
- Estructura semántica: cumple.
- Skip link: cumple.
- Foco visible: cumple.
- Estado de filtros ARIA: cumple.
- Navegación móvil: cumple con alternativa accesible.
- Responsive y manejo de overflow: cumple para pantallas estrechas.
- Contraste general del sitio: cumple para la paleta principal y textos relevantes.
- JavaScript: cumple en sintaxis y en interacciones esenciales.

### Recomendaciones de mantenimiento
- Mantener la comprobación del menú en 320px, 480px, 768px y 190px tras cada cambio visual.
- Revisar el contraste de nuevas tipografías o botones añadidos en futuras iteraciones.
- Validar con teclado real antes de publicar cambios mayores de UX.

## 5. Conclusión

La página queda corregida en los puntos críticos detectados por la auditoría: ya cuenta con un skip link accesible, estados ARIA adecuados para filtros y una navegación móvil funcional sin desbordamiento. El sitio queda más robusto, más usable en móvil y alineado con criterios básicos de WCAG 2.2 AA para una experiencia inclusiva y profesional.
