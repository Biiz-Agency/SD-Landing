// Services data structure
const SERVICES_DATA = {
  categories: [
    {
      id: "asesorias",
      name: "Asesorías Especializadas",
      icon: "psychology",
      items: [
        "Estructura de planta y distribución de áreas",
        "Conformación del sistema sanitario apropiado",
        "Estructura del plan productivo",
        "Desarrollo de producto y formulación",
        "Diseño y rediseño de sistemas de gestión de calidad",
        "Diseño y rediseño de sistemas de gestión de calidad HACCP",
      ],
    },
    {
      id: "estudios",
      name: "Estudios de Factibilidad",
      icon: "analytics",
      items: [
        "Estudio de factibilidad de estructuras y áreas para plantas de alimentos y cárnicas",
        "Estudio y valoración de condiciones y características propias de cada producto para determinar su logística",
      ],
    },
    {
      id: "diagnostico",
      name: "Diagnóstico Integral",
      icon: "search",
      items: [
        "Diagnóstico inicial de planta",
        "Diseño de proyecciones de conversión de plantas, crecimiento, desarrollo e implementación de protocolos",
        "Evaluación del nivel técnico de producción para establecer acciones correctivas",
      ],
    },
    {
      id: "diseno",
      name: "Diseño de Sistemas",
      icon: "architecture",
      items: [
        "Diseño de plantas de alimentos y cárnicas",
        "Diseño de sistemas de gestión de calidad",
        "Diseño de sistemas de gestión de calidad HACCP",
        "Sistema de implementación del SGCI",
        "Sistema de implementación del SGCI HACCP",
        "Sistema organizacional de líneas de producción",
        "Sistema organizacional logístico",
      ],
    },
    {
      id: "auditorias",
      name: "Auditorías y Seguimiento",
      icon: "fact_check",
      items: [
        "Auditorías y seguimiento al cumplimiento normativo",
        "Seguimiento a la implementación del SGCI",
        "Seguimiento a la implementación del plan HACCP",
        "Auditoría del sistema organizacional de líneas de producción",
        "Auditoría y desarrollo del sistema organizacional logístico",
        "Seguimiento a la conservación del flujograma de procesos",
      ],
    },
    {
      id: "administracion",
      name: "Administración y Dirección",
      icon: "business_center",
      items: [
        "Sistemas de gestión de calidad e inocuidad",
        "Plantas de producción",
        "Procesos de transformación",
        "Dirección de proyectos para empresas de alimentos y cárnicas",
        "Sistemas de producción",
        "Dirección del modelo administrativo",
      ],
    },
    {
      id: "analisis-calidad",
      name: "Análisis de Calidad",
      icon: "science",
      items: [
        "Estudio y diseño del método de análisis de calidad del producto",
        "Implementación de los métodos analíticos de calidad e inocuidad del producto",
        "Auditorías y seguimiento a los métodos analíticos de calidad implementados",
      ],
    },
    {
      id: "produccion",
      name: "Optimización de Producción",
      icon: "precision_manufacturing",
      items: [
        "Generación de soluciones a líneas de producción",
        "Asistencia y acompañamiento técnico en la solución de problemas de producción",
        "Evaluación del método de producción en marcha",
        "Estructuración del sistema productivo requerido",
        "Implementación de ciclos de producción",
        "Análisis de ciclos de producción",
        "Solución de problemas de calidad e inocuidad en la producción",
      ],
    },
    {
      id: "tramites-invima",
      name: "Gestión de Trámites INVIMA",
      icon: "assignment",
      items: [
        "Preparación de la planta para certificación en cada eslabón de la cadena productiva",
        "Gestión ante el INVIMA para obtención de registros sanitarios",
        "Notificación sanitaria, permiso sanitario y registro sanitario",
        "Diseño de empaque y etiquetado nutricional",
        "Evaluación y gestión de proveedores",
        "Desarrollo de nuevos productos",
      ],
    },
    {
      id: "analisis-laboratorio",
      name: "Gestión de Análisis Laboratorio",
      icon: "biotech",
      items: [
        "Muestreo para análisis microbiológico",
        "Muestreo para análisis físico-químico",
        "Coordinación con laboratorios certificados",
      ],
    },
  ],
};

// WhatsApp configuration
const WHATSAPP_CONFIG = {
  phoneNumber: "+573232277175",
  baseMessage: "Hola Sergio, estoy interesado en los siguientes servicios:",
};

// Get current year and set it in the footer
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("current-year");
  const currentYear = new Date().getFullYear();
  yearSpan.textContent = currentYear;

  // Handle contact form submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactFormSubmit);
  }

  // Floating WhatsApp Button Logic
  const whatsappButton = document.getElementById("whatsapp-float");
  const contactSection = document.getElementById("contact");

  if (whatsappButton && contactSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Hide button when contact section is visible
            whatsappButton.classList.add("opacity-0", "pointer-events-none");
            whatsappButton.classList.remove(
              "opacity-100",
              "pointer-events-auto"
            );
          } else {
            // Show button when contact section is not visible
            whatsappButton.classList.remove("opacity-0", "pointer-events-none");
            whatsappButton.classList.add("opacity-100", "pointer-events-auto");
          }
        });
      },
      {
        threshold: 0, // Trigger immediately when contact section appears
      }
    );

    observer.observe(contactSection);
  }

  // Initialize details animations
  initDetailsAnimations();
});

/**
 * Capitalize the first letter of each word in a string
 * @param {string} str - The string to capitalize
 * @returns {string} The capitalized string
 */
function capitalizeWords(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Handle contact form submission and redirect to WhatsApp
 * @param {Event} event - Form submit event
 */
function handleContactFormSubmit(event) {
  event.preventDefault();

  // Get form data
  const formData = new FormData(event.target);
  const name = formData.get("name");
  const company = formData.get("company");

  // Get selected services
  const selectedServices = Array.from(
    document.querySelectorAll('input[name="services"]:checked')
  ).map((checkbox) => checkbox.value);

  // Validate that at least one service is selected
  if (selectedServices.length === 0) {
    alert("Por favor, seleccione al menos un servicio de interés.");
    return;
  }

  // Build WhatsApp message dynamically
  let whatsappMessage = "Hola Sergio";

  // Add name if provided
  if (name && name.trim()) {
    const capitalizedName = capitalizeWords(name.trim());
    whatsappMessage += `, soy ${capitalizedName}`;
  }

  // Add company if provided
  if (company && company.trim()) {
    const capitalizedCompany = capitalizeWords(company.trim());
    whatsappMessage += ` de la empresa ${capitalizedCompany}`;
  }

  // Add comma before continuing the message
  whatsappMessage += ",";

  // Add services interest
  whatsappMessage += " estoy interesado en los servicios:\n\n";
  selectedServices.forEach((service, index) => {
    whatsappMessage += `${index + 1}. ${service}\n`;
  });

  // Encode message for URL
  const encodedMessage = encodeURIComponent(whatsappMessage);

  // Build WhatsApp URL
  const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber.replace(
    /[^0-9]/g,
    ""
  )}?text=${encodedMessage}`;

  // Redirect to WhatsApp
  window.open(whatsappUrl, "_blank");
}

/**
 * Get services data as JSON
 * @returns {Object} Services data structure
 */
function getServicesData() {
  return SERVICES_DATA;
}

/**
 * Get service names only
 * @returns {Array<string>} Array of service names
 */
function getServiceNames() {
  return SERVICES_DATA.categories.map((category) => category.name);
}

/**
 * Initialize smooth animations for details elements
 */
function initDetailsAnimations() {
  const detailsElements = document.querySelectorAll("details");

  detailsElements.forEach((details) => {
    const summary = details.querySelector("summary");
    const arrow = summary.querySelector(".transition-transform");

    summary.addEventListener("click", (e) => {
      e.preventDefault();

      // Prevent double clicks messing up animation
      if (details.dataset.isAnimating) return;
      details.dataset.isAnimating = "true";

      if (details.open) {
        // Closing animation
        const startHeight = details.offsetHeight;
        details.style.height = `${startHeight}px`;

        const computedStyle = window.getComputedStyle(details);
        const paddingTop = parseFloat(computedStyle.paddingTop);
        const paddingBottom = parseFloat(computedStyle.paddingBottom);
        const borderTop = parseFloat(computedStyle.borderTopWidth);
        const borderBottom = parseFloat(computedStyle.borderBottomWidth);

        const closedHeight =
          summary.offsetHeight +
          paddingTop +
          paddingBottom +
          borderTop +
          borderBottom;

        requestAnimationFrame(() => {
          details.style.height = `${closedHeight}px`;
          if (arrow) arrow.style.transform = "rotate(0deg)";
        });

        const onTransitionEnd = () => {
          details.removeEventListener("transitionend", onTransitionEnd);
          details.removeAttribute("open");
          details.style.height = null;
          if (arrow) arrow.style.transform = "";
          delete details.dataset.isAnimating;
        };
        details.addEventListener("transitionend", onTransitionEnd);
      } else {
        // Opening animation
        const computedStyle = window.getComputedStyle(details);
        const paddingTop = parseFloat(computedStyle.paddingTop);
        const paddingBottom = parseFloat(computedStyle.paddingBottom);
        const borderTop = parseFloat(computedStyle.borderTopWidth);
        const borderBottom = parseFloat(computedStyle.borderBottomWidth);

        const closedHeight =
          summary.offsetHeight +
          paddingTop +
          paddingBottom +
          borderTop +
          borderBottom;

        details.style.height = `${closedHeight}px`;
        details.setAttribute("open", "");

        const targetHeight = details.scrollHeight;

        requestAnimationFrame(() => {
          details.style.height = `${targetHeight}px`;
          if (arrow) arrow.style.transform = "rotate(180deg)";
        });

        const onTransitionEnd = () => {
          details.removeEventListener("transitionend", onTransitionEnd);
          details.style.height = null;
          if (arrow) arrow.style.transform = "";
          delete details.dataset.isAnimating;
        };
        details.addEventListener("transitionend", onTransitionEnd);
      }
    });
  });
}

// Export for potential use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    SERVICES_DATA,
    WHATSAPP_CONFIG,
    getServicesData,
    getServiceNames,
  };
}
