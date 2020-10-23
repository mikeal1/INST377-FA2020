// You may wish to find an effective randomizer function on MDN.

function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

function sortFunction(a, b, key) {
  if (a[key] < b[key]) {
    return -1;
  } if (a[key] > b[key]) {
    return 1;
  }
  return 0;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); 
}

document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray(); // here we're using jQuery to serialize the form
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((fromServer) => {
      if (document.querySelector('.flex-inner')){
        document.querySelector('.flex-inner').remove();
      }
      const Arr = range(10);
      const Arrs = Arr.map(()=>{
        const num = getRandomInt(0, 243);
        return fromServer[num];
      });

      const newlist = Arrs.sort((a,b)=> sortFunction(b,a, 'name'));
      const ul = document.createElement('ul');
      ul.className = 'flex-inner';
      $('form').prepend(ul);
       newlist.forEach((element, i) => {
         const li = document.createElement('li');
         $(li).append('<input type ="checkbox" value =$(element.code) id = $(element.code) />');
         $(li).append('<label for=$(element.code)>$(element.name)</label>');
         $(ul).append(li);
       })
      console.log('fromServer', fromServer);
    })
    .catch((err) => console.log(err));
});