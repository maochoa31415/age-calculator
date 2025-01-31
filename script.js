(() => {
  let years = null
  let months = null

  function render() {
    const resultEl = document.querySelector('.output .age')

    resultEl.innerHTML = `${years} years ${months} months`
  }

  window.addEventListener('load', () => {
    const picker = datepicker('#birth-date', {
      formatter: (input, date) => {
        const value = date.toLocaleDateString()

        input.value = value
      },
      onSelect: (instance, date) => {
        const currentDate = luxon.DateTime.now()
        const birthDate = luxon.DateTime.fromISO(date.toISOString())
        const result = currentDate.diff(birthDate, ['years', 'months']).toObject()

        years = result.years
        months = Math.ceil(result.months)
      },
    })
    const outputEl = document.querySelector('.output')
    const formDateEl = document.querySelector('.form-date')

    formDateEl.addEventListener('submit', event => {
      event.preventDefault()
      render()
      outputEl.setAttribute('style', 'display: block')
    })
  })
})()
