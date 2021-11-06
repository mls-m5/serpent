

export const settings = {
    slitherSpeed: 1,
    turnRate: .1,
    scrollSpeed: .2,
    // We need to have different separation values for the rendering and hitbox because 
    // otherwise we'll get an overly agreesive hitbox OOOOOR
    // We'll get gaps in our serpent
    segmentSeparationHitbox: 10,
    segmentSeparationRender: (speed: number) => Math.floor(10 / speed),
    serpentLength: 100,
    serpentSize: 16,
    enableImageSmoothing: true,
    hitRockDamage: 10,
    numVisualDamageFrames: 5,
    eatAppleHeal: 20,
    rockCooldown: 100,
    appleCooldown: 1000,
    energyDrinkCooldown: 50000,
    energyDrinkSpeedBoost: 2,
    energyDrinkLifetime: 10_000, // ms
};
