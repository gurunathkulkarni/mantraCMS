import React from 'react'
import Layout from '../Layout'
import Commonmodal from '../Modal/Commonmodal'
import './God.css'

export default function God() {
  return (
    <Layout>
      
          <div className="container justify-content-center ">
          <div style={{ marginLeft: "10%", marginRight: "5%" }}>
          <div className="headCard" >
            <h3 className="heading">GODS</h3>
          </div>

          <div className='content border  p-4 mt-4 transback'>
            <div className='row'>
              <div className='col'>
              
          <label className="color" for="formGroupExampleInput">Category</label>
            <input
              class="form-control m-2"
              type="text"
              placeholder="Readonly input here…"
              readonly
            ></input>
          
              </div>
              <div className='col'>
              <label className="color" for="formGroupExampleInput">God Name</label>
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
              <label className="color" for="formGroupExampleInput">Day</label>
            <input
              class="form-control m-2"
              type="text"
              placeholder="Readonly input here…"
              readonly
            ></input>
              </div>
              <div className='col'>
              <label className="color" for="formGroupExampleInput">Enter Text</label>
            <input
              class="form-control m-2"
              type="text"
              placeholder="Readonly input here…"
              readonly
            ></input>
            
              </div>
              
            </div>

            <div className="row justify-content-center mt-4">
    <div className="col-1 justify-conteny-center">
    <button type="button" class="btn btn-success">Submit</button>
    </div>
    </div>
            
          </div>
      

          
      
      </div>
      </div>
    </Layout>
    
  )
}
