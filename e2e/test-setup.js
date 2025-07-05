// Configuration et helpers pour les tests Playwright
import { test as base } from '@playwright/test';

// Configuration personnalisée pour les tests
export const test = base.extend({
  // Configuration par défaut pour tous les tests
  use: {
    // Timeout plus long pour les tests d'interface web
    actionTimeout: 10000,
    navigationTimeout: 15000,
    
    // Prendre des captures d'écran en cas d'échec
    screenshot: 'only-on-failure',
    
    // Enregistrer les vidéos en cas d'échec
    video: 'retain-on-failure',
  },
});

// Helpers pour les tests
export const helpers = {
  // Attendre que la page soit complètement chargée
  async waitForPageLoad(page) {
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('domcontentloaded');
  },

  // Vérifier qu'une page se charge correctement
  async checkPageLoads(page, expectedTitle) {
    await helpers.waitForPageLoad(page);
    if (expectedTitle) {
      await expect(page).toHaveTitle(new RegExp(expectedTitle, 'i'));
    }
  },

  // Remplir un formulaire de connexion
  async fillLoginForm(page, email, password) {
    await page.getByLabel('Email:').fill(email);
    await page.getByLabel('Mot de passe:').fill(password);
    await page.getByRole('button', { name: 'Se connecter' }).click();
  },

  // Vérifier qu'un élément est visible et cliquable
  async checkElementIsInteractive(page, selector) {
    const element = page.locator(selector);
    await expect(element).toBeVisible();
    await expect(element).toBeEnabled();
  },

  // Attendre et vérifier une redirection
  async waitForRedirect(page, expectedUrl, timeout = 5000) {
    try {
      await page.waitForURL(expectedUrl, { timeout });
      return true;
    } catch (error) {
      console.log(`Redirection attendue vers ${expectedUrl} n'a pas eu lieu`);
      return false;
    }
  }
};

// Configuration des timeouts globaux
export const expect = base.expect;
expect.setDefaultTimeout(30000);

// Données de test
export const testData = {
  validUser: {
    email: 'admin@example.com',
    password: 'admin123'
  },
  invalidUser: {
    email: 'invalid@example.com',
    password: 'wrongpassword'
  },
  testUser: {
    email: 'test@example.com',
    password: 'test123'
  }
};

// URLs des pages web
export const webUrls = {
  user: {
    login: '/web/user/login',
    index: '/web/user/index',
    create: '/web/user/create',
    update: '/web/user/update',
    delete: '/web/user/delete',
    view: '/web/user/view',
    refresh: '/web/user/refresh',
    logout: '/web/user/logout'
  },
  vehicule: {
    index: '/web/vehicule/index',
    create: '/web/vehicule/create',
    update: '/web/vehicule/update',
    delete: '/web/vehicule/delete'
  }
}; 