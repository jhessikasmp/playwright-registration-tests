
import { test, expect } from '@playwright/test';
import path from 'node:path';


test.beforeEach(async ({ page }) => {
    const arquivo = path.resolve('cadastro.html');
    await page.goto(`file://${arquivo.replace(/\\/g, '/')}`);
});


test('CT-001: nome obrigatório', async ({ page }) => {

    await page.getByLabel('Nome').fill('');
    await page.getByLabel('E-mail').fill('maria@email.com');
    await page.getByLabel('Senha').fill('Senha123');

    const botao = page.getByRole('button', { name: 'Cadastrar' });

    await botao.evaluate(button => {
        button.form.addEventListener('submit', () => {
            button.dataset.submitted = 'true';
        });
    });

    await botao.click();

    await expect(botao).not.toHaveAttribute('data-submitted', 'true');

    const nome = page.getByLabel('Nome');
    const validade = await nome.evaluate(campo => campo.validity.valid);

    expect(validade).toBe(false);
});


test('CT-002: e-mail inválido', async ({ page }) => {

    await page.getByLabel('Nome').fill('Maria Silva');
    await page.getByLabel('E-mail').fill('maria.email.com');
    await page.getByLabel('Senha').fill('Senha123');

    await page.getByRole('button', { name: 'Cadastrar' }).click();

    const email = page.getByLabel('E-mail');
    const validade = await email.evaluate(campo => campo.validity.valid);

     expect(validade).toBe(false);
});

test('CT-003: senha curta', async ({ page }) => {

    await page.getByLabel('Nome').fill('Maria Silva');
    await page.getByLabel('E-mail').fill('maria@email.com');
    await page.getByLabel('Senha').fill('123456');

    await page.getByRole('button', { name: 'Cadastrar' }).click();

    const senha = page.getByLabel('Senha');
    const validade = await senha.evaluate(campo => campo.validity.valid);

    expect(validade).toBe(false);
});

test('CT-004: cadastro com dados válidos', async ({ page }) => {

    await page.getByLabel('Nome').fill('Maria Silva');
    await page.getByLabel('E-mail').fill('maria@email.com');
    await page.getByLabel('Senha').fill('Senha123');

    await page.getByRole('button', { name: 'Cadastrar' }).click();

    await expect(page.getByRole('alert')).toHaveCount(1)
});
