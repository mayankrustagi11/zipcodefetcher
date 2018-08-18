// LISTEN FOR FORM SUBMIT
document.querySelector('#zipform').addEventListener('submit', getLocation);

// LISTEN FOR DELETE
document.querySelector('body').addEventListener('click',
deleteLocationInfo);

function getLocation(e) {

  // GET ZIP VALUE FROM INPUT
  const zip = document.querySelector('.zip').value;

  // MAKE REQUEST
  fetch(`https://api.zippopotam.us/IN/${zip}`)
  .then(response => {
    if(response.status != 200) {
      showIcon('remove');
      document.querySelector('#output').innerHTML =
      `
        <article class="message is-danger">
          <div class="message-body">
            Invalid Zipcode !!!
          </div>
        </article>
      `;
      throw Error(response.statusText);
    } else {
      showIcon('check');
      return response.json();
    }
  })
  .then(data => {
    // SHOW LOCATION INFO
    let output = '';
    data.places.forEach(place => {
      output += `
      <article class="message is-primary">
        <div class="message-header">
          <p>Location Information</p>
          <button class="delete"></button>
        </div>
        <div class="message-body">
          <ul>
            <li>
              <strong>City: </strong>${place['place name']}
            </li>
            <li>
              <strong>State: </strong>${place['state']}
            </li>
            <li>
              <strong>Longitude: </strong>${place['longitude']}
            </li>
            <li>
              <strong>Latitude: </strong>${place['latitude']}
            </li>
          </ul>
        </div>
      </article>
      `;
    });

    // INSERT INTO OUTPUT DIV
    document.querySelector('#output').innerHTML = output;
  })
  .catch(err => console.log(err));

  // PREVENT DEFAULT
  e.preventDefault();
}

// MANAGING ICONS
function showIcon(icon) {

  // CLEAR ICONS
  document.querySelector('.icon-remove').style.display = 'none';
  document.querySelector('.icon-check').style.display = 'none';

  //SHOW CORRECT ICON
  document.querySelector(`.icon-${icon}`).style.display = 'inline-flex';
}

// MANAGING DELETING INFORMATION
function deleteLocationInfo(e) {
  if(e.target.className == 'delete') {
    document.querySelector('.message').remove();
    document.querySelector('.zip').value = '';
    document.querySelector('.icon-check').remove();
  }
}
