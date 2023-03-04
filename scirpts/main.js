const getData = async (limit, isSorted) => {
    progressToggler(true);
    const resp = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await resp.json();
    showData(data, limit, isSorted);
}



const showData = (data, limit, isSorted) => {
    const showMoreButton = document.getElementById('show-more');
    if (limit && isSorted == true) {
        data = data.data.tools.sort(function (a, b) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.published_in) - new Date(a.published_in);
        });
        data = data.slice(0, limit);
        showMoreButton.classList.remove('hidden'); 
    }
    else if (limit){
        showMoreButton.classList.remove('hidden'); 
        data = data.data.tools.slice(0, limit);
    }
    else {
        data = data.data.tools;
        showMoreButton.classList.add('hidden');
    }
    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = '';
    data.forEach(tool => {
        const { id, name, features, published_in, image } = tool;
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'w-96', 'bg-base-100', 'shadow-xl');
        cardDiv.innerHTML = `
            <figure ><img src="${image ? image : 'Not Available'}" alt="${name}" class="h-56"/></figure>
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
                       <div class="flex items-center">
                        <i class="fa-solid fa-calendar-days text-neutral-400 mr-2"></i>
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

    // Stop Progress Bar
    progressToggler(false);

}

// Get Individual Tool Data
const getToolDetails = async (id) => {
    progressToggler(true);
    console.log(id);
    const resp = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const data = await resp.json();
    showToolDetails(data.data);
}

const showToolDetails = data => {
    const { image_link, description, features, integrations, pricing, accuracy, input_output_examples } = data;

    const modalElement = document.getElementById('modal-element');
    modalElement.innerHTML = '';
    modalElement.innerHTML = `
    <!-- MODAL INNER BODY -->
    <div class="modal-box relative  max-w-none w-3/4">
        <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <div class="flex gap-4">
           
          <!-- LEFT MODAL CONTENTS -->
          <div class="flex-1 p-6 border rounded-lg border-2 border-zinc-400">
              <h1 class="text-2xl font-semibold">${description}</h1>
  
              <!-- Price Boxes -->
              <div class="flex gap-4 text-center my-6">
                  <div class="flex-1 p-2 bg-cyan-200 rounded-lg font-semibold">
                      <h2 class="text-md font-bold">${pricing !== null ? pricing[0].price === 'No cost' ? '' : pricing[0].plan : 'N/A'}</h2>
                      <h2 class="text-md">${pricing !== null ? pricing[0].price === 'No cost' || '0' ? 'Free of Cost' : pricing[0].price : 'N/A'}</h2>
                  </div>
                  <div class="flex-1 p-2 bg-cyan-200 rounded-lg font-semibold">
                      <h2 class="text-md font-bold">${pricing !== null ? pricing[1].price === 'No cost'  ? '' : pricing[1].plan  : 'N/A'}</h2>
                      <h2 class="text-md">${pricing !== null ?  pricing[1].price === 'No cost' ? 'Free of Cost' : pricing[1].price : 'N/A'}</h2>
                  </div>
                  <div class="flex-1 p-2 bg-cyan-200 rounded-lg font-semibold">
                     <h2 class="text-md font-bold">${pricing !== null ? pricing[2].price === 'No cost' ? '' : pricing[2].plan  : 'N/A'}</h2>
                     <h2 class="text-md">${pricing !== null ?  pricing[2].price === 'No cost' ? 'Free of Cost' : pricing[2].price : 'N/A'}</h2>
                  </div>
              </div>
              <!-- Price Boxes -->
  
              <!-- features and Integrations -->
              <div class="flex gap-4 justify-between">
                  <!-- Features -->
                  <div>
                      <h1 class="text-2xl font-semibold">Features</h1>
                      <ol class="list-disc pl-4 text-sm text-neutral-600">
                        <li>${features[1].feature_name ? features[1].feature_name : 'N/A'}</li>
                        <li>${features[2].feature_name ? features[2].feature_name : 'N/A'}</li>
                        <li>${features[3].feature_name ? features[3].feature_name : 'N/A'}</li>
                      </ol>
                  </div>
                  <!-- Features -->
  
                  <!-- Integrations -->
                  <div>
                      <h1 class="text-2xl font-semibold">Integrations</h1>
                      <ol class="list-disc pl-4 text-sm text-neutral-600">
                      <li>${integrations !== null ? integrations[0] : 'N/A'}</li>
                      <li>${integrations !== null ? integrations[1] : 'N/A'}</li>
                      <li>${integrations !== null ? integrations[2] : 'N/A'}</li>
                      </ol>
                  </div>
                  <!-- Integrations End -->
              </div>
              <!-- features and Integrations -->
          </div>
          <!-- LEFT MODAL CONTENTS END -->
  
          <!-- RIGHT MODAL CONTENTS -->
          <div class="flex-1 text-center  p-6 border rounded-lg border-2 border-zinc-400">
              <figure class="relative">
                  <img src="${image_link[1] === 'undefined'? image_link[1] : image_link[0]}" alt="" class="rounded-lg">
                  <div class="badge badge-secondary absolute right-2 top-2 p-2 text-xs ${accuracy.score === null ? 'hidden' : ''}" id="badge-element">${accuracy.score !== null ? accuracy.score * 100 : ''}% Accuracy</div>
              </figure>
              <h1 class="text-xl font-semibold mt-4">${input_output_examples !== null ? input_output_examples[0].input : 'Can you give any example?'}</h1>
              <p class="text-sm text-neutral-600">${input_output_examples !== null ? input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</p>
              <h1 class="text-xl font-semibold mt-4">${input_output_examples !== null ? input_output_examples[1].input : 'Can you give any example?'}</h1>
              <p class="text-sm text-neutral-600">${input_output_examples !== null ? input_output_examples[1].output : 'No! Not Yet! Take a break!!!'}</p>
  
              
          </div>
          <!-- RIGHT MODAL CONTENTS END -->
  
        </div>
    </div>
      <!-- MODAL INNER BODY -->
    `

    // Stop Progress Bar
    progressToggler(false);
}


// Progress Bar Showing Function
const progressToggler = isLoading => {
    const progressBar = document.getElementById('progress-bar');
    if (isLoading) {
        progressBar.classList.remove('hidden');
    }
    else {
        progressBar.classList.add('hidden');
    }
}

document.getElementById('sort-button').addEventListener('click', function(){
    getData(6, true)
})