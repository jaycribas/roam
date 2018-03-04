/*
API code for delete endpoint:
.then(dbResponse => res.json(dbResponse))
*/

// document.addEventListener('DOMContentLoaded', () => {
//   const { deletePostForm } = document.forms
//
//   if (deletePostForm) {
//     deletePostForm.addEventListener('submit', (event) => {
//       event.preventDefault()
//
//       const formData = {
//         id: deletePostForm.id.value
//       }
//
//       fetch(`/posts/${formData.id}`, {
//         method: 'delete',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         credentials: 'include',
//         body: JSON.stringify(formData)
//       })
//         .then(res => res.json())
//         .then((data) => {
//           window.location.href = `/user/${data.user_id}`
//         })
//     })
//   }
// })
