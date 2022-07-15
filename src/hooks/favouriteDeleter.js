const favouriteDeleter = (location) => {

  let icons = document.querySelectorAll('.icons')

  let path = location.pathname.slice(1, 7)

  if (path !== "office") {
    icons.forEach(child => child.remove())
  }

}

export default favouriteDeleter