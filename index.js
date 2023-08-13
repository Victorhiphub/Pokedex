
const getPokemons = fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0").then(r=>r.json()).then(data => {
    return data;
  });
  
  const getImagePokemon = (pokemonUrl) => fetch(pokemonUrl).then(r=>r.json()).then(data => {
    return data.sprites.front_default;
  });

  const getAbilityPokemon = (pokemonUrl) => fetch(pokemonUrl).then(r=>r.json()).then(data => {
    return data.abilities.length;
  });
  const getHeightPokemon = (pokemonUrl) => fetch(pokemonUrl).then(r=>r.json()).then(data => {
    return data.height;
  });
  const getWeightPokemon = (pokemonUrl) => fetch(pokemonUrl).then(r=>r.json()).then(data => {
    return data.weight;
  });
  const  getIdPokemon= (pokemonUrl) => fetch(pokemonUrl).then(r=>r.json()).then(data => {
    return data.id;
  });


 
  const getPokemonsImages = async (pokemons) => {
    for(let i=0; i<pokemons.length; i++) {
      pokemons[i].image = await getImagePokemon(pokemons[i].url);
    }
    return pokemons;
  }
  const getPokemonData = async(pokemons )=>{
    for(let i =0 ; i < pokemons.length;i++){
      pokemons[i].height = await getHeightPokemon(pokemons[i].url);
      pokemons[i].weight =  await getWeightPokemon(pokemons[i].url);
      pokemons[i].abilities = await getAbilityPokemon(pokemons[i].url);
      pokemons[i].id= await getIdPokemon(pokemons[i].url);
    }
    return pokemons;
  }
  
    window.onload = async () => {
    let data = await getPokemons;
    let pokemons = await getPokemonsImages(data.results);
    pokemons = await getPokemonData(data.results);
    for(let i=0; i<pokemons.length; i++) {

    let slickContainer = document.createElement("div");
    slickContainer.className = "slick";
    slickContainer.id=pokemons[i].name;

    let divContainer = document.createElement("div");
    divContainer.className = "pokemonmargin";
    let aContainer = document.createElement("a");
    //aContainer.href = "/";

    let  h4container  = document.createElement("h4");
    let smallCointainer = document.createElement("small");
    
    smallCointainer.textContent =  pokemons[i].name;
    h4container.appendChild(smallCointainer);
    let picContainer = document.createElement("picture");
    let imgContainer = document.createElement("img");
    imgContainer.src =  pokemons[i].image;
    imgContainer.alt = "Image";
    //trackContainer.appendChild(slickContainer);
    slickContainer.appendChild(divContainer);
    divContainer.appendChild(aContainer);
    picContainer.appendChild(imgContainer);
    aContainer.appendChild(h4container);
    aContainer.appendChild(picContainer);
    picContainer.appendChild(imgContainer);
    

    document.getElementById("track").appendChild(slickContainer);
      }
  
      const buttonPrev = document.getElementById("button-prev");
      const buttonNext = document.getElementById("button-next");  
      const track   = document.getElementById("track");
      const slickList = document.getElementById("slick-list");
      const slick = document.querySelectorAll('.slick');
  
     const slickWidth = slick[0].offsetWidth;
  
     buttonPrev.onclick = () => Move(1);
     buttonNext.onclick = () => Move(2);
     
     function Move(value){
      const trackWidth = track.offsetWidth;
      const listWidth = slickList.offsetWidth;
    
      track.style.left == "" ? leftPosition = track.style.left = 0 :leftPosition = parseFloat(track.style.left.slice(0,-2)*-1);
      if(leftPosition <(trackWidth-listWidth)&&value==2){
          track.style.left = `${-1*(leftPosition+slickWidth)}px`;   
      }else if(leftPosition > 0 && value == 1){
          track.style.left = `${-1*(leftPosition-slickWidth)}px`;
      
    
      }
    }
   slick.forEach((cadaImagen,i)=>{
     slick[i].addEventListener('click',()=>{
      
      document.getElementById("ventana").style.display = "block";
      document.getElementById("poke").src = pokemons[i].image;
      document.getElementById("idpoke").textContent = "#000" + pokemons[i].id;
      document.getElementById("name").textContent = "Nombre: " + pokemons[i].name;
      document.getElementById("height").textContent = "Altura: " + pokemons[i].height;
      document.getElementById("weight").textContent = "Peso: " + pokemons[i].weight;
      document.getElementById("amount").textContent = "Habilidades: "+ pokemons[i].abilities;
      console.log(pokemons[i]);
      
     });
    

   });

   const vent = document.getElementById("close");
   vent.addEventListener('click',() =>{
    document.getElementById("ventana").style.display = "none";
   });
   
  



} 

