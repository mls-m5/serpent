


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
- [x] Skaka skärmen rot+pos
- [x] Dolj ormen när död
- [x] Stoppa ljud när ormen dör
- [ ] Musik
- [ ] Energidrycks-musik
- [ ] Skärm som visar text när man har dött
- [x] Dö utanför spelområdet
- [x] Poäng äpplen + scroll
- [ ] Krabbor eller fiender
- [x] Ta bort stenar utanför spelområdet
- [ ] Rita blodpartiklar när död

Never?
- [ ] Slower when hurt