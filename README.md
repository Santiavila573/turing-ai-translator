# Turing-AI-Languages
# Traductor Inteligente de Idiomas con React y IA
<br>
<img width="963" height="770" alt="2025-10-02 16 21 15 (5)" src="https://github.com/user-attachments/assets/fbfd478e-1018-4ae1-8c35-c6f1eedfd5ee" />
<br>
<img width="586" height="692" alt="2025-10-02 16 21 15 (4)" src="https://github.com/user-attachments/assets/cd95bb5c-3ad6-406c-9339-76d1141d281d" />
<br>
<img width="1588" height="767" alt="2025-10-02 16 21 15 (3)" src="https://github.com/user-attachments/assets/8cbc7784-6a61-4e15-9a9c-8a78519ccf7c" />

<br>
<br>
📌 Descripción
Turing-AI-Languages es una aplicación web desarrollada con React que permite traducir texto entre múltiples idiomas de manera rápida y precisa, utilizando modelos de IA. La aplicación está diseñada para ser intuitiva, eficiente y accesible, ideal para usuarios que necesitan traducciones en tiempo real, ya sea para uso personal, académico o profesional.
Con una interfaz moderna y responsiva, Translater-AI-Languages facilita la comunicación global, eliminando barreras lingüísticas y mejorando la productividad.

✨ Características Principales
CaracterísticaDescripciónTraducción en tiempo realTraduce texto al instante entre más de 50 idiomas.Interfaz con ReactDiseño dinámico y responsivo, con componentes reutilizables y estado gestionado con hooks.Integración con IAUtiliza modelos avanzados de IA para garantizar traducciones precisas y contextualizadas.Detección automáticaDetecta el idioma del texto de entrada automáticamente.Historial de traduccionesGuarda las traducciones recientes para referencia futura.

🔧 Tecnologías Utilizadas
TecnologíaDescripciónReactBiblioteca para construir interfaces de usuario dinámicas y escalables.OpenAI APIModelo de lenguaje para realizar traducciones precisas y naturales.AxiosBiblioteca para realizar llamadas HTTP a la API de traducción.CSS ModulesEstilos modulares para mantener el código organizado y escalable.React RouterManejo de rutas para una navegación fluida.


 <img width="657" height="296" alt="image" src="https://github.com/user-attachments/assets/a9316c90-66fd-4036-ba65-60196f3d18ce" />


⚙️ Instalación y Configuración
1. Requisitos previos

Node.js (v18 o superior)
Cuenta en OpenAI o servicio de traducción de IA (para obtener la API key)

2. Clonar el repositorio
 Copygit clone https://github.com/Santiavila573/turing-ai-translator.git
cd translater-ai-languages/client
3. Instalar dependencias
 Copynpm install
4. Configurar la API key
Crea un archivo .env en la raíz del proyecto client/ y agrega tu API key:
 CopyREACT_APP_TRANSLATE_API_KEY=tu_api_key_aqui
5. Ejecutar la aplicación
 Copynpm start

La aplicación estará disponible en http://localhost:3000.


🎯 Funcionalidades Clave

Traducción instantánea: Escribe o pega texto y obtén la traducción al idioma deseado en segundos.
Interfaz amigable: Diseño limpio y fácil de usar, con selección de idiomas mediante menús desplegables.
Historial de traducciones: Accede a tus traducciones anteriores para revisarlas o reutilizarlas.
Detección automática: La aplicación detecta el idioma de origen del texto ingresado.


📊 Ejemplo de Uso

Seleccionar idiomas: Elige el idioma de origen y el idioma de destino.
Ingresar texto: Escribe o pega el texto que deseas traducir.
Obtener traducción: La aplicación muestra la traducción al instante.



🔗 Integración con la API de Traducción
Si deseas integrar la funcionalidad de traducción en tu propia aplicación, puedes hacerlo mediante llamadas a la API. Aquí tienes un ejemplo en JavaScript:
 Copyimport axios from 'axios';

const API_KEY = process.env.REACT_APP_TRANSLATE_API_KEY;
const endpoint = "https://api.translate-ai.com/v1/translate";

const texto = "Hola, ¿cómo estás?";
const idiomaOrigen = "es";
const idiomaDestino = "en";

axios.post(endpoint, {
  text: texto,
  source_lang: idiomaOrigen,
  target_lang: idiomaDestino,
  api_key: API_KEY
})
.then(response => {
  console.log("Traducción:", response.data.translated_text);
})
.catch(error => {
  console.error("Error al traducir:", error);
});

📝 Contribuciones
¡Las contribuciones son bienvenidas! Para colaborar:

Abrir un issue con la propuesta.
Crear un fork del repositorio.
Enviar un pull request con los cambios.


📜 Licencia
Este proyecto está bajo la licencia Apache 2.0. Consulta el archivo LICENSE para más detalles.

📬 Contacto

Autor: Santiago Avila
<br>
Correo: avilasantiago917@ngmail.com
<br>
Linkedin: https://www.linkedin.com/in/santiago-ávila-301047200

