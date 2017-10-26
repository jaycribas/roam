document.addEventListener('DOMContentLoaded', (event) => {
  $('#myModal').on('shown.bs.modal', () => {
    $('#myInput').trigger('focus')
  })
})
