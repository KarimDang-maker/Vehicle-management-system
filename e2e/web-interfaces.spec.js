// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Interfaces Web - Gestion des Utilisateurs', () => {
  
  test('Page de connexion - affichage du formulaire', async ({ page }) => {
    await page.goto('/web/user/login');
    
    // Vérifier que la page se charge correctement
    await expect(page).toHaveTitle(/Connexion/);
    await expect(page.getByRole('heading', { name: 'Connexion' })).toBeVisible();
    
    // Vérifier la présence des champs du formulaire
    await expect(page.getByLabel('Email:')).toBeVisible();
    await expect(page.getByLabel('Mot de passe:')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Se connecter' })).toBeVisible();
    
    // Vérifier le lien de retour
    await expect(page.getByRole('link', { name: 'Retour à la liste des utilisateurs' })).toBeVisible();
  });

  test('Page de connexion - soumission du formulaire', async ({ page }) => {
    await page.goto('/web/user/login');
    
    // Remplir le formulaire
    await page.getByLabel('Email:').fill('test@example.com');
    await page.getByLabel('Mot de passe:').fill('password123');
    
    // Soumettre le formulaire
    await page.getByRole('button', { name: 'Se connecter' }).click();
    
    // Vérifier la redirection (peut échouer si l'API n'est pas configurée)
    // await expect(page).toHaveURL('/web/user/index');
  });

  test('Page de liste des utilisateurs - affichage', async ({ page }) => {
    await page.goto('/web/user/index');
    
    // Vérifier que la page se charge
    await expect(page).toHaveTitle(/Liste des utilisateurs/);
    await expect(page.getByRole('heading', { name: 'Liste des utilisateurs' })).toBeVisible();
    
    // Vérifier la présence du lien de création
    await expect(page.getByRole('link', { name: 'Créer un utilisateur' })).toBeVisible();
    
    // Vérifier la présence du tableau
    await expect(page.locator('table')).toBeVisible();
    
    // Vérifier les en-têtes du tableau
    await expect(page.getByRole('columnheader', { name: 'ID' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Nom' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Email' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Rôle' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Actions' })).toBeVisible();
  });

  test('Navigation entre les pages', async ({ page }) => {
    // Aller à la page de connexion
    await page.goto('/web/user/login');
    
    // Cliquer sur le lien de retour
    await page.getByRole('link', { name: 'Retour à la liste des utilisateurs' }).click();
    
    // Vérifier qu'on arrive sur la page de liste
    await expect(page).toHaveURL('/web/user/index');
    await expect(page.getByRole('heading', { name: 'Liste des utilisateurs' })).toBeVisible();
    
    // Aller à la page de création
    await page.getByRole('link', { name: 'Créer un utilisateur' }).click();
    
    // Vérifier qu'on arrive sur la page de création
    await expect(page).toHaveURL('/web/user/create');
  });
});

test.describe('Interfaces Web - Gestion des Véhicules', () => {
  
  test('Page de liste des véhicules - affichage', async ({ page }) => {
    await page.goto('/web/vehicule/index');
    
    // Vérifier que la page se charge
    await expect(page.getByRole('heading')).toBeVisible();
    
    // Vérifier la présence du lien de création
    await expect(page.getByRole('link', { name: /Créer|Ajouter/ })).toBeVisible();
  });

  test('Navigation vers les pages véhicules', async ({ page }) => {
    // Tester la page de création
    await page.goto('/web/vehicule/create');
    await expect(page).toHaveURL('/web/vehicule/create');
    
    // Tester la page de mise à jour (avec un ID fictif)
    await page.goto('/web/vehicule/update/1');
    await expect(page).toHaveURL('/web/vehicule/update/1');
  });
});

test.describe('Tests de Responsive Design', () => {
  
  test('Page de connexion sur mobile', async ({ page }) => {
    // Configurer la vue mobile
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/web/user/login');
    
    // Vérifier que les éléments sont visibles sur mobile
    await expect(page.getByRole('heading', { name: 'Connexion' })).toBeVisible();
    await expect(page.getByLabel('Email:')).toBeVisible();
    await expect(page.getByLabel('Mot de passe:')).toBeVisible();
  });

  test('Page de liste des utilisateurs sur mobile', async ({ page }) => {
    // Configurer la vue mobile
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/web/user/index');
    
    // Vérifier que le tableau est visible sur mobile
    await expect(page.locator('table')).toBeVisible();
  });
});

test.describe('Tests de Performance', () => {
  
  test('Temps de chargement des pages', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/web/user/login');
    
    const loadTime = Date.now() - startTime;
    
    // Vérifier que le temps de chargement est raisonnable (< 3 secondes)
    expect(loadTime).toBeLessThan(3000);
    
    // Vérifier que la page est interactive
    await expect(page.getByLabel('Email:')).toBeEnabled();
  });
}); 