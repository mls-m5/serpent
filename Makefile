
all: public/index.html out/assets

out/index.js: src/*.ts
	tsc

out/build: build.cpp
	${CXX} build.cpp -o out/build -std=c++20

public/index.html: out/build out/index.js
	@ out/build

out/assets:
	cp -r assets/ public/assets