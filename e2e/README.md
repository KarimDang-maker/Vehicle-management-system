# Tests E2E avec Playwright

Ce dossier contient les tests end-to-end pour les interfaces web de votre système de gestion de véhicules.

## 📁 Structure des fichiers

```
e2e/
├── README.md                    # Ce fichier
├── test-setup.js               # Configuration et helpers pour les tests
├── web-interfaces.spec.js      # Tests des interfaces web principales
├── forms-interactions.spec.js  # Tests des formulaires et interactions
└── example.spec.js             # Exemple de test Playwright
```

## 🚀 Commandes disponibles

### Installation et configuration
```bash
# Installer les navigateurs Playwright
npm run playwright:install

# Lancer les tests
npm run test:e2e

# Lancer les tests avec interface graphique
npm run test:e2e:ui

# Lancer les tests en mode visible (headed)
npm run test:e2e:headed

# Lancer les tests en mode debug
npm run test:e2e:debug

# Afficher le rapport HTML
npm run playwright:report
```

## 🧪 Types de tests

### 1. Tests des interfaces web (`web-interfaces.spec.js`)
- **Gestion des utilisateurs** : Tests de la page de connexion, liste des utilisateurs, navigation
- **Gestion des véhicules** : Tests des pages de gestion des véhicules
- **Responsive design** : Tests sur différentes tailles d'écran
- **Performance** : Tests de temps de chargement

### 2. Tests des formulaires (`forms-interactions.spec.js`)
- **Validation des champs** : Vérification des attributs HTML5
- **Saisie et soumission** : Tests des formulaires de connexion
- **Navigation** : Vérification de toutes les routes web
- **Accessibilité** : Tests d'accessibilité de base
- **Gestion d'erreurs** : Tests avec données invalides

## ⚙️ Configuration

### Configuration Playwright (`playwright.config.js`)
- **Base URL** : `http://localhost:3000`
- **Serveur web** : Démarre automatiquement avec `npm start`
- **Timeouts** : 10s pour les actions, 15s pour la navigation
- **Captures** : Screenshots et vidéos en cas d'échec
- **Navigateurs** : Chrome, Firefox, Safari

### Helpers (`test-setup.js`)
- **Fonctions utilitaires** : `waitForPageLoad`, `fillLoginForm`, etc.
- **Données de test** : Utilisateurs valides/invalides
- **URLs** : Toutes les routes web organisées

## 🎯 Routes testées

### Utilisateurs
- `/web/user/login` - Page de connexion
- `/web/user/index` - Liste des utilisateurs
- `/web/user/create` - Création d'utilisateur
- `/web/user/update` - Modification d'utilisateur
- `/web/user/delete` - Suppression d'utilisateur
- `/web/user/view` - Affichage d'utilisateur
- `/web/user/refresh` - Rafraîchissement
- `/web/user/logout` - Déconnexion

### Véhicules
- `/web/vehicule/index` - Liste des véhicules
- `/web/vehicule/create` - Création de véhicule
- `/web/vehicule/update` - Modification de véhicule
- `/web/vehicule/delete` - Suppression de véhicule

## 🔧 Personnalisation

### Ajouter de nouveaux tests
1. Créez un nouveau fichier `.spec.js` dans le dossier `e2e/`
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

## 📊 Rapports

Les rapports HTML sont générés automatiquement dans `playwright-report/`. Pour les visualiser :

```bash
npm run playwright:report
```

## 🔄 Intégration continue

Pour intégrer ces tests dans votre CI/CD :

```yaml
# Exemple GitHub Actions
- name: Install dependencies
  run: npm install

- name: Install Playwright browsers
  run: npm run playwright:install

- name: Run Playwright tests
  run: npm run test:e2e
```

## 📝 Notes importantes

- Les tests supposent que votre serveur Express fonctionne sur le port 3000
- Les tests utilisent des données de test fictives
- Les captures d'écran et vidéos sont sauvegardées en cas d'échec
- Les timeouts sont configurés pour être tolérants aux temps de chargement 