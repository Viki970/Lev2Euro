const events = [
  {
    date: "10 юли 2020",
    title: "Влизане в ERM II и Банков съюз",
    description: "България се присъединява към ERM II и Банковия съюз – важна крачка към еврото."
  },
  {
    date: "25 февруари 2025",
    title: "Заявка за конвергенционен доклад",
    description: "България подава официална заявка за извънреден доклад до ЕК и ЕЦБ."
  },
  {
    date: "4 юни 2025",
    title: "ЕК и ЕЦБ: България е готова",
    description: "Европейската комисия потвърждава: България покрива критериите за еврозоната."
  },
  {
    date: "8 юли 2025",
    title: "Гласуване в Еврогрупата",
    description: "Финансовите министри от еврозоната гласуват за присъединяване на България."
  },
  {
    date: "1 януари 2026",
    title: "Официално въвеждане на еврото",
    description: "Еврото става официална валута. Левът се използва паралелно до 31 януари."
  },
  {
    date: "февруари 2026",
    title: "Национална информационна кампания",
    description: "Стартира информационна кампания с обучения, мобилни екипи и медийно покритие."
  },
  {
    date: "април 2026",
    title: "Регионални семинари и дигитални портали",
    description: "Обучения за бизнеси и граждани, нови услуги за проверка и обмен на цени в евро."
  },
  {
    date: "януари 2027",
    title: "Оценка: 1 година с еврото",
    description: "ЕК и БНБ публикуват доклад за въздействието от приемането на еврото."
  }
];

const container = document.getElementById("timeline");

events.forEach((event, index) => {
  const item = document.createElement("div");

  // Определяме дали е бъдещо събитие
  const isFuture = new Date(parseDate(event.date)) > new Date();
  
  // Редуваме ляво и дясно позициониране
  item.className = `timeline-item ${index % 2 === 0 ? "left" : "right"}${isFuture ? " future" : ""}`;
  
  // Вътре в заглавието слагаме и датата и заглавието
  item.innerHTML = `<h3>${event.date} - ${event.title}</h3><p>${event.description}</p>`;
  
  container.appendChild(item);
});

function parseDate(dateStr) {
  const months = {
    'януари': '01',
    'февруари': '02',
    'март': '03',
    'април': '04',
    'май': '05',
    'юни': '06',
    'юли': '07',
    'август': '08',
    'септември': '09',
    'октомври': '10',
    'ноември': '11',
    'декември': '12'
  };

  let parts = dateStr.toLowerCase().split(' ');
  if(parts.length === 3){
    let day = parts[0].padStart(2,'0');
    let month = months[parts[1]];
    let year = parts[2];
    return `${year}-${month}-${day}`;
  } else if(parts.length === 2){
    let month = months[parts[0]];
    let year = parts[1];
    return `${year}-${month}-01`;
  } else {
    let today = new Date();
    let year = today.getFullYear();
    let month = months[parts[0]] || '01';
    return `${year}-${month}-01`;
  }
}

// Анимация при скрол
function revealOnScroll() {
  const items = document.querySelectorAll('.timeline-item');
  const triggerBottom = window.innerHeight * 0.85;

  items.forEach(item => {
    const rect = item.getBoundingClientRect();
    if (rect.top < triggerBottom) {
      item.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

