function nextUnretweet() {
    return document.querySelector('[data-testid="unretweet"]')
  }
  
  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  
  async function removeAllRetweets() {
    let count = 0
    let next = nextUnretweet()
    while (next && count < 500) {
      next.focus()
      next.click()
      
      // Wait for and click the confirmation dialog
      await wait(500)
      const confirmButton = document.querySelector('[data-testid="unretweetConfirm"]')
      if (confirmButton) {
        confirmButton.click()
      }
      
      console.log(`Unretweeted ${++count} tweets`)
      await wait(count % 50 === 0 ? 30000 : 2000)
      next = nextUnretweet()
    }
    if (next) {
      console.log('Finished early to prevent rate-limiting')
    } else {
      console.log('Finished, count =', count)
    }
  }
  
removeAllRetweets()
