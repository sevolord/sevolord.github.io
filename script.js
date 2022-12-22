const form = document.getElementById('registration-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const name = form.elements.name.value;
  const phone = form.elements.phone.value;
  const email = form.elements.email.value;
  
  if (!name || !phone || !email) {
    alert('Все поля, кроме даты рождения, обязательны для заполнения');
    return;
  }
  
  const nameRegex = /^[а-яА-Я ]+$/;
  if (!nameRegex.test(name)) {
    alert('ФИО должны содержать только буквы русского алфавита');
    return;
  }
  
  const phoneRegex = /^\+7\d{10}$/;
  if (!phoneRegex.test(phone)) {
    alert('Номер телефона должен содержать только цифры, иметь длину 11 символов и начинаться с +7');
    return;
  }
  
  if (!email.includes('@')) {
    alert('Пожалуйста, введите действительный адрес электронной почты');
    return;
  }
  
  // form is valid, proceed with submission
});
