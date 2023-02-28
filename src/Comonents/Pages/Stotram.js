import React from 'react'
import Layout from '../Layout'
import './Stotram.css'

export default function Stotram() {
  return (
    <Layout>
         <div className="container justify-content-center ">
          <div style={{ marginLeft: "10%", marginRight: "5%" }}>
          <div className="headCard" >
            <h3 className="heading">Categories</h3>
          </div>
          <div className='content border p-4 mt-4 mb-4 d-flex justify-content-center  transback '>
            <div className='row w-75 '>
              <div className='col'>
              <label className="color" for="formGroupExampleInput">Select God</label>
            <input
              class="form-control m-2"
              type="text"
              placeholder="Readonly input here…"
              readonly
            ></input>
              </div>
              <div className='col'>
              <label className="color" for="formGroupExampleInput">Number of Paragraphs</label>
            <input
              class="form-control m-2"
              type="text"
              placeholder="Readonly input here…"
              readonly
            ></input>
              </div>
              
              <div className='row  d-flex justify-conteny'>
              <div className='col'>
              <label className="color" for="formGroupExampleInput">Name of Strotram</label>
            <input
              class="form-control m-2"
              type="text"
              placeholder="Readonly input here…"
              readonly
            ></input>
              </div>
              </div>
              <div className='row'>
              <div className='col'>
              <label className="color" for="formGroupExampleInput">Paragraph ID</label>
            <input
              class="form-control m-2"
              type="text"
              placeholder="Readonly input here…"
              readonly
            ></input>
              </div>
              <div className='row'>
              <div className='col'>
              <label className="color" for="formGroupExampleInput">Strotra</label>
            <input
              class="form-control m-2"
              type="text"
              placeholder="Readonly input here…"
              readonly
            ></input>
              </div>
              </div>
              <div className='row justify-content-center '>
              <div className="col-1 pt-4">
    <button type="button" class="btn btn-success">Submit</button>
    </div>
    </div>
              </div>
            </div>
          </div>
          </div>
          </div>
    </Layout>
  )
}
