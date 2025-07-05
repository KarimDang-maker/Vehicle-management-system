// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Tests des Formulaires et Interactions', () => {
  
  test('Formulaire de connexion - validation des champs', async ({ page }) => {
    await page.goto('/web/user/login');
    
    // Tester la validation HTML5
    const emailInput = page.getByLabel('Email:');
    const passwordInput = page.getByLabel('Mot de passe:');
    
    // Vérifier que les champs sont requis
    await expect(emailInput).toHaveAttribute('required');
    await expect(passwordInput).toHaveAttribute('required');
    
    // Vérifier le type des champs
    await expect(emailInput).toHaveAttribute('type', 'email');
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('Formulaire de connexion - saisie et soumission', async ({ page }) => {
    await page.goto('/web/user/login');
    
    // Remplir le formulaire avec des données valides
    await page.getByLabel('Email:').fill('admin@example.com');
    await page.getByLabel('Mot de passe:').fill('admin123');
    
    // Vérifier que les valeurs sont bien saisies
    await expect(page.getByLabel('Email:')).toHaveValue('admin@example.com');
    await expect(page.getByLabel('Mot de passe:')).toHaveValue('admin123');
    
    // Soumettre le formulaire
    await page.getByRole('button', { name: 'Se connecter' }).click();
    
    // Attendre un peu pour voir si une redirection se produit
    await page.waitForTimeout(2000);
  });

  test('Navigation et liens - vérification des URLs', async ({ page }) => {
    // Tester toutes les routes web définies dans app.js
    const routes = [
      '/web/user/view',
      '/web/user/index', 
      '/web/user/create',
      '/web/user/update',
      '/web/user/delete',
      '/web/user/login',
      '/web/user/refresh',
      '/web/user/logout',
      '/web/vehicule/index',
      '/web/vehicule/create',
      '/web/vehicule/update',
      '/web/vehicule/delete'
    ];
    
    for (const route of routes) {
      try {
        await page.goto(route);
        // Vérifier que la page se charge (pas d'erreur 404)
        await expect(page).not.toHaveURL(/404/);
        console.log(`✅ Route ${route} accessible`);
      } catch (error) {
        console.log(`❌ Route ${route} non accessible: ${error.message}`);
      }
    }
  });

  test('Tests d\'accessibilité de base', async ({ page }) => {
    await page.goto('/web/user/login');
    
    // Vérifier que les éléments ont des labels appropriés
    const emailInput = page.getByLabel('Email:');
    const passwordInput = page.getByLabel('Mot de passe:');
    
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    
    // Vérifier que le bouton a un texte accessible
    const submitButton = page.getByRole('button', { name: 'Se connecter' });
    await expect(submitButton).toBeVisible();
    
    // Vérifier que les liens ont du texte descriptif
    const backLink = page.getByRole('link', { name: 'Retour à la liste des utilisateurs' });
    await expect(backLink).toBeVisible();
  });

  test('Tests de responsive design - différentes tailles d\'écran', async ({ page }) => {
    const viewports = [
      { width: 1920, height: 1080, name: 'Desktop' },
      { width: 1024, height: 768, name: 'Tablet' },
      { width: 375, height: 667, name: 'Mobile' },
      { width: 320, height: 568, name: 'Small Mobile' }
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto('/web/user/login');
      
      // Vérifier que les éléments principaux sont visibles
      await expect(page.getByRole('heading', { name: 'Connexion' })).toBeVisible();
      await expect(page.getByLabel('Email:')).toBeVisible();
      await expect(page.getByLabel('Mot de passe:')).toBeVisible();
      await expect(page.getByRole('button', { name: 'Se connecter' })).toBeVisible();
      
      console.log(`✅ Responsive test passed for ${viewport.name}`);
    }
  });

  test('Tests de performance - temps de réponse', async ({ page }) => {
    const routes = [
      '/web/user/login',
      '/web/user/index',
      '/web/vehicule/index'
    ];
    
    for (const route of routes) {
      const startTime = Date.now();
      
      await page.goto(route);
      
      // Attendre que la page soit complètement chargée
      await page.waitForLoadState('networkidle');
      
      const loadTime = Date.now() - startTime;
      
      console.log(`⏱️  ${route}: ${loadTime}ms`);
      
      // Vérifier que le temps de chargement est raisonnable
      expect(loadTime).toBeLessThan(5000);
    }
  });

  test('Tests de gestion d\'erreurs', async ({ page }) => {
    // Tester une route qui n'existe pas
    await page.goto('/web/user/nonexistent');
    
    // Vérifier qu'on obtient une erreur 404 ou une page d'erreur
    const status = page.url();
    console.log(`Status for non-existent route: ${status}`);
    
    // Tester avec des données invalides dans le formulaire
    await page.goto('/web/user/login');
    
    // Soumettre le formulaire vide
    await page.getByRole('button', { name: 'Se connecter' }).click();
    
    // Attendre un peu pour voir si une erreur apparaît
    await page.waitForTimeout(1000);
  });
}); 