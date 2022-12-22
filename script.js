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
  
//  формируем страницу с введенными данными 
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const formData = new FormData(form);
    const data = {};
    
    for (const [key, value] of formData) {
      data[key] = value;
    }
    
    // create an HTML string containing the form data
    let html = "<title>Успешная регистрация на форум!</title>";
    html+="<p><strong>Ваши данные записаны:</strong></p>";

    let str = data['name'];
    html+=`<p><strong>ФИО: </strong> ${str} </p>`;
    str = data['email'];
    html+=`<p><strong>Email: </strong> ${str} </p>`;
    str = data['conference-sections'];
    html+=`<p><strong>Секция: </strong> ${str} </p>`;
    str = data['phone'];
    html+=`<p><strong>Телефон: </strong> ${str} </p>`;
    str = data['date-of-birth'];
    html+=`<p><strong>Дата рождения: </strong> ${str} </p>`;
    if (data['report'] == 'yes') 
    {
      str = data['report-topic'];
      html+=`<p><strong>Тема доклада: </strong> ${str} </p>`;
    }        
    // for (const key in data) {
    //   html += `<p><strong>${key}:</strong> ${data[key]}</p>`;
    // }
    
    // create a new window and display the HTML string
    const newWindow = window.open();
    newWindow.document.write(html);
  });
  
  // form is valid, proceed with submission
});
