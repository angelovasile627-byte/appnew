# Sistem de Previzualizare Blocuri - Documentație

## Cum Funcționează

Aplicația AXXO Builder folosește un sistem **inteligent de previzualizare dinamică** pentru blocurile din sidebar.

### Previzualizări Dinamice vs. Statice

#### 1. Previzualizări Dinamice (Actuală) ✅
- **Locație**: `/app/frontend/src/components/Builder/BlockSidebar.jsx`
- **Funcționează**: Generează previzualizări în timp real din configurația blocurilor
- **Avantaje**:
  - Nu necesită imagini statice
  - Reflectă exact configurația blocului
  - Se actualizează automat când configurația se schimbă
  - Fără costuri de stocare pentru imagini

**Exemple de blocuri cu previzualizări dinamice:**
- ✅ Menu - afișează logo, linkuri, buton, iconițe sociale
- ✅ Hero - afișează imagine, titlu, descriere, buton
- ✅ Hero Parallax - afișează background, overlay, text
- ✅ Features - grilă de caracteristici
- ✅ Gallery - grilă de imagini colorate
- ✅ Footer - layout cu coloane
- ✅ Contact - formular simplu
- ✅ Pricing - carduri de prețuri
- ✅ Testimonial - citat + avatar

#### 2. Previzualizări Statice (Opțional)
- **Locație**: `/app/frontend/public/assets/block-previews/`
- **Utilizare**: Pentru blocuri personalizate sau imagini speciale
- **Format**: PNG, JPG, WebP (400x300px recomandat)

### Adăugare Bloc Nou cu Previzualizare

#### Opțiunea 1: Previzualizare Dinamică (Recomandată)

Adaugă în `BlockSidebar.jsx`:

```javascript
if (config.type === 'nou-bloc') {
  return (
    <div style={{
      background: config.background?.value || '#ffffff',
      padding: '12px',
      height: '100%'
    }}>
      {/* Randează previzualizarea bazată pe config */}
      <div style={{ fontSize: '8px', fontWeight: 'bold' }}>
        {config.title?.text}
      </div>
    </div>
  );
}
```

#### Opțiunea 2: Previzualizare Statică

1. Creează imaginea: `400x300px`
2. Salvează în: `/app/frontend/public/assets/block-previews/nou-bloc.png`
3. Adaugă în `mockBlocks.js`:

```javascript
{
  id: 'nou-bloc-1',
  category: 'nou',
  name: 'Bloc Nou',
  thumbnail: '/assets/block-previews/nou-bloc.png',  // Folosește imagine statică
  config: { /* configurație bloc */ }
}
```

### Structura Previzualizare Hero

Pentru blocurile Hero, sistemul detectează:
- **Background**: culoare, gradient sau imagine
- **Hero Image**: imagine mare deasupra textului (dacă există)
- **Overlay**: strat semi-transparent peste background
- **Conținut**: titlu, descriere, buton

```
┌─────────────────────┐
│   [Hero Image]      │  ← Imagine 45px height (dacă există)
├─────────────────────┤
│   Titlu Bold        │  ← 8-10px font
│   Descriere text    │  ← 5px font
│   [Buton]           │  ← 3x6px padding
└─────────────────────┘
```

## Modificare Previzualizări

### Pentru Hero Image Above Text:

Fișier: `BlockSidebar.jsx`, linia ~134

```javascript
// Detectează dacă blocul are imagine hero
const hasHeroImage = config.heroImage?.show && config.heroImage?.src;

// Randează imaginea în previzualizare
{hasHeroImage && (
  <div style={{ /* stiluri imagine */ }}>
    <img src={config.heroImage.src} />
  </div>
)}
```

### Personalizare Culori/Dimensiuni:

```javascript
// Ajustează dimensiuni text
fontSize: hasHeroImage ? '8px' : '10px'

// Ajustează padding
padding: hasHeroImage ? '8px' : '20px 12px'

// Ajustează înălțime imagine
height: '45px'  // Schimbă pentru mai mare/mai mic
```

## Testare

Pentru a testa previzualizările:

1. Deschide sidebar-ul din stânga (iconiță "Blocks")
2. Filtrează după categorie "Hero"
3. Verifică că imaginile și textul apar corect
4. Hover peste bloc pentru efect de highlight

## Notițe Importante

- **Performance**: Previzualizările dinamice sunt mai rapide decât încărcarea imaginilor
- **Consistență**: Reflect exact ce vei vedea pe canvas
- **Manutenabilitate**: Un singur loc pentru logică (BlockSidebar.jsx)
- **Flexibilitate**: Ușor de modificat fără a edita imagini

## Folder Assets

Folderul `/app/frontend/public/assets/block-previews/` este pregătit pentru:
- Imagini personalizate de previzualizare
- Screenshots ale blocurilor reale
- Branding sau tematizare specială

**Nu este obligatoriu să folosești acest folder - sistemul funcționează perfect doar cu previzualizări dinamice!**
