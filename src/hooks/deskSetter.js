const DeskSetter = (Floor, dayReserv, officeNameOk, favorites, friends, setShow) => {
  let icons = document.querySelectorAll('.icons')
  if (icons.length) { icons.forEach(child => child.remove()) }
  

  document.querySelectorAll(".fil0").forEach((element, i) => {

    var rect = element.getBoundingClientRect();

    element.setAttribute(`id`, `F${Floor}D${i + 1}`)
    element.onclick = (e) => {
      let id = e.target.getAttribute("id");
      let meetingRoom = e.target.classList.contains("meetingRoom")
      let reserva = []

      dayReserv.forEach((reserv) => {
        if (reserv.booking === `F${Floor}D${i + 1}`) { reserva.push(reserv) }
      })

      setShow({ desk: id, reserve: reserva, meetingRoom: meetingRoom })
    }

    if (dayReserv.find((reserv) => reserv.booking === `F${Floor}D${i + 1}` && !element.classList.contains("meetingRoom"))) {
      element.classList.add('reserved')

      let reserva = dayReserv.find((reserv) => reserv.booking === `F${Floor}D${i + 1}`)
      let amigo = friends.find(friend => friend._id === reserva.user._id)

      if (amigo) {
        let span = document.createElement("span")
        let spanText = document.createTextNode('♥')
        span.appendChild(spanText)
        span.style.cssText = `position:absolute; top:${rect.top + window.scrollY + (rect.height / 2) - 20}px;left:${rect.right + window.scrollX - 22}px;height: ${rect.height}px; font-size: 29px; color: #E61587; text-align: top; z-index: 1; pointer-events: none`
        span.classList.add(`icons`)
        document.body.appendChild(span)
      }

    } else {
      if (element.classList.contains("reserved")) {
        element.classList.remove('reserved')
      }
    }



    if (favorites.find((fav) => fav === `${officeNameOk}:F${Floor}D${i + 1}`)) {
      element.classList.add('favorite')

      let favSpan = document.createElement("span")
      let favSpanText = document.createTextNode('★')
      favSpan.appendChild(favSpanText)
      favSpan.style.cssText = `position:absolute; top:${rect.top + window.scrollY + (rect.height / 2) - 13}px;left:${rect.left + window.scrollX + 8}px;color: yellow; height:${rect.height}px; font-size: 20px; text-align: top; pointer-events: none`
      favSpan.classList.add(`icons`)
      
      document.body.appendChild(favSpan)
    } else {
      if (element.classList.contains("favorite")) {
        element.classList.remove('favorite')
      }
    }




  });
}

export default DeskSetter