links = document.querySelectorAll('.topbar_links_app');
for (let i= 0; i < links.length; i++){
    href = links[i].getAttribute('href');
    links[i].setAttribute('href', API+href+'?key='+KEY);
}

