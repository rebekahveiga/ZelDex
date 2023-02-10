const zeldaName = document.querySelector('.zelda_name');
const zeldaClass = document.querySelector('.zelda_class');
const zeldaImage = document.querySelector('.zelda_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchZelda = 1;


const fetchZelda = async (zelda) => {
    const APIResponse = await fetch(`https://botw-compendium.herokuapp.com/api/v2/entry/${zelda}`);
    
    if(APIResponse.status == 200){
    
    const data = await APIResponse.json();
    console.log(data)
    return data;
    
    }

}

const renderZelda = async (zelda) => {

    zeldaName.innerHTML = 'Loading...';
    zeldaClass.innerHTML = '';

    const data = await fetchZelda(zelda);
    
    if(data){
    zeldaImage.style.display = 'block';
    zeldaName.innerHTML = data.data.name;
    zeldaClass.innerHTML = data.data.id;
    zeldaImage.src = data.data.image
    input.value = "";
    searchZelda = data.data.id;
    }else{
        zeldaImage.style.display = 'none'
        zeldaName.innerHTML =  'Not found :c';
        zeldaClass.innerHTML =  '';
        input.value = "";

    }
}


form.addEventListener('submit', (event)=>{

    event.preventDefault();

    renderZelda(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', ()=>{
    if(searchZelda >1){
    searchZelda-=1;
    renderZelda(searchZelda);
    }
});

buttonNext.addEventListener('click', ()=>{
    searchZelda+=1;
    renderZelda(searchZelda);
});


renderZelda(searchZelda);