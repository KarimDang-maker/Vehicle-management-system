// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Tests de Développement - Vérifications Rapides', () => {
  
  test('Vérification de base - Serveur accessible', async ({ page }) => {
    // Test simple pour vérifier que le serveur fonctionne
    await page.goto('/');
    
    // Vérifier que la page d'accueil se charge
    await expect(page.locator('body')).toContainText(/API Véhicules est en ligne/);
    console.log('✅ Serveur accessible sur la page d\'accueil');
  });

  test('Vérification des routes API', async ({ page }) => {
    // Tester les routes API principales
    const apiRoutes = [
      '/api/vehicles',
      '/api/users',
      '/api-docs'
    ];
    
    for (const route of apiRoutes) {
      try {
        const response = await page.request.get(`http://localhost:3000${route}`);
        console.log(`✅ API Route ${route}: ${response.status()}`);
      } catch (error) {
        console.log(`❌ API Route ${route}: Erreur - ${error.message}`);
      }
    }
  });

  test('Vérification des routes web principales', async ({ page }) => {
    const webRoutes = [
      '/web/user/login',
      '/web/user/index',
      '/web/vehicule/index'
    ];
    
    for (const route of webRoutes) {
      try {
        await page.goto(route);
        await page.waitForLoadState('domcontentloaded');
        
        // Vérifier que la page ne contient pas d'erreur
        const hasError = await page.evaluate(() => {
          const bodyText = document.body?.textContent || '';
          return bodyText.includes('Cannot GET') ||
                 bodyText.includes('404') ||
                 bodyText.includes('500');
        });
        
        if (!hasError) {
          console.log(`✅ Web Route ${route}: Accessible`);
        } else {
          console.log(`⚠️  Web Route ${route}: Erreur détectée`);
        }
      } catch (error) {
        console.log(`❌ Web Route ${route}: ${error.message}`);
      }
    }
  });

  test('Test de performance rapide', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/web/user/login');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    console.log(`⏱️  Temps de chargement page de connexion: ${loadTime}ms`);
    
    // Vérifier que le temps de chargement est raisonnable
    expect(loadTime).toBeLessThan(5000);
  });

  test('Vérification des éléments de base', async ({ page }) => {
    await page.goto('/web/user/login');
    
    // Vérifier les éléments essentiels
    const elements = [
      { selector: 'h1', text: 'Connexion' },
      { selector: 'input[type="email"]', description: 'Champ email' },
      { selector: 'input[type="password"]', description: 'Champ mot de passe' },
      { selector: 'button[type="submit"]', description: 'Bouton de soumission' }
    ];
    
    for (const element of elements) {
      const isVisible = await page.locator(element.selector).isVisible();
      if (isVisible) {
        console.log(`✅ ${element.description || element.selector}: Visible`);
      } else {
        console.log(`❌ ${element.description || element.selector}: Non visible`);
      }
    }
  });

  test('Test de navigation simple', async ({ page }) => {
    // Test de navigation entre les pages principales
    await page.goto('/web/user/login');
    console.log('✅ Page de connexion chargée');
    
    await page.goto('/web/user/index');
    console.log('✅ Page de liste des utilisateurs chargée');
    
    await page.goto('/web/vehicule/index');
    console.log('✅ Page de liste des véhicules chargée');
  });
}); 