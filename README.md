## Ssehc - Non interactive Chess Board

Appends a dom element unto your page that represents a visual chess board.

### Usage

`yarn add ssehc --save`

`index.html`
```
   <div id="app"></div> 
```

`main.ts`
```
    import Ssehc from 'ssehc';

    Ssehc(document.getElementById('app'), { 
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        lastMove: 'e2e4'
    });
    
``` 

Shows the board according to `fen` and highlights `lastMove`.

Use [index.css](src/index.css) for proper styling.

The size of the dom element to append must be a square. Use this trick to force it:

```
    #app {
        position: relative;
        width: 60vmin;
        height: 0;
        padding-bottom: 60vmin;
    }
```


### Development

    `yarn install` - Install dependencies

    `yarn watch` - Continous development

    `yarn build` - Build the module
