module.exports = {
     phoenixWand: (userMaterial) => { 
        const handle = phoenixSpecialHandle(userMaterial);
        const shaft = phoenixShaft(userMaterial);
        handle.position.x=-10
        handle.position.z = -2.7
        shaft.position.x=-7.6;
        shaft.position.z = -2.7
        shaft.position.y = 1
  
        
  
        wand.add(handle, shaft)
        scene.add(wand)
      }
}