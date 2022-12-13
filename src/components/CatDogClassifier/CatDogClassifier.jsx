import React from 'react'

const catDogClassif = () =>  {
  async function loaded(reader) {
    const response = await fetch('https://krushna-space1.hf.space/api/predict', {
      method: "POST", body: JSON.stringify({ "data": [reader.result] }),
      headers: { "Content-Type": "application/json" }
    });
    console.log(reader.result)
    const json = await response.json();
    const label = json['data'][0]['confidences'][0]['label'];
    document.getElementById("results").innerHTML = `<br/><img src="${reader.result}" width="300"> <p>${label}</p>`
  }
  function read() {
    const reader = new FileReader();
    reader.addEventListener('load', () => loaded(reader))
    reader.readAsDataURL(document.getElementById("photo").files[0]);
  }
    const changeHandler = (e) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => loaded(reader))
      reader.readAsDataURL(document.getElementById("photo").files[0]);
    }

  return (
    <>
      <div class="p-5 bg-primary text-white text-center">
        <h1>Dog Cat Classifier</h1>
        {/* <p>Give an image of cat or a dog</p>  */}
      </div>
      <input id="photo" type="file" class="text-center"  onChange={changeHandler} />
      <div id="results" class="p-5 bg-primary text-white text-center"></div>
    </>
  )
}

export default catDogClassif