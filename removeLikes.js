function nextUnlike() {
  return document.querySelector('[data-testid="unlike"]')
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function scrollAndWait() {
  const previousHeight = document.body.scrollHeight
  window.scrollTo(0, document.body.scrollHeight)
  
  // Wait for up to 20 seconds for new content to load
  for (let i = 0; i < 40; i++) {
    await wait(500)
    if (document.body.scrollHeight > previousHeight) {
      await wait(3000) // Wait a bit more after content has loaded
      return true
    }
  }
  return false
}

async function removeAllLikes() {
  let count = 0
  let noNewLikesCount = 0
  
  while (count < 2000 && noNewLikesCount < 20) {
    let next = nextUnlike()
    
    if (next) {
      next.focus()
      next.click()
      console.log(`Unliked ${++count} tweets`)
      
      // Dynamic waiting time
      let waitTime = 2500 + Math.floor(Math.random() * 1000)
      if (count % 50 === 0) waitTime = 35000 + Math.floor(Math.random() * 10000)
      
      await wait(waitTime)
      noNewLikesCount = 0
    } else {
      const scrolled = await scrollAndWait()
      if (!scrolled) noNewLikesCount++
      else noNewLikesCount = 0  // Reset if successful scroll
    }
    
    // Additional random pauses
    if (count % 100 === 0) {
      console.log("Taking a short break...")
      await wait(45000 + Math.floor(Math.random() * 30000))
    }
  }
  
  if (count >= 2000) {
    console.log('Reached maximum unlike count')
  } else if (noNewLikesCount >= 20) {
    console.log('No more likes found after multiple scroll attempts')
  }
  
  console.log('Finished, count =', count)
}

removeAllLikes()