# Block Preview Assets

Acest folder este destinat pentru stocarea imaginilor de previzualizare pentru blocurile personalizate.

## Utilizare

1. **Adaugă imagini de previzualizare**: Plasează fișierele imagine (.png, .jpg, .webp) în acest folder
2. **Folosește în cod**: Referențiază imaginile folosind calea: `/assets/block-previews/nume-imagine.png`

## Exemplu

Pentru a adăuga o previzualizare personalizată pentru un bloc Hero:

```javascript
{
  id: 'hero-custom',
  category: 'hero',
  name: 'Hero - Custom',
  thumbnail: '/assets/block-previews/hero-custom.png', // Folosește imaginea din acest folder
  config: {
    // ... configurația blocului
  }
}
```

## Note

- Previzualizările actuale sunt generate **dinamic** din configurația blocurilor (vezi BlockSidebar.jsx)
- Acest folder este opțional și util doar dacă vrei să folosești imagini statice în loc de previzualizări generate
- Dimensiunea recomandată: 400x300px pentru thumbnails
- Formatul recomandat: WebP sau PNG pentru calitate optimă
