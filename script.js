function login() {
    const username = document.getElementById("username").value;
    if (username) {
        document.getElementById("login-screen").style.display = "none";
        document.getElementById("category-screen").style.display = "block";
    } else {
        alert("Por favor, ingresa un nombre de usuario.");
    }
}

// Variables globales
let currentCategory = "";
let currentDifficulty = "";
let currentQuestionIndex = 0;
let score = 0;
let questions = [];

// Base de preguntas
const questionsDB = {
    Matemáticas: {
        Fácil: [
            { question: "¿Cuánto es 3 + 5?", options: ["6", "7", "8"], answer: "8" },
            { question: "¿Cuánto es 10 - 7?", options: ["2", "3", "5"], answer: "3" },
            { question: "¿Cuánto es 4 x 2?", options: ["6", "8", "10"], answer: "8" },
            { question: "¿Cuánto es 9 ÷ 3?", options: ["2", "3", "4"], answer: "3" },
        ],
        Medio: [
            { question: "¿Cuál es el resultado de 12 + 8?", options: ["18", "20", "22"], answer: "20" },
            { question: "¿Cuál es el resultado de 15 ÷ 3?", options: ["4", "5", "6"], answer: "5" },
            { question: "¿Qué número es mayor: 19 o 23?", options: ["19", "23", "Iguales"], answer: "23" },
            { question: "¿Cuánto es 2³?", options: ["6", "8", "9"], answer: "8" },
        ],
        Difícil: [
            { question: "¿Cuál es la raíz cuadrada de 64?", options: ["6", "7", "8"], answer: "8" },
            { question: "Resuelve: 5 + (3 x 2) - 4.", options: ["7", "9", "11"], answer: "9" },
            { question: "¿Cuánto es 7! (factorial)?", options: ["4030", "5040", "6040"], answer: "5040" },
            { question: "¿Cuál es el valor aproximado de √2?", options: ["1.41", "1.5", "1.61"], answer: "1.41" },
        ],
    },
    Literatura: {
        Fácil: [
            { question: "¿Quién escribió 'Cien años de soledad'?", options: ["Cervantes", "Gabriel García Márquez", "Pablo Neruda"], answer: "Gabriel García Márquez" },
            { question: "¿Quién es el autor de 'Romeo y Julieta'?", options: ["William Shakespeare", "Victor Hugo", "Charles Dickens"], answer: "William Shakespeare" },
            { question: "¿Qué tipo de texto es un poema?", options: ["Narrativo", "Lírico", "Argumentativo"], answer: "Lírico" },
            { question: "¿Qué género pertenece a 'El Quijote'?", options: ["Novela", "Ensayo", "Cuento"], answer: "Novela" },
        ],
        Medio: [
            { question: "¿Qué escritor es conocido como 'El bardo de Avon'?", options: ["Hemingway", "Shakespeare", "Goethe"], answer: "Shakespeare" },
            { question: "¿Quién escribió 'Don Juan Tenorio'?", options: ["José Zorrilla", "Tirso de Molina", "Lope de Vega"], answer: "José Zorrilla" },
            { question: "¿Qué obra escribió Dante Alighieri?", options: ["La Eneida", "La Divina Comedia", "Fausto"], answer: "La Divina Comedia" },
            { question: "¿Quién escribió 'La Casa de Bernarda Alba'?", options: ["Lorca", "Unamuno", "Valle-Inclán"], answer: "Lorca" },
        ],
        Difícil: [
            { question: "¿Qué autor escribió 'Crimen y Castigo'?", options: ["Tolstoi", "Dostoyevski", "Chejov"], answer: "Dostoyevski" },
            { question: "¿Qué novela escribió George Orwell en 1949?", options: ["Rebelión en la granja", "1984", "La máquina del tiempo"], answer: "1984" },
            { question: "¿Quién escribió 'Los miserables'?", options: ["Balzac", "Hugo", "Proust"], answer: "Hugo" },
            { question: "¿Cuál es el poema más famoso de Edgar Allan Poe?", options: ["El cuervo", "Anabel Lee", "Ulalume"], answer: "El cuervo" },
        ],
    },
    Geografía: {
        Fácil: [
            { question: "¿Cuál es el río más largo del mundo?", options: ["Amazonas", "Nilo", "Yangtsé"], answer: "Amazonas" },
            { question: "¿En qué continente está Brasil?", options: ["África", "América", "Asia"], answer: "América" },
            { question: "¿Cuál es el país más grande del mundo?", options: ["Rusia", "Canadá", "China"], answer: "Rusia" },
            { question: "¿Qué océano está al oeste de América?", options: ["Atlántico", "Pacífico", "Índico"], answer: "Pacífico" },
        ],
        Medio: [
            { question: "¿Cuál es la capital de Australia?", options: ["Sydney", "Melbourne", "Canberra"], answer: "Canberra" },
            { question: "¿Qué cordillera cruza América del Sur?", options: ["Alpes", "Andes", "Rocosas"], answer: "Andes" },
            { question: "¿En qué país está el río Ganges?", options: ["India", "China", "Tailandia"], answer: "India" },
            { question: "¿Qué país tiene forma de bota?", options: ["España", "Italia", "Grecia"], answer: "Italia" },
        ],
        Difícil: [
            { question: "¿Qué país tiene más islas?", options: ["Suecia", "Canadá", "Indonesia"], answer: "Suecia" },
            { question: "¿Qué desierto es el más grande del mundo?", options: ["Sáhara", "Antártico", "Gobi"], answer: "Antártico" },
            { question: "¿Cuál es la ciudad más poblada del mundo?", options: ["Tokio", "Shanghai", "Delhi"], answer: "Tokio" },
            { question: "¿Qué país tiene la mayor cantidad de lagos?", options: ["Canadá", "Rusia", "Estados Unidos"], answer: "Canadá" },
        ],
    },
    Ciencias: {
        Fácil: [
            { question: "¿Qué planeta es conocido como el planeta rojo?", options: ["Venus", "Marte", "Júpiter"], answer: "Marte" },
            { question: "¿Cuál es el animal terrestre más rápido?", options: ["Guepardo", "León", "Antílope"], answer: "Guepardo" },
            { question: "¿Qué órgano bombea la sangre?", options: ["Cerebro", "Corazón", "Pulmones"], answer: "Corazón" },
            { question: "¿Qué gas respiramos?", options: ["Oxígeno", "Nitrógeno", "Helio"], answer: "Oxígeno" },
        ],
        Medio: [
            { question: "¿Cuántos elementos tiene la tabla periodica?", options: ["120", "118", "116"], answer: "118" },
            { question: "¿Cómo se llama el tipo de fluido cuya viscosidad es constante y no depende de la tasa de deformación?", options: ["Fluido Newtoniano", "Fluido viscoelastico", "Fluido No Newtoniano"], answer: "Fluido Newtoniano" },
            { question: "¿Cuántos huesos tiene el ser humano?", options: ["204", "106", "206"], answer: "206" },
            { question: "¿Cuál es la sangre conocida como donante universal?", options: ["Cero negativo", "O positivo", "B negativo"], answer: "Cero negativo" },
        ],
        Difícil: [
            { question: "¿Cuál es la segunda capa de la piel humana?", options: ["Epidermis", "Dermis", "Hypodermis"], answer: "Dermis" },
            { question: "¿Cual es la capa de piel que se renueva?", options: ["Epidermis", "Dermis", "Hypodermis"], answer: "Epidermis" },
            { question: "¿Cuál es la maxima velocidad que pueden correr los conejos?", options: ["10 km/h", "30 km/h", "40 km/h"], answer: "40 km/h" },
            { question:"¿Cada cuanto se renueva la capa de piel Epidermis?", options: ["Entre 3 a 6 días", "Entre 21 y 28 dias", "Entre 15 y 18 días"], answer: "Entre 21 y 28 días" },
        ],
    },
    Deportes: {
        Fácil: [
            { question: "¿Cuántos jugadores hay en un equipo de fútbol?", options: ["10", "11", "12"], answer: "11" },
            { question: "¿Qué deporte se juega en Wimbledon?", options: ["Tenis", "Golf", "Rugby"], answer: "Tenis" },
            { question: "¿En qué país se originó el judo?", options: ["China", "Corea", "Japón"], answer: "Japón" },
            { question: "¿Quién es conocido como 'El Pelusa' en el fútbol?", options: ["Pelé", "Maradona", "Messi"], answer: "Maradona" },
        ],
        Medio: [
            { question: "¿Cuál es la medida de una cancha de baloncesto profesional?", options: ["28x15m", "26x14m", "30x16m"], answer: "28x15m" },
            { question: "¿Cuántos anillos de campeonato tiene Michael Jordan?", options: ["5", "6", "7"], answer: "6" },
            { question: "¿Qué nadador tiene el récord de más medallas olímpicas?", options: ["Mark Spitz", "Michael Phelps", "Ian Thorpe"], answer: "Michael Phelps" },
            { question: "¿En qué país se celebraron los Juegos Olímpicos de 2000?", options: ["Grecia", "Australia", "China"], answer: "Australia" },
        ],
        Difícil: [
            { question: "¿Cuál es el récord mundial de Usain Bolt en los 100 metros?", options: ["9.58s", "9.63s", "9.69s"], answer: "9.58s" },
            { question: "¿Qué país ha ganado más Copas del Mundo de Fútbol?", options: ["Alemania", "Brasil", "Italia"], answer: "Brasil" },
            { question: "¿En qué deporte destaca Simone Biles?", options: ["Natación", "Gimnasia", "Atletismo"], answer: "Gimnasia" },
            { question: "¿Cuál es el Grand Slam de tenis más antiguo?", options: ["Wimbledon", "Roland Garros", "US Open"], answer: "Wimbledon" },
        ],
    },
    Historia: {
        Fácil: [
            { question: "¿Quién fue el primer presidente de los Estados Unidos?", options: ["George Washington", "Abraham Lincoln", "Thomas Jefferson"], answer: "George Washington" },
            { question: "¿En qué año comenzó la Segunda Guerra Mundial?", options: ["1937", "1938", "1939"], answer: "1939" },
            { question: "¿Quién descubrió América?", options: ["Cristóbal Colón", "Hernán Cortés", "Francisco Pizarro"], answer: "Cristóbal Colón" },
            { question: "¿Cuál es la capital del antiguo Imperio Romano?", options: ["Atenas", "Roma", "Constantinopla"], answer: "Roma" },
        ],
        Medio: [
            { question: "¿Qué documento fue firmado en 1215 en Inglaterra?", options: ["La Declaración de Independencia", "La Carta Magna", "El Edicto de Milán"], answer: "La Carta Magna" },
            { question: "¿Quién fue el líder de la Revolución Rusa de 1917?", options: ["Stalin", "Lenin", "Trotski"], answer: "Lenin" },
            { question: "¿En qué año se cayó el Muro de Berlín?", options: ["1987", "1989", "1991"], answer: "1989" },
            { question: "¿Quién fue el primer emperador de China?", options: ["Kublai Kan", "Qin Shi Huang", "Sun Tzu"], answer: "Qin Shi Huang" },
        ],
        Difícil: [
            { question: "¿Cuál fue la primera civilización conocida en la historia?", options: ["Egipcia", "Mesopotámica", "Harappa"], answer: "Mesopotámica" },
            { question: "¿Quién fue el último faraón de Egipto?", options: ["Ramsés II", "Tutankamón", "Cleopatra"], answer: "Cleopatra" },
            { question: "¿Qué país sufrió una guerra civil entre 1936 y 1939?", options: ["Italia", "España", "Francia"], answer: "España" },
            { question: "¿Qué guerra se libró entre 1950 y 1953?", options: ["Guerra de Corea", "Guerra de Vietnam", "Guerra del Golfo"], answer: "Guerra de Corea" },
        ],
    },
    Música: {
        Fácil: [
            { question: "¿Quién es conocido como el 'Rey del Rock'?", options: ["Elvis Presley", "Michael Jackson", "Prince"], answer: "Elvis Presley" },
            { question: "¿Qué grupo de Liverpool se hizo famoso en la década de 1960?", options: ["The Rolling Stones", "The Beatles", "The Who"], answer: "The Beatles" },
            { question: "¿Qué instrumento toca generalmente un baterista?", options: ["Guitarra", "Piano", "Batería"], answer: "Batería" },
            { question: "¿Qué género musical es conocido por sus raíces en el delta del Mississippi?", options: ["Jazz", "Blues", "Reggae"], answer: "Blues" },
        ],
        Medio: [
            { question: "¿Quién compuso la ópera 'La Traviata'?", options: ["Mozart", "Verdi", "Beethoven"], answer: "Verdi" },
            { question: "¿Qué instrumento tocaba Miles Davis?", options: ["Trompeta", "Saxofón", "Piano"], answer: "Trompeta" },
            { question: "¿Cuál es el album musical más reproducido en Spotify?", options: ["Sour de Olivia Rodrigo", "Sweet & Short de Sabrina Carpenter", "HIT ME HARD AND SOFT de Billie Eilish"], answer: "Sour de Olivia Rodrigo" },
            { question: "¿Qué artista es conocido por el álbum 'Thriller'?", options: ["Madonna", "Prince", "Michael Jackson"], answer: "Michael Jackson" },
        ],
        Difícil: [
            { question: "¿Qué compositor escribió la 'Sinfonía nº 9'?", options: ["Mozart", "Bach", "Beethoven"], answer: "Beethoven" },
            { question: "¿Qué banda lanzó el álbum 'The Dark Side of the Moon'?", options: ["Pink Floyd", "Led Zeppelin", "Queen"], answer: "Pink Floyd" },
            { question: "¿Qué cantante es conocida como 'La Reina del Soul'?", options: ["Diana Ross", "Aretha Franklin", "Tina Turner"], answer: "Aretha Franklin" },
            { question: "¿Qué guitarrista es famoso por su actuación en Woodstock?", options: ["Eric Clapton", "Jimi Hendrix", "Jimmy Page"], answer: "Jimi Hendrix" },
        ],
    },
    Cine: {
        Fácil: [
            { question: "¿Quién dirigió 'E.T.'?", options: ["George Lucas", "Steven Spielberg", "James Cameron"], answer: "Steven Spielberg" },
            { question: "¿Qué actor interpretó a Jack en 'Titanic'?", options: ["Brad Pitt", "Leonardo DiCaprio", "Tom Cruise"], answer: "Leonardo DiCaprio" }, 
            { question: "¿Cómo se llama el personaje principal de 'El Rey León'?", options: ["Nala", "Simba", "Mufasa"], answer: "Simba" }, 
            { question: "¿Qué película ganó el Oscar a la Mejor Película en 1994?", options: ["Forrest Gump", "Pulp Fiction", "Cadena Perpetua"], answer: "Forrest Gump" }, 
        ], 
        Medio: [ 
            { question: "¿Quién dirigió 'Pulp Fiction'?", options: ["Martin Scorsese", "Steven Spielberg", "Quentin Tarantino"], answer: "Quentin Tarantino" }, 
            { question: "¿Qué actor interpretó a Forrest Gump?", options: ["Tom Hanks", "Robin Williams", "Kevin Costner"], answer: "Tom Hanks" }, 
            { question: "¿Cómo se le conoce al fenomeno cinematografico más relevante del año 2023?", options: ["Barbenheimer", "Avengers Endgame", "Spider-Man No Way Home"], answer: "Frozen" }, 
            { question: "¿Quién compuso la banda sonora de 'Star Wars'?", options: ["Hans Zimmer", "John Williams", "Danny Elfman"], answer: "John Williams" }, 
        ], 
        Difícil: [ 
            { question: "¿Qué director es conocido por sus películas 'El Resplandor' y 'La Naranja Mecánica'?", options: ["Stanley Kubrick", "Alfred Hitchcock", "Francis Ford Coppola"], answer: "Stanley Kubrick" }, 
            { question: "¿Qué película ganó el primer Oscar a la Mejor Película?", options: ["Alas", "Casablanca", "Lo que el viento se llevó"], answer: "Alas" }, 
            { question: "¿Qué actor protagonizo la pelicula Blade Runner 2049?", options: ["Ryan Gosling", "Joaquin Phoenix", "Jack Nicholson"], answer: "Ryan Gosling" }, 
            { question: "¿Quién dirigió la trilogía de 'El Señor de los Anillos'?", options: ["Peter Jackson", "Steven Spielberg", "George Lucas"], answer: "Peter Jackson" }, 
        ],
    },
};
// Funciones para interactuar
function selectCategory(category) {
    currentCategory = category;
    document.getElementById("category-screen").style.display = "none";
    document.getElementById("difficulty-screen").style.display = "block";
}

function selectDifficulty(difficulty) {
    currentDifficulty = difficulty;
    questions = questionsDB[currentCategory][currentDifficulty];
    currentQuestionIndex = 0;
    score = 0;

    document.getElementById("difficulty-screen").style.display = "none";
    document.getElementById("quiz-screen").style.display = "block";

    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        const questionData = questions[currentQuestionIndex];
        document.getElementById("question").innerText = questionData.question;

        const answersDiv = document.getElementById("answers");
        answersDiv.innerHTML = "";

        questionData.options.forEach((option) => {
            const button = document.createElement("button");
            button.className = "button";
            button.innerText = option;
            button.onclick = () => checkAnswer(option);
            answersDiv.appendChild(button);
        });
    } else {
        showResults();
    }
}

function checkAnswer(selectedOption) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (selectedOption === correctAnswer) {
        score++;
    }
    currentQuestionIndex++;
    showQuestion();
}

function showResults() {
    document.getElementById("quiz-screen").style.display = "none";

    const resultScreen = document.createElement("div");
    resultScreen.className = "container";
    resultScreen.innerHTML = `
        <h1>¡Quiz Finalizado!</h1>
        <h2>Tu puntuación es</h2>
        <div class="score">${score} de ${questions.length}</div>
    `;

    document.body.appendChild(resultScreen);
}

function ReiniciarQuiz(){
}