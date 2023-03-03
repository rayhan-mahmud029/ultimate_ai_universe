const getData = async () => {
    const resp = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await resp.json();
    showData(data.data);
}

const showData = (data) => {
    const cardContainer = document.getElementById('card-container')
    const toolsArray = data.tools;
    toolsArray.forEach(tool => {
        const {id, name, features, published_in, image} = tool;
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'w-96', 'bg-base-100', 'shadow-xl');
        cardDiv.innerHTML = `
            <figure ><img src="${image? image : 'Not Available'}" alt="${name}" /></figure>
            <div class="card-body">
                <h2 class="text-xl font-semibold">Features</h2>
                <ol class="list-decimal pl-4">
                    <li>${features[0] ? features[0] : 'N/A'}</li>
                    <li>${features[1] ? features[1] : 'N/A'}</li>
                    <li>${features[2] ? features[2] : 'N/A'}</li>
                </ol>
                <hr class="border-1 my-4">

                <!-- Card Footer -->
                <div class="card-actions justify-end flex flex-col">
                         <h2 class="text-2xl font-bold lead">${name}</h2>

                    <div class="w-full flex items-center justify-between gap-2">
                       <div class="flex">
                        <i class="fa-solid fa-calendar-days text-neutral-400"></i>
                        <p class="text-sm text-neutral-400">${published_in}</p>
                        </div>
                        <div>
                        <label for="my-modal-3" onclick="getToolDetails('${id}')">
                        <i class="fa-solid fa-arrow-right rounded-full bg-cyan-300 p-3 text-neutral-500"></i>
                        </label>
                        </div>
                    </div>
                </div>
            </div>
        `
        cardContainer.appendChild(cardDiv);
    })
}

// Get Individual Tool Data
const getToolDetails = async (id) =>{
    console.log(id);
    const resp = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const data = await resp.json();
    showToolDetails(data.data);
}

const showToolDetails = data =>{
    const modalElement = document.getElementById('modal-element');
}