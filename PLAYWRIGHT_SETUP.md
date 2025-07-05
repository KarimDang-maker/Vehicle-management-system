# Configuration Playwright pour les Interfaces Web

## 🎯 Vue d'ensemble

Cette configuration Playwright permet de tester automatiquement toutes les interfaces web de votre système de gestion de véhicules. Les tests couvrent les pages utilisateur et véhicule définies dans `app.js`.

## 📁 Structure des fichiers créés

```
e2e/
├── README.md                    # Documentation des tests
├── test-setup.js               # Configuration et helpers
├── web-interfaces.spec.js      # Tests des interfaces principales
├── forms-interactions.spec.js  # Tests des formulaires
├── workflows.spec.js           # Tests de workflows complets
├── dev-tests.spec.js           # Tests de développement rapides
└── .gitignore                  # Fichiers à ignorer

scripts/
└── test-e2e.js                # Script de lancement des tests

PLAYWRIGHT_SETUP.md             # Ce fichier de documentation
```

## 🚀 Commandes disponibles

### Installation
```bash
# Installer les navigateurs Playwright
npm run playwright:install

# Ou directement
npx playwright install
```

### Tests de base
```bash
# Lancer tous les tests
npm run test:e2e

# Tests rapides de développement
npm run test:e2e:quick

# Tests avec interface graphique
npm run test:e2e:ui

# Tests en mode visible
npm run test:e2e:headed

# Tests en mode debug
npm run test:e2e:debug
```

### Scripts personnalisés
```bash
# Script de développement avec vérifications
npm run test:e2e:dev

# Afficher le rapport HTML
npm run playwright:report
```

## 🧪 Types de tests implémentés

### 1. Tests des interfaces web (`web-interfaces.spec.js`)
- ✅ **Page de connexion** : Formulaire, validation, soumission
- ✅ **Liste des utilisateurs** : Affichage du tableau, navigation
- ✅ **Gestion des véhicules** : Pages de liste et création
- ✅ **Responsive design** : Tests sur différentes tailles d'écran
- ✅ **Performance** : Mesure des temps de chargement

### 2. Tests des formulaires (`forms-interactions.spec.js`)
- ✅ **Validation HTML5** : Attributs required, types de champs
- ✅ **Saisie et soumission** : Tests des formulaires de connexion
- ✅ **Navigation** : Vérification de toutes les routes web
- ✅ **Accessibilité** : Labels, boutons, liens
- ✅ **Gestion d'erreurs** : Tests avec données invalides

### 3. Tests de workflows (`workflows.spec.js`)
- ✅ **Workflows complets** : Connexion → Navigation → Actions
- ✅ **Tests de toutes les routes** : Vérification de 12 routes web
- ✅ **Responsive design complet** : 6 tailles d'écran différentes
- ✅ **Performance et stabilité** : Tests répétés pour la stabilité
- ✅ **Gestion d'erreurs** : Routes inexistantes, données invalides

### 4. Tests de développement (`dev-tests.spec.js`)
- ✅ **Vérification du serveur** : Test de base de l'API
- ✅ **Routes API** : Vérification des endpoints principaux
- ✅ **Routes web principales** : Test des 3 pages principales
- ✅ **Performance rapide** : Test de temps de chargement
- ✅ **Éléments de base** : Vérification des éléments essentiels

## ⚙️ Configuration technique

### Configuration Playwright (`playwright.config.js`)
```javascript
{
  baseURL: 'http://localhost:3000',
  webServer: {
    command: 'npm start',
    url: 'http://localhost:3000',
    timeout: 120000
  },
  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry'
  }
}
```

### Routes testées
**Utilisateurs :**
- `/web/user/login` - Connexion
- `/web/user/index` - Liste des utilisateurs
- `/web/user/create` - Création d'utilisateur
- `/web/user/update` - Modification d'utilisateur
- `/web/user/delete` - Suppression d'utilisateur
- `/web/user/view` - Affichage d'utilisateur
- `/web/user/refresh` - Rafraîchissement
- `/web/user/logout` - Déconnexion

**Véhicules :**
- `/web/vehicule/index` - Liste des véhicules
- `/web/vehicule/create` - Création de véhicule
- `/web/vehicule/update` - Modification de véhicule
- `/web/vehicule/delete` - Suppression de véhicule

## 🔧 Personnalisation

### Ajouter de nouveaux tests
1. Créez un nouveau fichier `.spec.js` dans `e2e/`
2. Importez les helpers depuis `test-setup.js`
3. Utilisez la structure de test Playwright

### Exemple de test personnalisé
```javascript
import { test, expect, helpers, webUrls } from './test-setup.js';

test('Mon nouveau test', async ({ page }) => {
  await page.goto(webUrls.user.login);
  await helpers.waitForPageLoad(page);
  
  // Votre logique de test ici
  await expect(page.getByRole('heading')).toBeVisible();
});
```

### Modifier la configuration
- **Timeouts** : Modifiez `playwright.config.js`
- **Données de test** : Modifiez `test-setup.js`
- **URLs** : Ajoutez vos nouvelles routes dans `webUrls`

## 🐛 Dépannage

### Problèmes courants

1. **Serveur ne démarre pas**
   ```bash
   # Vérifiez que le port 3000 est libre
   npm start
   ```

2. **Tests échouent sur CI**
   - Vérifiez que `process.env.CI` est défini
   - Les timeouts sont plus longs en CI

3. **Éléments non trouvés**
   - Vérifiez les sélecteurs dans vos pages HTML
   - Utilisez `page.pause()` pour déboguer

### Debug des tests
```bash
# Mode debug avec pause
npm run test:e2e:debug

# Interface graphique
npm run test:e2e:ui

# Logs détaillés
DEBUG=pw:api npm run test:e2e
```

## 📊 Rapports et résultats

### Rapports HTML
Les rapports HTML sont générés automatiquement dans `playwright-report/` :
```bash
npm run playwright:report
```

### Captures d'écran et vidéos
- **Screenshots** : Sauvegardés en cas d'échec
- **Vidéos** : Enregistrées en cas d'échec
- **Traces** : Disponibles pour le debug

## 🔄 Intégration continue

### GitHub Actions
```yaml
- name: Install dependencies
  run: npm install

- name: Install Playwright browsers
  run: npm run playwright:install

- name: Run Playwright tests
  run: npm run test:e2e
```

### Variables d'environnement
```bash
# Pour les tests en CI
CI=true npm run test:e2e
```

## 📝 Notes importantes

- ✅ **Serveur automatique** : Le serveur Express démarre automatiquement
- ✅ **Timeouts configurés** : 10s pour les actions, 15s pour la navigation
- ✅ **Captures automatiques** : Screenshots et vidéos en cas d'échec
- ✅ **Tests multi-navigateurs** : Chrome, Firefox, Safari
- ✅ **Responsive design** : Tests sur 6 tailles d'écran différentes
- ✅ **Performance** : Mesure des temps de chargement
- ✅ **Accessibilité** : Tests de base d'accessibilité

## 🎉 Prochaines étapes

1. **Lancer les tests** : `npm run test:e2e:quick`
2. **Voir les rapports** : `npm run playwright:report`
3. **Personnaliser** : Modifiez les tests selon vos besoins
4. **Intégrer en CI** : Ajoutez les tests à votre pipeline

---

**Configuration terminée !** 🚀

Vos interfaces web sont maintenant testées automatiquement avec Playwright. Les tests couvrent tous les aspects essentiels : fonctionnalité, performance, responsive design et accessibilité. 