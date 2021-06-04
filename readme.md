# pool-js

Radim Sückr, 2021

Music and sound effects from:

- https://mixkit.co
- https://www.bensound.com

## Cíl projektu

Vytvořit základní UI pro hru "kulečník". Stavím na základech starého projektu ze střední školy. Cílem je přepsat kód tak, aby používal moderní JavaScript, CSS i HTML a byl připraven pro případné rozšíření funkcí ve hře a napojení na herní backend.

## Výstup projektu

Výstupem je funkční aplikace ve frameworku Svelte, která funguje jako SPA a poskytuje možnost hru si přímo zahrát.

## Obsah projektu

Projekt obsahuje pouze dvě stránky a to hlavní s krátkým popisem a představením hry včetně namockovaného žebříčku nejlepších hráčů. Druhá stránka je samotná hra. Po dohrání hry se za pár vteřin objeví modální okno na "odeslání" skóre (není backend, takže to je mock).

V horní navigační liště je ještě tlačítko na přehrávání klidné podkresové hudby. :)

## Spuštění vývojového serveru

Lokálně lze aplikaci rozjet pomocí příkazu `yarn dev`.

## Produkční build

Produkční build se spustí pomocí `yarn build`.
