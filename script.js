document.addEventListener('DOMContentLoaded', () => {
    // --- Références aux éléments du DOM ---
    const screens = document.querySelectorAll('.screen'); // Get all screens
    const startScreen = document.getElementById('start-screen');
    const questionScreen = document.getElementById('question-screen');
    const resultsScreen = document.getElementById('results-screen');
    const startButton = document.getElementById('start-button');
    const questionNumberEl = document.getElementById('question-number');
    const optionsContainer = document.getElementById('options-container');
    const nextButton = document.getElementById('next-button');
    const pdfButton = document.getElementById('pdf-button');
    const restartButton = document.getElementById('restart-button');
    const errorMessage = document.getElementById('error-message');
    const progressBar = document.getElementById('progress-bar');
    const resultsChartContainer = document.getElementById('results-chart');
    const dominantProfileDiv = document.getElementById('dominant-profile');

    // --- Données du Questionnaire (inchangé) ---
    const questions = [ /* ... Ton array de questions ici ... */
        // Q1
        { a: "Prudent et réfléchi", b: "Loyal et attentif à autrui", c: "Influent et démonstratif", d: "Stratège et entreprenant" },
        // Q2
        { a: "Sociable et familier", b: "Honnête et discret", c: "Energique et orienté vers le résultat", d: "Méthodique et logique" },
        // Q3
        { a: "Calme et d'humeur égale", b: "Déterminé et aimant diriger", c: "Enjoué et rayonnant", d: "Formaliste et factuel" },
        // Q4
        { a: "Sûr de lui et volontaire", b: "Ordonné et concis", c: "Familier et stable", d: "Loquace et de bonne humeur" },
        // Q5
        { a: "Perspicace et impartial", b: "Exigeant et direct", c: "Constant et attaché aux valeurs", d: "Actif et liant" },
        // Q6
        { a: "Accommodant et serviable", b: "Plein d'espoir et expressif", c: "Puissant et sûr de lui", d: "Pensif et maître de soi" },
        // Q7
        { a: "Ouvert et persuasif", b: "Appliqué et sélectif dans ses relations", c: "Ferme et entreprenant", d: "Posé et analytique" },
        // Q8
        { a: "Déterminé et résolu", b: "Avenant et jovial", c: "Sensible et amical", d: "Logique et correct" },
        // Q9
        { a: "Compatissant et diplomate", b: "Précis et mesuré", c: "Encourageant et ouvert aux idées", d: "Orienté résultat et rapidité" },
        // Q10
        { a: "Responsable et ferme", b: "Réservé et coopératif", c: "Expansif et imaginatif", d: "Meticuleux et minutieux" },
        // Q11
        { a: "Esprit d'équipe et spontané", b: "Contrôlé et rationnel", c: "Aimable et prévenant", d: "Opiniâtre et visant le résultat" },
        // Q12
        { a: "Analyste et sceptique", b: "Amical et divertissant", c: "Exigeant et solide", d: "Modeste et fidèle" },
        // Q13
        { a: "Attaché à ses proches et calme", b: "Affectif et confiant", c: "Observateur et distant", d: "Actif et contrôlant" },
        // Q14
        { a: "Volontaire et tenace", b: "Conforme et sans parti pris", c: "Enthousiaste et attachant", d: "Impliqué et consensuel" },
        // Q15
        { a: "Formel et à principe", b: "Jovial et populaire", c: "Modérateur et apaisant", d: "Ferme et tranchant" },
        // Q16
        { a: "Animé et persuasif", b: "Décideur et pressé", c: "Analytique et aimant la discipline", d: "Tolérant et calme" },
        // Q17
        { a: "Patient et empathique", b: "Logique et mesuré", c: "Orienté résultat et prêt au défi", d: "Ouvert aux idées et arrangeant" },
        // Q18
        { a: "Influent et décontracté", b: "Discret et philosophe", c: "Réfléchi et circonspect", d: "Opiniâtre et déterminé" },
        // Q19
        { a: "Axé procédure et bien préparé", b: "Courageux et autonome", c: "Extraverti et communicatif", d: "Bienveillant et de bon conseil" },
        // Q20
        { a: "Puissant et clair", b: "Spontané et vif", c: "Studieux et raisonné", d: "Paisible et aimant l'harmonie" },
        // Q21
        { a: "Organisé et prudent", b: "Patient et serviable", c: "Argumenté et sûr de lui", d: "Interactif et ouvert" },
        // Q22
        { a: "Indépendant et audacieux", b: "Souple et harmonieux", c: "Factuel et respectueux des normes", d: "Aimable et vivant" },
        // Q23
        { a: "Démonstratif et enthousiaste", b: "Directif et réaliste", c: "Compatissant et prévenant", d: "Attentif et soucieux du détail" },
        // Q24
        { a: "Stable et altruiste", b: "Objectif et hardi", c: "Consciencieux et introspectif", d: "Sociable et bon vivant" },
        // Q25
        { a: "Détaillé et précautionneux", b: "Direct et carré", c: "Expressif et radieux", d: "Tolérant et ferme" }
     ];
    const scoringKey = { /* ... Ton objet scoringKey ici ... */
          1: { a: "Bleu", b: "Vert", c: "Jaune", d: "Rouge" },
          2: { a: "Jaune", b: "Vert", c: "Rouge", d: "Bleu" },
          3: { a: "Vert", b: "Rouge", c: "Jaune", d: "Bleu" },
          4: { a: "Rouge", b: "Bleu", c: "Vert", d: "Jaune" },
          5: { a: "Bleu", b: "Rouge", c: "Vert", d: "Jaune" },
          6: { a: "Vert", b: "Jaune", c: "Rouge", d: "Bleu" },
          7: { a: "Jaune", b: "Vert", c: "Rouge", d: "Bleu" },
          8: { a: "Rouge", b: "Jaune", c: "Vert", d: "Bleu" },
          9: { a: "Vert", b: "Bleu", c: "Jaune", d: "Rouge" },
          10: { a: "Rouge", b: "Vert", c: "Jaune", d: "Bleu" },
          11: { a: "Jaune", b: "Bleu", c: "Vert", d: "Rouge" },
          12: { a: "Bleu", b: "Jaune", c: "Rouge", d: "Vert" },
          13: { a: "Vert", b: "Jaune", c: "Bleu", d: "Rouge" },
          14: { a: "Rouge", b: "Bleu", c: "Jaune", d: "Vert" },
          15: { a: "Bleu", b: "Jaune", c: "Vert", d: "Rouge" },
          16: { a: "Jaune", b: "Rouge", c: "Bleu", d: "Vert" },
          17: { a: "Vert", b: "Bleu", c: "Rouge", d: "Jaune" },
          18: { a: "Jaune", b: "Vert", c: "Bleu", d: "Rouge" },
          19: { a: "Bleu", b: "Rouge", c: "Jaune", d: "Vert" },
          20: { a: "Rouge", b: "Jaune", c: "Bleu", d: "Vert" },
          21: { a: "Bleu", b: "Vert", c: "Rouge", d: "Jaune" },
          22: { a: "Rouge", b: "Vert", c: "Bleu", d: "Jaune" },
          23: { a: "Jaune", b: "Rouge", c: "Vert", d: "Bleu" },
          24: { a: "Vert", b: "Rouge", c: "Bleu", d: "Jaune" },
          25: { a: "Bleu", b: "Rouge", c: "Jaune", d: "Vert" }
        };
    const profileDescriptions = { /* ... Ton objet profileDescriptions ici ... */
        Rouge: "Dominance (D) : Orienté action, résultats, défis. Vous êtes direct, décidé et aimez prendre les devants.",
        Jaune: "Influence (I) : Enthousiaste, sociable, optimiste. Vous êtes persuasif, communicatif et aimez interagir.",
        Vert: "Stabilité (S) : Calme, patient, fiable. Vous êtes à l'écoute, recherchez l'harmonie et appréciez la méthode.",
        Bleu: "Conformité (C) : Précis, analytique, organisé. Vous êtes prudent, respectueux des règles et soucieux des détails."
    };

    // --- État de l'application (inchangé) ---
    let currentQuestionIndex = 0;
    let userAnswers = {};
    let scores = { Rouge: 0, Jaune: 0, Vert: 0, Bleu: 0 };
    let selectedOptionElement = null;

    // --- Fonctions ---

    // Helper pour changer d'écran
    function showScreen(screenToShow) {
        screens.forEach(screen => screen.classList.add('hidden'));
        screenToShow.classList.remove('hidden');
        screenToShow.classList.add('active'); // Utile si on ajoute des transitions CSS
    }


      function startQuiz() {
      console.log("Starting quiz - resetting state"); // Pour débogage
      showScreen(questionScreen); // Affiche l'écran des questions
      currentQuestionIndex = 0;    // Reset index
      userAnswers = {};           // Reset réponses
      scores = { Rouge: 0, Jaune: 0, Vert: 0, Bleu: 0 }; // Reset scores
      dominantProfileDiv.className = 'dominant-profile'; // Reset bordure profil
      resultsChartContainer.innerHTML = ''; // Vider le graphique au cas où
      loadQuestion(); // Charge la Q1 et reset la barre de progression via updateProgressBar
  }

    function updateProgressBar() {
        const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    function loadQuestion() {
        errorMessage.classList.add('hidden');
        nextButton.disabled = true;
        selectedOptionElement = null;

        const question = questions[currentQuestionIndex];
        questionNumberEl.innerHTML = `<i class="fas fa-question-circle"></i> Question ${currentQuestionIndex + 1} / ${questions.length}`;
        optionsContainer.innerHTML = '';

        ['a', 'b', 'c', 'd'].forEach(key => {
            const optionText = question[key];
            const optionDiv = document.createElement('div');
            optionDiv.textContent = optionText;
            optionDiv.dataset.key = key;
            optionDiv.addEventListener('click', handleOptionSelect);
            optionsContainer.appendChild(optionDiv);
        });

        updateProgressBar(); // Mettre à jour la barre de progression

        if (currentQuestionIndex === questions.length - 1) {
            nextButton.innerHTML = 'Voir les résultats <i class="fas fa-poll"></i>';
        } else {
            nextButton.innerHTML = 'Suivant <i class="fas fa-arrow-right"></i>';
        }
    }

    function handleOptionSelect(event) {
        if (selectedOptionElement) {
            selectedOptionElement.classList.remove('selected');
        }
        selectedOptionElement = event.target;
        selectedOptionElement.classList.add('selected');
        userAnswers[currentQuestionIndex + 1] = selectedOptionElement.dataset.key;
        nextButton.disabled = false;
        errorMessage.classList.add('hidden');
    }

    function handleNextButton() {
        if (!userAnswers[currentQuestionIndex + 1]) {
            errorMessage.classList.remove('hidden');
            return;
        }
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            loadQuestion();
        } else {
            calculateResults();
            showResults();
        }
    }

    function calculateResults() {
         scores = { Rouge: 0, Jaune: 0, Vert: 0, Bleu: 0 };
        for (let qNum = 1; qNum <= questions.length; qNum++) {
            const answerKey = userAnswers[qNum];
            if (answerKey && scoringKey[qNum] && scoringKey[qNum][answerKey]) {
                const color = scoringKey[qNum][answerKey];
                scores[color]++;
            }
        }
    }

    function showResults() {
        showScreen(resultsScreen);

        // Afficher les scores textuels
        document.getElementById('score-Rouge').textContent = scores.Rouge;
        document.getElementById('score-Jaune').textContent = scores.Jaune;
        document.getElementById('score-Vert').textContent = scores.Vert;
        document.getElementById('score-Bleu').textContent = scores.Bleu;

        // Trouver le(s) profil(s) dominant(s) et score max
        let dominantProfiles = [];
        let maxScore = 0;
        for (const color in scores) {
             if (scores[color] > maxScore) {
                 maxScore = scores[color];
             }
        }
        // Utiliser une petite marge pour inclure les scores proches du max si besoin
         const tolerance = 0; // Ou 1, 2 pour inclure les scores proches
        for (const color in scores) {
            if (scores[color] >= maxScore - tolerance && maxScore > 0) { // Seulement si au moins 1 point marqué
                dominantProfiles.push(color);
            }
        }

        // Afficher la description
        let descriptionHtml = "";
        if (dominantProfiles.length > 0) {
             descriptionHtml = dominantProfiles
                .map(profile => profileDescriptions[profile])
                .join("<br><br><strong>ET</strong><br><br>");
             // Appliquer le style de bordure
             dominantProfileDiv.classList.remove('dominant-multiple', 'dominant-Rouge', 'dominant-Jaune', 'dominant-Vert', 'dominant-Bleu'); // Reset
             if(dominantProfiles.length > 1) {
                 dominantProfileDiv.classList.add('dominant-multiple');
             } else {
                 dominantProfileDiv.classList.add(`dominant-${dominantProfiles[0]}`);
             }

        } else {
            descriptionHtml = "Impossible de déterminer un profil dominant clair avec ces réponses.";
            dominantProfileDiv.className = 'dominant-profile'; // Reset style si aucun dominant
        }
        document.getElementById('profile-description').innerHTML = descriptionHtml;

        // Générer le graphique
        generateChart(scores, maxScore);
    }

    function generateChart(scoresData, achievedMaxScore) {
        resultsChartContainer.innerHTML = ''; // Vider l'ancien graphique
        const totalPossibleScore = 25; // Ou ajuster si le max théorique est différent
        // Utiliser le score max *atteint* pour une meilleure échelle visuelle, ou totalPossibleScore pour échelle fixe
        const scaleMax = achievedMaxScore > 0 ? achievedMaxScore * 1.1 : 5; // Échelle basée sur le max atteint + 10%, ou 5 min

        ['Rouge', 'Jaune', 'Vert', 'Bleu'].forEach(color => {
            const bar = document.createElement('div');
            bar.classList.add('chart-bar', `bar-${color}`);

            const score = scoresData[color];
            const heightPercentage = (score / scaleMax) * 100; // Hauteur % basée sur l'échelle max
            // Limiter la hauteur à 100% du conteneur
            bar.style.height = `${Math.min(heightPercentage, 100)}%`;

             // Ajouter le label (nom couleur)
             const label = document.createElement('span');
             label.textContent = color;
             bar.appendChild(label);

            // Ajouter la valeur (score) au-dessus
            const scoreValue = document.createElement('span');
            scoreValue.classList.add('score-value');
            scoreValue.textContent = score;
            bar.appendChild(scoreValue);


            resultsChartContainer.appendChild(bar);
        });
    }

     function generatePDF() {
        if (typeof jspdf === 'undefined') {
            alert("La bibliothèque PDF n'a pas pu être chargée.");
            return;
        }
        const { jsPDF } = jspdf;
        const doc = new jsPDF();

        // --- Titre ---
        doc.setFontSize(20);
        doc.setTextColor(60, 60, 60); // Gris foncé
        doc.text("Résultats Questionnaire DISC", doc.internal.pageSize.getWidth() / 2, 25, { align: 'center' });

        // --- Scores ---
        doc.setFontSize(12);
        doc.setTextColor(100, 100, 100); // Gris moyen
        doc.text("Répartition des scores :", 20, 45);

        let yPos = 55;
        const colors = { // Définir les couleurs RGB pour le PDF
            Rouge: [217, 83, 79],
            Jaune: [240, 173, 78],
            Vert: [92, 184, 92],
            Bleu: [66, 139, 202]
        };

        for (const color in scores) {
            const rgb = colors[color];
            doc.setFillColor(rgb[0], rgb[1], rgb[2]);
            // Dessiner un petit rectangle de couleur
            doc.rect(20, yPos - 4, 5, 5, 'F');
            doc.setTextColor(50, 50, 50); // Texte noir/gris foncé
            doc.text(`${color} (${profileDescriptions[color].match(/\((.)\)/)[1]}) :`, 30, yPos); // Ajoute (D), (I), etc.
            doc.setFont(undefined, 'bold'); // Mettre le score en gras
            doc.text(scores[color].toString(), 180, yPos, { align: 'right'}); // Aligner score à droite
            doc.setFont(undefined, 'normal'); // Revenir à la police normale
            yPos += 10;
        }

         // --- Profil Dominant ---
         doc.setFontSize(14);
         doc.setTextColor(60, 60, 60);
         doc.text("Profil(s) Dominant(s) :", 20, yPos + 10);
         yPos += 20;

        let dominantProfiles = [];
        let maxScore = 0;
        for (const color in scores) { if (scores[color] > maxScore) maxScore = scores[color]; }
        for (const color in scores) { if (scores[color] === maxScore && maxScore > 0) dominantProfiles.push(color); }

        doc.setFontSize(11);
        doc.setTextColor(80, 80, 80);
        let profileText = "";
         if (dominantProfiles.length > 0) {
              profileText = dominantProfiles
                 .map(profile => profileDescriptions[profile])
                 .join("\n\n"); // Saut de ligne simple pour PDF
         } else {
             profileText = "Pas de profil dominant clair identifié.";
         }
        const splitDescription = doc.splitTextToSize(profileText, doc.internal.pageSize.getWidth() - 40); // Largeur texte
        doc.text(splitDescription, 20, yPos);


        doc.save("Resultats_DISC_IOTA.pdf");
    }

    // --- Écouteurs d'événements ---
    startButton.addEventListener('click', startQuiz);
    nextButton.addEventListener('click', handleNextButton);
    pdfButton.addEventListener('click', generatePDF);
    restartButton.addEventListener('click', () => {
    console.log("Restart button clicked - showing start screen"); // Pour débogage
    showScreen(startScreen);
}); // Retour simple à l'accueil

    // --- Initialisation ---
      function showScreen(screenToShow) {
      console.log("Attempting to show screen:", screenToShow.id); // Pour débogage
      screens.forEach(screen => {
          screen.classList.add('hidden');
          screen.classList.remove('active');
      });
      screenToShow.classList.remove('hidden');
      screenToShow.classList.add('active');
  } // Afficher l'écran de démarrage au chargement

    // --- Service Worker (inchangé, si tu l'utilises) ---
    if ('serviceWorker' in navigator) { /* ... code du service worker ... */ }
});
