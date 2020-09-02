import React from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";


function Header(){
  return(
    
    <div id="header">
      <link 
            rel="stylesheet" 
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossOrigin="anonymous"/>
      <div className="container">
        <div className="row">
          <div className="col-md-10 inner-text">
            <p className="h1" style={{color:"white"}}>Buscar y alquilar</p>
            <p className="h1" style={{color:"white"}}>parqueos</p>
            <p className="h3" style={{color:"white"}} >Nunca fue tan</p>
            <p><span className="h2" style={{color:"#084C7C"}}>Fácil</span> <span className="h2" style={{color:"#077187"}}>Rápido</span> <span className="h2" style={{color:"#59BCA7"}}>Seguro</span></p>
          </div>
          <div className="col-md-2">
            <br/>
            <br/>
            <button className="btn"><img src="/images/botonParqueo.svg" /></button>
            <button className="text-button">Alquilar Parqueo</button>
            <br/>
            <br/>
            <button className="btn"><img src="/images/botonCarro.svg" /></button>
            <button className="text-button">Buscar Parqueo</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Services(){
  return(
    <div id="services">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-md-3 text-center inner-text">
            <img src="/images/image map.svg"/>
            <h3>Busca parqueo</h3>
            <p>Localiza el parqueo más cercano a tu destino dentro del mapa de la aplicación al mejor precio</p>
          </div>
          <div className="col-md-4 text-center inner-text">
            <img src="/images/image calendar.svg"/>
            <h3>Reserva</h3>
            <p>Verifica la disponibilidad de los posibles parqueos alrededor de la zona</p>
          </div>
          <div className="col-md-3 text-center inner-text">
            <img src="/images/image car.svg"/>
            <h3>Llega a la cita</h3>
            <p>Dirigete al parqueo en la hora establecida y confia que tu vehiculo se encuentra en un lugar seguro</p>
          </div>
        </div>
      </div>
    </div>  
  )
}

function Benefits(){
  return(
    <div id="benefits">
      <div id="benefits-1">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center">
              <img src="/images/image map.svg"/>
            </div>
            <div className="col-md-6 inner-text">
              <h3 className="text-center">Gana dinero extra</h3>
              <p className="text-center">Si tienes un espacio disponible registrate como alquilador y disfruta de un ingreso extra mensual.</p>
            </div>
          </div>
        </div>
      </div>
      <div id="benefits-2">
        <div className="container">
          <div className="row">
            <div className="col-md-6 inner-text">
              <h3 className="text-center">Sencilla y disponible en todos lados</h3>
              <p className="text-center">Utiliza la aplicación disponible tanto en Web, iOS y Android encontrando parqueo sin importar el sistema que utilices.</p>
            </div>
            <div className="col-md-6 text-center">
              <img src="/images/computer.svg"/>
            </div>
          </div>
        </div>
      </div>
      <div id="benefits-3">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center">
              <img src="/images/secure car.svg" />
            </div>
            <div className="col-md-6 inner-text">
              <h3 className="text-center">Mantén tu vehículo seguro</h3>
              <p className="text-center">Utiliza un parqueo seguro en donde no te debas preocupar por robos o daños a tu vehículo mientras lo parqueas lejos de casa</p>
            </div>
          </div>  
        </div>
      </div>
    </div>  
  )
}

function Download(){
  return(
    <div id="download">
      <div className="container">
        <div className="row">
          <h1 style={{ color: 'white' }}>Registrate Ya!</h1>
        </div>
        <div className="row justify-content-md-center">
          <div className="col-md-2 col-sm-6">
          <button type="button" className="btn">
            Empezar
          </button>
          </div>
          <div className="col-md-2 col-sm-6">
          <button type="button" className="btn">
            <img src="/images/android.svg" />
            Android
          </button>
          </div>
          <div className="col-md-2 col-sm-6">
          <button type="button" className="btn">
            <img src="/images/apple.svg" />
            iOS
          </button>
          </div>
        </div>
      </div>
    </div>  
  )
}

function Footer(){
  return(
    <div id="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <img src="/images/logo 2.svg" />
            <img src="/images/logo 1.svg" />
          </div>
          <div className="col-md-4 inner-text">
            <a href="#">Inicio</a>
            <a href="#">Sobre nosotros</a>
          </div>
          <div className="col-md-4 inner-text">
            <a href="#">Contáctanos</a>
            <a href="#">Políticas de privacidad</a>
          </div>
        </div>
      </div>
    </div>  
  )
}

export default function Home(): JSX.Element {
  return (
    <div>
      <div className="containerLayout">
      <Head>
        <title>Index</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      </div>
      <Header />
      <Services />
      <Benefits />
      <Download />
      <Footer />
      <style jsx>{`
            .containerLayout > a{
              color:#037185;
            }
            .containerLayout {
              display: flex;
              margin: 0 auto;
              flex-direction: column;
              justify-content: flex-start;
              align-items: center;
            }
            .containerLayout {
              min-height:;
              padding:;
              display:;
              margin:;
              max-width:;
              flex-direction:;
              justify-content:;
              align-items:;
              text-align:;
            }
            #header  {
              background-image: url("\\images\\header-svg.svg");
              background-size: cover;
              background-repeat: no-repeat;
              width: 100%;
            }
      
            #header button{
                border:none;
                background-color: none;
            }
            #header .text-button{
                color: #fff;
                background-color: #3d907f;
                border: none;
                width: max-content;
                border-radius: 1.2em;
                margin: 1em;
                padding: 0.5em 1em;
                display: inline-block;
                font-size: 1.1em;
            }
            
            #header .text-button:hover{
                background-color: #037185;
                cursor: pointer;
                filter: drop-shadow(4px 4px 4px hsla(0deg, 0%, 0%, 0.5));
            }
            
            #header .inner-text {
                    padding-top: 70px;
                    padding-bottom: 380px;
            }
            
            #services{
                background-image: url("\\images\\services-svg.svg");
                background-size: cover;
                background-repeat: no-repeat;
                width: 100%;
            }
            
            #services .inner-text{
                color:white;
                padding-top: 90px;
                padding-bottom: 120px;
            }
            
            #benefits-1{
                background-image: url("\\images\\benefits1.svg");
                background-size: cover;
                background-repeat: no-repeat;
                width: 100%;
                padding-top: 50px;
                padding-bottom: 100px;
            }
            
            #benefits-1 .inner-text{
                padding-top: 100px;
            }
            
            #benefits-2{
                background-image: url("\\images\\benefits2.svg");
                background-size: cover;
                background-repeat: no-repeat;
                width: 100%;
                padding-top: 50px;
                padding-bottom: 100px;
            }
            
            #benefits-2 .inner-text{
                padding-top: 80px;
            }
            
            #benefits-3{
                background-image: url("\\images\\benefits3.svg");
                background-size: cover;
                background-repeat: no-repeat;
                width: 100%;
                padding-top: 50px;
                padding-bottom: 100px;
            }
            
            #benefits-3 .inner-text{
                padding-top: 80px;
            }
            
            #download{
                background-image: url("\\images\\download.svg");
                background-size: cover;
                background-repeat: no-repeat;
                width: 100%;
                padding-top: 50px;
                padding-bottom: 60px;
            }
            
            #download .row{
                margin: 10px;
            }
            
            #download button{
                background-color: #63C7B2;
                border-radius: 0.7em;
                width: 100%;
                height: 51px;
                margin: 7px;
            }
            
            #download button img{
                height: -webkit-fill-available;
                height: -moz-available;
                margin-right: 7px;
            }
            
            #footer a{
                display: block;
                color:black;
                font-weight: bold;
            }
            #footer .inner-text{
                padding-top: 80px;
            }
            
          `}</style>
    </div>
  );
}
