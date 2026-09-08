# Smegmanose.org

Smegmanose is a joke.

## Development

To compile the Elm code into JavaScript in `site/elm.js`:

    bin/build
    
Do development by starting `elm reactor` in the `smeganose`
directory, then aiming your browser at
http://localhost:8000/site/index.html. Each time you build, you can
full-reload the browser tab.

To upload the code to Smegmanose.org (if you're me), `bin/update-site`.

The `rsyncit` script (called by `update-site`) is part of
[wws-scripts](https://github.com/billstclair/wws-scripts).
