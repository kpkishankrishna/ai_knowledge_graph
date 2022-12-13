import React from 'react';
import { useState } from 'react';

const StableDiffussion = () => {
  const banana = require('@banana-dev/banana-dev');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const [updated, setUpdated] = useState(message);

  const apiKey = "4dc67115-ce41-49b0-a99c-af3d46c9e073"
  const modelKey = "80269593-bc17-4f0e-ac7b-8b305904040b"
  const modelParameters = {
    "prompt": message,
    "num_inference_steps":50,
    "guidance_scale":7,
    "height":512,
    "width":512,
    "seed":3242
  }
  
  async function  componentDidMount() {
    console.log(1234)
    const out = await banana.run(apiKey, modelKey, modelParameters)
    console.log(message)
    setStatus(message)
    document.getElementById("results").innerHTML = `<br/><img src="data:image/png;base64,${out.modelOutputs[0].image_base64}" width="300" className=" flex-center"> <p>${status}</p>`
  }


  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleClick = () => {
    // 👇 "message" stores input field value
    setUpdated(message);
    document.getElementById("results").innerHTML = `<p>Guidance set at 7 and 50 inference steps</p><p>Loading, will take more than 15 seconds<p/>`
    console.log(message)
    componentDidMount()
  };

  return (
      <div className="p-5 bg-primary text-white text-center">
      <p>Eg: Muffins on table</p>
      <input
        type="text"
        id="message"
        name="message"
        onChange={handleChange}
        value={message}
      />

      <h2>Current prompt: {message}</h2>

      <h2>Final prompt: {updated}</h2>

      <button onClick={handleClick} color="cyan">Click to Generate</button>
      <div id="results" className="p-5 bg-primary text-white text-center"></div>
      </div>
  )
}

export default StableDiffussion