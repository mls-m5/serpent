


# How to run:
```sh
# Setup
npm install
npm install -g typescript


# Running (2 separate terminals needed)
# Terminal 1:
npx webpack
# Terminal 2:
npx http-server -c-1 ./out
```

Visit http://localhost:8080 in your favoite browser!

# TODO

Polish
- [ ] When you die, start from an egg.
- [x] Add some visual damage feedback
- [ ] Adjust for delta time (browser seems to be rather consistent with 60fps though)
- [ ] Profit!

Features
- [ ] Scale so it is possible to play on smaller screens
- [ ] Skaka skärmen rot+pos
- [ ] Röd blink när skadad
- [ ] Dolj ormen när död
- [ ] Dö utanför spelområdet
- [ ] Poäng äpplen + scroll
- [ ] Krabbor eller fiender
- [ ] Ta bort stenar utanför spelområdet
- [ ] Rita blodpartiklar när död